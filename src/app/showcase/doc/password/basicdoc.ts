import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using <i>ngModel</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-password [(ngModel)]="value" [feedback]="false"/>
        </div>
        <app-code [code]="code" selector="password-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value!: string;

    code: Code = {
        basic: `<p-password [(ngModel)]="value" [feedback]="false" />`,

        html: `<div class="card flex justify-content-center">
    <p-password [(ngModel)]="value" [feedback]="false" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-basic-demo',
    templateUrl: './password-basic-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordBasicDemo {
    value!: string;
}`
    };
}
