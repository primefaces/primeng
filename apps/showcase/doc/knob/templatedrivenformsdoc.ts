import { Code } from '@/domain/code';
import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'template-driven-forms-doc',
    standalone: false,
    template: `
        <app-docsectiontext> </app-docsectiontext>
        <p-toast />
        <div class="card flex justify-center">
            <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
                <div class="flex flex-col items-center gap-1">
                    <p-knob #model="ngModel" [(ngModel)]="value" [invalid]="isInvalid(model)" name="knob" />
                    @if (isInvalid(model)) {
                        <p-message severity="error" size="small" variant="simple">{{ getErrorMessage(model) }}</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
        <app-code [code]="code" selector="autocomplete-template-driven-forms-demo"></app-code>
    `
})
export class TemplateDrivenFormsDoc {
    messageService = inject(MessageService);

    value: number = 15;

    formSubmitted: boolean = false;

    onSubmit(form: NgForm) {
        this.formSubmitted = true;

        if (!this.isInvalid(form.controls['knob'])) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Form is submitted',
                life: 3000
            });

            form.resetForm({ knob: 15 });

            this.formSubmitted = false;
        }
    }

    getErrorMessage(control: any): string | null {
        const value = control?.value;

        return value < 25 ? 'Value must be greater than 25.' : value > 75 ? 'Must be less than 75.' : null;
    }

    isInvalid(control: any): boolean {
        if (!control) return false;

        const value = control.value;

        const hasError = value < 25 || value > 75;

        return hasError && (this.formSubmitted || control.dirty);
    }

    code: Code = {
        basic: `<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
    <div class="flex flex-col items-center gap-1">
        <p-knob #model="ngModel" [(ngModel)]="value" [invalid]="isInvalid(model)" name="knob" />
        @if (isInvalid(model)) {
            <p-message severity="error" size="small" variant="simple">{{ getErrorMessage(model) }}</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>`,

        html: `<p-toast />
<div class="card flex justify-center">
    <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
        <div class="flex flex-col items-center gap-1">
            <p-knob #model="ngModel" [(ngModel)]="value" [invalid]="isInvalid(model)" name="knob" />
            @if (isInvalid(model)) {
                <p-message severity="error" size="small" variant="simple">{{ getErrorMessage(model) }}</p-message>
            }
        </div>
        <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
    </form>
</div>`,

        typescript: `import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { KnobModule } from 'primeng/knob';

@Component({
    selector: 'knob-template-driven-forms-demo',
    templateUrl: './knob-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, KnobModule, MessageModule, ToastModule, ButtonModule]
})
export class TemplateDrivenFormsDemo {
    messageService = inject(MessageService);

    value: number = 15;

    formSubmitted: boolean = false;

    onSubmit(form: NgForm) {
        this.formSubmitted = true;

        if (!this.isInvalid(form.controls['knob'])) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Form is submitted',
                life: 3000
            });

            form.resetForm({ knob: 15 });

            this.formSubmitted = false;
        }
    }

    getErrorMessage(control: any): string | null {
        const value = control?.value;

        return value < 25 ? 'Value must be greater than 25.' : value > 75 ? 'Must be less than 75.' : null;
    }

    isInvalid(control: any): boolean {
        if (!control) return false;

        const value = control.value;

        const hasError = value < 25 || value > 75;

        return hasError && (this.formSubmitted || control.dirty);
    }
}`
    };
}
