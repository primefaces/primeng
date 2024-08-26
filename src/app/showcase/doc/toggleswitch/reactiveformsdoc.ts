import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '@domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>ToggleSwitch can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <form [formGroup]="formGroup">
                <p-toggleSwitch formControlName="checked" />
            </form>
        </div>
        <app-code [code]="code" selector="toggle-switch-reactive-forms-demo"></app-code>
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
        basic: `<p-toggleSwitch formControlName="checked" />`,

        html: `<div class="card flex justify-center">
    <p-toggleSwitch formControlName="checked" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
    selector: 'toggle-switch-reactive-forms-demo',
    templateUrl: './toggle-switch-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, ToggleSwitchModule]
})
export class ToggleSwitchReactiveFormsDemo implements OnInit {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            checked: new FormControl<boolean>(false)
        });
    }
}`
    };
}
