import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>InputTextarea can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <textarea rows="5" cols="30" pInputTextarea formControlName="text"></textarea>
            </form>
        </div>
        <app-code [code]="code" selector="input-textarea-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            text: new FormControl<string | null>(null)
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup">
    <textarea rows="5" cols="30" pInputTextarea formControlName="text"></textarea>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <textarea rows="5" cols="30" pInputTextarea formControlName="text"></textarea>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'input-textarea-reactive-forms-demo',
    templateUrl: './input-textarea-reactive-forms-demo.html'
})
export class InputTextareaReactiveFormsDemo implements OnInit {
    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            text: new FormControl<string | null>(null)
        });
    }
}`
    };
}
