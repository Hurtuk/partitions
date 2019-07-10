import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { MenuService } from '../../services/menu.service';

@Component({
    selector: 'side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss',
                './side-nav.large.component.scss'],
    providers: [
        MenuService
    ]
})

export class SideNavComponent implements OnInit {

    public menu: { pathArg: string, title: string }[];
    public menuOpen = false;

    constructor(
        private menuService: MenuService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.menu = this.menuService.bandsMenu;
    }

    public closeAll(): void {
        this.menuOpen = false;
    }

    public toggleSideNav(): void {
        this.menuOpen = !this.menuOpen;
    }
}

