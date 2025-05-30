import { Code } from '@/domain/code';
import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'reactive-forms-doc',
    standalone: false,
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full sm:w-56">
                <div class="flex flex-col gap-1">
                    <input pInputText type="text" id="username" placeholder="Username" formControlName="username" />
                    @if (isInvalid('username')) {
                        <p-message severity="error" size="small" variant="simple">Username is required.</p-message>
                    }
                </div>
                <div class="flex flex-col gap-1">
                    <input pInputText type="email" id="email" placeholder="Email" formControlName="email" />
                    @if (isInvalid('email')) {
                        <p-message severity="error" size="small" variant="simple">Email is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
        <app-code [code]="code" selector="template-driven-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc {
    messageService = inject(MessageService);

    exampleForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
        }

        if (this.exampleForm.invalid) {
            this.exampleForm.markAllAsTouched();
            return;
        }
    }

    isInvalid(controlName: string) {
        return this.exampleForm.get(controlName)?.invalid && this.exampleForm.get(controlName)?.touched;
    }

    code: Code = {
        basic: `<div class="card flex justify-center">
    <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full sm:w-56">
        <div class="flex flex-col gap-1">
            <input pInputText type="text" id="username" placeholder="Username" formControlName="username" />
            @if (isInvalid('username')) {
                <p-message severity="error" size="small" variant="simple">Username is required.</p-message>
            }
        </div>
        <div class="flex flex-col gap-1">
            <input pInputText type="email" id="email" placeholder="Email" formControlName="email"/>
            @if (isInvalid('email')) {
                <p-message severity="error" size="small" variant="simple">Email is required.</p-message>
            }
        </div>
        <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
    </form>
</div>`,

        html: `<p-toast />
<div class="card flex justify-center">
    <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full sm:w-56">
        <div class="flex flex-col gap-1">
            <input pInputText type="text" id="username" placeholder="Username" formControlName="username" />
            @if (isInvalid('username')) {
                <p-message severity="error" size="small" variant="simple">Username is required.</p-message>
            }
        </div>
        <div class="flex flex-col gap-1">
            <input pInputText type="email" id="email" placeholder="Email" formControlName="email"/>
            @if (isInvalid('email')) {
                <p-message severity="error" size="small" variant="simple">Email is required.</p-message>
            }
        </div>
        <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
    </form>
</div>`,

        typescript: `import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'reactive-forms-demo',
    templateUrl: './reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule, MessageModule]
})
export class ReactiveFormsDemo {
    messageService = inject(MessageService);

    exampleForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    onSubmit() {
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
        }

        if(this.exampleForm.invalid) {
            this.exampleForm.markAllAsTouched();
            return;
        }
    }

    isInvalid(controlName: string) {
        return this.exampleForm.get(controlName)?.invalid && this.exampleForm.get(controlName)?.touched;
    }

}`
    };
}
