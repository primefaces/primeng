import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-4">
            <p-password [(ngModel)]="value1" [invalid]="!value1" placeholder="Password" />
            <p-password [(ngModel)]="value2" [invalid]="!value2" variant="filled" placeholder="Password" />
        </div>
        <app-code [code]="code" selector="password-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value1!: string;

    value2!: string;

    code: Code = {
        basic: `<p-password [(ngModel)]="value1" [invalid]="!value1" placeholder="Password" />
<p-password [(ngModel)]="value2" [invalid]="!value2" variant="filled" placeholder="Password" />`,

        html: `<div class="card flex flex-wrap justify-center gap-4">
    <p-password [(ngModel)]="value1" [invalid]="!value1" placeholder="Password" />
    <p-password [(ngModel)]="value2" [invalid]="!value2" variant="filled" placeholder="Password" />
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
    value1!: string;

    value2!: string;
}`
    };
}
