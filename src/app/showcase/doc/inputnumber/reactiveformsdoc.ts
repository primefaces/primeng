import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>InputNumber can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-inputNumber inputId="integeronly" formControlName="value"></p-inputNumber>
            </form>
        </div>
        <app-code [code]="code" selector="input-number-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl(1234)
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup">
    <p-inputNumber inputId="integeronly" formControlName="value"></p-inputNumber>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-inputNumber inputId="integeronly" formControlName="value"></p-inputNumber>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'input-number-reactive-forms-demo',
    templateUrl: './input-number-reactive-forms-demo.html'
})
export class InputNumberReactiveFormsDemo implements OnInit {
    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl(1234)
        });
    }
}`
    };
}
