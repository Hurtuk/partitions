import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarkComponent } from '../../components/mark/mark.component';

@Component({
    selector: 'admin-scores',
    templateUrl: 'admin-scores.component.html',
    styleUrls: ['admin-scores.component.scss'],
    imports: [RouterLink, MarkComponent, AsyncPipe]
})

export class AdminScoresComponent implements OnInit {
    public errors = this.scoreService.getErrors();
    public scores = this.scoreService.getLatestScores(0);

    constructor(private scoreService: ScoreService
    ) { }

    ngOnInit() {
    }
}
