import { Component, OnInit, Input } from '@angular/core';

import { Score } from '../../model/score';

import { DownloadService } from '../../services/download.service';
import { ScoreService } from '../../services/score.service';

import {saveAs as importedSaveAs} from "file-saver";
import { Part } from '../../model/part';

@Component({
    selector: 'app-download-buttons',
    templateUrl: 'download-buttons.component.html',
    styleUrls: ['download-buttons.component.scss']
})

export class DownloadButtonsComponent implements OnInit {
    @Input() score: Score;

    public fullScorePart = ScoreService.fullScorePart;

    public openedPdf = false;

    constructor(
        private downloadService: DownloadService,
        private scoreService: ScoreService
    ) { }

    public openPdf(): void {
        this.openedPdf = !this.openedPdf;
    }

    public downloadPdf(part: Part): void {
        this.downloadService.downloadPdf(this.score, part).subscribe(blob => {
            importedSaveAs(blob, this.downloadService.getPdfSaveName(this.score, part));
        });
    }

    public downloadMp3(): void {
        this.downloadService.downloadMp3(this.score).subscribe(blob => {
            importedSaveAs(blob, this.score.tag + ".mp3");
        });
    }

    public downloadMidi(): void {
        this.downloadService.downloadMidi(this.score).subscribe(blob => {
            importedSaveAs(blob, this.score.tag + ".mid");
        });
    }

    public partName(part: Part): string {
        return this.scoreService.getPartName(part);
    }

    ngOnInit() { }
}
