import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'breadcrumb-basic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Breadcrumb provides contextual information about page hierarchy.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-breadcrumb [model]="items" [home]="home"></p-breadcrumb>
        </div>
        <app-code [code]="code" selector="breadcrumb-basic-demo"></app-code>
    </section>`
})
export class BasicDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: MenuItem[];

    home: MenuItem;

    ngOnInit() {
        this.items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

    code: Code = {
        basic: `
<p-breadcrumb [model]="items" [home]="home"></p-breadcrumb>`,

        html: `
<div class="card flex justify-content-center">
    <p-breadcrumb [model]="items" [home]="home"></p-breadcrumb>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'breadcrumb-basic-demo',
    templateUrl: './breadcrumb-basic-demo.html'
})
export class BreadcrumbBasicDemo implements OnInit {
    items: MenuItem[];

    home: MenuItem;

    ngOnInit() {
        this.items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
}`
    };
}
