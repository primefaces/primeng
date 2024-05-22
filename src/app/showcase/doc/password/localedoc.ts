import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'locale-doc',
    template: `
        <app-docsectiontext>
            <p>
                Labels are translated at component level by <i>promptLabel</i>, <i>weakLabel</i>, <i>mediumLabel</i> and <i>strongLabel</i> properties. In order to apply global translations for all Password components in the application, refer to the
                <a href="/configuration/#locale">locale</a>
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-password [(ngModel)]="value" promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity" strongLabel="Complex password" />
        </div>
        <app-code [code]="code" selector="password-locale-demo"></app-code>
    `
})
export class LocaleDoc {
    value!: string;

    code: Code = {
        basic: `<p-password 
    [(ngModel)]="value" 
    promptLabel="Choose a password"
    weakLabel="Too simple" 
    mediumLabel="Average complexity" 
    strongLabel="Complex password" />`,

        html: `<div class="card flex justify-content-center">
    <p-password 
        [(ngModel)]="value"
        promptLabel="Choose a password" 
        weakLabel="Too simple" 
        mediumLabel="Average complexity" 
        strongLabel="Complex password" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-locale-demo',
    templateUrl: './password-locale-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordLocaleDemo {
    value!: string;
}`
    };
}
