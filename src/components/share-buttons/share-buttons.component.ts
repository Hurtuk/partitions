import { Component, Input } from '@angular/core';
import { ShareButtons } from 'ngx-sharebuttons/buttons';

@Component({
    selector: 'app-share-buttons',
    templateUrl: 'share-buttons.component.html',
    styleUrls: ['share-buttons.component.scss'],
    imports: [ShareButtons]
})
export class SocialShareButtonsComponent {
    @Input() pageUrl: string;
    @Input() imageUrl: string;
    @Input() text: string;

    constructor() { }
}
