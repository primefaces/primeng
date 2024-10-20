import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'flexible-items-height-doc',
    template: `
        <app-docsectiontext>
            <p>You can pass a function to <i>itemSize</i> if you have items with variable or flexible height.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-scroller [items]="items" [itemSize]="getItemSize.bind(this)" scrollHeight="200px" styleClass="border-1 surface-border" [style]="{ width: '200px', height: '200px' }">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div (click)="handleItemClick(item)" class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" [ngStyle]="{ height: expandedRows[item] ? '120px' : '50px' }">{{ item }}</div>
                </ng-template>
            </p-scroller>
        </div>
        <app-code [code]="code" selector="scroller-basic-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlexibleItemsHeightDoc {
    items!: string[];
    expandedRows: Record<string, boolean> = {};

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }

    getItemSize(item: string) {
        return this.expandedRows[item] ? { mainAxis: 120 } : { mainAxis: 50 };
    }

    handleItemClick(item: string) {
        if (this.expandedRows[item]) delete this.expandedRows[item];
        else this.expandedRows[item] = true;
    }

    code: Code = {
        basic: `<p-scroller
    [items]="items"
    [itemSize]="getItemSize.bind(this)"
    scrollHeight="200px"
    styleClass="border-1 surface-border"
    [style]="{'width': '200px', 'height': '200px'}">
        <ng-template pTemplate="item" let-item let-options="options">
            <div (click)="handleItemClick(item)" class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" [ngStyle]="{ height: expandedRows[item] ? '120px'  : '50px' }">
                {{ item }}
            </div>
        </ng-template>
</p-scroller>`,

        html: `<div class="card flex justify-content-center">
    <p-scroller
        [items]="items"
        [itemSize]="getItemSize.bind(this)"
        scrollHeight="200px"
        styleClass="border-1 surface-border"
        [style]="{'width': '200px', 'height': '200px'}">
            <ng-template pTemplate="item" let-item let-options="options">
                <div (click)="handleItemClick(item)" class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" [ngStyle]="{ height: expandedRows[item] ? '120px' : '50px' }">
                    {{ item }}
                </div>
            </ng-template>
    </p-scroller>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';

@Component({
    selector: 'scroller-flexible-demo',
    templateUrl: './scroller-basic-demo.html',
    styles: [
        \`:host ::ng-deep {
            .p-scroller-viewport {
                flex: none;
            }
        }\`
    ],
    standalone: true,
    imports: [ScrollerModule]
})
export class ScrollerFlexibleDemo implements OnInit {
    items!: string[];
    expandedRows: Record<string, boolean> = {};

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => \`Item #\${i}\`);
    }

    getItemSize(item: string) {
        return this.expandedRows[item] ? { mainAxis: 120 } : { mainAxis: 50 };
    }

    handleItemClick(item: string) {
        if (this.expandedRows[item]) delete this.expandedRows[item];
        else this.expandedRows[item] = true;
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
