import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'helptext-doc',
    template: `
        <app-docsectiontext>
            <p>An advisory text can be defined with the semantic <i>small</i> tag.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <div class="flex flex-column gap-2">
                <label for="username">Username</label>
                <input pInputText id="username" aria-describedby="username-help" [(ngModel)]="value" />
                <small id="username-help">Enter your username to reset your password.</small>
            </div>
        </div>
        <app-code [code]="code" selector="input-text-help-text-demo"></app-code>
    `
})
export class HelpTextDoc {
    value: string | undefined;

    code: Code = {
        basic: `<div class="flex flex-column gap-2">
    <label for="username">Username</label>
    <input 
        pInputText id="username" 
        aria-describedby="username-help" 
        [(ngModel)]="value" />
    <small id="username-help">
        Enter your username to reset your password.
    </small>
</div>`,

        html: `<div class="card flex justify-content-center">
    <div class="flex flex-column gap-2">
        <label for="username">Username</label>
        <input 
            pInputText
            id="username" 
            aria-describedby="username-help" 
            [(ngModel)]="value" />
        <small id="username-help">
            Enter your username to reset your password.
        </small>
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
        
@Component({
    selector: 'input-text-help-text-demo',
    templateUrl: './input-text-help-text-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule]
})
export class InputTextHelpTextDemo {
    value: string | undefined;
}`
    };
}
