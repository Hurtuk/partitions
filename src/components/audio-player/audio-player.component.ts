import { Component, OnInit, Input, OnDestroy, OnChanges, ViewChild, ElementRef } from '@angular/core';

import { AudioPlayerService } from "../../services/audio-player.service";

@Component({
    selector: 'app-audio-player',
    templateUrl: 'audio-player.component.html',
    styleUrls: ['audio-player.component.scss',
                'audio-player.medium.component.scss']
})

export class AudioPlayerComponent implements OnInit, OnDestroy, OnChanges {
    @Input() public audioFileUrl: string;

    @ViewChild('progressbar', { read: ElementRef, static: true }) progressBar: ElementRef;

    // General variables
    public isPlaying: boolean;
    // Subscription variables
    private currentTimeSubscription: any;
    private fullTimeSubscription: any;

    constructor(private playerService: AudioPlayerService) {
    }

    ngOnInit() {
        this.playerService.isPlaying.subscribe(data => this.isPlaying = data);
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

    public setTime(event: MouseEvent) {
        const time = (event.x - this.progressBar.nativeElement.getBoundingClientRect().left) * this.playerService.fullTime.value / this.progressBar.nativeElement.offsetWidth;
        this.playerService.setTime(time);
    }
}
