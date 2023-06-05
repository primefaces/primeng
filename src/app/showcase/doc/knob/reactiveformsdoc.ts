import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Knob can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-knob formControlName="value"></p-knob>
            </form>
        </div>
        <app-code [code]="code" selector="knob-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl(32)
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup">
    <p-knob formControlName="value"></p-knob>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-knob formControlName="value"></p-knob>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'knob-reactive-forms-demo',
    templateUrl: './knob-reactive-forms-demo.html'
})
export class KnobReactiveFormsDemo implements OnInit {
    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl(32)
        });
    }
}`
    };
}
