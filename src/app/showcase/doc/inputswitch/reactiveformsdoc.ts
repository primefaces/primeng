import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '../../domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>InputSwitch can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-inputSwitch formControlName="checked"></p-inputSwitch>
            </form>
        </div>
        <app-code [code]="code" selector="input-switch-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            checked: new FormControl()
        });
    }

    code: Code = {
        basic: `
<p-inputSwitch formControlName="checked"></p-inputSwitch>`,

        html: `
<div class="card flex justify-content-center">
    <p-inputSwitch formControlName="checked"></p-inputSwitch>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'input-switch-reactive-forms-demo',
    templateUrl: './input-switch-reactive-forms-demo.html'
})
export class InputSwitchReactiveFormsDemo implements OnInit {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            checked: new FormControl<boolean>(false)
        });
    }
}`
    };
}
