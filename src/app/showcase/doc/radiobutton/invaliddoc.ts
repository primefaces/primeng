import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-radioButton class="ng-invalid ng-dirty" [ngModel]="checked" />
        </div>
        <app-code [code]="code" selector="radio-button-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    checked: any;

    code: Code = {
        basic: `<p-radioButton class="ng-invalid ng-dirty" />`,

        html: `<div class="card flex justify-content-center">
    <p-radioButton class="ng-invalid ng-dirty" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'radio-button-invalid-demo',
    templateUrl: './radio-button-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, RadioButtonModule]
})
export class RadioButtonInvalidDemo { }`
    };
}
