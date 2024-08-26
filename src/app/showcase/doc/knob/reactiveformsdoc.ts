import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '@domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>Knob can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <form [formGroup]="formGroup">
                <p-knob formControlName="value" />
            </form>
        </div>
        <app-code [code]="code" selector="knob-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl(32)
        });
    }

    code: Code = {
        basic: `<form [formGroup]="formGroup">
    <p-knob formControlName="value" />
</form>`,

        html: `<div class="card flex justify-center">
    <form [formGroup]="formGroup">
        <p-knob formControlName="value" />
    </form>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';

@Component({
    selector: 'knob-reactive-forms-demo',
    templateUrl: './knob-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, KnobModule]
})
export class KnobReactiveFormsDemo implements OnInit {
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl(32)
        });
    }
}`
    };
}
