import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '@domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>Slider can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-slider formControlName="value" styleClass="w-14rem"/>
            </form>
        </div>
        <app-code [code]="code" selector="slider-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl(20)
        });
    }

    code: Code = {
        basic: `<form [formGroup]="formGroup">
    <p-slider formControlName="value" styleClass="w-14rem" />
</form>`,

        html: `<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-slider formControlName="value" styleClass="w-14rem" />
    </form>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

@Component({
    selector: 'slider-reactive-forms-demo',
    templateUrl: './slider-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, SliderModule]
})
export class SliderReactiveFormsDemo implements OnInit {
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
