import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'without-cancel-doc',
    template: `
        <app-docsectiontext>
            <p>A cancel icon is displayed to reset the value by default, set <i>cancel</i> as false to remove this option.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-rating [(ngModel)]="value" [cancel]="false"></p-rating>
        </div>
        <app-code [code]="code" selector="rating-without-cancel-demo"></app-code>
    `
})
export class WithoutCancelDoc {
    value!: number;

    code: Code = {
        basic: `<p-rating [(ngModel)]="value" [cancel]="false"></p-rating>`,

        html: `
<div class="card flex justify-content-center">
    <p-rating [(ngModel)]="value" [cancel]="false"></p-rating>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'rating-without-cancel-demo',
    templateUrl: './rating-without-cancel-demo.html'
})
export class RatingWithoutCancelDemo {
    value!: number;
}`
    };
}
