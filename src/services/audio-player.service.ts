
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import { OnInit } from "@angular/core";

import { Subject, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AudioPlayerService implements OnInit {

    private audio: HTMLAudioElement;
    public audioUrl = new Subject<string>();
    public currentTime = new Subject<number>();
    public fullTime = new BehaviorSubject<number>(0);
    public isPlaying = new Subject<boolean>();
    public playbackRate = new BehaviorSubject<number>(1);
    private lastTime: number;

    constructor() {
        this.audio = new Audio();
    }

    public static formatTime(time: number, full = false): string {
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        if (full) {
            return (s < 30 ? m : m + 1) + ' minutes';
        }
        return m + ':' + this.zeros(s);
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
        this.setPlaybackRate(1);
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

    public setPlaybackRate(playbackRate: number): void {
        this.audio.playbackRate = playbackRate;
        this.playbackRate.next(playbackRate);
    }

    public setTime(time: number): void {
        this.audio.currentTime = time;
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
