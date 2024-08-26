import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'color-doc',
    template: `
        <app-docsectiontext>
            <p>Colors are customized with the <i>textColor</i>, <i>rangeColor</i> and <i>valueColor</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-knob [(ngModel)]="value" valueColor="SlateGray" rangeColor="MediumTurquoise" />
        </div>
        <app-code [code]="code" selector="knob-color-demo"></app-code>
    `
})
export class ColorDoc {
    value: number = 50;

    code: Code = {
        basic: `<p-knob [(ngModel)]="value" valueColor="SlateGray" rangeColor="MediumTurquoise" />`,

        html: `<div class="card flex justify-center">
<p-knob [(ngModel)]="value" valueColor="SlateGray" rangeColor="MediumTurquoise" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
        
@Component({
    selector: 'knob-color-demo',
    templateUrl: './knob-color-demo.html',
    standalone: true,
    imports: [FormsModule, KnobModule]
})
export class KnobColorDemo {
    value: number = 50;
}`
    };
}
