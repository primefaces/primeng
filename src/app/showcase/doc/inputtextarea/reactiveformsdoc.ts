import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '@domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>InputTextarea can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <form [formGroup]="formGroup">
                <textarea rows="5" cols="30" pInputTextarea formControlName="text"></textarea>
            </form>
        </div>
        <app-code [code]="code" selector="input-textarea-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            text: new FormControl<string | null>(null)
        });
    }

    code: Code = {
        basic: `<form [formGroup]="formGroup">
    <textarea 
        rows="5" 
        cols="30" 
        pInputTextarea 
        formControlName="text">
    </textarea>
</form>`,

        html: `<div class="card flex justify-center">
    <form [formGroup]="formGroup">
        <textarea 
            rows="5"
            cols="30" 
            pInputTextarea 
            formControlName="text">
        </textarea>
    </form>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
    selector: 'input-textarea-reactive-forms-demo',
    templateUrl: './input-textarea-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextareaModule],
})
export class InputTextareaReactiveFormsDemo implements OnInit {
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            text: new FormControl<string | null>(null)
        });
    }
}`
    };
}
