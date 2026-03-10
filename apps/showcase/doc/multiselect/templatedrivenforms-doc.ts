import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'templatedrivenforms-doc',
    standalone: true,
    imports: [FormsModule, MultiSelectModule, ButtonModule, ToastModule, MessageModule, AppCode, AppDemoWrapper, AppDocSectionText, CommonModule],
    providers: [MessageService],
    template: `
        <app-docsectiontext></app-docsectiontext>
        <p-toast />
        <app-demo-wrapper>
            <div class="flex justify-center">
                <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 w-full md:w-80">
                    <div class="flex flex-col gap-1">
                        <p-multiselect
                            #city="ngModel"
                            [(ngModel)]="selectedCity"
                            [options]="cities"
                            optionLabel="name"
                            name="city"
                            placeholder="Select Cities"
                            [maxSelectedLabels]="3"
                            [invalid]="city.invalid && (city.touched || exampleForm.submitted)"
                            fluid
                            required
                        />
                        @if (city.invalid && (city.touched || exampleForm.submitted)) {
                            <p-message severity="error" size="small" variant="simple">City is required.</p-message>
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

    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    selectedCity: City | undefined;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}
