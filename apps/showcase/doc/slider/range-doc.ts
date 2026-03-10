import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';

@Component({
    selector: 'range-doc',
    standalone: true,
    imports: [FormsModule, SliderModule, AppDocSectionText, AppCode, AppDemoWrapper],
    template: `
        <app-docsectiontext>
            <p>When <i>range</i> property is present, slider provides two handles to define two values. In range mode, value should be an array instead of a single value.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-slider [(ngModel)]="rangeValues" [range]="true" class="w-56" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class RangeDoc {
    rangeValues: number[] = [20, 80];
}
