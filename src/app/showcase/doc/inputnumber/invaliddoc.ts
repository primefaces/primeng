import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputnumber-invalid-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputNumber inputId="integeronly" class="ng-invalid ng-dirty" [(ngModel)]="value1"> </p-inputNumber>
        </div>
        <app-code [code]="code" selector="inputnumber-invalid-demo"></app-code>
    </div>`
})
export class InvalidDoc {
    @Input() id: string;

    @Input() title: string;

    value1: number;

    code: Code = {
        basic: `
<p-inputNumber inputId="integeronly" class="ng-invalid ng-dirty" [(ngModel)]="value1"> </p-inputNumber>`,

        html: `
<div class="card flex justify-content-center">
    <p-inputNumber inputId="integeronly" class="ng-invalid ng-dirty" [(ngModel)]="value1"> </p-inputNumber>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputnumber-invalid-demo',
    templateUrl: './inputnumber-invalid-demo.html',
    styleUrls: ['./inputnumber-invalid-demo.scss']
})
export class InputnumberInvalidDemo {
    value1: number;
}`
    };
}
