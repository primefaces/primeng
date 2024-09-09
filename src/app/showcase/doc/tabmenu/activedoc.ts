import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'active-doc',
    template: `
        <app-docsectiontext>
            <p>
                By default item that matches the active route is highlighted, alternatively <i>activeItem</i> property can be used choose
                the initial active item.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-tab-menu [model]="items" [activeItem]="activeItem"></p-tab-menu>
        </div>
        <app-code [code]="code" selector="tab-menu-active-demo"></app-code>
    `,
})
export class ActiveDoc implements OnInit {
    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Home', icon: 'pi pi-fw pi-home' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
            { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
            { label: 'Documentation', icon: 'pi pi-fw pi-file' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog' },
        ];

        this.activeItem = this.items[0];
    }

    code: Code = {
        basic: `<p-tab-menu [model]="items" [activeItem]="activeItem"></p-tab-menu>`,

        html: `
<div class="card">
    <p-tab-menu [model]="items" [activeItem]="activeItem"></p-tab-menu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'tab-menu-active-demo',
    templateUrl: './tab-menu-active-demo.html'
})
export class TabMenuActiveDemo implements OnInit {
    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Home', icon: 'pi pi-fw pi-home' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
            { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
            { label: 'Documentation', icon: 'pi pi-fw pi-file' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog' }
        ];

        this.activeItem = this.items[0];
    }
}`,
    };
}
