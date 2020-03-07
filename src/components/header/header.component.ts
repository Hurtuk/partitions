
import {forkJoin as observableForkJoin,  Observable } from 'rxjs';

import {map, distinctUntilChanged, debounceTime} from 'rxjs/operators';
import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { MenuService } from '../../services/menu.service';
import { ScoreService } from '../../services/score.service';
import { ScoreMetadataService } from '../../services/score-metadata.service';
import { BandService } from '../../services/band.service';

import 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss',
                './header.medium.component.scss',
                './header.large.component.scss'],
    providers: [
        MenuService
    ]
})

export class HeaderComponent implements OnInit {
    @Input("searchbox") searchBox: ElementRef;

    public menu: { pathArg: string, title: string }[];
    public searchOpened = false;
    public resultOpened = false;
    public searchField: string;
    public searchResults: any[];
    private searchLimit = 5;

    constructor(
        private menuService: MenuService,
        private router: Router,
        private scoreService: ScoreService,
        private scoreMetadataService: ScoreMetadataService,
        private bandService: BandService
    ) {}

    ngOnInit(): void {
        this.menu = this.menuService.bandsMenu;
    }

    public openSearch(e, el): void {
        this.searchOpened = true;
        el.focus();
    }

    public getBandTitle(band: string): string {
        const words = band.split(" ");
        return words[words.length - 1];
    }

    public searchTerm(): void {
        if (this.searchField) {
            observableForkJoin(
                this.scoreService.searchScoreByName(this.searchField),
                this.bandService.searchBand(this.searchField),
                this.scoreMetadataService.searchInstrument(this.searchField),
                this.scoreMetadataService.searchComposer(this.searchField),
                this.scoreMetadataService.searchTag(this.searchField)
            ).pipe(debounceTime(300),
            distinctUntilChanged(),
            map(results => {
                this.searchResults = results.map((x: any[]) => x.filter((item, index) => index < this.searchLimit));
                this.resultOpened = true;
            }),)
            .subscribe();
        } else {
            this.resultOpened = false;
        }
    }

    public closeAll(): void {
        this.resultOpened = false;
        this.searchOpened = false;
    }

    public allOpen(): boolean {
        return this.searchResults.every(x => x.length > 0);
    }
}

