import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'breadcrumb-router-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Menu items support navigation via routerLink, programmatic routing using commands, or external URLs.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-breadcrumb [home]="home" [model]="items" />
        </div>
        <app-code [code]="code" selector="breadcrumb-router-demo"></app-code>
    `
})
export class RouterDoc {
    items: MenuItem[] = [{ label: 'Components' }, { label: 'Form' }, { label: 'InputText', routerLink: '/inputtext' }];

    home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

    code: Code = {
        basic: `<p-breadcrumb [home]="home" [model]="items" />`,

        html: `<div class="card flex justify-center">
    <p-breadcrumb [home]="home" [model]="items" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'breadcrumb-router-demo',
    templateUrl: './breadcrumb-router-demo.html',
    standalone: true,
    imports: [Breadcrumb, RouterModule]
})
export class BreadcrumbRouterDemo {
    items: MenuItem[] = [{ label: 'Components' }, { label: 'Form' }, { label: 'InputText', routerLink: '/inputtext' }];

    home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
}`
    };
}
