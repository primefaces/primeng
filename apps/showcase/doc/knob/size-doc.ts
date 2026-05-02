import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'size-doc',
    standalone: true,
    imports: [FormsModule, KnobModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Diameter of the knob is defined in pixels using the <i>size</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-knob [(ngModel)]="value" [size]="200" />
        </div>
        <app-code></app-code>
    `
})
export class SizeDoc {
    value: number = 60;
}
