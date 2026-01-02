import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'range-doc',
    standalone: true,
    imports: [FormsModule, SliderModule, AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>When <i>range</i> property is present, slider provides two handles to define two values. In range mode, value should be an array instead of a single value.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-slider [(ngModel)]="rangeValues" [range]="true" class="w-56" />
        </div>
        <app-code selector="slider-range-demo"></app-code>
    `
})
export class RangeDoc {
    rangeValues: number[] = [20, 80];
}
