import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, HostBinding, inject, Input, NgModule, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BlockableUI, PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Nullable } from 'primeng/ts-helpers';
import { TimelineStyle } from './style/timelinestyle';

/**
 * Timeline visualizes a series of chained events.
 * @group Components
 */
@Component({
    selector: 'p-timeline',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <div *ngFor="let event of value; let last = last" class="p-timeline-event" [attr.data-pc-section]="'event'">
            <div class="p-timeline-event-opposite" [attr.data-pc-section]="'opposite'">
                <ng-container *ngTemplateOutlet="oppositeTemplate || _oppositeTemplate; context: { $implicit: event }"></ng-container>
            </div>
            <div class="p-timeline-event-separator" [attr.data-pc-section]="'separator'">
                <ng-container *ngIf="markerTemplate || _markerTemplate; else marker">
                    <ng-container *ngTemplateOutlet="markerTemplate || _markerTemplate; context: { $implicit: event }"></ng-container>
                </ng-container>
                <ng-template #marker>
                    <div class="p-timeline-event-marker" [attr.data-pc-section]="'marker'"></div>
                </ng-template>
                <div *ngIf="!last" class="p-timeline-event-connector"></div>
            </div>
            <div class="p-timeline-event-content" [attr.data-pc-section]="'content'">
                <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: event }"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TimelineStyle],
    host: {
        '[class.p-timeline]': 'true',
        '[class.p-component]': 'true',
        '[class.p-timeline-left]': "align === 'left'",
        '[class.p-timeline-right]': "align === 'right'",
        '[class.p-timeline-top]': "align === 'top'",
        '[class.p-timeline-bottom]': "align === 'bottom'",
        '[class.p-timeline-alternate]': "align === 'alternate'",
        '[class.p-timeline-vertical]': "layout === 'vertical'",
        '[class.p-timeline-horizontal]': "layout === 'horizontal'",
        '[style]': 'style',
        '[attr.data-pc-section]': "'root'",
        '[attr.data-pc-name]': "'timeline'"
    }
})
export class Timeline extends BaseComponent implements AfterContentInit, BlockableUI {
    /**
     * An array of events to display.
     * @group Props
     */
    @Input() value: any[] | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Position of the timeline bar relative to the content. Valid values are "left", "right" for vertical layout and "top", "bottom" for horizontal layout.
     * @group Props
     */
    @Input() align: string = 'left';
    /**
     * Orientation of the timeline.
     * @group Props
     */
    @Input() layout: 'vertical' | 'horizontal' = 'vertical';
    /**
     * Custom content template.
     * @group Templates
     */
    @ContentChild('content', { descendants: false }) contentTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom opposite item template.
     * @group Templates
     */
    @ContentChild('opposite', { descendants: false }) oppositeTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom marker template.
     * @group Templates
     */
    @ContentChild('marker', { descendants: false }) markerTemplate: Nullable<TemplateRef<any>>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<any>>;

    _contentTemplate: TemplateRef<any> | undefined;

    _oppositeTemplate: TemplateRef<any> | undefined;

    _markerTemplate: TemplateRef<any> | undefined;

    _componentStyle = inject(TimelineStyle);

    @HostBinding('class') get hostClass() {
        return this.styleClass;
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this._contentTemplate = item.template;
                    break;

                case 'opposite':
                    this._oppositeTemplate = item.template;
                    break;

                case 'marker':
                    this._markerTemplate = item.template;
                    break;
            }
        });
    }
}

@NgModule({
    imports: [Timeline, SharedModule],
    exports: [Timeline, SharedModule]
})
export class TimelineModule {}
