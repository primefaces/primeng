import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

interface City {
    name: string;
    code: string;
}
interface CustomerForm {
    selectedCity: City;
}

@Component({
    selector: 'select-signal-forms-demo',
    standalone: true,
    imports: [CommonModule, AppDocSectionText, AppCode, SelectModule, ButtonModule, Field],
    template: `
        <app-docsectiontext> Select can also be used with signal forms. In this case, the <i>control</i> property is used to bind the component to a form control.</app-docsectiontext>
        <div class="card flex justify-center">
            <form class="flex flex-col gap-4 w-full sm:w-56">
                <div class="flex flex-col gap-1">
                    <p-select [field]="exampleForm.selectedCity" [options]="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" (onBlur)="handleBlur($event)" />
                    @if (exampleForm().touched() && exampleForm().dirty()) {
                        <p-message severity="error" size="small" variant="simple">{{ getErrorMessage('value') }}</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit" [disabled]="exampleForm().invalid()"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
        <app-code [code]="code" selector="select-signal-forms-demo"></app-code>
    `
})
export class SignalFormsDoc {
    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    customerInfo = signal<CustomerForm>({
        selectedCity: null
    });

    exampleForm = form<CustomerForm>(this.customerInfo, (customer) => {
        required(customer.selectedCity);
    });

    code: Code = {};

    handleBlur(event: any) {
        console.log(this.exampleForm().valid(), this.exampleForm().dirty());
    }
}
