import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Invalid state is displayed automatically based on the form validation state. The <code>p-invalid</code> class will be added dynamically if the input field is invalid and dirty.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-4">
            <input pInputText [(ngModel)]="value1" name="value1" placeholder="Name" required />

            <input pInputText [(ngModel)]="value2" name="value2" placeholder="Name" required variant="filled" />
        </div>
        <app-code [code]="code" selector="input-text-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value1: string | undefined;

    value2: string | undefined;

    code: Code = {
        basic: `<input
    pInputText
    [(ngModel)]="value1"
    name="value1"
    placeholder="Name"
    required
/>

<input
    pInputText
    [(ngModel)]="value2"
    name="value2"
    placeholder="Name"
    required
    variant="filled"
/>`,

        html: `<div class="card flex flex-wrap justify-center gap-4">
    <input
        pInputText
        [(ngModel)]="value1"
        name="value1"
        placeholder="Name"
        required
    />
    <input
        pInputText
        [(ngModel)]="value2"
        name="value2"
        placeholder="Name"
        required
        variant="filled"
    />
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
