import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'size-doc',
    standalone: true,
    imports: [FormsModule, KnobModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Diameter of the knob is defined in pixels using the <i>size</i> property.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-knob [(ngModel)]="value" [size]="200" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class SizeDoc {
    value: number = 60;
}
