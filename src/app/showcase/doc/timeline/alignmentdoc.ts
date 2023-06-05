import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'alignment-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Content location relative the line is defined with the <i>align</i> property.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-6">
            <p-timeline [value]="events" class="w-full md:w-20rem">
                <ng-template pTemplate="content" let-event>
                    {{ event.status }}
                </ng-template>
            </p-timeline>

            <p-timeline [value]="events" class="w-full md:w-20rem" align="right">
                <ng-template pTemplate="content" let-event>
                    {{ event.status }}
                </ng-template>
            </p-timeline>

            <p-timeline [value]="events" class="w-full md:w-20rem" align="alternate">
                <ng-template pTemplate="content" let-event>
                    {{ event.status }}
                </ng-template>
            </p-timeline>
        </div>
        <app-code [code]="code" selector="timeline-alignment-demo"></app-code>
    </section>`
})
export class AlignmentDoc {
    @Input() id: string;

    @Input() title: string;

    events: any[];

    constructor() {
        this.events = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
        ];
    }

    code: Code = {
        basic: `
<p-timeline [value]="events" class="w-full md:w-20rem">
    <ng-template pTemplate="content" let-event>
        {{ event.status }}
    </ng-template>
</p-timeline>

<p-timeline [value]="events" class="w-full md:w-20rem" align="right">
    <ng-template pTemplate="content" let-event>
        {{ event.status }}
    </ng-template>
</p-timeline>

<p-timeline [value]="events" class="w-full md:w-20rem" align="alternate">
    <ng-template pTemplate="content" let-event>
        {{ event.status }}
    </ng-template>
</p-timeline>`,

        html: `
<div class="card flex flex-wrap gap-6">
    <p-timeline [value]="events" class="w-full md:w-20rem">
        <ng-template pTemplate="content" let-event>
            {{ event.status }}
        </ng-template>
    </p-timeline>
    <p-timeline [value]="events" class="w-full md:w-20rem" align="right">
        <ng-template pTemplate="content" let-event>
            {{ event.status }}
        </ng-template>
    </p-timeline>
    <p-timeline [value]="events" class="w-full md:w-20rem" align="alternate">
        <ng-template pTemplate="content" let-event>
            {{ event.status }}
        </ng-template>
    </p-timeline>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'timeline-alignment-demo',
    templateUrl: './timeline-alignment-demo.html'
})
export class TimelineAlignmentDemo {
    events: any[];

    constructor() {
        this.events = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
        ];
    }
}`
    };
}
