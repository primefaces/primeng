import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using <i>ngModel</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputSwitch [(ngModel)]="checked"/>
        </div>
        <app-code [code]="code" selector="input-switch-basic-demo"></app-code>
    `
})
export class BasicDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-inputSwitch [(ngModel)]="checked" />`,

        html: `<div class="card flex justify-content-center">
    <p-inputSwitch [(ngModel)]="checked" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-switch-basic-demo',
    templateUrl: './input-switch-basic-demo.html',
    standalone: true,
    imports: [FormsModule, InputSwitchModule]
})
export class InputSwitchBasicDemo {
    checked: boolean = false;
}`
    };
}
