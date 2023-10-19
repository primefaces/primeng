import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'badge-position-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>A Badge can be positioned at the top right corner of an element by adding <i>p-overlay-badge</i> style class to the element and embedding the badge inside.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <i class="pi pi-bell mr-4 p-text-secondary" pBadge style="font-size: 2rem" value="2"></i>
            <i class="pi pi-calendar mr-4 p-text-secondary" pBadge style="font-size: 2rem" [value]="'10+'" severity="danger"></i>
            <i class="pi pi-envelope p-text-secondary" pBadge style="font-size: 2rem" severity="danger"></i>
        </div>
        <app-code [code]="code" selector="badge-position-demo"></app-code>
    </section>`
})
export class PositionDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<i class="pi pi-bell mr-4 p-text-secondary" pBadge style="font-size: 2rem" value="2"></i>`,
        html: `
<div class="card flex justify-content-center">
    <i class="pi pi-bell mr-4 p-text-secondary" pBadge style="font-size: 2rem" value="2"></i>
    <i class="pi pi-calendar mr-4 p-text-secondary" pBadge style="font-size: 2rem" [value]="'10+'" severity="danger"></i>
    <i class="pi pi-envelope p-text-secondary" pBadge style="font-size: 2rem" severity="danger"></i>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'badge-position-demo',
    templateUrl: './badge-position-demo.html'
})
export class BadgePositionDemo {}`
    };
}
