import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Score } from '../model/score';
import { Part } from '../model/part';

import { ScoreMetadataService } from './score-metadata.service';
import { ScoreService } from './score.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DownloadService {

    constructor(
        private http: HttpClient,
        private scoreService: ScoreService,
        private scoreMetadataService: ScoreMetadataService,
    ) { }

    public getPdfSaveName(score: Score, part: Part) {
        return score.tag + "_" + this.scoreService.getPartName(part) + ".pdf";
    }

    public downloadPdf(score: Score, part: Part): Observable<Blob> {
        return this.downloadFile(this.scoreMetadataService.getPartPdfUrl(score, part));
    }

    public downloadMp3(score: Score): Observable<Blob> {
        return this.downloadFile(this.scoreMetadataService.getAudioUrl(score));
    }

    public downloadMidi(score: Score): Observable<Blob> {
        return this.downloadFile(this.scoreMetadataService.getMidiUrl(score));
    }

    private downloadFile(url: string): Observable<Blob> {
        return this.http.get(url, { responseType: 'blob' })
            //.map(res => res.blob());
    }
}
