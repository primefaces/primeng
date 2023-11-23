import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'divider-login-demo',
    template: ` 
        <app-docsectiontext>
            <p>Sample implementation of a login form using a divider with content.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-column md:flex-row">
                <div class="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div class="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label class="w-6rem">Username</label>
                        <input pInputText id="username" type="text" class="w-12rem" />
                    </div>
                    <div class="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label class="w-6rem">Password</label>
                        <input pInputText id="password" type="password" class="w-12rem" />
                    </div>
                    <p-button label="Login" icon="pi pi-user" styleClass="w-10rem mx-auto"></p-button>
                </div>
                <div class="w-full md:w-2">
                    <p-divider layout="vertical" styleClass="hidden md:flex"><b>OR</b></p-divider>
                    <p-divider layout="horizontal" styleClass="flex md:hidden" [align]="'center'"><b>OR</b></p-divider>
                </div>
                <div class="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <p-button label="Sign Up" icon="pi pi-user-plus" styleClass="p-button-success w-10rem"></p-button>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="divider-login-demo"></app-code>
    `
})
export class LoginDoc {

    code: Code = {
        basic: `
<div class="flex flex-column md:flex-row">
    <div class="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
        <div class="flex flex-wrap justify-content-center align-items-center gap-2">
            <label class="w-6rem">Username</label>
            <input pInputText id="username" type="text" class="w-12rem" />
        </div>
        <div class="flex flex-wrap justify-content-center align-items-center gap-2">
            <label class="w-6rem">Password</label>
            <input pInputText id="password" type="password" class="w-12rem" />
        </div>
        <p-button label="Login" icon="pi pi-user" styleClass="w-10rem mx-auto"></p-button>
    </div>
    <div class="w-full md:w-2">
        <p-divider layout="vertical" styleClass="hidden md:flex"><b>OR</b></p-divider>
        <p-divider layout="horizontal" styleClass="flex md:hidden" [align]="'center'"><b>OR</b></p-divider>
    </div>
    <div class="w-full md:w-5 flex align-items-center justify-content-center py-5">
        <p-button label="Sign Up" icon="pi pi-user-plus" styleClass="p-button-success w-10rem"></p-button>
    </div>
</div>`,

        html: `
<div class="card">
    <div class="flex flex-column md:flex-row">
        <div class="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
            <div class="flex flex-wrap justify-content-center align-items-center gap-2">
                <label class="w-6rem">Username</label>
                <input pInputText id="username" type="text" class="w-12rem" />
            </div>
            <div class="flex flex-wrap justify-content-center align-items-center gap-2">
                <label class="w-6rem">Password</label>
                <input pInputText id="password" type="password" class="w-12rem" />
            </div>
            <p-button label="Login" icon="pi pi-user" styleClass="w-10rem mx-auto"></p-button>
        </div>
        <div class="w-full md:w-2">
            <p-divider layout="vertical" styleClass="hidden md:flex"><b>OR</b></p-divider>
            <p-divider layout="horizontal" styleClass="flex md:hidden" [align]="'center'"><b>OR</b></p-divider>
        </div>
        <div class="w-full md:w-5 flex align-items-center justify-content-center py-5">
            <p-button label="Sign Up" icon="pi pi-user-plus" styleClass="p-button-success w-10rem"></p-button>
        </div>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'divider-login-demo',
    templateUrl: './divider-login-demo.html'
})
export class DividerLoginDemo {}`
    };
}
