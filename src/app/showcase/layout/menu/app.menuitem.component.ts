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
        return menuitem.children && !menuitem.children.some((item) => item.routerLink === `${this.router.url}` || (item.children && item.children.some((it) => it.routerLink === `${this.router.url}`)));
    }
}
