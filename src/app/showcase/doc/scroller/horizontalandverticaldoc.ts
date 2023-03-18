import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'scroller-horizontal-and-vertical-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Horizontal and vertical scroll can be used together to enable double axis scrolling by setting <i>orientation</i> property to <i>both</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-scroller [items]="items" [itemSize]="[50, 100]" orientation="both" styleClass="border-1 surface-border">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground' : options.odd }" style="height: 50px;">
                        <div *ngFor="let el of item" style="width: 100px">{{ el }}</div>
                    </div>
                </ng-template>
            </p-scroller>
        </div>
        <app-code [code]="code" selector="scroller-horizontal-and-vertical-demo"></app-code>
    </div>`
})
export class HorizontalAndVerticalDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: string[][];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => Array.from({ length: 1000 }).map((_j, j) => `Item #${i}_${j}`));
    }

    code: Code = {
        basic: `
<p-scroller [items]="items" [itemSize]="[50, 100]" orientation="both" styleClass="border-1 surface-border">
    <ng-template pTemplate="item" let-item let-options="options">
        <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground' : options.odd }" style="height: 50px;">
            <div *ngFor="let el of item" style="width: 100px">{{ el }}</div>
        </div>
    </ng-template>
</p-scroller>`,

        html: `
<div class="card flex justify-content-center">
    <p-scroller [items]="items" [itemSize]="[50, 100]" orientation="both" styleClass="border-1 surface-border">
        <ng-template pTemplate="item" let-item let-options="options">
            <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground' : options.odd }" style="height: 50px;">
                <div *ngFor="let el of item" style="width: 100px">{{ el }}</div>
            </div>
        </ng-template>
    </p-scroller>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'scroller-horizontal-and-vertical-demo',
    templateUrl: './scroller-horizontal-and-vertical-demo.html',
    styleUrls: ['./scroller-horizontal-and-vertical-demo.scss']
})
export class ScrollerHorizontalAndVerticalDemo implements OnInit {
    items: string[][];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => Array.from({ length: 1000 }).map((_j, j) => \`Item #\${i}_\${j}\`));
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
