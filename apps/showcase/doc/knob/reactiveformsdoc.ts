import { Code } from '@/domain/code';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'reactive-forms-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Knob can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>

        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
                <div class="flex flex-col items-center gap-1">
                    <p-knob formControlName="value" [invalid]="isInvalid('value')" />
                    @if (isInvalid('value')) {
                        <p-message severity="error" size="small" variant="simple">{{ getErrorMessage('value') }}</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
        <app-code [code]="code" selector="knob-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc {
    messageService = inject(MessageService);

    items: any[] | undefined;

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            value: [15, [Validators.min(25), Validators.max(75)]]
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            this.exampleForm.reset({
                value: 15
            });
            this.formSubmitted = false;
        }
    }

    getControl(controlName: string): AbstractControl | null {
        return this.exampleForm?.get(controlName) ?? null;
    }

    getErrorMessage(controlName: string): string | null {
        const control = this.getControl(controlName);
        if (!control || !control.errors) return null;

        if (control.errors['min']) {
            return 'Value must be greater than 15.';
        }

        if (control.errors['max']) {
            return 'Must be less than 75.';
        }
    }

    isInvalid(controlName: string) {
        const control = this.getControl(controlName);
        return control?.invalid && (control.dirty || this.formSubmitted);
    }

    code: Code = {
        basic: `<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-col items-center gap-1">
        <p-knob formControlName="value" [invalid]="isInvalid('value')" />
        @if (isInvalid('value')) {
            <p-message severity="error" size="small" variant="simple">{{ getErrorMessage('value') }}</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>`,

        html: `<p-toast />
<div class="card flex justify-center">
    <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
        <div class="flex flex-col items-center gap-1">
            <p-knob formControlName="value" [invalid]="isInvalid('value')" />
            @if (isInvalid('value')) {
                <p-message severity="error" size="small" variant="simple">{{ getErrorMessage('value') }}</p-message>
            }
        </div>
        <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
    </form>
</div>`,

        typescript: `import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'knob-reactive-forms-demo',
    templateUrl: './knob-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, KnobModule, MessageModule, ToastModule, ButtonModule]
})
export class KnobReactiveFormsDemo {
    messageService = inject(MessageService);

    items: any[] | undefined;

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            value: [15, [Validators.min(25), Validators.max(75)]]
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            this.exampleForm.reset({
                value: 15
            });
            this.formSubmitted = false;
        }
    }

    getControl(controlName: string): AbstractControl | null {
        return this.exampleForm?.get(controlName) ?? null;
    }

    getErrorMessage(controlName: string): string | null {
        const control = this.getControl(controlName);
        if (!control || !control.errors) return null;

        if (control.errors['min']) {
            return 'Value must be greater than 15.';
        }

        if (control.errors['max']) {
            return 'Must be less than 75.';
        }
    }

    isInvalid(controlName: string) {
        const control = this.getControl(controlName);
        return control?.invalid && (control.dirty || this.formSubmitted);
    }
}`
    };
}
