import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Slider can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-slider formControlName="value"></p-slider>
            </form>
        </div>
        <app-code [code]="code" selector="slider-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl(20)
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup">
    <p-slider formControlName="value"></p-slider>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-slider formControlName="value"></p-slider>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'slider-reactive-forms-demo',
    templateUrl: './slider-reactive-forms-demo.html'
})
export class SliderReactiveFormsDemo implements OnInit {
    formGroup: FormGroup;

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
