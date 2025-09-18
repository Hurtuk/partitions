import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'admin-home',
    templateUrl: 'admin-home.component.html',
    imports: [RouterLink, RouterLinkActive, RouterOutlet]
})

export class AdminHomeComponent {
}
