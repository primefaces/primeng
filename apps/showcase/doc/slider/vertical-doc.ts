import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'vertical-doc',
    standalone: true,
    imports: [FormsModule, SliderModule, AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>Default layout of slider is <i>horizontal</i>, use <i>orientation</i> property for the alternative <i>vertical</i> mode.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-slider [(ngModel)]="value" orientation="vertical" class="h-56" />
        </div>
        <app-code></app-code>
    `
})
export class VerticalDoc {
    value: number = 50;
}
