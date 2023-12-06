import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'readonly-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>readonly</i> present, value cannot be edited.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-knob [(ngModel)]="value" [readonly]="true"></p-knob>
        </div>
        <app-code [code]="code" selector="knob-readonly-demo"></app-code>
    `
})
export class ReadonlyDoc {
    value: number = 50;

    code: Code = {
        basic: `<p-knob [(ngModel)]="value" [readonly]="true"></p-knob>`,

        html: `
<div class="card flex justify-content-center">
    <p-knob [(ngModel)]="value" [readonly]="true"></p-knob>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'knob-readonly-demo',
    templateUrl: './knob-readonly-demo.html'
})
export class KnobReadonlyDemo {
    value: number = 50;
}`
    };
}
