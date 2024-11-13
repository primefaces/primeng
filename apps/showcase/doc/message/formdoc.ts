import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'form-doc',
    template: `
        <app-docsectiontext>
            <p>Validation errors in a form are displayed with the <i>error</i> severity.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div class="flex flex-col gap-4">
                <p-message severity="error" icon="pi pi-times-circle" styleClass="mb-2">Validation Failed</p-message>
                <div class="flex flex-col">
                    <input pInputText placeholder="Username" aria-label="username" class="ng-invalid ng-dirty" />
                    <p-message severity="error" variant="simple" size="small">Username is required</p-message>
                </div>
                <div class="flex flex-col">
                    <input pInputText placeholder="Email" aria-label="email" class="ng-invalid ng-dirty" />
                    <p-message severity="error" variant="simple" size="small">Email is not valid</p-message>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="message-form-demo"></app-code>
    `
})
export class FormDoc {
    code: Code = {
        basic: `<div class="flex flex-col gap-4">
    <p-message severity="error" icon="pi pi-times-circle" styleClass="mb-2">Validation Failed</p-message>
    <div class="flex flex-col">
        <input pInputText placeholder="Username" aria-label="username" class="ng-invalid ng-dirty" />
        <p-message severity="error" variant="simple" size="small">Username is required</p-message>
    </div>
    <div class="flex flex-col">
        <input pInputText placeholder="Email" aria-label="email" class="ng-invalid ng-dirty" />
        <p-message severity="error" variant="simple" size="small">Email is not valid</p-message>
    </div>
</div>`,

        html: `<div class="card flex justify-center">
    <div class="flex flex-col gap-4">
        <p-message severity="error" icon="pi pi-times-circle" styleClass="mb-2">Validation Failed</p-message>
        <div class="flex flex-col">
            <input pInputText placeholder="Username" aria-label="username" class="ng-invalid ng-dirty" />
            <p-message severity="error" variant="simple" size="small">Username is required</p-message>
        </div>
        <div class="flex flex-col">
            <input pInputText placeholder="Email" aria-label="email" class="ng-invalid ng-dirty" />
            <p-message severity="error" variant="simple" size="small">Email is not valid</p-message>
        </div>
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'message-form-demo',
    templateUrl: './message-form-demo.html',
    standalone: true,
    imports: [Message, InputTextModule]
})
export class MessageFormDemo {}`
    };
}
