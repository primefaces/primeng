import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'floatlabel-doc',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <span class="p-float-label">
                <p-password [(ngModel)]="value" [feedback]="false"></p-password>
                <label for="password">Password</label>
            </span>
        </div>
        <app-code [code]="code" selector="password-floatlabel-demo"></app-code>
    `
})
export class FloatLabelDoc {
    value!: string;

    code: Code = {
        basic: `<span class="p-float-label">
    <p-password [(ngModel)]="value" [feedback]="false"></p-password>
    <label for="password">Password</label>
</span>`,

        html: `
<div class="card flex justify-content-center">
    <span class="p-float-label">
        <p-password [(ngModel)]="value" [feedback]="false"></p-password>
        <label for="password">Password</label>
    </span>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'password-floatlabel-demo',
    templateUrl: './password-floatlabel-demo.html'
})
export class PasswordFloatlabelDemo {
    value!: string;
}`
    };
}
