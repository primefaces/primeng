import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'checkbox-invalid-demo',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-checkbox [(ngModel)]="checked" [binary]="true" inputId="binary" class="ng-invalid ng-dirty"></p-checkbox>
        </div>
        <app-code [code]="code" selector="checkbox-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-checkbox [(ngModel)]="checked" [binary]="true" inputId="binary" class="ng-invalid ng-dirty"></p-checkbox>`,

        html: `
<div class="card flex justify-content-center">
    <p-checkbox [(ngModel)]="checked" [binary]="true" inputId="binary" class="ng-invalid ng-dirty"></p-checkbox>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-invalid-demo',
    templateUrl: './checkbox-invalid-demo.html'
})
export class CheckboxInvalidDemo {
    checked: boolean = false;
}`
    };
}
