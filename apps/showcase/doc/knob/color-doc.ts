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
        <app-code></app-code>
    `
})
export class ColorDoc {
    value: number = 50;
}
