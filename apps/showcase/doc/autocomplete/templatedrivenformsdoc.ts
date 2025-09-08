import { Code } from '@/domain/code';
import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
    selector: 'template-driven-forms-doc',
    standalone: false,
    template: `
        <app-docsectiontext> </app-docsectiontext>
        <p-toast />
        <div class="card flex justify-center">
            <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 md:w-56">
                <div class="flex flex-col gap-1">
                    <p-autocomplete #val="ngModel" [(ngModel)]="value" [suggestions]="items" [invalid]="val.invalid && (val.touched || exampleForm.submitted)" name="val" (completeMethod)="search($event)" required fluid />
                    @if (val.invalid && (val.touched || exampleForm.submitted)) {
                        <p-message severity="error" size="small" variant="simple">Value is required.</p-message>
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

    items: any[] = [];

    value: any;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }

    code: Code = {
        basic: `<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 md:w-56">
    <div class="flex flex-col gap-1">
        <p-autocomplete
            #val="ngModel"
            [(ngModel)]="value"
            [suggestions]="items"
            [invalid]="val.invalid && (val.touched || exampleForm.submitted)"
            name="val"
            (completeMethod)="search($event)"
            required
            fluid
        />
        @if (val.invalid && (val.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">Value is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>`,

        html: `<p-toast />
<div class="card flex justify-center">
    <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 w-full md:w-56">
        <div class="flex flex-col gap-1">
            <p-autocomplete
                #val="ngModel"
                [(ngModel)]="value"
                [suggestions]="items"
                [invalid]="val.invalid && (val.touched || exampleForm.submitted)"
                name="val"
                (completeMethod)="search($event)"
                required
                fluid
            />
            @if (val.invalid && (val.touched || exampleForm.submitted)) {
                <p-message severity="error" size="small" variant="simple">Value is required.</p-message>
            }
        </div>
        <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
    </form>
</div>`,

        typescript: `import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'autocomplete-template-driven-forms-demo',
    templateUrl: './autocomplete-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, MessageModule, ToastModule, ButtonModule]
})
export class TemplateDrivenFormsDemo {
    messageService = inject(MessageService);

    items: any[] = [];

    value: any;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}`
    };
}
