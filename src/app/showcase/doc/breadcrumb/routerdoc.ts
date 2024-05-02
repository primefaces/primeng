import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'breadcrumb-router-demo',
    template: `
        <app-docsectiontext>
            <p>Items with navigation are defined with templating to be able to use a routerLink directive, an external link or programmatic navigation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-breadcrumb class="max-w-full" [model]="items">
                <ng-template pTemplate="item" let-item>
                    <ng-container *ngIf="item.route; else elseBlock">
                        <a [routerLink]="item.route" class="p-menuitem-link">
                            <span [ngClass]="[item.icon ? item.icon : '', 'text-color']"></span>
                            <span class="text-primary font-semibold">{{ item.label }}</span>
                        </a>
                    </ng-container>
                    <ng-template #elseBlock>
                        <a [href]="item.url">
                            <span class="text-color">{{ item.label }}</span>
                        </a>
                    </ng-template>
                </ng-template>
            </p-breadcrumb>
        </div>
        <app-code [code]="code" selector="breadcrumb-router-demo"></app-code>
    `
})
export class RouterDoc implements OnInit {
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [{ icon: 'pi pi-home', route: '/installation' }, { label: 'Components' }, { label: 'Form' }, { label: 'InputText', route: '/inputtext' }];
    }

    code: Code = {
        basic: `<p-breadcrumb class="max-w-full" [model]="items">
    <ng-template pTemplate="item" let-item>
        <ng-container *ngIf="item.route; else elseBlock">
            <a [routerLink]="item.route" class="p-menuitem-link">
                <span [ngClass]="[item.icon ? item.icon : '', 'text-color']"></span>
                <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
        </ng-container>
        <ng-template #elseBlock>
            <a [href]="item.url">
                <span class="text-color">{{ item.label }}</span>
            </a>
        </ng-template>
    </ng-template>
</p-breadcrumb>`,

        html: `<div class="card flex justify-content-center">
    <p-breadcrumb class="max-w-full" [model]="items">
        <ng-template pTemplate="item" let-item>
            <ng-container *ngIf="item.route; else elseBlock">
                <a [routerLink]="item.route" class="p-menuitem-link">
                    <span [ngClass]="[item.icon ? item.icon : '', 'text-color']"></span>
                    <span class="text-primary font-semibold">{{ item.label }}</span>
                </a>
            </ng-container>
            <ng-template #elseBlock>
                <a [href]="item.url">
                    <span class="text-color">{{ item.label }}</span>
                </a>
            </ng-template>
        </ng-template>
    </p-breadcrumb>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'breadcrumb-router-demo',
    templateUrl: './breadcrumb-router-demo.html',
    standalone: true,
    imports: [BreadcrumbModule, RouterModule]
})
export class BreadcrumbRouterDemo implements OnInit {
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [{ icon: 'pi pi-home', route: '/installation' }, { label: 'Components' }, { label: 'Form' }, { label: 'InputText', route: '/inputtext' }];
    }
}`
    };
}
