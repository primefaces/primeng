import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-radiobutton styleClass="ng-invalid ng-dirty" [(ngModel)]="checked" />
        </div>
        <app-code [code]="code" selector="radio-button-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    checked: any = false;

    code: Code = {
        basic: `<p-radiobutton class="ng-invalid ng-dirty" />`,

        html: `<div class="card flex justify-center">
    <p-radiobutton class="ng-invalid ng-dirty" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'radio-button-invalid-demo',
    templateUrl: './radio-button-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, RadioButton]
})
export class RadioButtonInvalidDemo { }`
    };
}
