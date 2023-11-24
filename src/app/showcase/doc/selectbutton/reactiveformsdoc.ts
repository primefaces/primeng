import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '../../domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>SelectButton can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-selectButton [options]="stateOptions" formControlName="value" optionLabel="label" optionValue="value"></p-selectButton>
            </form>
        </div>
        <app-code [code]="code" selector="select-button-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup!: FormGroup;

    stateOptions: any[] = [
        { label: 'Off', value: 'off' },
        { label: 'On', value: 'on' }
    ];

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl('on')
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup">
    <p-selectButton [options]="stateOptions" formControlName="value" optionLabel="label" optionValue="value"></p-selectButton>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-selectButton [options]="stateOptions" formControlName="value" optionLabel="label" optionValue="value"></p-selectButton>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'select-button-reactive-forms-demo',
    templateUrl: './select-button-reactive-forms-demo.html'
})
export class SelectButtonReactiveFormsDemo implements OnInit {
    formGroup!: FormGroup;

    stateOptions: any[] = [
        { label: 'Off', value: 'off' },
        { label: 'On', value: 'on' }
    ];

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl('on')
        });
    }
}`
    };
}
