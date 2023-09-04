import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface EventItem {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
}

@Component({
    selector: 'template-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Sample implementation with custom content and styled markers.</p>
        </app-docsectiontext>
        <div class="card">
            <p-timeline [value]="events" align="alternate" styleClass="customized-timeline">
                <ng-template pTemplate="marker" let-event>
                    <span class="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" [style]="{ 'background-color': event.color }">
                        <i [class]="event.icon"></i>
                    </span>
                </ng-template>
                <ng-template pTemplate="content" let-event>
                    <p-card [header]="event.status" [subheader]="event.date">
                        <img *ngIf="event.image" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + event.image" [alt]="event.name" width="200" class="shadow-2" />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                            neque quas!
                        </p>
                        <button pButton label="Read more" class="p-button-text"></button>
                    </p-card>
                </ng-template>
            </p-timeline>
        </div>
        <app-code [code]="code" selector="timeline-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

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
        basic: `
<p-timeline [value]="events" align="alternate" styleClass="customized-timeline">
    <ng-template pTemplate="marker" let-event>
        <span class="custom-marker shadow-2" [style.backgroundColor]="event.color">
            <i [ngClass]="event.icon"></i>
        </span>
    </ng-template>
    <ng-template pTemplate="content" let-event>
        <p-card [header]="event.status" [subheader]="event.date">
            <img *ngIf="event.image" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + event.image" [alt]="event.name" width="200" class="shadow-2" />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                neque quas!
            </p>
            <button pButton label="Read more" class="p-button-text"></button>
        </p-card>
    </ng-template>
</p-timeline>`,

        html: `
<div class="card">
    <p-timeline [value]="events" align="alternate" styleClass="customized-timeline">
        <ng-template pTemplate="marker" let-event>
            <span class="custom-marker shadow-2" [style.backgroundColor]="event.color">
                <i [ngClass]="event.icon"></i>
            </span>
        </ng-template>
        <ng-template pTemplate="content" let-event>
            <p-card [header]="event.status" [subheader]="event.date">
                <img *ngIf="event.image" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + event.image" [alt]="event.name" width="200" class="shadow-2" />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                    neque quas!
                </p>
                <button pButton label="Read more" class="p-button-text"></button>
            </p-card>
        </ng-template>
    </p-timeline>
</div>`,

        typescript: `
import { Component } from '@angular/core';

interface EventItem {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
}

@Component({
    selector: 'timeline-template-demo',
    templateUrl: './timeline-template-demo.html'
})
export class TimelineTemplateDemo {
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
