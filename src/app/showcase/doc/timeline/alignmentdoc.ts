import { Component } from '@angular/core';
import { Code } from '@domain/code';

interface EventItem {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
}

@Component({
    selector: 'alignment-doc',
    template: `
        <app-docsectiontext>
            <p>Content location relative the line is defined with the <i>align</i> property.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-12">
            <p-timeline [value]="events" class="w-full md:w-80">
                <ng-template pTemplate="content" let-event>
                    {{ event.status }}
                </ng-template>
            </p-timeline>

            <p-timeline [value]="events" class="w-full md:w-80" align="right">
                <ng-template pTemplate="content" let-event>
                    {{ event.status }}
                </ng-template>
            </p-timeline>

            <p-timeline [value]="events" class="w-full md:w-80" align="alternate">
                <ng-template pTemplate="content" let-event>
                    {{ event.status }}
                </ng-template>
            </p-timeline>
        </div>
        <app-code [code]="code" selector="timeline-alignment-demo"></app-code>
    `
})
export class AlignmentDoc {
    events: EventItem[];

    constructor() {
        this.events = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
        ];
    }

    code: Code = {
        basic: `<p-timeline [value]="events" class="w-full md:w-80">
    <ng-template pTemplate="content" let-event>
        {{ event.status }}
    </ng-template>
</p-timeline>

<p-timeline [value]="events" class="w-full md:w-80" align="right">
    <ng-template pTemplate="content" let-event>
        {{ event.status }}
    </ng-template>
</p-timeline>

<p-timeline [value]="events" class="w-full md:w-80" align="alternate">
    <ng-template pTemplate="content" let-event>
        {{ event.status }}
    </ng-template>
</p-timeline>`,

        html: `<div class="card flex flex-wrap gap-12">
    <p-timeline [value]="events" class="w-full md:w-80">
        <ng-template pTemplate="content" let-event>
            {{ event.status }}
        </ng-template>
    </p-timeline>
    <p-timeline [value]="events" class="w-full md:w-80" align="right">
        <ng-template pTemplate="content" let-event>
            {{ event.status }}
        </ng-template>
    </p-timeline>
    <p-timeline [value]="events" class="w-full md:w-80" align="alternate">
        <ng-template pTemplate="content" let-event>
            {{ event.status }}
        </ng-template>
    </p-timeline>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';

interface EventItem {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
}

@Component({
    selector: 'timeline-alignment-demo',
    templateUrl: './timeline-alignment-demo.html',
    standalone: true,
    imports: [TimelineModule]
})
export class TimelineAlignmentDemo {
    events: EventItem[];

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
