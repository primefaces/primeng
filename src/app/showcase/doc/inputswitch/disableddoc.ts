import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputSwitch [(ngModel)]="checked" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="input-switch-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-inputSwitch [(ngModel)]="checked" [disabled]="true"/>`,

        html: `<div class="card flex justify-content-center">
    <p-inputSwitch [(ngModel)]="checked" [disabled]="true"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-switch-disabled-demo',
    templateUrl: './input-switch-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, InputSwitchModule]
})
export class InputSwitchDisabledDemo {
    checked: boolean = false;
}`
    };
}
