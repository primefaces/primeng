import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'readonly-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>readOnly</i> present, value cannot be edited.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-rating [(ngModel)]="value" [readonly]="true" />
        </div>
        <app-code [code]="code" selector="rating-readonly-demo"></app-code>
    `
})
export class ReadOnlyDoc {
    value: number = 3;

    code: Code = {
        basic: `<p-rating [(ngModel)]="value" [readonly]="true" />`,

        html: `<div class="card flex justify-center">
    <p-rating [(ngModel)]="value" [readonly]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';

@Component({
    selector: 'rating-readonly-demo',
    templateUrl: './rating-readonly-demo.html',
    standalone: true,
    imports: [FormsModule, Rating]
})
export class RatingReadonlyDemo {
    value: number = 3;
}`
    };
}
