import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>3 templates are included to customize the overlay. These are <i>header</i>, <i>content</i> and <i>footer</i>. Note that content overrides the default meter.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-password [(ngModel)]="value">
                <ng-template pTemplate="header">
                    <h6>Pick a password</h6>
                </ng-template>
                <ng-template pTemplate="footer">
                    <p-divider />
                    <p class="mt-2">Suggestions</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
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
        basic: `<p-password [(ngModel)]="value">
    <ng-template pTemplate="header">
        <h6>Pick a password</h6>
    </ng-template>
    <ng-template pTemplate="footer">
        <p-divider />
        <p class="mt-2">Suggestions</p>
        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
            <li>At least one lowercase</li>
            <li>At least one uppercase</li>
            <li>At least one numeric</li>
            <li>Minimum 8 characters</li>
        </ul>
    </ng-template>
</p-password>`,

        html: `<div class="card flex justify-content-center">
    <p-password [(ngModel)]="value">
         <ng-template pTemplate="header">
             <h6>Pick a password</h6>
         </ng-template>
         <ng-template pTemplate="footer">
             <p-divider />
             <p class="mt-2">Suggestions</p>
             <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
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
