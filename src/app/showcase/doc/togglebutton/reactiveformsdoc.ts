import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '@domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>ToggleButton can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-toggleButton formControlName="checked" onLabel="On" offLabel="Off" />
            </form>
        </div>
        <app-code [code]="code" selector="toggle-button-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            checked: new FormControl<boolean>(false)
        });
    }

    code: Code = {
        basic: `<form [formGroup]="formGroup">
    <p-toggleButton 
        formControlName="checked" 
        onLabel="On" 
        offLabel="Off" />
</form>`,

        html: `<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-toggleButton 
            formControlName="checked" 
            onLabel="On" 
            offLabel="Off" />
    </form>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    selector: 'toggle-button-reactive-forms-demo',
    templateUrl: './toggle-button-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, ToggleButtonModule]
})
export class ToggleButtonReactiveFormsDemo implements OnInit {
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            checked: new FormControl<boolean>(false)
        });
    }
}`
    };
}
