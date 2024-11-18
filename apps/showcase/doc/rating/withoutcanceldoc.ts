import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'without-cancel-doc',
    template: `
        <app-docsectiontext>
            <p>A cancel icon is displayed to reset the value by default, set <i>cancel</i> as false to remove this option.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-rating [(ngModel)]="value" />
        </div>
        <app-code [code]="code" selector="rating-without-cancel-demo"></app-code>
    `
})
export class WithoutCancelDoc {
    value!: number;

    code: Code = {
        basic: `<p-rating [(ngModel)]="value" [cancel]="false" />`,

        html: `<div class="card flex justify-center">
    <p-rating [(ngModel)]="value" [cancel]="false" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';

@Component({
    selector: 'rating-without-cancel-demo',
    templateUrl: './rating-without-cancel-demo.html',
    standalone: true,
    imports: [FormsModule, Rating]
})
export class RatingWithoutCancelDemo {
    value!: number;
}`
    };
}
