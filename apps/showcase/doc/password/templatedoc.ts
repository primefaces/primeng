import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>3 templates are included to customize the overlay. These are <i>header</i>, <i>content</i> and <i>footer</i>. Note that content overrides the default meter.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-password [(ngModel)]="value" autocomplete="off">
                <ng-template pTemplate="header">
                    <div class="font-semibold text-xm mb-4">Pick a password</div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <p-divider />
                    <ul class="pl-2 ml-2 my-0 leading-normal">
                        <li>At least one lowercase</li>
                        <li>At least one uppercase</li>
                        <li>At least one numeric</li>
                        <li>Minimum 8 characters</li>
                    </ul>
                </ng-template>
            </p-password>
        </div>
        <app-code [code]="code" selector="password-template-demo"></app-code>
    `
})
export class TemplateDoc {
    value!: string;

    code: Code = {
        basic: `<p-password [(ngModel)]="value" autocomplete="off">
    <ng-template pTemplate="header">
        <div class="font-semibold text-xm mb-4">Pick a password</div>
    </ng-template>
    <ng-template pTemplate="footer">
        <p-divider />
        <ul class="pl-2 ml-2 my-0 leading-normal">
            <li>At least one lowercase</li>
            <li>At least one uppercase</li>
            <li>At least one numeric</li>
            <li>Minimum 8 characters</li>
        </ul>
    </ng-template>
</p-password>`,

        html: `<div class="card flex justify-center">
    <p-password [(ngModel)]="value" autocomplete="off">
        <ng-template pTemplate="header">
            <div class="font-semibold text-xm mb-4">Pick a password</div>
        </ng-template>
        <ng-template pTemplate="footer">
            <p-divider />
            <ul class="pl-2 ml-2 my-0 leading-normal">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </ng-template>
    </p-password>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'password-template-demo',
    templateUrl: './password-template-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule, DividerModule]
})
export class PasswordTemplateDemo {
    value!: string;
}`
    };
}
