import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'minmax-doc',
    standalone: true,
    imports: [FormsModule, KnobModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Boundaries are configured with the <i>min</i> and <i>max</i> properties whose defaults are 0 and 100 respectively.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-knob [(ngModel)]="value" [min]="-50" [max]="50" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class MinMaxDoc {
    value: number = 10;
}
