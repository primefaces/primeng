import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'rating-numberofstars-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Number of stars to display is defined with <i>stars</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-rating [(ngModel)]="value" [stars]="10"></p-rating>
        </div>
        <app-code [code]="code" selector="rating-numberofstars-demo"></app-code>
    </section>`
})
export class NumberOfStarsDoc {
    @Input() id: string;

    @Input() title: string;

    value: number;

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
    selector: 'rating-numberofstars-demo',
    templateUrl: './rating-numberofstars-demo.html',
    styleUrls: ['./rating-numberofstars-demo.scss']
})
export class RatingNumberofstarsDemo {
    value: number;
}`
    };
}
