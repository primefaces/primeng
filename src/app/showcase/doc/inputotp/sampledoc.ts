import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'sample-doc',
    template: `
        <app-docsectiontext>
            <p>A sample UI implementation with templating and additional elements.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <div class="flex flex-column align-items-center">
                <div class="font-bold text-xl mb-2">Authenticate Your Account</div>
                <p class="text-color-secondary block mb-5">Please enter the code sent to your phone.</p>
                <p-inputOtp [(ngModel)]="value" [length]="6" style="gap: 0">
                    <ng-template pTemplate="input" let-token let-events="events" let-index="index">
                        <input pInputText type="text" [maxLength]="1" (input)="events.input($event)" [attr.value]="token" class="custom-otp-input" />
                        <div *ngIf="index === 3" class="px-3">
                            <i class="pi pi-minus"></i>
                        </div>
                    </ng-template>
                </p-inputOtp>
                <div class="flex justify-content-between mt-5 align-self-stretch">
                    <p-button label="Resend Code" [link]="true" class="p-0"></p-button>
                    <p-button label="Submit Code"></p-button>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="input-otp-sample-demo"></app-code>
    `,
    styles: [
        `
            .custom-otp-input {
                width: 48px;
                height: 48px;
                font-size: 24px;
                appearance: none;
                text-align: center;
                transition: all 0.2s;
                border-radius: 0;
                border: 1px solid var(--surface-400);
                background: transparent;
                outline-offset: -2px;
                outline-color: transparent;
                border-right: 0 none;
                transition: outline-color 0.3s;
                color: var(--text-color);
            }

            .custom-otp-input:focus {
                outline: 2px solid var(--primary-color);
            }

            .custom-otp-input:first-child,
            .custom-otp-input:nth-child(5) {
                border-top-left-radius: 12px;
                border-bottom-left-radius: 12px;
            }

            .custom-otp-input:nth-child(3),
            .custom-otp-input:last-child {
                border-top-right-radius: 12px;
                border-bottom-right-radius: 12px;
                border-right-width: 1px;
                border-right-style: solid;
                border-color: var(--surface-400);
            }
        `
    ]
})
export class SampleDoc {
    value: any;

    code: Code = {
        basic: `<div class="flex flex-column align-items-center">
    <div class="font-bold text-xl mb-2">Authenticate Your Account</div>
    <p class="text-color-secondary block mb-5">Please enter the code sent to your phone.</p>
    <p-inputOtp [(ngModel)]="value" [length]="6" style="gap: 0">
        <ng-template pTemplate="input" let-token let-events="events" let-index="index">
            <input pInputText type="text" [maxLength]="1" (input)="events.input($event)" [attr.value]="token" class="custom-otp-input" />
            <div *ngIf="index === 3" class="px-3">
                <i class="pi pi-minus"></i>
            </div>
        </ng-template>
    </p-inputOtp>
    <div class="flex justify-content-between mt-5 align-self-stretch">
        <p-button label="Resend Code" [link]="true" class="p-0"></p-button>
        <p-button label="Submit Code"></p-button>
    </div>
</div>`,

        html: `<div class="card flex justify-content-center">
<div class="flex flex-column align-items-center">
<div class="font-bold text-xl mb-2">Authenticate Your Account</div>
<p class="text-color-secondary block mb-5">Please enter the code sent to your phone.</p>
<p-inputOtp [(ngModel)]="value" [length]="6" style="gap: 0">
    <ng-template pTemplate="input" let-token let-events="events" let-index="index">
        <input pInputText type="text" [maxLength]="1" (input)="events.input($event)" [attr.value]="token" class="custom-otp-input" />
        <div *ngIf="index === 3" class="px-3">
            <i class="pi pi-minus"></i>
        </div>
    </ng-template>
</p-inputOtp>
<div class="flex justify-content-between mt-5 align-self-stretch">
    <p-button label="Resend Code" [link]="true" class="p-0"></p-button>
    <p-button label="Submit Code"></p-button>
</div>
</div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-otp-sample-demo',
    templateUrl: './input-otp-sample-demo.html',
    styles: [
        \`
        .custom-otp-input {
            width: 48px;
            height: 48px;
            font-size: 24px;
            appearance: none;
            text-align: center;
            transition: all 0.2s;
            border-radius: 0;
            border: 1px solid var(--surface-400);
            background: transparent;
            outline-offset: -2px;
            outline-color: transparent;
            border-right: 0 none;
            transition: outline-color 0.3s;
            color: var(--text-color);
        }

        .custom-otp-input:focus {
            outline: 2px solid var(--primary-color);
        }

        .custom-otp-input:first-child,
        .custom-otp-input:nth-child(5) {
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px;
        }

        .custom-otp-input:nth-child(3),
        .custom-otp-input:last-child {
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
            border-right-width: 1px;
            border-right-style: solid;
            border-color: var(--surface-400);
        }
        \`
    ],
})
export class InputOtpSampleDemo {
    value: any;
}`
    };
}
