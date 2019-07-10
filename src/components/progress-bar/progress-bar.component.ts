import { Component, OnInit } from '@angular/core';

import { AudioPlayerService } from '../../services/audio-player.service';

@Component({
    selector: 'progress-bar',
    templateUrl: 'progress-bar.component.html',
    styleUrls: ['progress-bar.component.scss']
})

export class ProgressBarComponent implements OnInit {

    public currentPercent: number;
    private fullTime: number;
    private currentTimeSubscription: any;
    private fullTimeSubscription: any;

    constructor(private playerService: AudioPlayerService) { }

    ngOnInit(): void {
        this.currentTimeSubscription = this.playerService.currentTime
            .subscribe(data => this.currentPercent = data * 100 / this.fullTime);
        this.fullTimeSubscription = this.playerService.fullTime
            .subscribe(data => this.fullTime = data);
    }
}
