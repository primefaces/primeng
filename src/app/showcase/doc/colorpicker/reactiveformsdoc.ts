import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '@domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>ColorPicker can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <form [formGroup]="formGroup">
                <p-colorPicker formControlName="color" />
            </form>
        </div>
        <app-code [code]="code" selector="color-picker-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            color: new FormControl()
        });
    }

    code: Code = {
        basic: `<form [formGroup]="formGroup">
    <p-colorPicker formControlName="color" />
</form>`,

        html: `<div class="card flex justify-center">
    <form [formGroup]="formGroup">
        <p-colorPicker formControlName="color" />
    </form>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
    selector: 'color-picker-reactive-forms-demo',
    templateUrl: './color-picker-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, ColorPickerModule]
})
export class ColorPickerReactiveFormsDemo {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            color: new FormControl()
        });
    }
}`
    };
}
