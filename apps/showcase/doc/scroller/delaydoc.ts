import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'delay-doc',
    template: `
        <app-docsectiontext>
            <p>Scroll delay is adjusted by using <i>delay</i> property.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-4">
            <div>
                <span class="font-bold block mb-2">No Delay</span>
                <p-virtualscroller [items]="items" [itemSize]="50" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                    <ng-template pTemplate="item" let-item let-options="options">
                        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                            {{ item }}
                        </div>
                    </ng-template>
                </p-virtualscroller>
            </div>
            <div>
                <span class="font-bold block mb-2">150ms</span>
                <p-virtualscroller [items]="items" [itemSize]="50" [delay]="150" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                    <ng-template pTemplate="item" let-item let-options="options">
                        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                            {{ item }}
                        </div>
                    </ng-template>
                </p-virtualscroller>
            </div>
            <div>
                <span class="font-bold block mb-2">500ms</span>
                <p-virtualscroller [items]="items" [itemSize]="50" [delay]="500" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                    <ng-template pTemplate="item" let-item let-options="options">
                        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                            {{ item }}
                        </div>
                    </ng-template>
                </p-virtualscroller>
            </div>
        </div>
        <app-code [code]="code" selector="scroller-delay-demo"></app-code>
    `
})
export class DelayDoc {
    items!: string[];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }

    code: Code = {
        basic: `<p-virtualscroller
    [items]="items"
    [itemSize]="50"
    styleClass="border border-surface"
    [style]="{'width': '200px', 'height': '200px'}">
        <ng-template pTemplate="item" let-item let-options="options">
            <div
                class="flex items-center p-2"
                [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }"
                style="height: 50px;">
                    {{ item }}
            </div>
        </ng-template>
</p-virtualscroller>

<p-virtualscroller
    [items]="items"
    [itemSize]="50"
    [delay]="150"
    styleClass="border border-surface"
    [style]="{'width': '200px', 'height': '200px'}">
        <ng-template pTemplate="item" let-item let-options="options">
            <div
                class="flex items-center p-2"
                [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }"
                style="height: 50px;">
                    {{ item }}
            </div>
        </ng-template>
</p-virtualscroller>

<p-virtualscroller
    [items]="items"
    [itemSize]="50"
    [delay]="500"
    styleClass="border border-surface"
    [style]="{'width': '200px', 'height': '200px'}">
        <ng-template pTemplate="item" let-item let-options="options">
            <div
                class="flex items-center p-2"
                [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }"
                style="height: 50px;">
                    {{ item }}
            </div>
        </ng-template>
</p-virtualscroller>`,

        html: `<div class="card flex flex-wrap justify-center gap-4">
    <div>
        <span class="font-bold block mb-2">No Delay</span>
        <p-virtualscroller
            [items]="items"
            [itemSize]="50"
            styleClass="border border-surface"
            [style]="{'width': '200px', 'height': '200px'}">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div
                        class="flex items-center p-2"
                        [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }"
                        style="height: 50px;">
                            {{ item }}
                    </div>
                </ng-template>
        </p-virtualscroller>
    </div>
    <div>
        <span class="font-bold block mb-2">150ms</span>
        <p-virtualscroller
            [items]="items"
            [itemSize]="50"
            [delay]="150"
            styleClass="border border-surface"
            [style]="{'width': '200px', 'height': '200px'}">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div
                        class="flex items-center p-2"
                        [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }"
                        style="height: 50px;">
                            {{ item }}
                    </div>
                </ng-template>
        </p-virtualscroller>
    </div>
    <div>
        <span class="font-bold block mb-2">500ms</span>
        <p-virtualscroller
            [items]="items"
            [itemSize]="50"
            [delay]="500"
            styleClass="border border-surface"
            [style]="{'width': '200px', 'height': '200px'}">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div
                        class="flex items-center p-2"
                        [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }"
                        style="height: 50px;">
                            {{ item }}
                    </div>
                </ng-template>
        </p-virtualscroller>
    </div>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';

@Component({
    selector: 'scroller-delay-demo',
    templateUrl: './scroller-delay-demo.html',
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
export class ScrollerDelayDemo implements OnInit {
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
}`
    };
}
