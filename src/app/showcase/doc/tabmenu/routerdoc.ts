import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';
import { Router } from '@angular/router';

@Component({
    selector: 'router-doc',
    template: `
        <app-docsectiontext>
            <p>Items with navigation are defined with templating to be able to use a router link directive, an external link or programmatic navigation.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabMenu [model]="items">
                <ng-template pTemplate="item" let-item>
                    <ng-container *ngIf="item.route; else elseBlock">
                        <a [routerLink]="item.route" class="p-menuitem-link">
                            <span [class]="item.icon"></span>
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </ng-container>
                    <ng-template #elseBlock>
                        <a [href]="item.url" class="p-menuitem-link">
                            <span [class]="item.icon"></span>
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </ng-template>
                </ng-template>
            </p-tabMenu>
        </div>
        <app-code [code]="code" selector="tab-menu-router-demo"></app-code>
    `
})
export class RouterDoc implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            { label: 'Router Link', icon: 'pi pi-home', route: '/tabmenu' },
            {
                label: 'Programmatic',
                icon: 'pi pi-palette',
                command: () => {
                    this.router.navigate(['/theming']);
                }
            },
            { label: 'External', icon: 'pi pi-link', url: 'https://angular.io/' }
        ];
    }

    code: Code = {
        basic: `<p-tabMenu [model]="items">
    <ng-template pTemplate="item" let-item>
        <ng-container *ngIf="item.route; else elseBlock">
            <a [routerLink]="item.route" class="p-menuitem-link">
                <span [class]="item.icon"></span>
                <span class="ml-2">
                    {{ item.label }}
                </span>
            </a>
        </ng-container>
        <ng-template #elseBlock>
            <a [href]="item.url" class="p-menuitem-link">
                <span [class]="item.icon"></span>
                <span class="ml-2">
                    {{ item.label }}
                </span>
            </a>
        </ng-template>
    </ng-template>
</p-tabMenu>`,

        html: `<div class="card">
    <p-tabMenu [model]="items">
        <ng-template pTemplate="item" let-item>
            <ng-container *ngIf="item.route; else elseBlock">
                <a [routerLink]="item.route" class="p-menuitem-link">
                    <span [class]="item.icon"></span>
                    <span class="ml-2">
                        {{ item.label }}
                    </span>
                </a>
            </ng-container>
            <ng-template #elseBlock>
                <a [href]="item.url" class="p-menuitem-link">
                    <span [class]="item.icon"></span>
                    <span class="ml-2">
                        {{ item.label }}
                    </span>
                </a>
            </ng-template>
        </ng-template>
    </p-tabMenu>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tab-menu-router-demo',
    templateUrl: './tab-menu-router-demo.html',
    standalone: true,
    imports: [TabMenuModule, CommonModule]
})
export class TabMenuRouterDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            { label: 'Router Link', icon: 'pi pi-home', route: '/tabmenu' },
            {
                label: 'Programmatic',
                icon: 'pi pi-palette',
                command: () => {
                    this.router.navigate(['/theming']);
                }
            },
            { label: 'External', icon: 'pi pi-link', url: 'https://angular.io/' }
        ];
    }

}`
    };
}
