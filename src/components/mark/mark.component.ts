import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-star-mark',
    templateUrl: 'mark.component.html',
    styleUrls: ['mark.component.scss']
})

export class MarkComponent implements OnInit {
    @Input() mark: number;

    private MAX_MARK = 5;

    public marks: boolean[];

    constructor() { }

    ngOnInit(): void {
        this.marks = Array(5);
        let k: number;
        for (k = 0; k < this.mark; k++) {
            this.marks[k] = true;
        }
        for (k; k < this.MAX_MARK; k++) {
            this.marks[k] = false;
        }
    }
}
