import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'breadcrumb-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Breadcrumb provides contextual information about page hierarchy.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-breadcrumb class="max-w-full" [model]="items" [home]="home" />
        </div>
        <app-code [code]="code" selector="breadcrumb-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [{ label: 'Electronics' }, { label: 'Computer' }, { label: 'Accessories' }, { label: 'Keyboard' }, { label: 'Wireless' }];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

    code: Code = {
        basic: `<p-breadcrumb class="max-w-full" [model]="items" [home]="home" />`,

        html: `<div class="card flex justify-center">
    <p-breadcrumb class="max-w-full" [model]="items" [home]="home" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';

@Component({
    selector: 'breadcrumb-basic-demo',
    templateUrl: './breadcrumb-basic-demo.html',
    standalone: true,
    imports: [Breadcrumb]
})
export class BreadcrumbBasicDemo implements OnInit {
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Electronics' },
            { label: 'Computer' },
            { label: 'Accessories' },
            { label: 'Keyboard' },
            { label: 'Wireless' }
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
}`
    };
}
