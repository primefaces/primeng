import { AppCodeModule } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { InputMaskModule } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'template-driven-forms-doc',
    standalone: true,
    imports: [FormsModule, InputMaskModule, InputText, ButtonModule, ToastModule, MessageModule, FluidModule, AppCodeModule, AppDemoWrapper],
    template: `
        <p-toast />
        <app-demo-wrapper>
            <div class="flex justify-center">
                <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 md:w-56">
                    <div class="flex flex-col gap-1">
                        <input pInputText name="serial" pInputMask="99-999999" #serialNumber="ngModel" [(ngModel)]="value" placeholder="99-999999" [invalid]="serialNumber.invalid && (serialNumber.touched || exampleForm.submitted)" required fluid />
                        @if (serialNumber.invalid && (serialNumber.touched || exampleForm.submitted)) {
                            <p-message severity="error" size="small" variant="simple">Serial number is required.</p-message>
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

    items: any[] = [];

    value: any;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}
