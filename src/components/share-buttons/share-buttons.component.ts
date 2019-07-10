import { Component, OnInit, Input } from '@angular/core';
//import { CeiboShare } from 'ng2-social-share';

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
