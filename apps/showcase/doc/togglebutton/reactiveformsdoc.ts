import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    selector: 'reactive-forms-doc',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ToggleButtonModule, ToastModule, MessageModule, ButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>ToggleButton can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col items-center gap-4">
                <div class="flex flex-col items-center gap-1">
                    <p-togglebutton name="consent" formControlName="checked" [invalid]="isInvalid('checked')" onLabel="Accept All" offLabel="Reject All" class="min-w-40" />
                    @if (isInvalid('checked')) {
                        <p-message severity="error" size="small" variant="simple">Consent is mandatory.</p-message>
                    }
                </div>
                <button pButton type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
        <app-code [code]="code" selector="toggle-button-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc {
    messageService = inject(MessageService);

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            checked: ['', Validators.required]
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            this.exampleForm.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.exampleForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }

    code: Code = {
        basic: `<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col items-center gap-4">
    <div class="flex flex-col items-center gap-1">
        <p-togglebutton name="consent" formControlName="checked" [invalid]="isInvalid('checked')" onLabel="Accept All" offLabel="Reject All" class="min-w-40" />
        @if (isInvalid('checked')) {
            <p-message severity="error" size="small" variant="simple">Consent is mandatory.</p-message>
        }
    </div>
    <button pButton type="submit"><span pButtonLabel>Submit</span></button>
</form>`,

        html: `<p-toast />
<div class="card flex justify-center">
    <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-1">
            <p-togglebutton name="consent" formControlName="checked" [invalid]="isInvalid('checked')" onLabel="Accept All" offLabel="Reject All" class="min-w-40" />
            @if (isInvalid('checked')) {
                <p-message severity="error" size="small" variant="simple">Consent is mandatory.</p-message>
            }
        </div>
        <button pButton type="submit"><span pButtonLabel>Submit</span></button>
    </form>
</div>`,

        typescript: `import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToggleButton } from 'primeng/togglebutton';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'toggle-button-reactive-forms-demo',
    templateUrl: './toggle-button-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, ToggleButton, MessageModule, MessageService, ButtonModule]
})
export class ToggleButtonReactiveFormsDemo {
    messageService = inject(MessageService);

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            checked: ['', Validators.required]
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            this.exampleForm.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.exampleForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}`
    };
}
