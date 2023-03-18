import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'scroller-loader-basic-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id" [level]="3">
            <p>Scroller has a special loader. It can be activated with the <i>showLoader</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-scroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" styleClass="border-1 surface-border">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground' : options.odd }" style="height: 50px;">{{ item }}</div>
                </ng-template>
            </p-scroller>
        </div>
        <app-code [code]="code" selector="scroller-loader-basic-demo"></app-code>
    </div>`
})
export class LoaderBasicDoc {
    @Input() id: string;

    @Input() title: string;

    items: string[];

    ngOnInit() {
        this.items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
    }

    code: Code = {
        basic: `
<p-scroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" styleClass="border-1 surface-border">
    <ng-template pTemplate="item" let-item let-options="options">
        <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground' : options.odd }" style="height: 50px;">{{ item }}</div>
    </ng-template>
</p-scroller>`,

        html: `
<div class="card flex justify-content-center">
    <p-scroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" styleClass="border-1 surface-border">
        <ng-template pTemplate="item" let-item let-options="options">
            <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground' : options.odd }" style="height: 50px;">{{ item }}</div>
        </ng-template>
    </p-scroller>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'scroller-loader-basic-demo',
    templateUrl: './scroller-loader-basic-demo.html',
    styleUrls: ['./scroller-loader-basic-demo.scss']
})
export class ScrollerLoaderBasicDemo implements OnInit {
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
