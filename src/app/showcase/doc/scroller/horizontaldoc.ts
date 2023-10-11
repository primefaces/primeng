import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'horizontal-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Setting <i>orientation</i> to <i>horizontal</i> enables scrolling horizontally. In this case, the <i>itemSize</i> should refer to the width of an item.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-scroller [items]="items" [itemSize]="50" scrollHeight="200px" orientation="horizontal" styleClass="border-1 surface-border" [style]="{ width: '200px', height: '200px' }">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div class="flex align-items-center p-2" style="writing-mode: vertical-lr; width: 50px;" [ngClass]="{ 'surface-ground': options.odd }">{{ item }}</div>
                </ng-template>
            </p-scroller>
        </div>
        <app-code [code]="code" selector="scroller-horizontal-demo"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalDoc {
    @Input() id: string;

    @Input() title: string;

    items!: string[];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }

    code: Code = {
        basic: `
<p-scroller [items]="items" [itemSize]="50" scrollHeight="200px" orientation="horizontal" styleClass="border-1 surface-border" [style]="{'width': '200px', 'height': '200px'}">
    <ng-template pTemplate="item" let-item let-options="options">
        <div class="flex align-items-center p-2" style="writing-mode: vertical-lr; width: 50px;" [ngClass]="{ 'surface-ground': options.odd }">{{ item }}</div>
    </ng-template>
</p-scroller>`,

        html: `
<div class="card flex justify-content-center">
    <p-scroller [items]="items" [itemSize]="50" scrollHeight="200px" orientation="horizontal" styleClass="border-1 surface-border" [style]="{'width': '200px', 'height': '200px'}">
        <ng-template pTemplate="item" let-item let-options="options">
            <div class="flex align-items-center p-2" style="writing-mode: vertical-lr; width: 50px;" [ngClass]="{ 'surface-ground': options.odd }">{{ item }}</div>
        </ng-template>
    </p-scroller>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'scroller-horizontal-demo',
    templateUrl: './scroller-horizontal-demo.html',
    styleUrls: ['./scroller-horizontal-demo.scss']
})
export class ScrollerHorizontalDemo implements OnInit {
    items!: string[];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => \`Item #\${i}\`);
    }
}`,
        scss: `
:host ::ng-deep {    
    .p-scroller-viewport {
        flex: none;
    }

    .p-horizontal-scroll {
        .p-scroller-content {
            display: flex;
            flex-direction: row;
        }
    }
}`
    };
}
