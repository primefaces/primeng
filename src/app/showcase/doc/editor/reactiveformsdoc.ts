import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '../../domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>Editor can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card">
            <form [formGroup]="formGroup">
                <p-editor formControlName="text" [style]="{ height: '320px' }"></p-editor>
            </form>
        </div>
        <app-code [code]="code" selector="editor-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {

    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            text: new FormControl()
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup">
    <p-editor formControlName="text" [style]="{ height: '320px' }"></p-editor>
</form>`,

        html: `
<div class="card">
    <form [formGroup]="formGroup">
        <p-editor formControlName="text" [style]="{ height: '320px' }"></p-editor>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'editor-reactive-forms-demo',
    templateUrl: './editor-reactive-forms-demo.html'
})
export class EditorReactiveFormsDemo implements OnInit {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            text: new FormControl()
        });
    }
}`
    };
}
