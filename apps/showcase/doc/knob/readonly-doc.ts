import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'readonly-doc',
    standalone: true,
    imports: [FormsModule, KnobModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>readonly</i> present, value cannot be edited.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-knob [(ngModel)]="value" [readonly]="true" />
        </div>
        <app-code></app-code>
    `
})
export class ReadonlyDoc {
    value: number = 50;
}
