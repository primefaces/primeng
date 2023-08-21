import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'number-of-stars-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Number of stars to display is defined with <i>stars</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-rating [(ngModel)]="value" [stars]="10"></p-rating>
        </div>
        <app-code [code]="code" selector="rating-number-of-stars-demo"></app-code>
    </section>`
})
export class NumberOfStarsDoc {
    @Input() id: string;

    @Input() title: string;

    value!: number;

    code: Code = {
        basic: `
<p-rating [(ngModel)]="value" [stars]="10"></p-rating>`,

        html: `
<div class="card flex justify-content-center">
    <p-rating [(ngModel)]="value" [stars]="10"></p-rating>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'rating-number-of-stars-demo',
    templateUrl: './rating-number-of-stars-demo.html'
})
export class RatingNumberOfStarsDemo {
    value!: number;
}`
    };
}
