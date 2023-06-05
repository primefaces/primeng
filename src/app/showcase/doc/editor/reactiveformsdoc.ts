import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Editor can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card">
            <form [formGroup]="formGroup">
                <p-editor formControlName="text" [style]="{ height: '320px' }"></p-editor>
            </form>
        </div>
        <app-code [code]="code" selector="editor-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    formGroup: FormGroup;

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
    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            text: new FormControl()
        });
    }
}`
    };
}
