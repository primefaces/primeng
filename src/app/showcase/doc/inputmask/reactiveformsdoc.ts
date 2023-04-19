import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>InputMask can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-inputMask mask="99-999999" formControlName="value" placeholder="99-999999"></p-inputMask>
            </form>
        </div>
        <app-code [code]="code" selector="input-mask-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl<string | null>(null)
        });
    }

    code: Code = {
        basic: `
<p-inputMask mask="99-999999" [(ngModel)]="value" placeholder="99-999999"></p-inputMask>`,

        html: `
<div class="card flex justify-content-center">
    <p-inputMask mask="99-999999" [(ngModel)]="value" placeholder="99-999999"></p-inputMask>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'input-mask-reactive-forms-demo',
    templateUrl: './input-mask-reactive-forms-demo.html'
})
export class InputMaskReactiveFormsDemo implements OnInit {
    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl<string | null>(null)
        });
    }
}`
    };
}
