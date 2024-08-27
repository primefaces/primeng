import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>
                Define a template with your own UI elements with bindings to the provided events and attributes to
                replace the default design.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputOtp [(ngModel)]="value">
                <ng-template pTemplate="input" let-token let-events="events">
                    <input
                        pInputText
                        class="custom-otp-input"
                        (keydown)="events.keydown($event)"
                        (input)="events.input($event)"
                        type="text"
                        [attr.value]="token"
                        [maxLength]="1"
                    />
                </ng-template>
            </p-inputOtp>
        </div>
        <app-code [code]="code" selector="input-otp-template-demo"></app-code>,
    `,
    styles: [
        `
            .custom-otp-input {
                width: 40px;
                font-size: 36px;
                border: 0 none;
                appearance: none;
                text-align: center;
                transition: all 0.2s;
                background: transparent;
                border-bottom: 2px solid var(--p-inputtext-border-color);
                border-radius: 0px;
            }

            .custom-otp-input:focus {
                outline: 0 none;
                border-bottom-color: var(--p-primary-color);
            }
        `,
    ],
})
export class TemplateDoc {
    value: any;

    code: Code = {
        basic: `<p-inputOtp [(ngModel)]="value">
    <ng-template pTemplate="input" let-token let-events="events">
        <input 
            pInputText 
            class="custom-otp-input" 
            (input)="events.input($event)" 
            (keydown)="events.keydown($event)" 
            type="text" 
            [attr.value]="token" 
            [maxLength]="1" />
    </ng-template>
</p-inputOtp>`,

        html: `<div class="card flex justify-center">
    <p-inputOtp [(ngModel)]="value">
        <ng-template pTemplate="input" let-token let-events="events">
            <input 
                pInputText
                class="custom-otp-input" 
                (input)="events.input($event)" 
                (keydown)="events.keydown($event)" 
                type="text" 
                [attr.value]="token" 
                [maxLength]="1" />
        </ng-template>
    </p-inputOtp>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-otp-template-demo',
    templateUrl: './input-otp-template-demo.html',
    standalone: true,
    imports: [FormsModule, InputOtpModule],
    styles: [
        \`
        .custom-otp-input {
                width: 40px;
                font-size: 36px;
                border: 0 none;
                appearance: none;
                text-align: center;
                transition: all 0.2s;
                background: transparent;
                border-bottom: 2px solid var(--p-inputtext-border-color);
                border-radius: 0px;
            }

        .custom-otp-input:focus {
                outline: 0 none;
                border-bottom-color: var(--p-primary-color);
        }
        \`
    ],
})

export class InputOtpTemplateDemo {
    value: any;
}`,
    };
}
