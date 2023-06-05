import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Header and Footer are the two sections that are capable of displaying custom content by using <i>header</i> and <i>footer</i> templates.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-virtualScroller [value]="items" class="border-1 surface-border border-round" [style]="{ width: '200px' }" scrollHeight="200px" [itemSize]="50">
                <ng-template pTemplate="header">Header Content</ng-template>
                <ng-template pTemplate="item" let-item>
                    <div class="flex align-items-center p-2 h-full" [ngClass]="{ 'surface-hover': item.index % 2 === 0 }">
                        {{ item.label }}
                    </div>
                </ng-template>
                <ng-template pTemplate="footer">Footer Content</ng-template>
            </p-virtualScroller>
        </div>
        <app-code [code]="code" selector="virtual-scroller-template-demo"></app-code>
    </section>`
})
export class TemplateDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items = [];

    ngOnInit(): void {
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item #' + i, index: i });
        }
    }

    code: Code = {
        basic: `
<p-virtualScroller [value]="items" class="border-1 surface-border border-round" [style]="{ width: '200px' }" scrollHeight="200px" [itemSize]="50">
    <ng-template pTemplate="header">Header Content</ng-template>
    <ng-template pTemplate="item" let-item>
        <div class="flex align-items-center p-2 h-full" [ngClass]="{ 'surface-hover': item.index % 2 === 0 }">
            {{ item.label }}
        </div>
    </ng-template>
    <ng-template pTemplate="footer">Footer Content</ng-template>
</p-virtualScroller>`,

        html: `
<div class="card flex justify-content-center">
    <p-virtualScroller [value]="items" class="border-1 surface-border border-round" [style]="{ width: '200px' }" scrollHeight="200px" [itemSize]="50">
        <ng-template pTemplate="header">Header Content</ng-template>
        <ng-template pTemplate="item" let-item>
            <div class="flex align-items-center p-2 h-full" [ngClass]="{ 'surface-hover': item.index % 2 === 0 }">
                {{ item.label }}
            </div>
        </ng-template>
        <ng-template pTemplate="footer">Footer Content</ng-template>
    </p-virtualScroller>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'virtual-scroller-template-demo',
    templateUrl: './virtual-scroller-template-demo.html'
})
export class VirtualScrollerTemplateDemo implements OnInit {
    items = [];

    ngOnInit(): void {
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item #' + i, index: i });
        }
    }
}`
    };
}
