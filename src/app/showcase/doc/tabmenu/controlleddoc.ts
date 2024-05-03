import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'controlled-doc',
    template: `
        <app-docsectiontext>
            <p>For controlled mode, use <i>activeItem</i> property along with <i>activeItemChange</i> event are needed to manage the active item.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex mb-2 gap-2 justify-content-end">
                <p-button (click)="activeItem = items[0]" [rounded]="true" label="1" styleClass="w-2rem h-2rem p-0" [outlined]="activeItem !== items[0]" />
                <p-button (click)="activeItem = items[1]" [rounded]="true" label="2" styleClass="w-2rem h-2rem p-0" [outlined]="activeItem !== items[1]" />
                <p-button (click)="activeItem = items[2]" [rounded]="true" label="3" styleClass="w-2rem h-2rem p-0" [outlined]="activeItem !== items[2]" />
            </div>
            <p-tabMenu [model]="items" [activeItem]="activeItem" (activeItemChange)="onActiveItemChange($event)" />
        </div>
        <app-code [code]="code" selector="tab-menu-controlled-demo"></app-code>
    `
})
export class ControlledDoc implements OnInit {
    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Dashboard', icon: 'pi pi-home' },
            { label: 'Transactions', icon: 'pi pi-chart-line' },
            { label: 'Products', icon: 'pi pi-list' }
        ];

        this.activeItem = this.items[0];
    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event;
    }

    code: Code = {
        basic: `<div class="flex mb-2 gap-2 justify-content-end">
    <p-button 
        (click)="activeItem = items[0]" 
        [rounded]="true" 
        label="1" 
        styleClass="w-2rem h-2rem p-0" 
        [outlined]="activeItem !== items[0]" />
    <p-button 
        (click)="activeItem = items[1]" 
        [rounded]="true" 
        label="2" 
        styleClass="w-2rem h-2rem p-0" 
        [outlined]="activeItem !== items[1]" />
    <p-button 
        (click)="activeItem = items[2]" 
        [rounded]="true" 
        label="3" 
        styleClass="w-2rem h-2rem p-0" 
        [outlined]="activeItem !== items[2]" />
</div>
<p-tabMenu 
    [model]="items" 
    [activeItem]="activeItem" 
    (activeItemChange)="onActiveItemChange($event)" />`,

        html: `<div class="card">
    <div class="flex mb-2 gap-2 justify-content-end">
        <p-button 
            (click)="activeItem = items[0]" 
            [rounded]="true" label="1" 
            styleClass="w-2rem h-2rem p-0" 
            [outlined]="activeItem !== items[0]" />
        <p-button 
            (click)="activeItem = items[1]" 
            [rounded]="true" 
            label="2" 
            styleClass="w-2rem h-2rem p-0" 
            [outlined]="activeItem !== items[1]" />
        <p-button 
            (click)="activeItem = items[2]" 
            [rounded]="true" 
            label="3" 
            styleClass="w-2rem h-2rem p-0" 
            [outlined]="activeItem !== items[2]" />
    </div>
    <p-tabMenu 
        [model]="items" 
        [activeItem]="activeItem" 
        (activeItemChange)="onActiveItemChange($event)" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'tab-menu-controlled-demo',
    templateUrl: './tab-menu-controlled-demo.html',
    standalone: true,
    imports: [TabMenuModule, ButtonModule]
})
export class TabMenuControlledDemo implements OnInit {
    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Dashboard', icon: 'pi pi-home' },
            { label: 'Transactions', icon: 'pi pi-chart-line' },
            { label: 'Products', icon: 'pi pi-list' },
        ];

        this.activeItem = this.items[0];
    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event;
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
