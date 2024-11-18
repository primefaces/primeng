import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'filled-doc',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-password [(ngModel)]="value" [feedback]="false" variant="filled" autocomplete="off" />
        </div>
        <app-code [code]="code" selector="password-filled-demo"></app-code>
    `
})
export class FilledDoc {
    value!: string;

    code: Code = {
        basic: `<p-password [(ngModel)]="value" [feedback]="false" variant="filled" />`,

        html: `<div class="card flex justify-center">
    <p-password [(ngModel)]="value" [feedback]="false" variant="filled" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-filled-demo',
    templateUrl: './password-filled-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordFilledDemo {
    value!: string;
}`
    };
}
