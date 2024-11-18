import { Code } from '@/domain/code';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Scroller } from 'primeng/scroller';

@Component({
    selector: 'programmatic-doc',
    template: `
        <app-docsectiontext>
            <p>Scrolling to a specific index can be done with the <i>scrollToIndex</i> function.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-button label="Reset" (click)="reset()" />
            <p-virtualscroller #sc [items]="items" [itemSize]="50" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template pTemplate="item" let-item let-options="options">
                    <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        </div>
        <app-code [code]="code" selector="scroller-programmatic-demo"></app-code>
    `
})
export class ProgrammaticDoc implements OnInit {
    @ViewChild('sc') sc!: Scroller;

    items: string[] = [];

    ngOnInit(): void {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }

    reset() {
        this.sc.scrollToIndex(0, 'smooth');
    }

    code: Code = {
        basic: `<p-button label="Reset" (click)="reset()" />
<p-virtualscroller
    #sc
    [items]="items"
    [itemSize]="50"
    scrollHeight="200px"
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

        html: `<div class="card flex flex-col items-center gap-4">
    <p-button label="Reset" (click)="reset()" />
    <p-virtualscroller
        #sc
        [items]="items"
        [itemSize]="50"
        scrollHeight="200px"
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
</div>`,

        typescript: `import { Component, OnInit, ViewChild } from '@angular/core';
import { Scroller } from 'primeng/scroller';
import { ScrollerModule } from 'primeng/scroller';

@Component({
    selector: 'scroller-programmatic-demo',
    templateUrl: './scroller-programmatic-demo.html',
    standalone: true,
    imports: [ScrollerModule]
})
export class ScrollerProgrammaticDemo implements OnInit {
    @ViewChild('sc') sc!: Scroller;

    items: string[] = [];

    ngOnInit(): void {
        this.items = Array.from({ length: 1000 }).map((_, i) => \`Item #\${i}\`);
    }

    reset() {
        this.sc.scrollToIndex(0, 'smooth');
    }
}`
    };
}
