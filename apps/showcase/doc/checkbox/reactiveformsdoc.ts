import { Code } from '@/domain/code';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'reactive-forms-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Checkbox can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>

        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
                <div class="flex flex-wrap gap-4">
                    @for (item of formKeys; track item) {
                        <div class="flex items-center gap-2">
                            <p-checkbox [formControlName]="item" [binary]="true" [inputId]="item" [invalid]="isInvalid(item)" />
                            <label [for]="item"> {{ item | titlecase }} </label>
                        </div>
                    }
                </div>
                @if (hasAnyInvalid()) {
                    <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
                }
                <button pButton severity="secondary" type="submit">
                    <span pButtonLabel>Submit</span>
                </button>
            </form>
        </div>

        <app-code [code]="code" selector="checkbox-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc {
    messageService = inject(MessageService);

    formSubmitted: boolean = false;

    exampleForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group(
            {
                cheese: [false],
                mushroom: [false],
                pepper: [false],
                onion: [false]
            },
            { validators: this.atLeastOneSelectedValidator }
        );
    }

    get formKeys(): string[] {
        return Object.keys(this.exampleForm.controls);
    }

    atLeastOneSelectedValidator(group: FormGroup): { [key: string]: any } | null {
        const anySelected = Object.values(group.controls).some((control) => control.value === true);
        return anySelected ? null : { atLeastOneRequired: true };
    }

    hasAnyInvalid(): boolean {
        return this.formSubmitted && this.exampleForm.hasError('atLeastOneRequired');
    }

    isInvalid(controlName: string): boolean {
        const control = this.exampleForm.get(controlName);
        return this.formSubmitted && this.exampleForm.hasError('atLeastOneRequired') && control?.value === false;
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.exampleForm.valid) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Form is submitted',
                life: 3000
            });

            this.exampleForm.reset({
                cheese: false,
                mushroom: false,
                pepper: false,
                onion: false
            });

            this.formSubmitted = false;
        }
    }

    code: Code = {
        basic: `<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-4">
        @for (item of formKeys; track item) {
            <div class="flex items-center gap-2">
                <p-checkbox [formControlName]="item" [binary]="true" [inputId]="item" [invalid]="isInvalid(item)" />
                <label [for]="item"> {{ item | titlecase }} </label>
            </div>
        }
    </div>
    @if (hasAnyInvalid()) {
        <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
    }
    <button pButton severity="secondary" type="submit">
        <span pButtonLabel>Submit</span>
    </button>
</form>`,

        html: `<p-toast />
<div class="card flex justify-center">
    <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-4">
            @for (item of formKeys; track item) {
                <div class="flex items-center gap-2">
                    <p-checkbox [formControlName]="item" [binary]="true" [inputId]="item" [invalid]="isInvalid(item)" />
                    <label [for]="item"> {{ item | titlecase }} </label>
                </div>
            }
        </div>
        @if (hasAnyInvalid()) {
            <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
        }
        <button pButton severity="secondary" type="submit">
            <span pButtonLabel>Submit</span>
        </button>
    </form>
</div>`,

        typescript: `import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'checkbox-reactive-forms-demo',
    templateUrl: './checkbox-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, CheckboxModule, ToastModule, ButtonModule, MessageModule]
})
export class CheckboxReactiveFormsDemo {
    messageService = inject(MessageService);

    formSubmitted: boolean = false;

    exampleForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group(
            {
                cheese: [false],
                mushroom: [false],
                pepper: [false],
                onion: [false]
            },
            { validators: this.atLeastOneSelectedValidator }
        );
    }

    get formKeys(): string[] {
        return Object.keys(this.exampleForm.controls);
    }

    atLeastOneSelectedValidator(group: FormGroup): { [key: string]: any } | null {
        const anySelected = Object.values(group.controls).some((control) => control.value === true);
        return anySelected ? null : { atLeastOneRequired: true };
    }

    hasAnyInvalid(): boolean {
        return this.formSubmitted && this.exampleForm.hasError('atLeastOneRequired');
    }

    isInvalid(controlName: string): boolean {
        const control = this.exampleForm.get(controlName);
        return this.formSubmitted && this.exampleForm.hasError('atLeastOneRequired') && control?.value === false;
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.exampleForm.valid) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Form is submitted',
                life: 3000
            });

            this.exampleForm.reset({
                cheese: false,
                mushroom: false,
                pepper: false,
                onion: false
            });

            this.formSubmitted = false;
        }
    }
}`
    };
}
