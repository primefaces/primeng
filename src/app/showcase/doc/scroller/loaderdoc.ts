import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'loader-doc',
    template: `
        <app-docsectiontext>
            <p>Busy state is enabled by adding <i>showLoader</i> property which blocks the UI with a modal by default. Alternatively, <i>loader</i> template can be used to customize items e.g. with <a href="/skeleton" class="">Skeleton</a>.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-content-center gap-3">
            <div>
                <p-scroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" styleClass="border-1 surface-border" [style]="{ width: '200px', height: '200px' }">
                    <ng-template pTemplate="item" let-item let-options="options">
                        <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">{{ item }}</div>
                    </ng-template>
                </p-scroller>
            </div>
            <div>
                <p-scroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" styleClass="border-1 surface-border" [style]="{ width: '200px', height: '200px' }">
                    <ng-template pTemplate="item" let-item let-options="options">
                        <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">{{ item }}</div>
                    </ng-template>
                    <ng-template pTemplate="loader" let-options="options">
                        <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">
                            <p-skeleton [width]="options.even ? '60%' : '50%'" height="1.3rem"></p-skeleton>
                        </div>
                    </ng-template>
                </p-scroller>
            </div>
        </div>
        <app-code [code]="code" selector="scroller-loader-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderDoc {
    items!: string[];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }

    code: Code = {
        basic: `<p-scroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" styleClass="border-1 surface-border" [style]="{'width': '200px', 'height': '200px'}">
    <ng-template pTemplate="item" let-item let-options="options">
        <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground' : options.odd }" style="height: 50px;">{{ item }}</div>
    </ng-template>
</p-scroller>`,

        html: `
<div class="card flex justify-content-center">
    <p-scroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" styleClass="border-1 surface-border" [style]="{'width': '200px', 'height': '200px'}">
        <ng-template pTemplate="item" let-item let-options="options">
            <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground' : options.odd }" style="height: 50px;">{{ item }}</div>
        </ng-template>
    </p-scroller>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'scroller-loader-demo',
    templateUrl: './scroller-loader-demo.html',
    styleUrls: ['./scroller-loader-demo.scss']
})
export class ScrollerLoaderDemo implements OnInit {
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

    p-skeleton {
        width: 100%;
    }
}`
    };
}
