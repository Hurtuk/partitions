
import {combineLatest as observableCombineLatest } from 'rxjs';

import {map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { BandService } from '../../services/band.service';
import { ScoreMetadataService } from '../../services/score-metadata.service';
import { ScoreService } from '../../services/score.service';
import { MenuService } from '../../services/menu.service';

import { Band } from '../../model/band';
import { Part } from '../../model/part';
import { Score } from '../../model/score';

import { DateFrPipe } from '../../shared/pipes/DateFrPipe.pipe';

@Component({
    selector: 'app-scores',
    templateUrl: 'scores.component.html',
    styleUrls: ['scores.component.scss',
                'scores.medium.component.scss',
                'scores.large.component.scss'],
    providers: [ DateFrPipe, MenuService ]
})

export class ScoresComponent implements OnInit {

    public title: string;
    public bandTag: string;
    public pickedInstruments: Part[];
    public composer: string;
    public pickedTags: string[];

    public bands: Band[];
    public instruments: Part[];
    public composers: any[];

    public pageTitle: string;
    public imageUrl: string;
    public currentBand: Band;

    public results: Score[];

    public searching = false;
    public yeared = false;

    public year: string;

    constructor(private route: ActivatedRoute,
                private bandService: BandService,
                private scoreService: ScoreService,
                private metadataService: ScoreMetadataService,
                private titleService: Title) { }

    public changeBand() {
        this.currentBand = this.bandFromTag(this.bandTag);
        this.calculateTitle();
        this.calculateImageUrl();
        this.search();
    }

    public pickInstrument(event: any, instrJson: string): void {
        const instr = JSON.parse(instrJson);
        this.pickedInstruments.push(instr);
        this.removeInstrument(this.instruments, instr.instrumentTag);
        this.search();
    }

    public unpickInstrument(instr: Part): void {
        this.removeInstrument(this.pickedInstruments, instr.instrumentTag);
        this.addSortedInstrument(this.instruments, instr);
        this.search();
    }

    public search(): void {
        this.scoreService.searchScoreByCritera(this.title, this.bandTag, this.pickedInstruments, this.composer, this.pickedTags)
                        .subscribe(x => this.results = x);
    }

    public getImageUrl(score: Score) {
        return this.metadataService.getImageUrl(score);
    }

    public getScholarYear(score: Score) {
        const current = this.metadataService.getScholarYear(score);
        const display = this.year !== current;
        this.year = current;
        return display;
    }

    ngOnInit() {
        this.route.paramMap
            .subscribe((params: ParamMap) => {
                const bandsObservable = this.bandService.getBands().pipe(map(x => this.bands = x));
                // Page ensemble
                if (params.get('band')) {
                    this.bandTag = params.get('band');
                    this.yeared = ['winds', 'strings'].indexOf(this.bandTag) !== -1;
                    bandsObservable.subscribe(() => this.changeBand());
                // Page recherche
                } else {
                    let instruments: string;
                    this.metadataService.getInstruments().subscribe(x => this.instruments = x);
                    const composersObservable = this.metadataService.searchComposer().pipe(map(x => this.composers = x));
                    const paramsObservable = this.route.params.pipe(map(params => {
                        this.title = params['title'];
                        this.bandTag = params['band'];
                        this.composer = params['composer'];
                        instruments = params['instrument'];
                        this.pickedTags = params['tag'] ? params['tag'].split(',') : [];
                    }));
                    observableCombineLatest(bandsObservable, paramsObservable, composersObservable)
                        .subscribe(() => {
                            this.results = [];
                            this.pickedInstruments = [];
                            if (instruments) {
                                instruments.split(',').forEach(x => {
                                    for (const i of this.instruments) {
                                        if (i.instrumentTag === x) {
                                            this.pickInstrument(null, JSON.stringify(i));
                                            break;
                                        }
                                    }
                                });
                            }
                            this.searching = true;
                            this.changeBand();
                        }
                    );
                }
            });
    }

    private calculateImageUrl(): void {
        this.imageUrl = this.bandService.getBandImage(this.bandTag);
    }

    private calculateTitle(): void {
        this.pageTitle = this.currentBand ? this.currentBand.title : 'Rechercher';
        this.titleService.setTitle(this.pageTitle + " - L'Ouïe Cinéphile");
    }

    private bandFromTag(tag: string): Band {
        for (const b in this.bands) {
            if (this.bands[b].tag === tag) {
                return this.bands[b];
            }
        }
        return null;
    }

    private removeInstrument(list: Part[], instrTag: string): void {
        for (const l of list) {
            if (l.instrumentTag === instrTag) {
                list.splice(list.indexOf(l), 1);
                break;
            }
        }
    }

    private addSortedInstrument(list: Part[], instrument: Part): void {
        list.splice(this.locationOf(instrument, list, this.instrCompare) + 1, 0, instrument);
    }

    private locationOf(element, array, comparer, start = 0, end = 0) {
        if (array.length === 0) {
            return -1;
        }

        start = start || 0;
        end = end || array.length;
        const pivot = (start + end) >> 1;

        const c = comparer(element, array[pivot]);
        if (end - start <= 1) {
            return c === -1 ? pivot - 1 : pivot;
        }

        switch (c) {
            case -1: return this.locationOf(element, array, comparer, start, pivot);
            case 0: return pivot;
            case 1: return this.locationOf(element, array, comparer, pivot, end);
        }
    }

    private instrCompare = function (a, b) {
        if (a.instrumentName < b.instrumentName) {
            return -1;
        }
        if (a.instrumentName > b.instrumentName) {
            return 1;
        }
        return 0;
    };
}
