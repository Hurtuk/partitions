import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-share-buttons',
    templateUrl: 'share-buttons.component.html',
    styleUrls: ['share-buttons.component.scss']
})
export class SocialShareButtonsComponent {
    @Input() pageUrl: string;
    @Input() imageUrl: string;
    @Input() text: string;

    constructor() { }
}
