import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'size-doc',
    template: `
        <app-docsectiontext>
            <p>Diameter of the knob is defined in pixels using the <i>size</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-knob [(ngModel)]="value" [size]="200"/>
        </div>
        <app-code [code]="code" selector="knob-size-demo"></app-code>
    `
})
export class SizeDoc {
    value: number = 60;

    code: Code = {
        basic: `<p-knob [(ngModel)]="value" [size]="200" />`,

        html: `<div class="card flex justify-content-center">
    <p-knob [(ngModel)]="value" [size]="200" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';

@Component({
    selector: 'knob-size-demo',
    templateUrl: './knob-size-demo.html',
    standalone: true,
    imports: [FormsModule, KnobModule]
})
export class KnobSizeDemo {
    value: number = 60;
}`
    };
}
