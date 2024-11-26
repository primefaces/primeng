import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StyleClass } from 'primeng/styleclass';
import { MenuItem } from './app.menu.component';
import { Tag } from 'primeng/tag';

@Component({
    selector: '[app-menuitem]',
    template: `
        <button *ngIf="root && item.children" pButton type="button" class="px-link" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-slidedown" leaveToClass="hidden" leaveActiveClass="animate-slideup">
            <div class="menu-icon">
                <i [ngClass]="item.icon"></i>
            </div>
            <span>{{ item.name }}</span>
            <i class="menu-toggle-icon pi pi-angle-down"></i>
        </button>
        <a *ngIf="item.href" [href]="item.href" target="_blank" rel="noopener noreferrer">
            <div *ngIf="item.icon && root" class="menu-icon">
                <i [ngClass]="item.icon"></i>
            </div>
            <span>{{ item.name }}</span>
            <p-tag *ngIf="item.badge" [value]="item.badge" />
        </a>
        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" routerLinkActive="router-link-active" [routerLinkActiveOptions]="{ paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }">
            <div *ngIf="item.icon && root" class="menu-icon">
                <i [ngClass]="item.icon"></i>
            </div>
            <span>{{ item.name }}</span>
            <p-tag *ngIf="item.badge" [value]="item.badge" />
        </a>
        <span *ngIf="!root && item.children" class="menu-child-category">{{ item.name }}</span>
        <div *ngIf="item.children" class="overflow-y-hidden transition-all duration-[400ms] ease-in-out" [ngClass]="{ hidden: item.children && root && isActiveRootMenuItem(item) }">
            <ol>
                <li *ngFor="let child of item.children" app-menuitem [root]="false" [item]="child"></li>
            </ol>
        </div>
    `,
    standalone: true,
    imports: [CommonModule, StyleClass, RouterModule, Tag]
})
export class AppMenuItemComponent {
    @Input() item: MenuItem;

    @Input({ transform: booleanAttribute }) root: boolean = true;

    constructor(private router: Router) {}

    isActiveRootMenuItem(menuitem: MenuItem): boolean {
        const url = this.router.url.split('#')[0];
        return menuitem.children && !menuitem.children.some((item) => item.routerLink === `${url}` || (item.children && item.children.some((it) => it.routerLink === `${url}`)));
    }
}
