import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Invalid state is displayed automatically based on the form validation state. The <i>p-invalid</i> class will be added dynamically if the input field is invalid and dirty.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-4">
            <input pInputText [(ngModel)]="value" name="value" placeholder="Name" [invalid]="true" required />
        </div>
        <app-code [code]="code" selector="input-text-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value: string | undefined;

    code: Code = {
        basic: `<input pInputText [(ngModel)]="value" name="value" placeholder="Name" [invalid]="true" required />`,

        html: `<div class="card flex flex-wrap justify-center gap-4">
    <input pInputText [(ngModel)]="value" name="value" placeholder="Name" [invalid]="true" required />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-text-invalid-demo',
    templateUrl: './input-text-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule]
})
export class InputTextInvalidDemo {
    value1: string | undefined;

    value2: string | undefined;
}`
    };
}
