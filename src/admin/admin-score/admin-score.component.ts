
import {combineLatest as observableCombineLatest, of as observableOf,  Observable } from 'rxjs';

import {switchMap} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Score } from '../../model/score';
import { BandService } from '../../services/band.service';
import { Band } from '../../model/band';
import { ScoreService } from '../../services/score.service';
import { Part } from '../../model/part';
import { ScoreMetadataService } from '../../services/score-metadata.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'admin-score',
    templateUrl: 'admin-score.component.html',
    styleUrls: ['admin-score.component.scss']
})

export class AdminScoreComponent implements OnInit {
    public toStr = JSON.stringify;

    public bands: Band[];
    public instruments: Part[];

    public score: Score;
    public typedBand: string;
    public mp3: File;
    public midi: File;
    public image: File;
    public conductor: File;
    public mus: File;

    public dataSaved: boolean;
    public filesSaved: boolean;
    public allSaved: boolean;

    constructor(private bandService: BandService,
                private scoreService: ScoreService,
                private scoreMetadataService: ScoreMetadataService,
                private route: ActivatedRoute) { }

    updateDate(e): void {
        this.score.created = new Date(e.target.value);
    }

    updateBand(): void {
        this.score.band = null;
        this.bands.forEach(element => {
            if (element.title === this.typedBand) {
                this.score.band = element;
            }
        });
        if (this.score.band === null) {
            this.score.band = new Band(-1, this.typedBand, 'new-band');
        }
    }

    mp3Change(event) {
        this.mp3 = this.fileChange(event);
    }

    midChange(event) {
        this.midi = this.fileChange(event);
    }

    imageChange(event) {
        this.image = this.fileChange(event);
    }

    musChange(event) {
        this.mus = this.fileChange(event);
    }

    conductorChange(event) {
        this.conductor = this.fileChange(event);
    }

    instrumentChange(event, i) {
        const file = this.score.parts[i].editingFile;
        const ins = JSON.parse(event.target.value);
        this.score.parts[i] = Object.assign({}, ins);
        this.score.parts[i].editingFile = file;
    }

    partChange(event, i) {
        this.score.parts[i].editingFile = this.fileChange(event);
    }

    saveData(callback = (x => x)) {
        return this.scoreService.save(this.score).subscribe(x => {
            callback(x);
            this.dataSaved = true;
        });
    }

    saveFiles(callback = (x => x)) {
        // Set numbers on parts
        const tags = this.score.parts.map(part => part.instrumentTag);
        const counts = [];
        tags.forEach(part => {
            const index = counts.findIndex(p => p.tag === part);
            if (index !== -1) counts[index].count++;
            else counts.push({tag: part, count: 1});
        });
        counts.forEach(count =>
            this.score.parts
                .filter(p => p.instrumentTag === count.tag)
                .forEach((part, index) => {
                    part.instrumentsCount = count.count;
                    part.instrumentNumber = index + 1;
                }));
        // Save
        this.scoreService.saveFiles(
            this.score.tag, this.mp3, this.midi, this.mus, this.image, this.conductor, this.score.parts).subscribe(x => {
            callback(x);
            this.filesSaved = true;
        });
    }

    saveAll() {
        this.saveData(() => this.saveFiles(() => this.allSaved = true));
    }

    addPart() {
        this.score.parts.push(new Part('', ''));
    }

    ngOnInit() {
        const bands = this.bandService.getBands();
        const instruments = this.scoreMetadataService.getInstruments();
        const routeParams: Observable<Score> = this.route.paramMap.pipe(
                            switchMap((params: ParamMap) => {
                                if (params.get('tag')) {
                                    return this.scoreService.getScoreByTag(params.get('tag'));
                                }
                                return observableOf(null);
                            }));
        observableCombineLatest(bands, instruments, routeParams)
            .subscribe(
                (val: [Band[], Part[], Score]) => {
                    this.bands = val[0];
                    this.instruments = val[1];
                    this.score = val[2] ? val[2] : new Score(-1, '', '', '', new Date(), false, '', '', [], [], null, 0);
                    if (this.score.band) {
                        for (const ba of this.bands) {
                            if (ba.id === this.score.band.id) {
                                this.score.band = ba;
                                break;
                            }
                        }
                    }
                }
            );
    }

    private fileChange(event) {
        return event.target.files.length > 0 ? event.target.files[0] : null;
    }
}
