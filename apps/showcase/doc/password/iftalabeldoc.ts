import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'iftalabel-doc',
    standalone: true,
    imports: [FormsModule, RouterModule, PasswordModule, IftaLabelModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel>
                <p-password [(ngModel)]="value" inputId="password" autocomplete="off" />
                <label for="password">Password</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="password-iftalabel-demo"></app-code>
    `
})
export class IftaLabelDoc {
    value!: string;

    code: Code = {
        basic: `<p-iftalabel>
    <p-password [(ngModel)]="value" inputId="password" />
    <label for="password">Password</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel>
        <p-password [(ngModel)]="value" inputId="password" />
        <label for="password">Password</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'password-iftalabel-demo',
    templateUrl: './password-iftalabel-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule, IftaLabelModule]
})
export class PasswordIftaLabelDemo {
    value!: string;
}`
    };
}
