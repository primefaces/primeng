import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'flexible-grid-doc',
    template: `
        <app-docsectiontext>
            <p>You can have flexible cells in grid by passing a function to <i>itemSize</i>. Click on a cell to expand it.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-scroller [items]="items" [itemSize]="getItemSize.bind(this)" orientation="both" styleClass="border-1 surface-border" [style]="{ width: '200px', height: '200px' }">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div class="flex" [ngClass]="{ 'surface-ground': options.odd }">
                        <div
                            *ngFor="let el of item; let elIndex = index"
                            (click)="handleItemClick(el, options.index, options.firstCrossAxisIndex + elIndex)"
                            [style]="{ width: expandedCols.has(options.firstCrossAxisIndex + elIndex + '') ? '220px' : '100px', height: expandedRows.has(options.index + '') ? '120px' : '50px' }"
                            class="p-2 cursor-pointer flex align-items-center hover:surface-hover"
                        >
                            <span>{{ el }}</span>
                        </div>
                    </div>
                </ng-template>
            </p-scroller>
        </div>
        <app-code [code]="code" selector="scroller-flexible-grid-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlexibleGridDoc implements OnInit {
    items!: string[][];
    expandedRows: Map<string, number> = new Map();
    expandedCols: Map<string, number> = new Map();

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => Array.from({ length: 1000 }).map((_j, j) => `Item #${i}_${j}`));
        this.cd.markForCheck();
    }

    getItemSize(_item: string, rowIndex: number, colIndex: number) {
        return { mainAxis: this.expandedRows.has(`${rowIndex}`) ? 120 : 50, crossAxis: this.expandedCols.has(`${colIndex}`) ? 220 : 100 };
    }

    manageItemAxis(item: string, index: number, expandedMap: Map<string, number>) {
        if (expandedMap.has(`${index}`)) {
            const itemExpanded = expandedMap.has(item);
            const expandedItemNum = expandedMap.get(`${index}`) + (itemExpanded ? -1 : 1);
            itemExpanded ? expandedMap.delete(item) : expandedMap.set(item, 0);
            expandedItemNum < 1 ? expandedMap.delete(`${index}`) : expandedMap.set(`${index}`, expandedItemNum);
        } else {
            expandedMap.set(item, 0);
            expandedMap.set(`${index}`, 1);
        }
    }

    handleItemClick(item: string, rowIndex: number, colIndex: number) {
        this.manageItemAxis(item, rowIndex, this.expandedRows);
        this.manageItemAxis(item, colIndex, this.expandedCols);
    }

    code: Code = {
        basic: `<p-scroller
    [items]="items"
    [itemSize]="getItemSize.bind(this)"
    orientation="both"
    styleClass="border-1 surface-border"
    [style]="{'width': '200px', 'height': '200px'}">
        <ng-template pTemplate="item" let-item let-options="options">
            <div class="flex" [ngClass]="{ 'surface-ground': options.odd }">
                <div
                    *ngFor="let el of item; let elIndex = index"
                    (click)="handleItemClick(el, options.index, options.firstCrossAxisIndex + elIndex)"
                    [style]="{ width: expandedCols.has(options.firstCrossAxisIndex + elIndex + '') ? '220px' : '100px', height: expandedRows.has(options.index + '') ? '120px' : '50px' }"
                    class="p-2 cursor-pointer flex align-items-center hover:surface-hover"
                >
                    <span>{{ el }}</span>
                </div>
            </div>
        </ng-template>
</p-scroller>`,

        html: `<div class="card flex justify-content-center">
    <p-scroller
        [items]="items"
        [itemSize]="getItemSize.bind(this)"
        orientation="both"
        styleClass="border-1 surface-border"
        [style]="{'width': '200px', 'height': '200px'}">
            <ng-template pTemplate="item" let-item let-options="options">
                <div class="flex" [ngClass]="{ 'surface-ground': options.odd }">
                    <div
                        *ngFor="let el of item; let elIndex = index"
                        (click)="handleItemClick(el, options.index, options.firstCrossAxisIndex + elIndex)"
                        [style]="{ width: expandedCols.has(options.firstCrossAxisIndex + elIndex + '') ? '220px' : '100px', height: expandedRows.has(options.index + '') ? '120px' : '50px' }"
                        class="p-2 cursor-pointer flex align-items-center hover:surface-hover"
                    >
                        <span>{{ el }}</span>
                    </div>
                </div>
            </ng-template>
    </p-scroller>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';

@Component({
    selector: 'scroller-flexible-grid-demo',
    templateUrl: './scroller-flexible-grid-demo.html',
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
export class ScrollerFlexibleGridDemo implements OnInit {
    items!: string[][];
    expandedRows: Map<string, number> = new Map();
    expandedCols: Map<string, number> = new Map();

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => Array.from({ length: 1000 }).map((_j, j) => \`Item #\${i}_\${j}\`));
        this.cd.markForCheck();
    }

    getItemSize(_item: string, rowIndex: number, colIndex: number) {
        return { mainAxis: this.expandedRows.has(\`\${rowIndex}\`) ? 120 : 50, crossAxis: this.expandedCols.has(\`\${colIndex}\`) ? 220 : 100 };
    }

    manageItemAxis(item: string, index: number, expandedMap: Map<string, number>) {
        if (expandedMap.has(\`\${index}\`)) {
            const itemExpanded = expandedMap.has(item);
            const expandedItemNum = expandedMap.get(\`\${index}\`) + (itemExpanded ? -1 : 1);
            itemExpanded ? expandedMap.delete(item) : expandedMap.set(item, 0);
            expandedItemNum < 1 ? expandedMap.delete(\`\${index}\`) : expandedMap.set(\`\${index}\`, expandedItemNum);
        } else {
            expandedMap.set(item, 0);
            expandedMap.set(\`\${index}\`, 1);
        }
    }

    handleItemClick(item: string, rowIndex: number, colIndex: number) {
        this.manageItemAxis(item, rowIndex, this.expandedRows);
        this.manageItemAxis(item, colIndex, this.expandedCols);
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
