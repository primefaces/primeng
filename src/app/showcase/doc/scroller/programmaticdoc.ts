import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Scroller } from 'primeng/scroller';
import { Code } from '../../domain/code';

@Component({
    selector: 'programmatic-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Scrolling to a specific index can be done with the <i>scrollToIndex</i> function.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center gap-3">
            <p-button label="Reset" (click)="reset()"></p-button>
            <p-scroller #sc [items]="items" [itemSize]="50" scrollHeight="200px" styleClass="border-1 surface-border" [style]="{ width: '200px', height: '200px' }">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">{{ item }}</div>
                </ng-template>
            </p-scroller>
        </div>
        <app-code [code]="code" selector="scroller-programmatic-demo"></app-code>
    </section>`
})
export class ProgrammaticDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('sc') sc: Scroller;

    items = [];

    ngOnInit(): void {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }

    reset() {
        this.sc.scrollToIndex(0, 'smooth');
    }

    code: Code = {
        basic: `
<p-button label="Reset" (click)="reset()"></p-button>
<p-scroller #sc [items]="items" [itemSize]="50" scrollHeight="200px" styleClass="border-1 surface-border" [style]="{'width': '200px', 'height': '200px'}">
    <ng-template pTemplate="item" let-item let-options="options">
        <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">{{ item }}</div>
    </ng-template>
</p-scroller>`,

        html: `
<div class="card flex flex-column align-items-center gap-3">
    <p-button label="Reset" (click)="reset()"></p-button>
    <p-scroller #sc [items]="items" [itemSize]="50" scrollHeight="200px" styleClass="border-1 surface-border" [style]="{'width': '200px', 'height': '200px'}">
        <ng-template pTemplate="item" let-item let-options="options">
            <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground': options.odd }" style="height: 50px;">{{ item }}</div>
        </ng-template>
    </p-scroller>
</div>`,

        typescript: `
import { Component, OnInit, ViewChild } from '@angular/core';
import { Scroller } from 'primeng/scroller';

@Component({
    selector: 'scroller-programmatic-demo',
    templateUrl: './scroller-programmatic-demo.html'
})
export class ScrollerProgrammaticDemo implements OnInit {
    @ViewChild('sc') sc: Scroller;

    items = [];

    ngOnInit(): void {
        this.items = Array.from({ length: 1000 }).map((_, i) => \`Item #\${i}\`);
    }

    reset() {
        this.sc.scrollToIndex(0, 'smooth');
    } 
}`
    };
}
