import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'scroller-delay-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Scroll delay is adjusted by using <i>delay</i> property.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-scroller [items]="items" [itemSize]="50" [delay]="150" styleClass="border-1 surface-border">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground' : options.odd }" style="height: 50px;">{{ item }}</div>
                </ng-template>
            </p-scroller>
        </div>
        <app-code [code]="code" selector="scroller-delay-demo"></app-code>
    </div>`
})
export class DelayDoc {
    @Input() id: string;

    @Input() title: string;

    items: string[];

    ngOnInit() {
        this.items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
    }

    code: Code = {
        basic: `
<p-scroller [items]="items" [itemSize]="50" [delay]="150" styleClass="border-1 surface-border">
    <ng-template pTemplate="item" let-item let-options="options">
        <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground' : options.odd }" style="height: 50px;">{{ item }}</div>
    </ng-template>
</p-scroller>`,

        html: `
<div class="card flex justify-content-center">
    <p-scroller [items]="items" [itemSize]="50" [delay]="150" styleClass="border-1 surface-border">
        <ng-template pTemplate="item" let-item let-options="options">
            <div class="flex align-items-center p-2" [ngClass]="{ 'surface-ground' : options.odd }" style="height: 50px;">{{ item }}</div>
        </ng-template>
    </p-scroller>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'scroller-delay-demo',
    templateUrl: './scroller-delay-demo.html',
    styleUrls: ['./scroller-delay-demo.scss']
})
export class ScrollerDelayDemo implements OnInit {
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
