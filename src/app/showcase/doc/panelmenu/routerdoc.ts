import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';
import { Router } from '@angular/router';

@Component({
    selector: 'router-doc',
    template: `
        <app-docsectiontext>
            <p>Items with navigation are defined with templating to be able to use a routerLink directive, an external link or programmatic navigation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-panelMenu [model]="items" styleClass="w-full md:w-20rem">
                <ng-template pTemplate="item" let-item>
                    <ng-container *ngIf="item.route; else tests">
                        <a [routerLink]="item.route" class="flex align-items-center cursor-pointer text-color px-3 py-2">
                            <span [class]="item.icon"></span>
                            <span class="ml-2 text-color">{{ item.label }}</span>
                        </a>
                    </ng-container>
                    <ng-template #tests>
                        <a *ngIf="item.url; else noLink" [href]="item.url" class="flex align-items-center cursor-pointer text-color px-3 py-2">
                            <span [class]="item.icon"></span>
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                        <ng-template #noLink>
                            <span class="flex align-items-center cursor-pointer text-color px-3 py-2">
                                <span [class]="item.icon"></span>
                                <span class="ml-2">{{ item.label }}</span>
                                <i *ngIf="item.items" class="pi pi-angle-down text-primary ml-auto"></i>
                            </span>
                        </ng-template>
                    </ng-template>
                </ng-template>
            </p-panelMenu>
        </div>
        <app-code [code]="code" selector="panel-menu-router-demo"></app-code>
    `,
    providers: [MessageService]
})
export class RouterDoc implements OnInit {
    items: MenuItem[];

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Installation',
                        icon: 'pi pi-eraser',
                        route: '/installation'
                    },
                    {
                        label: 'Configuration',
                        icon: 'pi pi-heart',
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
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    }
                ]
            }
        ];
    }

    code: Code = {
        basic: `<p-panelMenu [model]="items" styleClass="w-full md:w-20rem">
    <ng-template pTemplate="item" let-item>
        <ng-container *ngIf="item.route; else tests">
            <a [routerLink]="item.route" class="flex align-items-center 
                cursor-pointer text-color px-3 py-2">
                <span [class]="item.icon"></span>
                <span class="ml-2 text-color">{{ item.label }}</span>
            </a>
        </ng-container>
        <ng-template #tests>
            <a *ngIf="item.url; else noLink" [href]="item.url" class="flex align-items-center 
                cursor-pointer text-color px-3 py-2">
                <span [class]="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
            </a>
            <ng-template #noLink>
                <span class="flex align-items-center cursor-pointer text-color px-3 py-2">
                    <span [class]="item.icon"></span>
                    <span class="ml-2">{{ item.label }}</span>
                    <i *ngIf="item.items" class="pi pi-angle-down text-primary ml-auto"></i>
                </span>
            </ng-template>
        </ng-template>
    </ng-template>
</p-panelMenu>`,

        html: `<div class="card flex justify-content-center">
    <p-panelMenu [model]="items" styleClass="w-full md:w-20rem">
        <ng-template pTemplate="item" let-item>
            <ng-container *ngIf="item.route; else tests">
                <a [routerLink]="item.route" class="flex align-items-center 
                    cursor-pointer text-color px-3 py-2">
                    <span [class]="item.icon"></span>
                    <span class="ml-2 text-color">{{ item.label }}</span>
                </a>
            </ng-container>
            <ng-template #tests>
                <a *ngIf="item.url; else noLink" [href]="item.url" class="flex align-items-center 
                    cursor-pointer text-color px-3 py-2">
                    <span [class]="item.icon"></span>
                    <span class="ml-2">{{ item.label }}</span>
                </a>
                <ng-template #noLink>
                    <span class="flex align-items-center cursor-pointer text-color px-3 py-2">
                        <span [class]="item.icon"></span>
                        <span class="ml-2">{{ item.label }}</span>
                        <i *ngIf="item.items" class="pi pi-angle-down text-primary ml-auto"></i>
                    </span>
                </ng-template>
            </ng-template>
        </ng-template>
    </p-panelMenu>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router } from '@angular/router';

@Component({
    selector: 'panel-menu-router-demo',
    templateUrl: './panel-menu-router-demo.html',
    standalone: true,
    imports: [PanelMenuModule],
    providers: [MessageService]
})
export class PanelMenuRouterDemo implements OnInit {
    items: MenuItem[];

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Installation',
                        icon: 'pi pi-eraser',
                        route: '/installation'
                    },
                    {
                        label: 'Configuration',
                        icon: 'pi pi-heart',
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
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    }
                ]
            }
        ];
    }

}`
    };
}
