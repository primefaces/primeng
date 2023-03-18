import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'scroller-loader-template-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id" [level]="3">
            <p>Loader is customized by using <i>loader</i> template.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-scroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" styleClass="border-1 surface-border">
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
        <app-code [code]="code" selector="scroller-loader-template-demo"></app-code>
    </div>`
})
export class LoaderTemplateDoc {
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
        <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">{{ item }}</div>
    </ng-template>
    <ng-template pTemplate="loader" let-options="options">
        <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">
            <p-skeleton [width]="options.even ? '60%' : '50%'" height="1.3rem"></p-skeleton>
        </div>
    </ng-template>
</p-scroller>`,

        html: `
<div class="card flex justify-content-center">
    <p-scroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" styleClass="border-1 surface-border">
        <ng-template pTemplate="item" let-item let-options="options">
            <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">{{ item }}</div>
        </ng-template>
        <ng-template pTemplate="loader" let-options="options">
            <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">
                <p-skeleton [width]="options.even ? '60%' : '50%'" height="1.3rem"></p-skeleton>
            </div>
        </ng-template>
    </p-scroller>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'scroller-loader-template-demo',
    templateUrl: './scroller-loader-template-demo.html',
    styleUrls: ['./scroller-loader-template-demo.scss']
})
export class ScrollerLoaderTemplateDemo implements OnInit {
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

    p-skeleton {
        width: 100%;
    }
}`
    };
}
