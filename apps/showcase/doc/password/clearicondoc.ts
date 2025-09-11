import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'clear-icon-doc',
    standalone: true,
    imports: [FormsModule, PasswordModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>clearIcon</i> template allows you to customize the icon used to clear the input field.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-password [(ngModel)]="value" [feedback]="false" autocomplete="off" [showClear]="true">
                <ng-template #clearicon>
                    <i class="pi pi-times-circle cursor-pointer"></i>
                </ng-template>
            </p-password>
        </div>
        <app-code [code]="code" selector="password-clear-icon-demo"></app-code>
    `
})
export class ClearIconDoc {
    value!: string;

    code: Code = {
        basic: `<p-password [(ngModel)]="value" [feedback]="false" autocomplete="off" [showClear]="true">
    <ng-template #clearicon>
        <i class="pi pi-times-circle cursor-pointer"></i>
    </ng-template>
</p-password>`,

        html: `<div class="card flex justify-center">
    <p-password [(ngModel)]="value" [feedback]="false" autocomplete="off" [showClear]="true">
        <ng-template #clearicon>
            <i class="pi pi-times-circle cursor-pointer"></i>
        </ng-template>
    </p-password>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-clear-icon-demo',
    templateUrl: './password-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordClearIconDemo {
    value!: string;
}`
    };
}
