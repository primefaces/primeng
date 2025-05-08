import { ChangeDetectionStrategy, Component, Pipe, PipeTransform } from '@angular/core';
import { Code } from '@/domain/code';

@Pipe({ name: 'itemSize', standalone: false })
export class ItemSizePipe implements PipeTransform {
    static getSize(mainIdx: number, crossIdx: number) {
        return { mainAxis: [120, 20, 80, 40][mainIdx % 4], crossAxis: [125, 150, 175, 200][crossIdx % 4] };
    }

    transform(value: string, axis: 'mainAxis' | 'crossAxis' = 'mainAxis'): string {
        const [mainIdx, crossIdx = 0] = value.match(/\d+/g).map(Number);

        return ItemSizePipe.getSize(mainIdx, crossIdx)[axis] + 'px';
    }
}

@Component({
    selector: 'variable-item-sizes-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>You can pass a function to <i>itemSize</i> if your items have varying heights and/or widths.</p>
            <p>
                The <i>itemSize</i> function accepts three arguments: <b>item</b> – the data item, <b>mainAxisIndex</b> – the index along the main axis (row index in vertical orientation, column index in horizontal orientation),
                <b>crossAxisIndex</b> – (optional) the index along the cross axis, used only when <i>orientation</i> is set to <code>"both".</code> It should return an object with one or both of the following properties: <b>mainAxis</b> – the item
                size along the main axis (height for vertical, width for horizontal), <b>crossAxis</b> – (optional) the item size along the cross axis (used only when <i>orientation</i> is <code>"both"</code>).
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <div>
                <span class="font-bold block mb-2">Vertical</span>
                <p-virtualscroller [items]="items" [itemSize]="getItemSize" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                    <ng-template #item let-item let-options="options">
                        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" [style]="{ height: item | itemSize }">
                            {{ item }}
                        </div>
                    </ng-template>
                </p-virtualscroller>
            </div>

            <div>
                <span class="font-bold block mb-2">Horizontal</span>
                <p-virtualscroller [items]="items" [itemSize]="getItemSize" orientation="horizontal" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                    <ng-template #item let-item let-options="options">
                        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" [style]="{ writingMode: 'vertical-lr', width: item | itemSize }">
                            {{ item }}
                        </div>
                    </ng-template>
                </p-virtualscroller>
            </div>

            <div>
                <span class="font-bold block mb-2">Grid</span>
                <p-virtualscroller [items]="itemsGrid" [itemSize]="getItemSize" orientation="both" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                    <ng-template #item let-item let-options="options">
                        <div class="flex" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }">
                            <div *ngFor="let el of item; let elIndex = index" [style]="{ width: el | itemSize: 'crossAxis', height: el | itemSize }" class="p-2 flex items-center">
                                <span>{{ el }}</span>
                            </div>
                        </div>
                    </ng-template>
                </p-virtualscroller>
            </div>
        </div>
        <app-code [code]="code" selector="scroller-flexible-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariableItemSizesDoc {
    items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    itemsGrid = this.items.map((item) => Array.from({ length: 1000 }, (_, idx) => `${item}_${idx}`));

    getItemSize = (_item: string, idxMain: number, idxCross: number) => ItemSizePipe.getSize(idxMain, idxCross);

    code: Code = {
        basic: `<p-virtualscroller [items]="items" [itemSize]="getItemSize" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
    <ng-template #item let-item let-options="options">
        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" [style]="{ height: item | itemSize }">
            {{ item }}
        </div>
    </ng-template>
</p-virtualscroller>

<p-virtualscroller [items]="items" [itemSize]="getItemSize" orientation="horizontal" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
    <ng-template #item let-item let-options="options">
        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" [style]="{ writingMode: 'vertical-lr', width: item | itemSize }">
            {{ item }}
        </div>
    </ng-template>
</p-virtualscroller>

<p-virtualscroller [items]="itemsGrid" [itemSize]="getItemSize" orientation="both" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
    <ng-template #item let-item let-options="options">
        <div class="flex" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }">
            <div *ngFor="let el of item; let elIndex = index" [style]="{ width: el | itemSize: 'crossAxis', height: el | itemSize }" class="p-2 flex items-center">
                <span>{{ el }}</span>
            </div>
        </div>
    </ng-template>
</p-virtualscroller>`,

        html: `<div class="card flex justify-center gap-4">
    <div>
        <span class="font-bold block mb-2">Vertical</span>
        <p-virtualscroller [items]="items" [itemSize]="getItemSize" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
            <ng-template #item let-item let-options="options">
                <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" [style]="{ height: item | itemSize }">
                    {{ item }}
                </div>
            </ng-template>
        </p-virtualscroller>
    </div>

    <div>
        <span class="font-bold block mb-2">Horizontal</span>
        <p-virtualscroller [items]="items" [itemSize]="getItemSize" orientation="horizontal" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
            <ng-template #item let-item let-options="options">
                <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" [style]="{ writingMode: 'vertical-lr', width: item | itemSize }">
                    {{ item }}
                </div>
            </ng-template>
        </p-virtualscroller>
    </div>

    <div>
        <span class="font-bold block mb-2">Grid</span>
        <p-virtualscroller [items]="itemsGrid" [itemSize]="getItemSize" orientation="both" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
            <ng-template #item let-item let-options="options">
                <div class="flex" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }">
                    <div *ngFor="let el of item; let elIndex = index" [style]="{ width: el | itemSize: 'crossAxis', height: el | itemSize }" class="p-2 flex items-center">
                        <span>{{ el }}</span>
                    </div>
                </div>
            </ng-template>
        </p-virtualscroller>
    </div>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';

@Pipe({ name: 'itemSize', standalone: true })
class ItemSizePipe implements PipeTransform {
    getSize(mainIdx: number, crossIdx: number) {
        return { mainAxis: [120, 20, 80, 40][mainIdx % 4], crossAxis: [125, 150, 175, 200][crossIdx % 4] };
    }

    transform(value: string, axis: 'mainAxis' | 'crossAxis' = 'mainAxis'): string {
        const [mainIdx, crossIdx = 0] = value.match(/\d+/g).map(Number);

        return this.getSize(mainIdx, crossIdx)[axis] + 'px';
    }
}

@Component({
    selector: 'scroller-variable-item-size-demo',
    templateUrl: './scroller-variable-item-size-demo.html',
    styles: [
        \`:host ::ng-deep {
            .p-scroller-viewport {
                flex: none;
            }
        }\`
    ],
    standalone: true,
    imports: [ScrollerModule, ItemSizePipe]
})
export class ScrollerVariableItemSizeDemo implements OnInit {
    items = Array.from({ length: 1000 }).map((_, i) => \`Item #\${i}\`);
    itemsGrid = this.items.map((item) => Array.from({ length: 1000 }, (_, idx) => \`\${item}_\${idx}\`));

    getItemSize = (_item: string, idxMain: number, idxCross: number) => this.itemSizePipe.getSize(idxMain, idxCross);

    private itemSizePipe = inject(ItemSizePipe);
}`,
        scss: `
:host ::ng-deep {
    .p-scroller-viewport {
        flex: none;
    }
}`
    };
}
