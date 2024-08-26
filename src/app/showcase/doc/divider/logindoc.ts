import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'divider-login-demo',
    template: `
        <app-docsectiontext>
            <p>Sample implementation of a login form using a divider with content.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-col md:flex-row">
                <div class="w-full md:w-5/12 flex flex-col items-center justify-center gap-4 py-8">
                    <div class="flex flex-wrap justify-center items-center gap-2">
                        <label class="w-24">Username</label>
                        <input pInputText id="username" type="text" class="w-48" />
                    </div>
                    <div class="flex flex-wrap justify-center items-center gap-2">
                        <label class="w-24">Password</label>
                        <input pInputText id="password" type="password" class="w-48" />
                    </div>
                    <p-button label="Login" icon="pi pi-user" styleClass="w-40 mx-auto" />
                </div>
                <div class="w-full md:w-2/12">
                    <p-divider layout="vertical" styleClass="hidden md:flex"><b>OR</b></p-divider>
                    <p-divider layout="horizontal" styleClass="flex md:hidden" [align]="'center'"><b>OR</b></p-divider>
                </div>
                <div class="w-full md:w-5/12 flex items-center justify-center py-8">
                    <p-button label="Sign Up" icon="pi pi-user-plus" styleClass="p-button-success w-40" />
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="divider-login-demo"></app-code>
    `
})
export class LoginDoc {
    code: Code = {
        basic: `<div class="flex flex-col md:flex-row">
    <div class="w-full md:w-5/12 flex flex-col items-center justify-center gap-4 py-8">
        <div class="flex flex-wrap justify-center items-center gap-2">
            <label class="w-24">Username</label>
            <input pInputText id="username" type="text" class="w-48" />
        </div>
        <div class="flex flex-wrap justify-center items-center gap-2">
            <label class="w-24">Password</label>
            <input pInputText id="password" type="password" class="w-48" />
        </div>
        <p-button label="Login" icon="pi pi-user" styleClass="w-40 mx-auto" />
    </div>
    <div class="w-full md:w-2/12">
        <p-divider layout="vertical" styleClass="hidden md:flex">
            <b>OR</b>
        </p-divider>
        <p-divider layout="horizontal" styleClass="flex md:hidden" [align]="'center'">
            <b>OR</b>
        </p-divider>
    </div>
    <div class="w-full md:w-5/12 flex items-center justify-center py-8">
        <p-button label="Sign Up" icon="pi pi-user-plus" styleClass="p-button-success w-40" />
    </div>
</div>`,

        html: `<div class="card">
    <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-5/12 flex flex-col items-center justify-center gap-4 py-8">
            <div class="flex flex-wrap justify-center items-center gap-2">
                <label class="w-24">Username</label>
                <input pInputText id="username" type="text" class="w-48" />
            </div>
            <div class="flex flex-wrap justify-center items-center gap-2">
                <label class="w-24">Password</label>
                <input pInputText id="password" type="password" class="w-48" />
            </div>
            <p-button label="Login" icon="pi pi-user" styleClass="w-40 mx-auto" />
        </div>
        <div class="w-full md:w-2/12">
            <p-divider layout="vertical" styleClass="hidden md:flex">
                <b>OR</b>
            </p-divider>
            <p-divider layout="horizontal" styleClass="flex md:hidden" [align]="'center'">
                <b>OR</b>
            </p-divider>
        </div>
        <div class="w-full md:w-5/12 flex items-center justify-center py-8">
            <p-button label="Sign Up" icon="pi pi-user-plus" styleClass="p-button-success w-40" />
        </div>
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
        
@Component({
    selector: 'divider-login-demo',
    templateUrl: './divider-login-demo.html',
    standalone: true,
    imports: [DividerModule, ButtonModule, InputTextModule]
})
export class DividerLoginDemo {}`
    };
}
