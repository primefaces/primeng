import { Component, Input } from '@angular/core';

@Component({
    selector: 'indicator-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Indicators allow quick navigation between the items.</p>
        </app-docsectiontext>
    </div>`
})
export class IndicatorDoc {
    @Input() id: string;

    @Input() title: string;
}
