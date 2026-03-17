import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    selector: 'template-driven-forms-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, ToggleButtonModule, ToastModule, MessageModule, ButtonModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext> </app-docsectiontext>
        <p-toast />
        <app-demo-wrapper>
            <div class="flex justify-center">
                <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col items-center gap-4">
                    <div class="flex flex-col items-center gap-1">
                        <p-togglebutton #model="ngModel" [(ngModel)]="checked" [invalid]="model.invalid && (model.touched || exampleForm.submitted)" name="country" onLabel="Accept All" offLabel="Reject All" required class="min-w-40" />
                        @if (model.invalid && (model.touched || exampleForm.submitted)) {
                            <p-message severity="error" size="small" variant="simple">Consent is mandatory.</p-message>
                        }
                    </div>
                    <button pButton type="submit">
                        <span pButtonLabel>Submit</span>
                    </button>
                </form>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class TemplateDrivenFormsDoc {
    messageService = inject(MessageService);

    checked: boolean;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}
