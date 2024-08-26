import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-password [(ngModel)]="value" class="ng-invalid ng-dirty" />
        </div>
        <app-code [code]="code" selector="password-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value!: string;

    code: Code = {
        basic: `<p-password [(ngModel)]="value" class="ng-invalid ng-dirty" />`,

        html: `<div class="card flex justify-center">
    <p-password [(ngModel)]="value" class="ng-invalid ng-dirty" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-invalid-demo',
    templateUrl: './password-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordInvalidDemo {
    value!: string;
}`
    };
}
