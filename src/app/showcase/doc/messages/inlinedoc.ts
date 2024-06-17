import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'messages-inline-demo',
    template: `
        <app-docsectiontext>
            <p><i>p-message</i> component is used to display inline messages mostly within forms.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex justify-content-center gap-2">
                <p-message severity="info" text="Message Content"></p-message>
                <p-message severity="success" text="Message Content"></p-message>
                <p-message severity="warn" text="Message Content"></p-message>
                <p-message severity="error" text="Message Content"></p-message>
            </div>

            <div class="mt-4">
                <input type="text" pInputText placeholder="Username" class="ng-dirty ng-invalid mr-2" />
                <p-message severity="error" text="Field is required"></p-message>
            </div>

            <div class="mt-4">
                <input type="text" pInputText placeholder="Email" class="ng-dirty ng-invalid mr-2" />
                <p-message severity="error"></p-message>
            </div>

            <div class="field p-fluid mt-4">
                <label for="username">Username</label>
                <input id="username" type="username" aria-describedby="username-help" class="ng-invalid ng-dirty" pInputText />
                <small id="username-help" class="p-error">Username is not available.</small>
            </div>
        </div>
        <app-code [code]="code" selector="messages-inline-demo"></app-code>
    `
})
export class InlineDoc {
    code: Code = {
        basic: `<div class="flex justify-content-center gap-2">
    <p-message severity="info" text="Message Content"></p-message>
    <p-message severity="success" text="Message Content"></p-message>  
    <p-message severity="warn" text="Message Content"></p-message>  
    <p-message severity="error" text="Message Content"></p-message>
</div>

<div class="mt-4">
    <input type="text" pInputText placeholder="Username" class="ng-dirty ng-invalid mr-2">
    <p-message severity="error" text="Field is required"></p-message>
</div>

<div class="mt-4">
    <input type="text" pInputText placeholder="Email" class="ng-dirty ng-invalid mr-2">
    <p-message severity="error"></p-message>
</div>

<div class="field p-fluid mt-4">
    <label for="username">Username</label>
    <input id="username" type="username" aria-describedby="username-help" class="ng-invalid ng-dirty" pInputText />
    <small id="username-help" class="p-error">Username is not available.</small>
</div>`,
        html: `
<div class="card">
    <div class="flex justify-content-center gap-2">
        <p-message severity="info" text="Message Content"></p-message>
        <p-message severity="success" text="Message Content"></p-message>  
        <p-message severity="warn" text="Message Content"></p-message>  
        <p-message severity="error" text="Message Content"></p-message>
    </div>

    <div class="mt-4">
        <input type="text" pInputText placeholder="Username" class="ng-dirty ng-invalid mr-2">
        <p-message severity="error" text="Field is required"></p-message>
    </div>

    <div class="mt-4">
        <input type="text" pInputText placeholder="Email" class="ng-dirty ng-invalid mr-2">
        <p-message severity="error"></p-message>
    </div>

    <div class="field p-fluid mt-4">
        <label for="username">Username</label>
        <input id="username" type="username" aria-describedby="username-help" class="ng-invalid ng-dirty" pInputText />
        <small id="username-help" class="p-error">Username is not available.</small>
    </div>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'messages-inline-demo',
    templateUrl: './messages-inline-demo.html'
})
export class MessagesInlineDemo { }`
    };
}
