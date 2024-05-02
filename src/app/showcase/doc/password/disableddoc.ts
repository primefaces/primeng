import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-password [(ngModel)]="value" [disabled]="true" placeholder="Disabled" />
        </div>
        <app-code [code]="code" selector="password-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    value!: string;

    code: Code = {
        basic: `<p-password 
    [(ngModel)]="value" 
    [disabled]="true" 
    placeholder="Disabled" />`,

        html: `<div class="card flex justify-content-center">
    <p-password 
        [(ngModel)]="value" 
        [disabled]="true" 
        placeholder="Disabled" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-disabled-demo',
    templateUrl: './password-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordDisabledDemo {
    value!: string;
}`
    };
}
