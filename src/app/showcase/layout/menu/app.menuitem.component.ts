import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './app.menu.component';

@Component({
    selector: '[app-menuitem]',
    templateUrl: './app.menuitem.component.html'
})
export class AppMenuItemComponent {
    @Input() item: MenuItem;

    @Input() root: boolean = true;

    constructor(private router: Router) {}

    isActiveRootMenuItem(menuitem: MenuItem): boolean {
        const url = this.router.url.split('#')[0];
        const rootMenuItemRoute = menuitem.routerLink || '';
        return url.includes(rootMenuItemRoute);
    }
}
