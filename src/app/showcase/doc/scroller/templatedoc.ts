import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Scroller content is customizable by using <i>ng-template</i>. Valid values are <i>content</i>, <i>item</i>, <i>loader</i> and <i>loadericon</i></p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-scroller [items]="items" [itemSize]="25 * 7" [showLoader]="true" [delay]="250" styleClass="border-1 surface-border" [style]="{ width: '200px', height: '200px' }">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div class="flex flex-column align-items-strech" [ngClass]="{ 'surface-ground': options.odd }">
                        <div class="flex align-items-center px-2" style="height: 25px">Item: {{ item }}</div>
                        <div class="flex align-items-center px-2" style="height: 25px">Index: {{ options.index }}</div>
                        <div class="flex align-items-center px-2" style="height: 25px">Count: {{ options.count }}</div>
                        <div class="flex align-items-center px-2" style="height: 25px">First: {{ options.first }}</div>
                        <div class="flex align-items-center px-2" style="height: 25px">Last: {{ options.last }}</div>
                        <div class="flex align-items-center px-2" style="height: 25px">Even: {{ options.even }}</div>
                        <div class="flex align-items-center px-2" style="height: 25px">Odd: {{ options.odd }}</div>
                    </div>
                </ng-template>
                <ng-template pTemplate="loader" let-options="options">
                    <div class="flex flex-column align-items-stretch" [ngClass]="{ 'surface-ground': options.odd }">
                        <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
                        <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="50%" height="1.2rem"></p-skeleton></div>
                        <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
                        <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="50%" height="1.2rem"></p-skeleton></div>
                        <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
                        <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="50%" height="1.2rem"></p-skeleton></div>
                        <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
                    </div>
                </ng-template>
            </p-scroller>
        </div>
        <app-code [code]="code" selector="scroller-template-demo"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    items!: string[];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }

    code: Code = {
        basic: `
<p-scroller class="custom-loading" [items]="items" [itemSize]="25 * 7" [showLoader]="true" [delay]="250" styleClass="border-1 surface-border" [style]="{'width': '200px', 'height': '200px'}">
    <ng-template pTemplate="item" let-item let-options="options">
        <div class="flex flex-column align-items-strech" [ngClass]="{'surface-ground': options.odd}">
            <div class="flex align-items-center px-2" style="height: 25px">Item: {{item}}</div>
            <div class="flex align-items-center px-2" style="height: 25px">Index: {{options.index}}</div>
            <div class="flex align-items-center px-2" style="height: 25px">Count: {{options.count}}</div>
            <div class="flex align-items-center px-2" style="height: 25px">First: {{options.first}}</div>
            <div class="flex align-items-center px-2" style="height: 25px">Last: {{options.last}}</div>
            <div class="flex align-items-center px-2" style="height: 25px">Even: {{options.even}}</div>
            <div class="flex align-items-center px-2" style="height: 25px">Odd: {{options.odd}}</div>
        </div>
    </ng-template>
    <ng-template pTemplate="loader" let-options="options">
        <div class="flex flex-column align-items-strech" [ngClass]="{'surface-ground': options.odd}">
            <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
            <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="50%" height="1.2rem"></p-skeleton></div>
            <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
            <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="50%" height="1.2rem"></p-skeleton></div>
            <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
            <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="50%" height="1.2rem"></p-skeleton></div>
            <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
        </div>
    </ng-template>
</p-scroller>`,
        html: `
<div class="card flex justify-content-center">
    <p-scroller class="custom-loading" [items]="items" [itemSize]="25 * 7" [showLoader]="true" [delay]="250" styleClass="border-1 surface-border" [style]="{'width': '200px', 'height': '200px'}">
        <ng-template pTemplate="item" let-item let-options="options">
            <div class="flex flex-column align-items-strech" [ngClass]="{'surface-ground': options.odd}">
                <div class="flex align-items-center px-2" style="height: 25px">Item: {{item}}</div>
                <div class="flex align-items-center px-2" style="height: 25px">Index: {{options.index}}</div>
                <div class="flex align-items-center px-2" style="height: 25px">Count: {{options.count}}</div>
                <div class="flex align-items-center px-2" style="height: 25px">First: {{options.first}}</div>
                <div class="flex align-items-center px-2" style="height: 25px">Last: {{options.last}}</div>
                <div class="flex align-items-center px-2" style="height: 25px">Even: {{options.even}}</div>
                <div class="flex align-items-center px-2" style="height: 25px">Odd: {{options.odd}}</div>
            </div>
        </ng-template>
        <ng-template pTemplate="loader" let-options="options">
            <div class="flex flex-column align-items-strech" [ngClass]="{'surface-ground': options.odd}">
                <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
                <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="50%" height="1.2rem"></p-skeleton></div>
                <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
                <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="50%" height="1.2rem"></p-skeleton></div>
                <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
                <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="50%" height="1.2rem"></p-skeleton></div>
                <div class="flex align-items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
            </div>
        </ng-template>
    </p-scroller>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'scroller-template-demo',
    templateUrl: './scroller-template-demo.html',
    styleUrls: ['./scroller-template-demo.scss']
})
export class ScrollerTemplateDemo implements OnInit {
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
