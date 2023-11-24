import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'horizontal-doc',
    template: ` 
        <app-docsectiontext>
            <p>TimeLine orientation is controlled with the <i>layout</i> property, default is <i>vertical</i> having <i>horizontal</i> as the alternative.</p>
        </app-docsectiontext>
        <div class="card flex flex-column gap-3">
            <p-timeline [value]="events" layout="horizontal" align="top">
                <ng-template pTemplate="content" let-event>
                    {{ event }}
                </ng-template>
            </p-timeline>
            <p-timeline [value]="events" layout="horizontal" align="bottom">
                <ng-template pTemplate="content" let-event>
                    {{ event }}
                </ng-template>
            </p-timeline>
            <p-timeline [value]="events" layout="horizontal" align="alternate">
                <ng-template pTemplate="content" let-event>
                    {{ event }}
                </ng-template>
                <ng-template pTemplate="opposite" let-event><span>&nbsp;</span></ng-template>
            </p-timeline>
        </div>
        <app-code [code]="code" selector="timeline-horizontal-demo"></app-code>
    `
})
export class HorizontalDoc {

    events: string[];

    constructor() {
        this.events = ['2020', '2021', '2022', '2023'];
    }

    code: Code = {
        basic: `
<p-timeline [value]="events" layout="horizontal" align="top">
    <ng-template pTemplate="content" let-event>
        {{ event }}
    </ng-template>
</p-timeline>

<p-timeline [value]="events" layout="horizontal" align="bottom">
    <ng-template pTemplate="content" let-event>
        {{ event }}
    </ng-template>
</p-timeline>

<p-timeline [value]="events" layout="horizontal" align="alternate">
    <ng-template pTemplate="content" let-event>
        {{ event }}
    </ng-template>
    <ng-template pTemplate="opposite" let-event><span>&nbsp;</span></ng-template>
</p-timeline>`,

        html: `
<div class="card flex flex-column gap-3">
    <p-timeline [value]="events" layout="horizontal" align="top">
        <ng-template pTemplate="content" let-event>
            {{ event }}
        </ng-template>
    </p-timeline>
    <p-timeline [value]="events" layout="horizontal" align="bottom">
        <ng-template pTemplate="content" let-event>
            {{ event }}
        </ng-template>
    </p-timeline>
    <p-timeline [value]="events" layout="horizontal" align="alternate">
        <ng-template pTemplate="content" let-event>
            {{ event }}
        </ng-template>
        <ng-template pTemplate="opposite" let-event><span>&nbsp;</span></ng-template>
    </p-timeline>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'timeline-horizontal-demo',
    templateUrl: './timeline-horizontal-demo.html'
})
export class TimelineHorizontalDemo {
    events: string[];

    constructor() {
        this.events = [
            "2020", "2021", "2022", "2023"
        ];
    }
}`
    };
}
