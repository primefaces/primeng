import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-driven-forms-doc',
    standalone: true,
    imports: [FormsModule, InputNumberModule, ButtonModule, ToastModule, MessageModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext></app-docsectiontext>
        <p-toast />
        <app-demo-wrapper>
            <div class="flex justify-center">
                <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
                    <div class="flex flex-col gap-1">
                        <p-inputnumber inputId="integeronly" #inputValue="ngModel" name="inputValue" [(ngModel)]="value" [invalid]="inputValue.invalid && (inputValue.touched || exampleForm.submitted)" required />
                        @if (inputValue.invalid && (inputValue.touched || exampleForm.submitted)) {
                            <p-message severity="error" size="small" variant="simple">Number is required.</p-message>
                        }
                    </div>
                    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
                </form>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class TemplateDrivenFormsDoc {
    messageService = inject(MessageService);

    value: any;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}
