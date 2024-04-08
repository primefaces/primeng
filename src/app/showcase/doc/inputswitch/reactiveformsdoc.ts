import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '@domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>InputSwitch can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-inputSwitch formControlName="checked"/>
            </form>
        </div>
        <app-code [code]="code" selector="input-switch-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            checked: new FormControl()
        });
    }

    code: Code = {
        basic: `<p-inputSwitch formControlName="checked" />`,

        html: `<div class="card flex justify-content-center">
    <p-inputSwitch formControlName="checked" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
    selector: 'input-switch-reactive-forms-demo',
    templateUrl: './input-switch-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, InputSwitchModule]
})
export class InputSwitchReactiveFormsDemo implements OnInit {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            checked: new FormControl<boolean>(false)
        });
    }
}`
    };
}
