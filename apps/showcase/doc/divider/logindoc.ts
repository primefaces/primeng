import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'divider-login-demo',
    template: `
        <app-docsectiontext>
            <p>Sample implementation of a login form using a divider with content.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-col md:flex-row">
                <div class="w-full md:w-5/12 flex flex-col items-center justify-center gap-3 py-5">
                    <div class="flex flex-col gap-2">
                        <label for="username">Username</label>
                        <input pInputText id="username" type="text" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="password">Password</label>
                        <input pInputText id="password" type="password" />
                    </div>
                    <div class="flex">
                        <p-button label="Login" icon="pi pi-user" class="w-full max-w-[17.35rem]" styleClass="w-full mx-auto" />
                    </div>
                </div>
                <div class="w-full md:w-2/12">
                    <p-divider layout="vertical" class="!hidden md:!flex"><b>OR</b></p-divider>
                    <p-divider layout="horizontal" class="!flex md:!hidden" align="center"><b>OR</b></p-divider>
                </div>
                <div class="w-full md:w-5/12 flex items-center justify-center py-5">
                    <p-button label="Sign Up" icon="pi pi-user-plus" severity="success" class="w-full max-w-[17.35rem]" styleClass="w-full mx-auto" />
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="divider-login-demo"></app-code>
    `
})
export class LoginDoc {
    code: Code = {
        basic: `<div class="flex flex-col md:flex-row">
    <div class="w-full md:w-5/12 flex flex-col items-center justify-center gap-3 py-5">
        <div class="flex flex-col gap-2">
            <label for="username">Username</label>
            <input pInputText id="username" type="text" />
        </div>
        <div class="flex flex-col gap-2">
            <label for="password">Password</label>
            <input pInputText id="password" type="password" />
        </div>
        <div class="flex">
            <p-button label="Login" icon="pi pi-user" class="w-full max-w-[17.35rem]" styleClass="w-full mx-auto" />
        </div>
    </div>
    <div class="w-full md:w-2/12">
        <p-divider layout="vertical" class="!hidden md:!flex"><b>OR</b></p-divider>
        <p-divider layout="horizontal" class="!flex md:!hidden" align="center"><b>OR</b></p-divider>
    </div>
    <div class="w-full md:w-5/12 flex items-center justify-center py-5">
        <p-button label="Sign Up" icon="pi pi-user-plus" severity="success" class="w-full max-w-[17.35rem]" styleClass="w-full mx-auto" />
    </div>
</div>`,

        html: `<div class="card">
    <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-5/12 flex flex-col items-center justify-center gap-3 py-5">
            <div class="flex flex-col gap-2">
                <label for="username">Username</label>
                <input pInputText id="username" type="text" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <input pInputText id="password" type="password" />
            </div>
            <div class="flex">
                <p-button label="Login" icon="pi pi-user" class="w-full max-w-[17.35rem]" styleClass="w-full mx-auto" />
            </div>
        </div>
        <div class="w-full md:w-2/12">
            <p-divider layout="vertical" class="!hidden md:!flex"><b>OR</b></p-divider>
            <p-divider layout="horizontal" class="!flex md:!hidden" align="center"><b>OR</b></p-divider>
        </div>
        <div class="w-full md:w-5/12 flex items-center justify-center py-5">
            <p-button label="Sign Up" icon="pi pi-user-plus" severity="success" class="w-full max-w-[17.35rem]" styleClass="w-full mx-auto" />
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
