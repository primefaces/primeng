import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>Password can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <form [formGroup]="formGroup">
                <p-password formControlName="value" [feedback]="false" autocomplete="off" />
            </form>
        </div>
        <app-code [code]="code" selector="password-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl()
        });
    }

    code: Code = {
        basic: `<form [formGroup]="formGroup">
    <p-password formControlName="value" [feedback]="false" />
</form>`,

        html: `<div class="card flex justify-center">
    <form [formGroup]="formGroup">
        <p-password formControlName="value" [feedback]="false" />
    </form>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    selector: 'password-reactive-forms-demo',
    templateUrl: './password-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, PasswordModule]
})
export class PasswordReactiveFormsDemo implements OnInit {
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl()
        });
    }
}`
    };
}
