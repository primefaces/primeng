import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'readonly-doc',
    standalone: true,
    imports: [FormsModule, RatingModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>readonly</i> present, value cannot be edited.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-rating [(ngModel)]="value" [readonly]="true" />
        </div>
        <app-code></app-code>
    `
})
export class ReadOnlyDoc {
    value: number = 3;
}
