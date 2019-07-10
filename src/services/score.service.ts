import { Injectable } from '@angular/core';

import { Score } from '../model/score';
import { Part } from '../model/part';
import { Band } from "../model/band";

import { UrlBuilderService } from './url-builder.service';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Response } from '../model/response';
import { map } from 'rxjs/internal/operators/map';


@Injectable()
export class ScoreService {

    public static fullScorePart = new Part('score', 'Conducteur');

    constructor(
        private http: HttpClient,
        private urlBuilder: UrlBuilderService
    ) { }

    public getLatestScores(count = 5): Observable<Score[]> {
        return this.http.get(this.urlBuilder.buildUrl('latestScores', count))
                        .pipe(map((response: Response) => response.data.map(score => this.jsonToScore(score))));
    }

    public getScoreByTag(tag: string): Observable<Score> {
        return this.http.get(this.urlBuilder.buildUrl('scoreByTag', tag))
                        .pipe(map((response: Response) => this.jsonToScore(response.data)));
    }

    public searchScoreByCritera(title: string, bandTag: string, instruments: Part[], composer: string, tags: string[]) {
        return this.http.get(this.urlBuilder.buildUrl('searchScoreByCriteria',
                                                    title, bandTag, instruments.map(x => x.instrumentTag).join(','),
                                                    composer, tags ? tags.join(';') : []))
                        .pipe(map((response: Response) => response.data.map(x => this.jsonToScore(x))));
    }

    public searchScoreByName(name: string): Observable<Score[]> {
        return this.http.get(this.urlBuilder.buildUrl('searchScoreByName', name))
                        .pipe(map((response: Response) => response.data.map(x => this.jsonToScore(x))));
    }

    public getPartName(part: Part): string {
        if (part.instrumentsCount > 1) {
            return part.instrumentName + ' ' + part.instrumentNumber;
        }
        return part.instrumentName;
    }

    public getErrors(): Observable<string[]> {
        return this.http.get(this.urlBuilder.buildUrl('errors', name))
                            .pipe(map((response: Response) => response.data));
    }

    public save(score: Score): Observable<number> {
        const formData = new FormData();
        formData.append('name', score.title);
        formData.append('id', '' + score.id);
        formData.append('source', score.from);
        formData.append('composer', score.by);
        formData.append('creation', score.created.getFullYear() + '-' + (score.created.getMonth() + 1) + '-' + score.created.getDate());
        formData.append('band_id', '' + score.band.id);
        formData.append('band_name', score.band.title);
        formData.append('note', '' + score.note);
        formData.append('commentary', score.comment);
        formData.append('tag', score.tag);
        if (score.id === -1) {
            let k = 0;
            for (const p of score.parts) {
                formData.append('parts[' + k + ']', p.instrumentTag);
                k++;
            }
        }
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        return this.http.post(this.urlBuilder.buildUrl('saveScoreData'), formData, { headers: headers, responseType: 'text' })
                        .pipe(map(response => Number.parseInt(response)));
    }

    public saveFiles(
        scoreTag: string, mp3: File, midi: File, mus: File, image: File, conductor: File, parts: Part[]): Observable<string> {
        const formData = new FormData();
        formData.append('tag', scoreTag);
        if (mp3) { formData.append('mp3', mp3); }
        if (midi) { formData.append('midi', midi); }
        if (mus) { formData.append('mus', mus); }
        if (image) { formData.append('image', image); }
        if (conductor) { formData.append('conductor', conductor); }
        for (const p of parts) {
            if (p.editingFile) {
                formData.append('i_' + p.instrumentTag + (p.instrumentsCount > 1 ? p.instrumentNumber : ''), p.editingFile);
            }
        }
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        return this.http.post(this.urlBuilder.buildUrl('saveScoreFiles'), formData, { headers: headers, responseType: 'text' });
    }

    public printPdf(url: string) {
        this.http.get(url, {
            responseType: 'blob'
        }).subscribe(
            (response) => {
                const blob = new Blob([response], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = blobUrl;
                document.body.appendChild(iframe);
                iframe.contentWindow.print();
            });
    }

    private jsonToScore(json: any): Score {
        const date = json.creation.split('-');

        const score = new Score(
            Number.parseInt(json.id),
            json.name,
            json.source,
            json.composer,
            new Date(date[0], Number.parseInt(date[1]) - 1, date[2]),
            Number.parseInt(json.note) === 5,
            json.commentary,
            json.tag,
            json.tags,
            json.parts ? (json.parts as any[]).map(part => new Part(part.tag, part.instrument)) : null,
            new Band(json.id_band, json.name_band, json.tag_band),
            json.note
        );

        if (json.parts) {
            // Calculate instrument numbers
            const instrumentCounts = new Map<string, number>();
            let value: number;
            for (const part of score.parts) {
                if (!instrumentCounts.get(part.instrumentTag)) {
                    instrumentCounts.set(part.instrumentTag, 1);
                    part.instrumentNumber = 1;
                } else {
                    value = instrumentCounts.get(part.instrumentTag) + 1;
                    instrumentCounts.set(part.instrumentTag, value);
                    part.instrumentNumber = value;
                }
            }
            for (const part of score.parts) {
                value = instrumentCounts.get(part.instrumentTag);
                part.instrumentsCount = value;
                if (value <= 1) {
                    part.instrumentNumber = null;
                }
            }
        }

        return score;
    }
}
