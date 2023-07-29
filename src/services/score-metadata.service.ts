import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Score } from '../model/score';
import { Part } from '../model/part';

import { UrlBuilderService } from './url-builder.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Response } from 'src/model/response';

@Injectable()
export class ScoreMetadataService {

    private scoresPath = this.urlBuilder.scoresPath;
    private audioName = 'audio.mp3';
    private imageName = 'preview.jpg';
    private midiName = 'score.mid';

    constructor(private http: HttpClient,
                private urlBuilder: UrlBuilderService) { }

    public getAudioUrl(score: Score): string {
        return this.scoresPath + '/' + score.tag + '/' + this.audioName;
    }

    public getPartPdfUrl(score: Score, part: Part): string {
        return this.scoresPath + '/' + score.tag + '/' + part.instrumentTag + (part.instrumentNumber ? part.instrumentNumber : '') + '.pdf';
    }

    public getImageUrl(score: Score): string {
        return this.scoresPath + '/' + score.tag + '/' + this.imageName;
    }

    public getMidiUrl(score: Score): string {
        return this.scoresPath + '/' + score.tag + '/' + this.midiName;
    }

    public getInstruments(): Observable<Part[]> {
        return this.http.get(this.urlBuilder.buildUrl('instruments'))
                        .pipe(map((response: Response) => response.data.map(x => new Part(x.tag, x.name))));
    }

    public searchInstrument(name = ''): Observable<{instrument, nb}[]> {
        return this.http.get(this.urlBuilder.buildUrl('searchInstrument', name))
                        .pipe(map((response: Response) => response.data.map(x => {
                            const i = new Object();
                            i['instrument'] = new Part(x.tag, x.name);
                            i['nb'] = x.nb;
                            return i;
                        })));
    }

    public getTotalDuration(tags: string[]): Observable<number> {
        return this.http.get(this.urlBuilder.buildUrl('getTotalDuration', tags.join(',')))
                            .pipe(map((response: Response) => response.data));
    }

    public getScholarYear(score: Score) {
        const y = score.created.getFullYear();
        if (score.created.getMonth() >= 5 || (score.created.getMonth() === 4 && score.created.getDate() >= 20)) {
            return y + '/' + (y + 1);
        }
        return (y - 1) + '/' + y;
    }

    public searchComposer(name = ''): Observable<{name, nb}[]> {
        return this.http.get(this.urlBuilder.buildUrl('searchComposer', name))
                        .pipe(map((response: Response) => response.data));
    }

    public searchTag(name = ''): Observable<{word, nb}[]> {
        return this.http.get(this.urlBuilder.buildUrl('searchTag', name))
                        .pipe(map((response: Response) => response.data));
    }
}
