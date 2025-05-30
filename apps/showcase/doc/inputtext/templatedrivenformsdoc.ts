import { Code } from '@/domain/code';
import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'template-driven-forms-doc',
    standalone: false,
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4 w-full sm:w-56">
                <div class="flex flex-col gap-1">
                    <input pInputText type="text" id="username" placeholder="Username" name="username" [(ngModel)]="user.username" #username="ngModel" required />
                    @if (username.invalid && username.touched) {
                        <p-message severity="error" size="small" variant="simple">Username is required.</p-message>
                    }
                </div>
                <div class="flex flex-col gap-1">
                    <input pInputText type="email" id="email" name="email" placeholder="Email" [(ngModel)]="user.email" #email="ngModel" required email />
                    @if (email.invalid && email.touched) {
                        <p-message severity="error" size="small" variant="simple">Email is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
        <app-code [code]="code" selector="template-driven-forms-demo"></app-code>
    `
})
export class TemplateDrivenFormsDoc {
    messageService = inject(MessageService);

    user = {
        username: '',
        email: ''
    };

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
        } else {
            Object.keys(form.controls).forEach((field) => {
                const control = form.controls[field];
                control.markAsTouched({ onlySelf: true });
            });
        }
    }

    code: Code = {
        basic: `<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-1">
        <input pInputText type="text" id="username" placeholder="Username" name="username" [(ngModel)]="user.username" #username="ngModel" required />
        @if (username.invalid && username.touched) {
            <p-message severity="error" size="small" variant="simple">Username is required.</p-message>
        }
    </div>
    <div class="flex flex-col gap-1">
        <input pInputText type="email" id="email" name="email" placeholder="Email" [(ngModel)]="user.email" #email="ngModel" required email />
        @if (email.invalid && email.touched) {
            <p-message severity="error" size="small" variant="simple">Email is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>`,

        html: `<p-toast />
<div class="card flex justify-center">
    <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4 w-full sm:w-56">
        <div class="flex flex-col gap-1">
            <input pInputText type="text" id="username" placeholder="Username" name="username" [(ngModel)]="user.username" #username="ngModel" required />
            @if (username.invalid && username.touched) {
                <p-message severity="error" size="small" variant="simple">Username is required.</p-message>
            }
        </div>
        <div class="flex flex-col gap-1">
            <input pInputText type="email" id="email" name="email" placeholder="Email" [(ngModel)]="user.email" #email="ngModel" required email />
            @if (email.invalid && email.touched) {
                <p-message severity="error" size="small" variant="simple">Email is required.</p-message>
            }
        </div>
        <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
    </form>
</div>`,

        typescript: `import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'template-driven-forms-demo',
    templateUrl: './template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, ToastModule]
})
export class TemplateDrivenFormsDemo {
    messageService = inject(MessageService);

    user = {
            username: '',
            email: ''
    };

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
        } else {
            Object.keys(form.controls).forEach((field) => {
                const control = form.controls[field];
                control.markAsTouched({ onlySelf: true });
            });
        }
    }
}`
    };
}
