import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using <i>ngModel</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-rating [(ngModel)]="value" />
        </div>
        <app-code [code]="code" selector="rating-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value!: number;

    code: Code = {
        basic: `<p-rating [(ngModel)]="value" />`,

        html: `<div class="card flex justify-center">
    <p-rating [(ngModel)]="value" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';

@Component({
    selector: 'rating-basic-demo',
    templateUrl: './rating-basic-demo.html',
    standalone: true,
    imports: [FormsModule, Rating]
})
export class RatingBasicDemo {
    value!: number;
}`
    };
}
