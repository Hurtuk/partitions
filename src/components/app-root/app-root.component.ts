import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ErrorService } from '../../services/error.service';

declare let ga: Function;

@Component({
    selector: 'app-root',
    templateUrl: 'app-root.component.html',
    styleUrls: ['./app-root.component.scss',
                './app-root.medium.component.scss',
                './app-root.large.component.scss']
})

export class AppRootComponent implements OnInit {

    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    public errorMessages: string[] = [];

    constructor(
        private errorService: ErrorService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.errorService.errorHandled$
            .subscribe(errorMessage => this.errorMessages.push(errorMessage));
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
        /*this.router.events.subscribe((ev: any) => {
            if (ev instanceof NavigationStart) {
                if (ev.url !== this.lastPoppedUrl) {
                    this.yScrollStack.push(window.scrollY);
                }
            } else if (ev instanceof NavigationEnd) {
                if (ev.url === this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else {
                    window.scrollTo(0, 0);
                }
            }
        });*/
    }
}
