import { Component, ViewEncapsulation } from '@angular/core';

import { ScoreService } from '../../services/score.service';
import { Score } from "../../model/score";
import { ScoreMetadataService } from "../../services/score-metadata.service";
import { NewsService } from '../../services/news.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss',
                'home.medium.component.scss',
                'home.large.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class HomeComponent {

    public latestScores = this.scoreService.getLatestScores(7);
    public latestNews = this.newsService.getLastNews(3);

    constructor(
        private scoreService: ScoreService,
        private scoreMetadataService: ScoreMetadataService,
        private newsService: NewsService
    ) { }

    public getBgImage(score: Score) {
        return this.scoreMetadataService.getImageUrl(score);
    }
}
