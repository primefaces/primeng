import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'fluid-doc',
    standalone: true,
    imports: [FormsModule, PasswordModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <div class="card">
            <p-password [(ngModel)]="value" [feedback]="false" autocomplete="off" fluid />
        </div>
        <app-code [code]="code" selector="password-fluid-demo"></app-code>
    `
})
export class FluidDoc {
    value!: string;

    code: Code = {
        basic: `<p-password [(ngModel)]="value" [feedback]="false" fluid />`,

        html: `<div class="card">
    <p-password [(ngModel)]="value" [feedback]="false" fluid />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-fluid-demo',
    templateUrl: './password-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordFluidDemo {
    value!: string;
}`
    };
}
