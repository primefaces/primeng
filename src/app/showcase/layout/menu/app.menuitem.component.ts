import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from './app.menu.component';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
    selector: '[app-menuitem]',
    standalone: true,
    templateUrl: './app.menuitem.component.html',
    imports: [CommonModule, StyleClassModule, RouterModule]
})
export class AppMenuItemComponent {
    @Input() item: MenuItem;

    @Input() root: boolean = true;

    constructor(private router: Router) {}

    isActiveRootMenuItem(menuitem: MenuItem): boolean {
        const url = this.router.url.split('#')[0];
        return menuitem.children && !menuitem.children.some((item) => item.routerLink === `${url}` || (item.children && item.children.some((it) => it.routerLink === `${url}`)));
    }
}
