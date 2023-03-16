import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'radio-button-invalid-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-radioButton class="ng-invalid ng-dirty" [ngModel]="checked"></p-radioButton>
        </div>
        <app-code [code]="code" selector="radio-button-invalid-demo"></app-code>
    </div>`
})
export class InvalidDoc {
    @Input() id: string;

    @Input() title: string;

    checked: any;

    code: Code = {
        basic: `
<p-radioButton class="ng-invalid ng-dirty"></p-radioButton>`,

        html: `
<div class="card flex justify-content-center">
    <p-radioButton class="ng-invalid ng-dirty"></p-radioButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'radio-button-invalid-demo',
    templateUrl: './radio-button-invalid-demo.html',
    styleUrls: ['./radio-button-invalid-demo.scss']
})
export class RadioButtonInvalidDemo { }`
    };
}
