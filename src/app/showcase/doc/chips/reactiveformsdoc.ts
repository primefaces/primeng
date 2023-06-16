import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '../../domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Chips can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <form [formGroup]="formGroup">
                <p-chips formControlName="values"></p-chips>
            </form>
        </div>
        <app-code [code]="code" selector="chips-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            values: new FormControl<string[] | null>(null)
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup">
    <p-chips formControlName="values"></p-chips>
</form>`,

        html: `
<div class="card p-fluid">
    <form [formGroup]="formGroup">
        <p-chips formControlName="values"></p-chips>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'chips-reactive-forms-demo',
    templateUrl: './chips-reactive-forms-demo.html',
    styleUrls: ['./chips-reactive-forms-demo.scss']
})
export class ChipsReactiveFormsDemo implements OnInit {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            values: new FormControl<string[] | null>(null)
        });
    }
}`
    };
}
