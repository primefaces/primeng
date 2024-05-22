import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'tab-menu-template-demo',
    template: `
        <app-docsectiontext>
            <p>TabMenu supports templating via the <i>item</i> template which gets the menuitem instance and the index.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabMenu [model]="items" [activeItem]="activeItem">
                <ng-template pTemplate="item" let-item>
                    <a pRipple class="flex align-items-center gap-2 p-menuitem-link">
                        <img [alt]="item.name" [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + item.image" style="width: 32px" />
                        <span class="font-bold">{{ item.name }}</span>
                    </a>
                </ng-template>
            </p-tabMenu>
        </div>
        <app-code [code]="code" selector="tab-menu-template-demo"></app-code>
    `
})
export class TemplateDoc implements OnInit {
    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    ngOnInit() {
        (this.items = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' }
        ]),
            (this.activeItem = this.items[0]);
    }

    code: Code = {
        basic: `<p-tabMenu [model]="items" [activeItem]="activeItem">
    <ng-template pTemplate="item" let-item>
        <a pRipple class="flex align-items-center gap-2 p-menuitem-link">
            <img 
                [alt]="item.name" 
                [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + item.image" 
                style="width: 32px" />
            <span class="font-bold">
                {{ item.name }}
            </span>
        </a>
    </ng-template>
</p-tabMenu>`,

        html: `<div class="card">
    <p-tabMenu [model]="items" [activeItem]="activeItem">
        <ng-template pTemplate="item" let-item>
            <a pRipple class="flex align-items-center gap-2 p-menuitem-link">
                <img 
                    [alt]="item.name" 
                    [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + item.image" 
                    style="width: 32px" />
                <span class="font-bold">
                    {{ item.name }}
                </span>
            </a>
        </ng-template>
    </p-tabMenu>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'tab-menu-template-demo',
    templateUrl: './tab-menu-template-demo.html',
    standalone: true,
    imports: [TabMenuModule, RippleModule]
})
export class TabMenuTemplateDemo implements OnInit {
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

        module: `
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabMenuDemo } from './tabmenudemo';

@NgModule({
    imports: [CommonModule, TabMenuModule],
    declarations: [TabMenuDemo]
})
export class TabMenuDemoModule {}`
    };
}
