import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Checkbox can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card">
            <form [formGroup]="formGroup" class="flex align-items-center justify-content-center gap-1">
                <p-checkbox formControlName="city" value="New York" inputId="ny"></p-checkbox>
                <label for="ny">New York</label>
            </form>
        </div>
        <app-code [code]="code" selector="checkbox-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            city: new FormControl<string | null>(null)
        });
    }

    code: Code = {
        basic: `
<form class="flex align-items-center gap-1" [formGroup]="formGroup">
    <p-checkbox formControlName="city" value="New York" inputId="ny"></p-checkbox>
    <label for="ny">New York</label>
</form>`,

        html: `
<div class="card">
    <form class="flex align-items-center gap-1" [formGroup]="formGroup">
        <p-checkbox formControlName="city" value="New York" inputId="ny"></p-checkbox>
        <label for="ny">New York</label>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'checkbox-reactive-forms-demo',
    templateUrl: './checkbox-reactive-forms-demo.html'
})
export class CheckboxReactiveFormsDemo implements OnInit{
    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            city: new FormControl<string | null>(null)
        });
    }
}`
    };
}
