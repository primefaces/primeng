import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'color-doc',
    standalone: true,
    imports: [FormsModule, KnobModule, AppCodeModule, AppDocSectionText],
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
import { Knob } from 'primeng/knob';

@Component({
    selector: 'knob-color-demo',
    templateUrl: './knob-color-demo.html',
    standalone: true,
    imports: [FormsModule, Knob]
})
export class KnobColorDemo {
    value: number = 50;
}`
    };
}
