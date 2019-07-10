
import {switchMap} from 'rxjs/operators';
import { Component, OnInit, Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeStyle, Title } from "@angular/platform-browser";import { DOCUMENT } from "@angular/common";



import { PdfViewerComponent, PDFDocumentProxy } from "ng2-pdf-viewer";

import { ScoreService } from '../../services/score.service';
import { ScoreMetadataService } from '../../services/score-metadata.service';
import { AudioPlayerService } from '../../services/audio-player.service';
import { DownloadService } from '../../services/download.service';
import { BrowserService } from '../../services/browser.service';

import { Score } from '../../model/score';
import { Part } from "../../model/part";

import {saveAs as importedSaveAs} from "file-saver";

@Component({
    selector: 'score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.scss',
                './score.medium.component.scss',
                './score.large.component.scss']
})

export class ScoreComponent implements OnInit {

    @ViewChild("scorecontent", {static: true}) public scoreContent: ElementRef;
    @ViewChild("pdfViewer", { read: ElementRef, static: true }) public pdfViewer: ElementRef;

    public isIE = this.browserService.isIE();

    public score: Score;
    public audioUrl = '';
    public selectedPart: Part;
    public partUrl: string;
    public partUrlPdfViewer: string;
    public similiHeight: SafeStyle;
    public loading = false;
    public imageUrl: string;
    public audioLength: string;
    public fixed: boolean;
    private sidebarPosition: number;

    public currentUrl: string;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private route: ActivatedRoute,
        private scoreService: ScoreService,
        private scoreMetadataService: ScoreMetadataService,
        private audioPlayerService: AudioPlayerService,
        private sanitizer: DomSanitizer,
        private downloadService: DownloadService,
        private browserService: BrowserService,
        private titleService: Title) { }

    public displayScore(part: Part): void {
        if (part !== this.selectedPart) {
            this.loading = true;
            this.similiHeight = this.pdfViewer.nativeElement.offsetHeight;
            this.selectedPart = part;
            this.partUrl = this.scoreMetadataService.getPartPdfUrl(this.score, part);
            this.partUrlPdfViewer = /*'../' + */this.partUrl;
            this.sidebarPosition = this.scoreContent.nativeElement.offsetTop;
        }
    }

    public print() {
        this.scoreService.printPdf(this.partUrl);
    }

    public download() {
        this.downloadService.downloadPdf(this.score, this.selectedPart).subscribe(blob => {
            importedSaveAs(blob, this.downloadService.getPdfSaveName(this.score, this.selectedPart));
        });
    }

    public similHeight(pdf: PDFDocumentProxy): void {
        this.loading = false;
        this.similiHeight = this.sanitizer.bypassSecurityTrustStyle(
            "calc((" + this.pdfViewer.nativeElement.offsetWidth + " - 20px) * (29.7 / 21) * " + pdf.numPages + ")"
        );
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        const currentScroll = this.document.documentElement.scrollTop;
        if (!this.sidebarPosition) {
            this.sidebarPosition = this.scoreContent.nativeElement.offsetTop;
        }
        this.fixed = currentScroll && currentScroll > this.sidebarPosition;
    }

    @HostListener('window:resize', [])
    onResize() {
        this.sidebarPosition = this.scoreContent.nativeElement.offsetTop;
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.currentUrl = "http://louiecinephile.fr/partitions/score.php?score=" + params.get('tag');
                return this.scoreService.getScoreByTag(params.get('tag'));
            }))
            .subscribe((score: Score) => {
                this.score = score;
                this.audioUrl = this.scoreMetadataService.getAudioUrl(this.score);
                this.imageUrl = this.scoreMetadataService.getImageUrl(this.score);
                this.titleService.setTitle(this.score.title + " pour " + this.score.band.title.toLowerCase() + " - L'Ouïe Cinéphile");
            });
        this.audioPlayerService.fullTime.subscribe(t => {
            this.audioLength = AudioPlayerService.formatTime(t);
        });
    }
}
