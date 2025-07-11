import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'breadcrumb-template-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Custom content can be placed inside the items using the <i>item</i> template. The divider between the items has its own <i>separator</i> template.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-breadcrumb [model]="items" [home]="home">
                <ng-template #item let-item>
                    <a class="cursor-pointer" [routerLink]="item.url">
                        <i [class]="item.icon"></i>
                    </a>
                </ng-template>
                <ng-template #separator> / </ng-template>
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
        basic: `<p-breadcrumb [model]="items" [home]="home">
    <ng-template #item let-item>
        <a class="cursor-pointer" [routerLink]="item.url">
            <i [class]="item.icon"></i>
        </a>
    </ng-template>
    <ng-template #separator> / </ng-template>
</p-breadcrumb>`,

        html: `<div class="card flex justify-center">
    <p-breadcrumb [model]="items" [home]="home">
        <ng-template #item let-item>
            <a class="cursor-pointer" [routerLink]="item.url">
                <i [class]="item.icon"></i>
            </a>
        </ng-template>
        <ng-template #separator> / </ng-template>
    </p-breadcrumb>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'breadcrumb-template-demo',
    templateUrl: './breadcrumb-template-demo.html',
    standalone: true,
    imports: [Breadcrumb, RouterModule]
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
