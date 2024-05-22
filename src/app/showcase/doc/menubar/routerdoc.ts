import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';
import { Router } from '@angular/router';

@Component({
    selector: 'router-doc',
    template: `
        <app-docsectiontext>
            <p>Items with navigation are defined with templating to be able to use a routerLink directive, an external link or programmatic navigation.</p>
        </app-docsectiontext>
        <div class="card">
            <p-menubar [model]="items">
                <ng-template pTemplate="item" let-item>
                    <ng-container *ngIf="item.route; else urlRef">
                        <a [routerLink]="item.route" class="p-menuitem-link">
                            <span [class]="item.icon"></span>
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </ng-container>
                    <ng-template #urlRef>
                        <a *ngIf="item.url; else noLink" [href]="item.url" class="p-menuitem-link">
                            <span [class]="item.icon"></span>
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </ng-template>
                    <ng-template #noLink>
                        <div class="p-menuitem-link">
                            <span [class]="item.icon"></span>
                            <span class="ml-2">{{ item.label }}</span>
                            <span class="pi pi-fw pi-angle-down ml-2"></span>
                        </div>
                    </ng-template>
                </ng-template>
            </p-menubar>
        </div>
        <app-code [code]="code" selector="menubar-router-demo"></app-code>
    `
})
export class RouterDoc implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Installation',
                        route: '/installation'
                    },
                    {
                        label: 'Configuration',
                        route: '/configuration'
                    }
                ]
            },
            {
                label: 'Programmatic',
                icon: 'pi pi-link',
                command: () => {
                    this.router.navigate(['/installation']);
                }
            },
            {
                label: 'External',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Angular',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        url: 'https://vitejs.dev/'
                    }
                ]
            }
        ];
    }

    code: Code = {
        basic: `<p-menubar [model]="items">
    <ng-template pTemplate="item" let-item>
        <ng-container *ngIf="item.route; else urlRef">
            <a [routerLink]="item.route" class="p-menuitem-link">
                <span [class]="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
            </a>
        </ng-container>
        <ng-template #urlRef>
            <a *ngIf="item.url; else noLink" [href]="item.url" class="p-menuitem-link">
                <span [class]="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
            </a>
        </ng-template>
        <ng-template #noLink>
            <div class="p-menuitem-link">
                <span [class]="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
                <span class="pi pi-fw pi-angle-down ml-2"></span>
            </div>
        </ng-template>
    </ng-template>
</p-menubar>`,

        html: `<div class="card">
    <p-menubar [model]="items">
        <ng-template pTemplate="item" let-item>
            <ng-container *ngIf="item.route; else urlRef">
                <a [routerLink]="item.route" class="p-menuitem-link">
                    <span [class]="item.icon"></span>
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </ng-container>
            <ng-template #urlRef>
                <a *ngIf="item.url; else noLink" [href]="item.url" class="p-menuitem-link">
                    <span [class]="item.icon"></span>
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </ng-template>
            <ng-template #noLink>
                <div class="p-menuitem-link">
                    <span [class]="item.icon"></span>
                    <span class="ml-2">{{ item.label }}</span>
                    <span class="pi pi-fw pi-angle-down ml-2"></span>
                </div>
            </ng-template>
        </ng-template>
    </p-menubar>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'menubar-router-demo',
    templateUrl: './menubar-router-demo.html',
    standalone: true,
    imports: [MenubarModule, CommonModule],
})
export class MenubarRouterDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Installation',
                        route: '/installation'
                    },
                    {
                        label: 'Configuration',
                        route: '/configuration'
                    }
                ]
            },
            {
                label: 'Programmatic',
                icon: 'pi pi-link',
                command: () => {
                    this.router.navigate(['/installation']);
                }
            },
            {
                label: 'External',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Angular',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        url: 'https://vitejs.dev/'
                    }
                ]
            }
        ];
    }
}`
    };
}
