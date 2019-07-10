import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score.service';

@Component({
    selector: 'admin-scores',
    templateUrl: 'admin-scores.component.html',
    styleUrls: ['admin-scores.component.scss']
})

export class AdminScoresComponent implements OnInit {
    private errors = this.scoreService.getErrors();
    private scores = this.scoreService.getLatestScores(0);

    constructor(private scoreService: ScoreService) { }

    ngOnInit() { }
}
