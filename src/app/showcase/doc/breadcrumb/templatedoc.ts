import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'breadcrumb-template-demo',
    template: `
        <app-docsectiontext>
            <p>Custom content can be placed inside the items using the <i>item</i> template. The divider between the items has its own <i>separator</i> template.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-breadcrumb class="max-w-full" [model]="items" [home]="home">
                <ng-template pTemplate="item" let-item>
                    <a class="cursor-pointer" [routerLink]="item.url">
                        <i [class]="item.icon"></i>
                    </a>
                </ng-template>
                <ng-template pTemplate="separator"> / </ng-template>
            </p-breadcrumb>
        </div>
        <app-code [code]="code" selector="breadcrumb-template-demo"></app-code>
    `
})
export class TemplateDoc implements OnInit {
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [{ icon: 'pi pi-sitemap' }, { icon: 'pi pi-book' }, { icon: 'pi pi-wallet' }, { icon: 'pi pi-shopping-bag' }, { icon: 'pi pi-calculator' }];

        this.home = { icon: 'pi pi-home' };
    }

    code: Code = {
        basic: `<p-breadcrumb class="max-w-full" [model]="items" [home]="home">
    <ng-template pTemplate="item" let-item>
        <a class="cursor-pointer" [routerLink]="item.url">
            <i [class]="item.icon"></i>
        </a>
    </ng-template>
    <ng-template pTemplate="separator"> / </ng-template>
</p-breadcrumb>`,

        html: `<div class="card flex justify-content-center">
    <p-breadcrumb class="max-w-full" [model]="items" [home]="home">
        <ng-template pTemplate="item" let-item>
            <a class="cursor-pointer" [routerLink]="item.url">
                <i [class]="item.icon"></i>
            </a>
        </ng-template>
        <ng-template pTemplate="separator"> / </ng-template>
    </p-breadcrumb>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'breadcrumb-template-demo',
    templateUrl: './breadcrumb-template-demo.html',
    standalone: true,
    imports: [BreadcrumbModule, RouterModule]
})
export class BreadcrumbTemplateDemo implements OnInit {
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [{ icon: 'pi pi-sitemap' }, { icon: 'pi pi-book' }, { icon: 'pi pi-wallet' }, { icon: 'pi pi-shopping-bag' }, { icon: 'pi pi-calculator' }];

        this.home = { icon: 'pi pi-home' };
    }
}`
    };
}
