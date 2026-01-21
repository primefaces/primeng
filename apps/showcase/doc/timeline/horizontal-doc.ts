import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { TimelineModule } from 'primeng/timeline';

@Component({
    selector: 'horizontal-doc',
    standalone: true,
    imports: [AppDocSectionText, TimelineModule, AppCode],
    template: `
        <app-docsectiontext>
            <p>TimeLine orientation is controlled with the <i>layout</i> property, default is <i>vertical</i> having <i>horizontal</i> as the alternative.</p>
        </app-docsectiontext>
        <div class="card flex flex-col gap-4">
            <p-timeline [value]="events" layout="horizontal" align="top">
                <ng-template #content let-event>
                    {{ event }}
                </ng-template>
            </p-timeline>
            <p-timeline [value]="events" layout="horizontal" align="bottom">
                <ng-template #content let-event>
                    {{ event }}
                </ng-template>
            </p-timeline>
            <p-timeline [value]="events" layout="horizontal" align="alternate">
                <ng-template #content let-event>
                    {{ event }}
                </ng-template>
                <ng-template #opposite let-event><span>&nbsp;</span></ng-template>
            </p-timeline>
        </div>
        <app-code></app-code>
    `
})
export class HorizontalDoc {
    events: string[];

    constructor() {
        this.events = ['2020', '2021', '2022', '2023'];
    }
}
