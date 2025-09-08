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
            <form #form="ngForm" (ngSubmit)="onSubmit(form)" class="flex flex-col gap-4">
                <div class="flex flex-wrap gap-4">
                    @for (item of formKeys; track item) {
                        <div class="flex items-center gap-2">
                            <p-checkbox [inputId]="item" [name]="item" [(ngModel)]="formModel[item]" [binary]="true" [invalid]="isInvalid()"></p-checkbox>
                            <label [for]="item">{{ item | titlecase }}</label>
                        </div>
                    }
                </div>
                @if (isInvalid()) {
                    <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
                }

                <button pButton severity="secondary" type="submit">
                    <span pButtonLabel>Submit</span>
                </button>
            </form>
        </div>

        <app-code [code]="code" selector="checkbox-template-driven-forms-demo"></app-code>
    `
})
export class TemplateDrivenFormsDoc {
    messageService = inject(MessageService);

    formSubmitted: boolean = false;

    formModel = {
        cheese: false,
        mushroom: false,
        pepper: false,
        onion: false
    };

    get formKeys(): string[] {
        return Object.keys(this.formModel);
    }

    isInvalid(): boolean {
        return this.formSubmitted && !this.isAtLeastOneSelected();
    }

    isAtLeastOneSelected(): boolean {
        return Object.values(this.formModel).some((value) => value === true);
    }

    onSubmit(form: NgForm) {
        this.formSubmitted = true;

        if (this.isAtLeastOneSelected()) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Form is submitted',
                life: 3000
            });

            this.formModel = {
                cheese: false,
                mushroom: false,
                pepper: false,
                onion: false
            };
            form.resetForm(this.formModel);

            this.formSubmitted = false;
        }
    }

    code: Code = {
        basic: `<form #form="ngForm" (ngSubmit)="onSubmit(form)" class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-4">
        @for (item of formKeys; track item) {
            <div class="flex items-center gap-2">
                <p-checkbox [inputId]="item" [name]="item" [(ngModel)]="formModel[item]" [binary]="true" [invalid]="isInvalid()"></p-checkbox>
                <label [for]="item">{{ item | titlecase }}</label>
            </div>
        }
    </div>
    @if (isInvalid()) {
        <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
    }

    <button pButton severity="secondary" type="submit">
        <span pButtonLabel>Submit</span>
    </button>
</form>`,

        html: `<p-toast />
<div class="card flex justify-center">
    <form #form="ngForm" (ngSubmit)="onSubmit(form)" class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-4">
            @for (item of formKeys; track item) {
                <div class="flex items-center gap-2">
                    <p-checkbox [inputId]="item" [name]="item" [(ngModel)]="formModel[item]" [binary]="true" [invalid]="isInvalid()"></p-checkbox>
                    <label [for]="item">{{ item | titlecase }}</label>
                </div>
            }
        </div>
        @if (isInvalid()) {
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
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'checkbox-template-driven-forms-demo',
    templateUrl: './checkbox-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, CheckboxModule, MessageModule, ToastModule, ButtonModule, CommonModule]
})
export class TemplateDrivenFormsDemo {
    messageService = inject(MessageService);

    formSubmitted: boolean = false;

    formModel = {
        cheese: false,
        mushroom: false,
        pepper: false,
        onion: false
    };

    get formKeys(): string[] {
        return Object.keys(this.formModel);
    }

    isInvalid(): boolean {
        return this.formSubmitted && !this.isAtLeastOneSelected();
    }

    isAtLeastOneSelected(): boolean {
        return Object.values(this.formModel).some((value) => value === true);
    }

    onSubmit(form: NgForm) {
        this.formSubmitted = true;

        if (this.isAtLeastOneSelected()) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Form is submitted',
                life: 3000
            });

            this.formModel = {
                cheese: false,
                mushroom: false,
                pepper: false,
                onion: false
            };
            form.resetForm(this.formModel);

            this.formSubmitted = false;
        }
    }
}`
    };
}
