import {NgModule ,Component, Input, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, AfterContentInit, ContentChildren, QueryList, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockableUI, PrimeTemplate, SharedModule} from 'primeng/api';

@Component({
    selector: 'p-timeline',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{'p-timeline p-component': true,
                'p-timeline-left': align === 'left',
                'p-timeline-right': align === 'right',
                'p-timeline-top': align === 'top',
                'p-timeline-bottom': align === 'bottom',
                'p-timeline-alternate': align === 'alternate',
                'p-timeline-vertical': layout === 'vertical',
                'p-timeline-horizontal': layout === 'horizontal'}">
            <div *ngFor="let event of value; let last=last" class="p-timeline-event">
                <div class="p-timeline-event-opposite">
                    <ng-container *ngTemplateOutlet="oppositeTemplate; context: {$implicit: event}"></ng-container>
                </div>
                <div class="p-timeline-event-separator">
                    <ng-container *ngIf="markerTemplate; else marker">
                        <ng-container *ngTemplateOutlet="markerTemplate; context: {$implicit: event}"></ng-container>
                    </ng-container>
                    <ng-template #marker>
                        <div class="p-timeline-event-marker"></div>
                    </ng-template>
                    <div *ngIf="!last" class="p-timeline-event-connector"></div>
                </div>
                <div class="p-timeline-event-content">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: {$implicit: event}"></ng-container>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./timeline.css'],
    host: {
        'class': 'p-element'
    }
})
export class Timeline implements AfterContentInit, BlockableUI {

    @Input() value: any[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() align: string = 'left';

    @Input() layout: string = 'vertical';

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    contentTemplate: TemplateRef<any>;

    oppositeTemplate: TemplateRef<any>;

    markerTemplate: TemplateRef<any>;

    constructor(private el: ElementRef) {}

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                break;

                case 'opposite':
                    this.oppositeTemplate = item.template;
                break;

                case 'marker':
                    this.markerTemplate = item.template;
                break;
            }
        });
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [Timeline, SharedModule],
    declarations: [Timeline]
})
export class TimelineModule { }
