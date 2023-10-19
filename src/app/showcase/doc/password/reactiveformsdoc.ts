import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '../../domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Password can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-password formControlName="value" [feedback]="false"></p-password>
            </form>
        </div>
        <app-code [code]="code" selector="password-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl()
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup">
    <p-password formControlName="value" [feedback]="false"></p-password>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-password formControlName="value" [feedback]="false"></p-password>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'password-reactive-forms-demo',
    templateUrl: './password-reactive-forms-demo.html'
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
