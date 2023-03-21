import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>ColorPicker can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-colorPicker formControlName="color"></p-colorPicker>
            </form>
        </div>
        <app-code [code]="code" selector="color-picker-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            color: new FormControl()
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup">
    <p-colorPicker formControlName="color"></p-colorPicker>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-colorPicker formControlName="color"></p-colorPicker>
    </form>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'color-picker-reactive-forms-demo',
    templateUrl: './color-picker-reactive-forms-demo.html'
})
export class ColorPickerReactiveFormsDemo implements OnInit {
    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            color: new FormControl()
        });
    }
}`
    };
}
