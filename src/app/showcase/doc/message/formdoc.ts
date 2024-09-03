import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'form-doc',
    template: `
        <app-docsectiontext>
            <p>Validation errors in a form are displayed with the <i>error</i> severity.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap mb-4 gap-2">
                <input pInputText placeholder="Username" aria-label="username" class="ng-invalid ng-dirty" />
                <p-message severity="error">Username is required</p-message>
            </div>
            <div class="flex flex-wrap gap-2">
                <input pInputText placeholder="Email" aria-label="email" class="ng-invalid ng-dirty" />
                <p-message severity="error" icon="pi pi-times-circle" />
            </div>
        </div>
        <app-code [code]="code" selector="message-form-demo"></app-code>
    `,
})
export class FormDoc {
    code: Code = {
        basic: `<div class="flex flex-wrap mb-4 gap-2">
    <input pInputText placeholder="Username" aria-label="username" class="ng-invalid ng-dirty" />
    <p-message severity="error">Username is required</p-message>
</div>
<div class="flex flex-wrap gap-2">
    <input pInputText placeholder="Email" aria-label="email" class="ng-invalid ng-dirty" />
    <p-message severity="error" icon="pi pi-times-circle" />
</div>`,

        html: `<div class="card">
    <div class="flex flex-wrap mb-4 gap-2">
        <input pInputText placeholder="Username" aria-label="username" class="ng-invalid ng-dirty" />
        <p-message severity="error">Username is required</p-message>
    </div>
    <div class="flex flex-wrap gap-2">
        <input pInputText placeholder="Email" aria-label="email" class="ng-invalid ng-dirty" />
        <p-message severity="error" icon="pi pi-times-circle" />
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'message-form-demo',
    templateUrl: './message-form-demo.html',
    standalone: true,
    imports: [MessageModule, InputTextModule]
})
export class MessageFormDemo {}`,
    };
}
