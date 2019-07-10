import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';

import { AudioPlayerService } from "../../services/audio-player.service";

@Component({
    selector: 'audio-player',
    templateUrl: 'audio-player.component.html',
    styleUrls: ['audio-player.component.scss',
                'audio-player.medium.component.scss']
})

export class AudioPlayerComponent implements OnInit, OnDestroy, OnChanges {
    @Input() public audioFileUrl: string;

    // General variables
    private isPlaying: boolean;
    // Subscription variables
    private currentTimeSubscription: any;
    private fullTimeSubscription: any;
    private isPlayingSubscription: any;

    constructor(private playerService: AudioPlayerService) {
    }

    ngOnInit() {
        this.isPlayingSubscription = this.playerService.isPlaying
            .subscribe(data => this.isPlaying = data);
        this.playerService.stop();
    }

    ngOnChanges() {
        this.playerService.setPlayer(this.audioFileUrl);
    }

    stop() {
        this.playerService.stop();
    }

    toggleAudio() {
        this.playerService.toggleAudio();
    }

    ngOnDestroy() {
        this.playerService.stop();
        if (this.currentTimeSubscription) {
            this.currentTimeSubscription.unsubscribe();
        }
        if (this.fullTimeSubscription) {
            this.fullTimeSubscription.unsubscribe();
        }
    }
}
