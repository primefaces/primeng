import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` 
        <app-docsectiontext>
            <p>TabMenu requires a collection of menuitems as its model.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabMenu [model]="items"></p-tabMenu>
        </div>
        <app-code [code]="code" selector="tab-menu-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Home', icon: 'pi pi-fw pi-home' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
            { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
            { label: 'Documentation', icon: 'pi pi-fw pi-file' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog' }
        ];
    }

    code: Code = {
        basic: `
<p-tabMenu [model]="items"></p-tabMenu>`,

        html: `
<div class="card">
    <p-tabMenu [model]="items"></p-tabMenu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'tab-menu-basic-demo',
    templateUrl: './tab-menu-basic-demo.html'
})
export class TabMenuBasicDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Home', icon: 'pi pi-fw pi-home' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
            { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
            { label: 'Documentation', icon: 'pi pi-fw pi-file' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog' }
        ];
    }
}`
    };
}
