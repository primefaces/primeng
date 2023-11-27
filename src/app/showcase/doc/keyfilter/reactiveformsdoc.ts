import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '../../domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>KeyFilter can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <label for="integer" class="font-bold block mb-2"> Integer </label>
                <input pInputText id="integer" pKeyFilter="int" class="w-full" formControlName="value" />
            </form>
        </div>
        <app-code [code]="code" selector="key-filter-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl(1234)
        });
    }

    code: Code = {
        basic: `<form [formGroup]="formGroup">
    <label for="integer" class="font-bold block mb-2"> Integer </label>
    <input pInputText id="integer" pKeyFilter="int" class="w-full" formControlName="value"/>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <label for="integer" class="font-bold block mb-2"> Integer </label>
        <input pInputText id="integer" pKeyFilter="int" class="w-full" formControlName="value"/>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'key-filter-reactive-forms-demo',
    templateUrl: './key-filter-reactive-forms-demo.html'
})
export class KeyFilterReactiveFormsDemo implements OnInit {
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl(1234)
        });
    }
}`
    };
}
