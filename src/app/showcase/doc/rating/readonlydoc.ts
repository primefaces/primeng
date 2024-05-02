import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'readonly-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>readOnly</i> present, value cannot be edited.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-rating [(ngModel)]="value" [readonly]="true" [cancel]="false" />
        </div>
        <app-code [code]="code" selector="rating-readonly-demo"></app-code>
    `
})
export class ReadOnlyDoc {
    value: number = 5;

    code: Code = {
        basic: `<p-rating [(ngModel)]="value" [readonly]="true" [cancel]="false" />`,

        html: `<div class="card flex justify-content-center">
    <p-rating [(ngModel)]="value" [readonly]="true" [cancel]="false" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
    selector: 'rating-readonly-demo',
    templateUrl: './rating-readonly-demo.html',
    standalone: true,
    imports: [FormsModule, RatingModule]
})
export class RatingReadonlyDemo {
    value: number = 5;
}`
    };
}
