import { Injectable } from '@angular/core';

import { News } from '../model/news';

import { UrlBuilderService } from './url-builder.service';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Response } from '../model/response';


@Injectable()
export class NewsService {

    constructor(
        private http: HttpClient,
        private urlBuilder: UrlBuilderService,
    ) { }

    public getLastNews(count: number): Observable<News[]> {
        return this.http.get(this.urlBuilder.buildUrl('latestNews', count))
                        .pipe(map((response: Response) => response.data.map(news => this.jsonToNews(news))));
    }

    private jsonToNews(json: any): News {
        return new News(json.id, json.title, json.content, json.newsDate);
    }
}
