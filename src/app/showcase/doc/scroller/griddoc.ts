import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'grid-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Scrolling can be enabled vertically and horizontally when <i>orientation</i> is set as <i>both</i>. In this mode, <i>itemSize</i> should be an array where first value is the height of an item and second is the width.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-scroller [items]="items" [itemSize]="[50, 100]" orientation="both" styleClass="border-1 surface-border" [style]="{ width: '200px', height: '200px' }">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">
                        <div *ngFor="let el of item" style="width: 100px">{{ el }}</div>
                    </div>
                </ng-template>
            </p-scroller>
        </div>
        <app-code [code]="code" selector="scroller-grid-demo"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items!: string[][];

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => Array.from({ length: 1000 }).map((_j, j) => `Item #${i}_${j}`));
        this.cd.markForCheck();
    }

    code: Code = {
        basic: `
<p-scroller [items]="items" [itemSize]="[50, 100]" orientation="both" styleClass="border-1 surface-border" [style]="{'width': '200px', 'height': '200px'}">
    <ng-template pTemplate="item" let-item let-options="options">
        <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground' : options.odd }" style="height: 50px;">
            <div *ngFor="let el of item" style="width: 100px">{{ el }}</div>
        </div>
    </ng-template>
</p-scroller>`,

        html: `
<div class="card flex justify-content-center">
    <p-scroller [items]="items" [itemSize]="[50, 100]" orientation="both" styleClass="border-1 surface-border" [style]="{'width': '200px', 'height': '200px'}">
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
    selector: 'scroller-grid-demo',
    templateUrl: './scroller-grid-demo.html',
    styleUrls: ['./scroller-grid-demo.scss']
})
export class ScrollerGridDemo implements OnInit {
    items!: string[][];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => Array.from({ length: 1000 }).map((_j, j) => \`Item #\${i}_\${j}\`));
    }
}`,
        scss: `
:host ::ng-deep {
    .p-scroller-viewport {
        flex: none;
    }
}`
    };
}
