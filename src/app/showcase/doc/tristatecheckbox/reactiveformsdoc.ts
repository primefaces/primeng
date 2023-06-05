import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>TriStateCheckbox can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup" class="flex flex-column align-items-center gap-3">
                <p-triStateCheckbox formControlName="checked" inputId="checked"></p-triStateCheckbox>
                <label for="checked">{{ formGroup.value.checked === null ? 'null' : formGroup.value.checked }}</label>
            </form>
        </div>
        <app-code [code]="code" selector="tri-state-checkbox-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            checked: new FormControl<boolean | null>(null)
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup" class="flex flex-column align-items-center gap-3">
    <p-triStateCheckbox formControlName="checked" inputId="checked"></p-triStateCheckbox>
    <label for="checked">{{ formGroup.value.checked === null ? 'null' : formGroup.value.checked }}</label>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup" class="flex flex-column align-items-center gap-3">
        <p-triStateCheckbox formControlName="checked" inputId="checked"></p-triStateCheckbox>
        <label for="checked">{{ formGroup.value.checked === null ? 'null' : formGroup.value.checked }}</label>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'tri-state-checkbox-reactive-forms-demo',
    templateUrl: './tri-state-checkbox-reactive-forms-demo.html'
})
export class TriStateCheckboxReactiveFormsDemo implements OnInit {
    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            checked: new FormControl<boolean | null>(null)
        });
    }
}`
    };
}
