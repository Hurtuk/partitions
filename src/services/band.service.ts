
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Band } from '../model/band';

import { UrlBuilderService } from './url-builder.service';

import { Observable } from 'rxjs';
import { Response } from '../model/response';


@Injectable()
export class BandService {

    constructor(
        private http: HttpClient,
        private urlBuilder: UrlBuilderService,
    ) { }

    public getBands(): Observable<Band[]> {
        return this.http.get(this.urlBuilder.buildUrl('bands')).pipe(
                        map((response: Response) => response.data.map(band => this.jsonToBand(band))));
    }

    public getBandImage(bandTag: string): string {
        if (bandTag) {
            return './assets/images/bands/' + bandTag + '.jpg';
        }
        return './assets/images/bands/default.jpg';
    }

    public searchBand(name: string): Observable<{tag, name, nb}[]> {
        return this.http.get(this.urlBuilder.buildUrl('searchBand', name)).pipe(
                        map((response: Response) => response.data));
    }

    private jsonToBand(json: any): Band {
        return new Band(json.id, json.name, json.tag);
    }
}
