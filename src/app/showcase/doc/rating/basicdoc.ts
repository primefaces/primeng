import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'rating-basic-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Two-way value binding is defined using <i>ngModel</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-rating [(ngModel)]="value"></p-rating>
        </div>
        <app-code [code]="code" selector="rating-basic-demo"></app-code>
    </div>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    value: number;

    code: Code = {
        basic: `
<p-rating [(ngModel)]="value"></p-rating>`,

        html: `
<div class="card flex justify-content-center">
    <p-rating [(ngModel)]="value"></p-rating>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'rating-basic-demo',
    templateUrl: './rating-basic-demo.html',
    styleUrls: ['./rating-basic-demo.scss']
})
export class RatingBasicDemo {
    value: number;
}`
    };
}
