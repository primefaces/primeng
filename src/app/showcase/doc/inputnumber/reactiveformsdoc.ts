import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '@domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>InputNumber can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-inputNumber inputId="integeronly" formControlName="value" />
            </form>
        </div>
        <app-code [code]="code" selector="input-number-reactive-forms-demo"></app-code>
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
    <p-inputNumber inputId="integeronly" formControlName="value" />
</form>`,

        html: `<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-inputNumber inputId="integeronly" formControlName="value" />
    </form>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'input-number-reactive-forms-demo',
    templateUrl: './input-number-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, InputNumberModule],
})
export class InputNumberReactiveFormsDemo implements OnInit {
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl(1234)
        });
    }
}`
    };
}
