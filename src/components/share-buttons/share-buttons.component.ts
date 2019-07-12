import { Component, Input } from '@angular/core';

@Component({
    selector: 'share-buttons',
    templateUrl: 'share-buttons.component.html',
    styleUrls: ['share-buttons.component.scss']
})
export class ShareButtonsComponent {
    @Input() pageUrl: string;
    @Input() imageUrl: string;
    @Input() text: string;

    constructor() { }
}
