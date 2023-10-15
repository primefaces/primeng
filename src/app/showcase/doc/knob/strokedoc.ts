import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'stroke-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>The border size is specified with the <i>strokeWidth</i> property as a number in pixels.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-knob [(ngModel)]="value" [strokeWidth]="5"></p-knob>
        </div>
        <app-code [code]="code" selector="knob-stroke-demo"></app-code>
    </section>`
})
export class StrokeDoc {
    @Input() id: string;

    @Input() title: string;

    value: number = 40;

    code: Code = {
        basic: `
<p-knob [(ngModel)]="value" [strokeWidth]="5"></p-knob>`,

        html: `
<div class="card flex justify-content-center">
    <p-knob [(ngModel)]="value" [strokeWidth]="5"></p-knob>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'knob-stroke-demo',
    templateUrl: './knob-stroke-demo.html'
})
export class KnobStrokeDemo {
    value: number = 40;
}`
    };
}
