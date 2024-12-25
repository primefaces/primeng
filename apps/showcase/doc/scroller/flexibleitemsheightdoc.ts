import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Code } from '@/domain/code';

@Component({
    selector: 'flexible-items-height-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>You can pass a function to <i>itemSize</i> if you have items with variable or flexible height and/or width.</p>
            <p>
                <i>itemSize</i> function accepts 3 arguments - item itself, mainAxisIndex of the item (index of the column if you have <i>orientation</i> set to "horizontal", and index of the row in other cases), crossAxisIndex of the item (index of
                the column if you have <i>orientation</i> set to "both") - and returns object with item size across axises - mainAxis (horizontal in case <i>orientation</i> is set to "horizontal" and vertical in other cases), crossAxis (optional,
                present only if <i>orientation</i> is set to "both", in which case it will be horizontal axis item size)
            </p>
            <p>Using the function you are free to set any width/height to the items, or change it if needed. In this example we change it on demand to have expandable rows in our scroller. Click the item to see how it works.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-scroller [items]="items" [itemSize]="getItemSize.bind(this)" scrollHeight="200px" styleClass="border-1 surface-border" [style]="{ width: '200px', height: '200px' }">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div class="flex align-items-center p-2 hover:surface-hover cursor-pointer" [ngClass]="{ 'surface-ground': options.odd }" [style]="{ height: expandedRows.has(item) ? '120px' : '50px' }" (click)="handleItemClick(item)">
                        {{ item }}
                    </div>
                </ng-template>
            </p-scroller>
        </div>
        <app-code [code]="code" selector="scroller-flexible-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlexibleItemsHeightDoc {
    items!: string[];
    expandedRows: Set<string> = new Set();

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }

    getItemSize(item: string) {
        return this.expandedRows.has(item) ? { mainAxis: 120 } : { mainAxis: 50 };
    }

    handleItemClick(item: string) {
        if (this.expandedRows.has(item)) this.expandedRows.delete(item);
        else this.expandedRows.add(item);
    }

    code: Code = {
        basic: `<p-scroller
    [items]="items"
    [itemSize]="getItemSize.bind(this)"
    scrollHeight="200px"
    styleClass="border-1 surface-border"
    [style]="{'width': '200px', 'height': '200px'}">
        <ng-template pTemplate="item" let-item let-options="options">
            <div
                class="flex align-items-center p-2 hover:surface-hover cursor-pointer"
                [ngClass]="{ 'surface-ground': options.odd }"
                [style]="{ height: expandedRows.has(item) ? '120px' : '50px' }"
                (click)="handleItemClick(item)"
            >
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
                <div
                    class="flex align-items-center p-2 hover:surface-hover cursor-pointer"
                    [ngClass]="{ 'surface-ground': options.odd }"
                    [style]="{ height: expandedRows.has(item) ? '120px' : '50px' }"
                    (click)="handleItemClick(item)"
                >
                    {{ item }}
                </div>
            </ng-template>
    </p-scroller>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';

@Component({
    selector: 'scroller-flexible-demo',
    templateUrl: './scroller-flexible-demo.html',
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
    expandedRows: Set<string> = new Set();

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => \`Item #\${i}\`);
    }

    getItemSize(item: string) {
        return this.expandedRows.has(item) ? { mainAxis: 120 } : { mainAxis: 50 };
    }

    handleItemClick(item: string) {
        if (this.expandedRows.has(item)) this.expandedRows.delete(item);
        else this.expandedRows.add(item);
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
