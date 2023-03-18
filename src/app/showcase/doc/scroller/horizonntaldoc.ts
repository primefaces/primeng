import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'scroller-horizontal-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Default orientation of scroller is <i>vertical</i>, horizontal scroll is enabled by setting <i>orientation</i> property to <i>horizontal</i>.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-scroller [items]="items" [itemSize]="50" scrollHeight="250px" orientation="horizontal" styleClass="border-1 surface-border">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div class="flex align-items-center p-2" style="writing-mode: vertical-lr; width: 50px;" [ngClass]="{ 'surface-ground': options.odd }">{{ item }}</div>
                </ng-template>
            </p-scroller>
        </div>
        <app-code [code]="code" selector="scroller-horizontal-demo"></app-code>
    </div>`
})
export class HorizontalDoc {
    @Input() id: string;

    @Input() title: string;

    items: string[];

    ngOnInit() {
        this.items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
    }

    code: Code = {
        basic: `
<p-scroller [items]="items" [itemSize]="50" scrollHeight="250px" orientation="horizontal" styleClass="border-1 surface-border">
    <ng-template pTemplate="item" let-item let-options="options">
        <div class="flex align-items-center p-2" style="writing-mode: vertical-lr; width: 50px;" [ngClass]="{ 'surface-ground': options.odd }">{{ item }}</div>
    </ng-template>
</p-scroller>`,

        html: `
<div class="card flex justify-content-center">
    <p-scroller [items]="items" [itemSize]="50" scrollHeight="250px" orientation="horizontal" styleClass="border-1 surface-border">
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
    items: string[];

    ngOnInit() {
        this.items = Array.from({ length: 100000 }).map((_, i) => \`Item #\${i}\`);
    }
}`,
        scss: `
:host ::ng-deep {
    .p-scroller {
        height: 200px;
        width: 200px;
    }
    
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
