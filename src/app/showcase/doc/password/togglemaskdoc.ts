import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'togglemask-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>toggleMask</i> is present, an icon is displayed to show the value as plain text.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-password [(ngModel)]="value" [toggleMask]="true" />
        </div>
        <app-code [code]="code" selector="password-toggle-mask-demo"></app-code>
    `
})
export class ToggleMaskDoc {
    value!: string;

    code: Code = {
        basic: `<p-password [(ngModel)]="value" [toggleMask]="true" />`,

        html: `<div class="card flex justify-content-center">
    <p-password [(ngModel)]="value" [toggleMask]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-toggle-mask-demo',
    templateUrl: './password-toggle-mask-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordToggleMaskDemo {
    value!: string;
}`
    };
}
