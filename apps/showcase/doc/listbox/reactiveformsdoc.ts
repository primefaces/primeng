import { Code } from '@/domain/code';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'reactive-forms-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Listbox can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>

        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 sm:w-56">
                <div class="flex flex-col gap-1">
                    <p-listbox [options]="cities" formControlName="selectedCity" optionLabel="name" class="w-full md:w-56" [invalid]="isInvalid('selectedCity')" />
                    @if (isInvalid('selectedCity')) {
                        <p-message severity="error" size="small" variant="simple">City is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
        <app-code [code]="code" selector="listbox-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc {
    messageService = inject(MessageService);

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    cities!: City[];

    constructor(private fb: FormBuilder) {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.exampleForm = this.fb.group({
            selectedCity: ['', Validators.required]
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
        return control?.invalid && this.formSubmitted;
    }

    code: Code = {
        basic: `<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 sm:w-56">
    <div class="flex flex-col gap-1">
        <p-listbox [options]="cities" formControlName="selectedCity" optionLabel="name" class="w-full md:w-56" [invalid]="isInvalid('selectedCity')" />
        @if (isInvalid('selectedCity')) {
            <p-message severity="error" size="small" variant="simple">City is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>`,

        html: `<p-toast />
<div class="card flex justify-center">
    <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 sm:w-56">
        <div class="flex flex-col gap-1">
            <p-listbox [options]="cities" formControlName="selectedCity" optionLabel="name" class="w-full md:w-56" [invalid]="isInvalid('selectedCity')" />
            @if (isInvalid('selectedCity')) {
                <p-message severity="error" size="small" variant="simple">City is required.</p-message>
            }
        </div>
        <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
    </form>
</div>`,

        typescript: `import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-reactive-forms-demo',
    templateUrl: './listbox-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, ListboxModule, ToastModule, MessageService, ButtonModule]
})
export class ListboxReactiveFormsDemo implements OnInit {
    messageService = inject(MessageService);

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    cities!: City[];

    constructor(private fb: FormBuilder) {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.exampleForm = this.fb.group({
            selectedCity: ['', Validators.required]
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
        return control?.invalid && this.formSubmitted;
    }
}`
    };
}
