import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'divider-login-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Sample implementation of a login form using a divider with content.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="grid">
                <div class="col-5 flex align-items-center justify-content-center">
                    <div class="p-fluid">
                        <div class="field">
                            <label for="username">Username</label>
                            <input pInputText id="username" type="text" />
                        </div>
                        <div class="field">
                            <label for="password">Password</label>
                            <input pInputText id="password" type="password" />
                        </div>
                        <p-button label="Login"></p-button>
                    </div>
                </div>
                <div class="col-2">
                    <p-divider layout="vertical">
                        <b>OR</b>
                    </p-divider>
                </div>
                <div class="col-5 flex align-items-center justify-content-center">
                    <p-button label="Sign Up" icon="pi pi-user-plus" styleClass="p-button-success"></p-button>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="divider-login-demo"></app-code>
    </section>`
})
export class LoginDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<div class="grid">
    <div class="col-5 flex align-items-center justify-content-center">
        <div class="p-fluid">
            <div class="field">
                <label for="username">Username</label>
                <input pInputText id="username" type="text" />
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input pInputText id="password" type="password" />
            </div>
            <p-button label="Login"></p-button>
        </div>
    </div>
    <div class="col-2">
        <p-divider layout="vertical">
            <b>OR</b>
        </p-divider>
    </div>
    <div class="col-5 flex align-items-center justify-content-center">
        <p-button label="Sign Up" icon="pi pi-user-plus" styleClass="p-button-success"></p-button>
    </div>
</div>`,

        html: `
<div class="card">
    <div class="grid">
        <div class="col-5 flex align-items-center justify-content-center">
            <div class="p-fluid">
                <div class="field">
                    <label for="username">Username</label>
                    <input pInputText id="username" type="text" />
                </div>
                <div class="field">
                    <label for="password">Password</label>
                    <input pInputText id="password" type="password" />
                </div>
                <p-button label="Login"></p-button>
            </div>
        </div>
        <div class="col-2">
            <p-divider layout="vertical">
                <b>OR</b>
            </p-divider>
        </div>
        <div class="col-5 flex align-items-center justify-content-center">
            <p-button label="Sign Up" icon="pi pi-user-plus" styleClass="p-button-success"></p-button>
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
