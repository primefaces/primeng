import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputSwitch [(ngModel)]="checked" class="ng-dirty ng-invalid"/>
        </div>
        <app-code [code]="code" selector="input-switch-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-inputSwitch [(ngModel)]="checked" class="ng-dirty ng-invalid" />`,

        html: `<div class="card flex justify-content-center">
    <p-inputSwitch [(ngModel)]="checked" class="ng-dirty ng-invalid" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-switch-invalid-demo',
    templateUrl: './input-switch-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputSwitchModule]
})
export class InputSwitchInvalidDemo {
    checked: boolean = false;
}`
    };
}
