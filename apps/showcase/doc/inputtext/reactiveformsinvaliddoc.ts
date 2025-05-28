import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'reactive-forms-invalid-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                Demonstrates using <i>Angular Reactive Forms</i> to mark an input <i>invalid</i> based on the control’s validation and touch status. This example uses both <i>Validators.required</i> and <i>Validators.minLength(5)</i> to validate the
                input.
            </p>
        </app-docsectiontext>
        <form [formGroup]="formGroup" class="card flex flex-wrap justify-center gap-4">
            <input pInputText formControlName="value" [invalid]="formGroup.get('value')?.invalid && formGroup.get('value')?.touched" placeholder="Name" />
        </form>
        <app-code [code]="code" selector="input-text-reactive-forms-invalid-demo"></app-code>
    `
})
export class ReactiveFormsInvalidDoc {
    formGroup: FormGroup | undefined;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            value: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    code: Code = {
        basic: `<form [formGroup]="formGroup" class="card flex flex-wrap justify-center gap-4">
    <input pInputText formControlName="value" [invalid]="formGroup.get('value')?.invalid && formGroup.get('value')?.touched" placeholder="Name" />
</form>`,

        html: `<form [formGroup]="formGroup" class="card flex flex-wrap justify-center gap-4">
    <input pInputText formControlName="value" [invalid]="formGroup.get('value')?.invalid && formGroup.get('value')?.touched" placeholder="Name" />
</form>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'input-text-reactive-forms-invalid-demo',
    templateUrl: './input-text-reactive-forms-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule]
})
export class InputTextReactiveFormsInvalidDemo {
    formGroup: FormGroup | undefined;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            value: ['', [Validators.required, Validators.minLength(5)]]
        });
    }
}`
    };
}
