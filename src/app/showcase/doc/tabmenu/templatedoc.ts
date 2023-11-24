import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'tab-menu-template-demo',
    template: `
        <app-docsectiontext>
            <p>TabMenu supports templating via the <i>item</i> template which gets the menuitem instance and the index.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabMenu [model]="items" [activeItem]="activeItem">
                <ng-template pTemplate="item" let-item>
                    <a class="p-menuitem-link flex justify-content-between align-items-center p-3">
                        <div>
                            <span [class]="item.icon"></span>
                            <span> {{ item.label }}</span>
                        </div>
                        <div>
                            <span *ngIf="item.shortcut" [class]="item.shortcutClass">{{ item.shortcut }}</span>
                            <p-badge *ngIf="item.badge" [value]="item.badge" [severity]="item.badgeSeverity"></p-badge>
                        </div>
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
        this.items = [
            { label: 'Home', icon: 'pi pi-fw pi-home' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
            { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
            { label: 'Documentation', icon: 'pi pi-fw pi-file' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog' }
        ];

        this.activeItem = this.items[0];
    }

    code: Code = {
        basic: `
<p-tabMenu [model]="items" [activeItem]="activeItem">
    <ng-template pTemplate="item" let-item>
        <a class="p-menuitem-link flex justify-content-between align-items-center p-3">
            <div>
                <span [class]="item.icon"></span>
                <span> {{ item.label }}</span>
            </div>
            <div>
                <span *ngIf="item.shortcut" [class]="item.shortcutClass">{{ item.shortcut }}</span>
                <p-badge *ngIf="item.badge" [value]="item.badge" [severity]="item.badgeSeverity"></p-badge>
            </div>
        </a>
    </ng-template>
</p-tabMenu>`,

        html: `
<div class="card">
    <p-tabMenu [model]="items" [activeItem]="activeItem">
        <ng-template pTemplate="item" let-item>
            <a class="p-menuitem-link flex justify-content-between align-items-center p-3">
                <div>
                    <span [class]="item.icon"></span>
                    <span> {{ item.label }}</span>
                </div>
                <div>
                    <span *ngIf="item.shortcut" [class]="item.shortcutClass">{{ item.shortcut }}</span>
                    <p-badge *ngIf="item.badge" [value]="item.badge" [severity]="item.badgeSeverity"></p-badge>
                </div>
            </a>
        </ng-template>
    </p-tabMenu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'tab-menu-template-demo',
    templateUrl: './tab-menu-template-demo.html'
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
