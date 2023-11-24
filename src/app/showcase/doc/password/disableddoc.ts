import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-password [(ngModel)]="value" [disabled]="true"></p-password>
        </div>
        <app-code [code]="code" selector="password-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    value!: string;

    code: Code = {
        basic: `
<p-password [(ngModel)]="value" [disabled]="true"></p-password>`,

        html: `
<div class="card flex justify-content-center">
    <p-password [(ngModel)]="value" [disabled]="true"></p-password>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'password-disabled-demo',
    templateUrl: './password-disabled-demo.html'
})
export class PasswordDisabledDemo {
    value!: string;
}`
    };
}
