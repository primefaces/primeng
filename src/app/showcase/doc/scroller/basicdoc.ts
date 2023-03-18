import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'scroller-basic-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Scroller requires a collection of items as its value, height of an item size, height of the scrollable viewport and a ng-template to display where each item can be accessed using the implicit variable and scroll options can be
                accessed using the options variable. Scroller automatically calculates how many items will be displayed in the view according to <i>itemSize</i> using a specified scroll height. Its scroll height can be adjusted with
                <i>scrollHeight</i> property or height property of CSS.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-scroller [items]="items" [itemSize]="50" scrollHeight="250px" styleClass="border-1 surface-border">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">{{ item }}</div>
                </ng-template>
            </p-scroller>
        </div>
        <app-code [code]="code" selector="scroller-basic-demo"></app-code>
    </div>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    items: string[];

    ngOnInit() {
        this.items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
    }

    code: Code = {
        basic: `
<p-scroller [items]="items" [itemSize]="50" scrollHeight="250px" styleClass="border-1 surface-border">
    <ng-template pTemplate="item" let-item let-options="options">
        <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">{{ item }}</div>
    </ng-template>
</p-scroller>`,

        html: `
<div class="card flex justify-content-center">
    <p-scroller [items]="items" [itemSize]="50" scrollHeight="250px" styleClass="border-1 surface-border">
        <ng-template pTemplate="item" let-item let-options="options">
            <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">{{ item }}</div>
        </ng-template>
    </p-scroller>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'scroller-basic-demo',
    templateUrl: './scroller-basic-demo.html',
    styleUrls: ['./scroller-basic-demo.scss']
})
export class ScrollerBasicDemo implements OnInit {
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
}`
    };
}
