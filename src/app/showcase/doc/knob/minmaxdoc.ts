import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'min-max-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Boundaries are configured with the <i>min</i> and <i>max</i> properties whose defaults are 0 and 100 respectively.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-knob [(ngModel)]="value" [min]="-50" [max]="50"></p-knob>
        </div>
        <app-code [code]="code" selector="knob-min-max-demo"></app-code>
    </section>`
})
export class MinMaxDoc {
    @Input() id: string;

    @Input() title: string;

    value: number = 10;

    code: Code = {
        basic: `
<p-knob [(ngModel)]="value" [min]="-50" [max]="50"></p-knob>`,

        html: `
<div class="card flex justify-content-center">
    <p-knob [(ngModel)]="value" [min]="-50" [max]="50"></p-knob>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'knob-min-max-demo',
    templateUrl: './knob-min-max-demo.html'
})
export class KnobMinMaxDemo {
    value: number = 10;
}`
    };
}
