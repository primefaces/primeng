import { Code } from '@/domain/code';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'template-driven-forms-doc',
    standalone: true,
    imports: [FormsModule, RadioButtonModule, ButtonModule, ToastModule, MessageModule, AppCode, AppDocSectionText, CommonModule],
    providers: [MessageService],
    template: `
        <app-docsectiontext> </app-docsectiontext>
        <p-toast />
        <div class="card flex justify-center">
            <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
                <div class="flex flex-wrap gap-4">
                    @for (category of categories; track category.name) {
                        <div class="flex items-center gap-2">
                            <p-radiobutton [(ngModel)]="ingredient" [inputId]="category.key" [value]="category" [invalid]="isInvalid(exampleForm)" name="ingredient" />
                            <label [for]="category.key"> {{ category.name }} </label>
                        </div>
                    }
                </div>
                @if (isInvalid(exampleForm)) {
                    <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
                }

                <button pButton severity="secondary" type="submit">
                    <span pButtonLabel>Submit</span>
                </button>
            </form>
        </div>

        <app-code [code]="code" selector="radio-button-template-driven-forms-demo"></app-code>
    `
})
export class TemplateDrivenFormsDoc {
    messageService = inject(MessageService);

    formSubmitted: boolean = false;

    ingredient!: any;

    categories: any[] = [
        { name: 'Cheese', key: 'C' },
        { name: 'Mushroom', key: 'M' },
        { name: 'Pepper', key: 'P' },
        { name: 'Onion', key: 'O' }
    ];

    isInvalid(form: NgForm) {
        return !this.ingredient && form.submitted;
    }

    onSubmit(form: NgForm) {
        if (!this.isInvalid(form)) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }

    code: Code = {
        basic: `<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-4">
        @for (category of categories; track category.name) {
            <div class="flex items-center gap-2">
                <p-radiobutton [(ngModel)]="ingredient" [inputId]="category.key" [value]="category" [invalid]="isInvalid(exampleForm)" name="ingredient" />
                <label [for]="category.key"> {{ category.name }} </label>
            </div>
        }
    </div>
    @if (isInvalid(exampleForm)) {
        <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
    }

    <button pButton severity="secondary" type="submit">
        <span pButtonLabel>Submit</span>
    </button>
</form>`,

        html: `<p-toast />
<div class="card flex justify-center">
    <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-4">
            @for (category of categories; track category.name) {
                <div class="flex items-center gap-2">
                    <p-radiobutton [(ngModel)]="ingredient" [inputId]="category.key" [value]="category" [invalid]="isInvalid(exampleForm)" name="ingredient" />
                    <label [for]="category.key"> {{ category.name }} </label>
                </div>
            }
        </div>
        @if (isInvalid(exampleForm)) {
            <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
        }

        <button pButton severity="secondary" type="submit">
            <span pButtonLabel>Submit</span>
        </button>
    </form>
</div>`,

        typescript: `import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'radio-button-template-driven-forms-demo',
    templateUrl: './radio-button-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, MessageModule, ToastModule, ButtonModule, CommonModule, RadioButtonModule]
})
export class TemplateDrivenFormsDemo {
    messageService = inject(MessageService);

    formSubmitted: boolean = false;

    ingredient!: any;

    categories: any[] = [
        { name: 'Cheese', key: 'C' },
        { name: 'Mushroom', key: 'M' },
        { name: 'Pepper', key: 'P' },
        { name: 'Onion', key: 'O' }
    ];

    isInvalid(form: NgForm) {
        return !this.ingredient && form.submitted;
    }

    onSubmit(form: NgForm) {
        if (!this.isInvalid(form)) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}`
    };
}
