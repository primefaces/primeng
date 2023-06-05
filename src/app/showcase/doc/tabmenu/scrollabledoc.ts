import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'scrollable-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Setting <i>scrollable</i> property to <i>true</i> enables scrolling if content overflows.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabMenu [scrollable]="true" [model]="items" [activeItem]="activeItem"></p-tabMenu>
        </div>
        <app-code [code]="code" selector="tab-menu-scrollable-demo"></app-code>
    </section>`
})
export class ScrollableDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: MenuItem[];

    activeItem: MenuItem;

    ngOnInit() {
        this.items = Array.from({ length: 50 }, (_, i) => ({ label: `Tab ${i + 1}` }));
        this.activeItem = this.items[0];
    }

    code: Code = {
        basic: `
<p-tabMenu [scrollable]="true" [model]="items" [activeItem]="activeItem"></p-tabMenu>`,

        html: `
<div class="card">
    <p-tabMenu [scrollable]="true" [model]="items" [activeItem]="activeItem"></p-tabMenu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'tab-menu-scrollable-demo',
    templateUrl: './tab-menu-scrollable-demo.html'
})
export class TabMenuScrollableDemo implements OnInit {
    items: MenuItem[];

    activeItem: MenuItem;

    ngOnInit() {
        this.items = Array.from({ length: 50 }, (_, i) => ({ label: \`Tab \${i + 1}\`}));
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
