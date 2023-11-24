import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using <i>ngModel</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputSwitch [(ngModel)]="checked"></p-inputSwitch>
        </div>
        <app-code [code]="code" selector="input-switch-basic-demo"></app-code>
   `
})
export class BasicDoc {

    checked: boolean = false;

    code: Code = {
        basic: `
<p-inputSwitch [(ngModel)]="checked"></p-inputSwitch>`,

        html: ` 
<div class="card flex justify-content-center">
    <p-inputSwitch [(ngModel)]="checked"></p-inputSwitch>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-switch-basic-demo',
    templateUrl: './input-switch-basic-demo.html'
})
export class InputSwitchBasicDemo {
    checked: boolean = false;
}`
    };
}
