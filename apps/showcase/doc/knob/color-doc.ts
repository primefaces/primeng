import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'color-doc',
    standalone: true,
    imports: [FormsModule, KnobModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Colors are customized with the <i>textColor</i>, <i>rangeColor</i> and <i>valueColor</i> properties.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-knob [(ngModel)]="value" valueColor="SlateGray" rangeColor="MediumTurquoise" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ColorDoc {
    value: number = 50;
}
