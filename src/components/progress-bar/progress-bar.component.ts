import { Component, OnInit } from '@angular/core';

import { AudioPlayerService } from '../../services/audio-player.service';

@Component({
    selector: 'app-progress-bar',
    templateUrl: 'progress-bar.component.html',
    styleUrls: ['progress-bar.component.scss']
})

export class ProgressBarComponent implements OnInit {

    public currentPercent: number;
    private fullTime: number;

    constructor(private playerService: AudioPlayerService) { }

    ngOnInit(): void {
        this.playerService.currentTime.subscribe(data => this.currentPercent = data * 100 / this.fullTime);
        this.playerService.fullTime.subscribe(data => this.fullTime = data);
    }
}
