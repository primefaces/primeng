import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Define a template with your own UI elements with bindings to the provided events and attributes to replace the default design.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputOtp [(ngModel)]="value">
                <ng-template pTemplate="input" let-events="events" let-attrs="attrs">
                    <input pInputText class="custom-otp-input" (input)="events.input($event)" type="text" [attr.value]="attrs.value" [maxLength]="1" />
                </ng-template>
            </p-inputOtp>
        </div>
        <app-code [code]="code" selector="input-otp-template-demo"></app-code>,
    `,
    styles: [
        `
            .custom-otp-input {
                width: 45px;
                font-size: 36px;
                border: 0 none;
                appearance: none;
                text-align: center;
                transition: all 0.2s;
                background: transparent;
                border-bottom: 2px solid var(--surface-500);
                border-radius: 0px;
                margin: 0 0.2rem;
            }

            .custom-otp-input:focus {
                outline: 0 none;
                box-shadow: none;
                border-bottom-color: var(--primary-color);
            }
        `
    ]
})
export class TemplateDoc {
    value: any;

    code: Code = {
        basic: `<p-inputSwitch [(ngModel)]="checked"></p-inputSwitch>`,

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
