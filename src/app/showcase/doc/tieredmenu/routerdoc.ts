import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';
import { Router } from '@angular/router';

@Component({
    selector: 'router-doc',
    template: `
        <app-docsectiontext>
            <p>Items with navigation are defined with templating to be able to use a router link component, an external link or programmatic navigation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tieredMenu [model]="items">
                <ng-template pTemplate="item" let-item let-hasSubmenu="hasSubmenu">
                    <ng-container *ngIf="item.route; else withoutRoute">
                        <a [routerLink]="item.route" [href]="item.href" class="p-menuitem-link">
                            <span class="item.icon"></span>
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </ng-container>
                    <ng-template #withoutRoute>
                        <ng-container *ngIf="item.url; else withoutUrl">
                            <a [href]="item.url" [target]="item.target" class="p-menuitem-link">
                                <span [class]="item.icon"></span>
                                <span class="ml-2">{{ item.label }}</span>
                                <span *ngIf="hasSubmenu" class="pi pi-angle-right ml-auto"></span>
                            </a>
                        </ng-container>
                        <ng-template #withoutUrl>
                            <a class="p-menuitem-link">
                                <span [class]="item.icon"></span>
                                <span class="ml-2">{{ item.label }}</span>
                                <span *ngIf="hasSubmenu" class="pi pi-angle-right ml-auto"></span>
                            </a>
                        </ng-template>
                    </ng-template>
                </ng-template>
            </p-tieredMenu>
        </div>
        <app-code [code]="code" selector="tiered-menu-router-demo"></app-code>
    `
})
export class RouterDoc implements OnInit {
    constructor(private router: Router) {}
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Theming',
                        route: '/theming'
                    },
                    {
                        label: 'Colors',
                        route: '/colors'
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
                        url: 'https://angular.dev/'
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
        basic: `<p-tieredMenu [model]="items">
        <ng-template pTemplate="item" let-item let-hasSubmenu="hasSubmenu">
            <ng-container *ngIf="item.route; else withoutRoute">
                <a [routerLink]="item.route" [href]="item.href" class="p-menuitem-link">
                    <span class="item.icon"></span>
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </ng-container>
            <ng-template #withoutRoute>
                <ng-container *ngIf="item.url; else withoutUrl">
                    <a [href]="item.url" [target]="item.target" class="p-menuitem-link">
                        <span [class]="item.icon"></span>
                        <span class="ml-2">{{ item.label }}</span>
                        <span *ngIf="hasSubmenu" class="pi pi-angle-right ml-auto"></span>
                    </a>
                </ng-container>
                <ng-template #withoutUrl>
                    <a class="p-menuitem-link">
                        <span [class]="item.icon"></span>
                        <span class="ml-2">{{ item.label }}</span>
                        <span *ngIf="hasSubmenu" class="pi pi-angle-right ml-auto"></span>
                    </a>
                </ng-template>
            </ng-template>
        </ng-template>
</p-tieredMenu>`,

        html: `<div class="card flex justify-content-center">
        <p-tieredMenu [model]="items">
        <ng-template pTemplate="item" let-item let-hasSubmenu="hasSubmenu">
            <ng-container *ngIf="item.route; else withoutRoute">
                <a [routerLink]="item.route" [href]="item.href" class="p-menuitem-link">
                    <span class="item.icon"></span>
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </ng-container>
            <ng-template #withoutRoute>
                <ng-container *ngIf="item.url; else withoutUrl">
                    <a [href]="item.url" [target]="item.target" class="p-menuitem-link">
                        <span [class]="item.icon"></span>
                        <span class="ml-2">{{ item.label }}</span>
                        <span *ngIf="hasSubmenu" class="pi pi-angle-right ml-auto"></span>
                    </a>
                </ng-container>
                <ng-template #withoutUrl>
                    <a class="p-menuitem-link">
                        <span [class]="item.icon"></span>
                        <span class="ml-2">{{ item.label }}</span>
                        <span *ngIf="hasSubmenu" class="pi pi-angle-right ml-auto"></span>
                    </a>
                </ng-template>
            </ng-template>
        </ng-template>
    </p-tieredMenu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'tiered-menu-router-demo',
    templateUrl: './tiered-menu-router-demo.html'
})
export class TieredMenuRouterDemo implements OnInit {
    constructor(private router: Router) {}
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Theming',
                        route: '/theming'
                    },
                    {
                        label: 'Colors',
                        route: '/colors'
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
                        url: 'https://angular.dev/'
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
