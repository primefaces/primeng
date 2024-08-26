import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'floatlabel-doc',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-floatLabel>
                <p-password [(ngModel)]="value" [feedback]="false" />
                <label for="password">Password</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="password-floatlabel-demo"></app-code>
    `
})
export class FloatLabelDoc {
    value!: string;

    code: Code = {
        basic: `<p-floatLabel>
    <p-password [(ngModel)]="value" [feedback]="false" />
    <label for="password">Password</label>
</p-floatLabel>`,

        html: `<div class="card flex justify-center">
    <p-floatLabel>
        <p-password [(ngModel)]="value" [feedback]="false" />
        <label for="password">Password</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-floatlabel-demo',
    templateUrl: './password-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordFloatlabelDemo {
    value!: string;
}`
    };
}
