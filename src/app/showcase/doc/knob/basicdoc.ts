import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Knob is an input component and used with the standard <i>ngModel</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-knob [(ngModel)]="value"></p-knob>
        </div>
        <app-code [code]="code" selector="knob-basic-demo"></app-code>
    `
})
export class BasicDoc {

    value!: number;

    code: Code = {
        basic: `
<p-knob [(ngModel)]="value"></p-knob>`,

        html: `
<div class="card flex justify-content-center">
    <p-knob [(ngModel)]="value"></p-knob>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'knob-basic-demo',
    templateUrl: './knob-basic-demo.html'
})
export class KnobBasicDemo {
    value!: number;
}`
    };
}
