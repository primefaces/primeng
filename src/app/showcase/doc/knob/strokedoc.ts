import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'stroke-doc',
    template: `
        <app-docsectiontext>
            <p>The border size is specified with the <i>strokeWidth</i> property as a number in pixels.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-knob [(ngModel)]="value" [strokeWidth]="5"/>
        </div>
        <app-code [code]="code" selector="knob-stroke-demo"></app-code>
    `
})
export class StrokeDoc {
    value: number = 40;

    code: Code = {
        basic: `<p-knob [(ngModel)]="value" [strokeWidth]="5" />`,

        html: `<div class="card flex justify-content-center">
    <p-knob [(ngModel)]="value" [strokeWidth]="5" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';

@Component({
    selector: 'knob-stroke-demo',
    templateUrl: './knob-stroke-demo.html',
    standalone: true,
    imports: [FormsModule, KnobModule]
})
export class KnobStrokeDemo {
    value: number = 40;
}`
    };
}
