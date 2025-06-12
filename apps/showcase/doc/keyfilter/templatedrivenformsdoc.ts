import { Code } from '@/domain/code';
import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'template-driven-forms-doc',
    standalone: false,
    template: `
        <app-docsectiontext> </app-docsectiontext>
        <p-toast />
        <div class="card flex justify-center">
            <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 md:w-56">
                <div class="flex flex-col gap-1">
                    <label for="integer" class="font-bold block mb-2"> Integer </label>
                    <input pInputText id="integer" pKeyFilter="int" class="w-full" #value="ngModel" [(ngModel)]="inputValue" [invalid]="value.invalid && (value.touched || exampleForm.submitted)" name="integer" required />
                    @if (value.invalid && (value.touched || exampleForm.submitted)) {
                        <p-message severity="error" size="small" variant="simple">Value is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
        <app-code [code]="code" selector="key-filter-template-driven-forms-demo"></app-code>
    `
})
export class TemplateDrivenFormsDoc {
    messageService = inject(MessageService);

    inputValue: number = 1234;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }

    code: Code = {
        basic: `<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 md:w-56">
    <div class="flex flex-col gap-1">
        <label for="integer" class="font-bold block mb-2"> Integer </label>
        <input pInputText id="integer" pKeyFilter="int" class="w-full" #value="ngModel" [(ngModel)]="inputValue" [invalid]="value.invalid && (value.touched || exampleForm.submitted)" name="integer" required />
        @if (value.invalid && (value.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">Value is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>`,

        html: `<p-toast />
<div class="card flex justify-center">
    <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 md:w-56">
        <div class="flex flex-col gap-1">
            <label for="integer" class="font-bold block mb-2"> Integer </label>
            <input pInputText id="integer" pKeyFilter="int" class="w-full" #value="ngModel" [(ngModel)]="inputValue" [invalid]="value.invalid && (value.touched || exampleForm.submitted)" name="integer" required />
            @if (value.invalid && (value.touched || exampleForm.submitted)) {
                <p-message severity="error" size="small" variant="simple">Value is required.</p-message>
            }
        </div>
        <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
    </form>
</div>`,

        typescript: `import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'key-filter-template-driven-forms-demo',
    templateUrl: './key-filter-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, KeyFilterModule, MessageModule, ToastModule, ButtonModule, InputTextModule]
})
export class TemplateDrivenFormsDemo {
    messageService = inject(MessageService);

    inputValue: number = 1234;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}`
    };
}
