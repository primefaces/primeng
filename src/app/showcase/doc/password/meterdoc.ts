import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'meter-doc',
    template: ` 
        <app-docsectiontext>
            <p>Strength meter is displayed as a popup while a value is being entered.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-password [(ngModel)]="value"></p-password>
        </div>
        <app-code [code]="code" selector="password-meter-demo"></app-code>
    `
})
export class MeterDoc {

    value!: string;

    code: Code = {
        basic: `
<p-password [(ngModel)]="value"></p-password>`,

        html: `
<div class="card flex justify-content-center">
    <p-password [(ngModel)]="value"></p-password>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'password-meter-demo',
    templateUrl: './password-meter-demo.html'
})
export class PasswordMeterDemo {
    value!: string;
}`
    };
}
