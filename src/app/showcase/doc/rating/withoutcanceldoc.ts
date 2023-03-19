import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'rating-withoutcancel-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>A cancel icon is displayed to reset the value by default, set <i>cancel</i> as false to remove this option.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-rating [(ngModel)]="value" [cancel]="false"></p-rating>
        </div>
        <app-code [code]="code" selector="rating-withoutcancel-demo"></app-code>
    </section>`
})
export class WithoutCancelDoc {
    @Input() id: string;

    @Input() title: string;

    value: number;

    code: Code = {
        basic: `
<p-rating [(ngModel)]="value" [cancel]="false"></p-rating>`,

        html: `
<div class="card flex justify-content-center">
    <p-rating [(ngModel)]="value" [cancel]="false"></p-rating>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'rating-withoutcancel-demo',
    templateUrl: './rating-withoutcancel-demo.html',
    styleUrls: ['./rating-withoutcancel-demo.scss']
})
export class RatingWithoutcancelDemo {
    value: number;
}`
    };
}
