
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import { OnInit } from "@angular/core/core";

import { Subject } from "rxjs";

import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

export class AudioPlayerService implements OnInit {

    private audio: HTMLAudioElement;
    public audioUrl: Subject<string> = new Subject<string>();
    public currentTime: Subject<number> = new Subject<number>();
    public fullTime: Subject<number> = new Subject<number>();
    public isPlaying: Subject<boolean> = new Subject<boolean>();
    private lastTime: number;

    constructor() {
        this.audio = new Audio();
    }

    public static formatTime(time: number): string {
        return Math.floor(time / 60) + ':' + this.zeros(Math.floor(time % 60));
    }

    private static zeros(nb: number) {
        if (nb < 10) {
            return '0' + nb;
        }
        return nb;
    }

    ngOnInit(): void {
        this.currentTime.pipe(
            debounceTime(1000),
            distinctUntilChanged(),);
    }

    public setPlayer(audioUrl: string) {
        this.audioUrl.next(audioUrl);
        this.currentTime.next(0);
        this.audio.src = audioUrl;
        this.audio.oncanplaythrough = () => {
            this.fullTime.next(this.audio.duration);
        };
        this.audio.onended = () => {
            this.stop();
        };
        this.audio.ontimeupdate = () => {
            const time = Math.floor(this.audio.currentTime * 100);
            if (time !== this.lastTime) {
                this.lastTime = time;
                this.currentTime.next(time / 100);
            }
        };
    }

    public play(): void {
        this.audio.play();
        this.isPlaying.next(true);
    }

    public stop(): void {
        this.pause();
        this.audio.currentTime = 0;
        this.isPlaying.next(false);
    }

    public pause(): void {
        this.audio.pause();
        this.isPlaying.next(false);
    }

    public toggleAudio(): void {
        if (this.audio.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

}
