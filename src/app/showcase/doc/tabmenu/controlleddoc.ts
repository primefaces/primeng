import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'controlled-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>For controlled mode, use <i>activeItem</i> property along with <i>activeItemChange</i> event are needed to manage the active item.</p>
        </app-docsectiontext>
        <div class="card">
            <button type="button" pButton pRipple label="Activate Last" (click)="activateLast()" class="mb-3"></button>
            <p-tabMenu [model]="items" [activeItem]="activeItem" (activeItemChange)="onActiveItemChange($event)"></p-tabMenu>
        </div>
        <app-code [code]="code" selector="tab-menu-controlled-demo"></app-code>
    </section>`
})
export class ControlledDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: MenuItem[];

    activeItem: MenuItem;

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

    onActiveItemChange(event) {
        this.activeItem = event;
    }

    activateLast() {
        this.activeItem = this.items[this.items.length - 1];
    }

    code: Code = {
        basic: `
<button type="button" pButton pRipple label="Activate Last" (click)="activateLast()" class="mb-3"></button>
<p-tabMenu [model]="items" [activeItem]="activeItem" (activeItemChange)="onActiveItemChange($event)"></p-tabMenu>`,

        html: `
<div class="card">
    <button type="button" pButton pRipple label="Activate Last" (click)="activateLast()" class="mb-3"></button>
    <p-tabMenu [model]="items" [activeItem]="activeItem" (activeItemChange)="onActiveItemChange($event)"></p-tabMenu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'tab-menu-controlled-demo',
    templateUrl: './tab-menu-controlled-demo.html'
})
export class TabMenuControlledDemo implements OnInit {
    items: MenuItem[];

    activeItem: MenuItem;

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

    onActiveItemChange(event){
        this.activeItem = event;
    }

    activateLast() {
        this.activeItem = this.items[this.items.length - 1];
    }
}`,

        module: `
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TabMenuDemo } from './tabmenudemo';

@NgModule({
    imports: [CommonModule, TabMenuModule, ButtonModule, RippleModule],
    declarations: [TabMenuDemo]
})
export class TabMenuDemoModule {}`
    };
}
