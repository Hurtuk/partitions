import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

import { Part } from '../../model/part';
import { ScoreService } from '../../services/score.service';

@Component({
    selector: 'instrument-icons',
    templateUrl: './instrument-icons.component.html',
    styleUrls: ['./instrument-icons.component.scss']
})

export class InstrumentIconsComponent {
    @Input() public parts: Part[];
    @Input() public clickable = false;
    @Input() public deletable = false;
    @Input('full-score') public fullScore = false;
    @Output() public onInstrumentClicked: EventEmitter<any> = new EventEmitter();

    public clickedPart: Part;
    public fullScorePart = ScoreService.fullScorePart;

    constructor(private scoreService: ScoreService)  {}

    public getImageUrl(part: Part): string {
        return './assets/images/instruments/' + part.instrumentTag + '.png';
    }

    public instrumentClicked(part: Part): void {
        this.clickedPart = part;
        this.onInstrumentClicked.emit(part);
    }

    public getInstrumentTitle(part: Part): string {
        return part.instrumentName + (part.instrumentsCount > 1 ? ' ' + part.instrumentNumber : '');
    }
}
