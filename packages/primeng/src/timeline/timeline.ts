import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, inject, InjectionToken, input, NgModule, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BlockableUI } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { TimelineAlign, TimelineItemTemplateContext, TimelineLayout, TimelinePassThrough } from 'primeng/types/timeline';
import { TimelineStyle } from './style/timelinestyle';

const TIMELINE_INSTANCE = new InjectionToken<Timeline>('TIMELINE_INSTANCE');

/**
 * Timeline visualizes a series of chained events.
 * @group Components
 */
@Component({
    selector: 'p-timeline',
    standalone: true,
    imports: [NgTemplateOutlet, Bind],
    template: `
        @for (event of value(); track event; let last = $last) {
            <div [pBind]="ptm('event')" [class]="cx('event')" [attr.data-p]="dataP()">
                <div [pBind]="ptm('eventOpposite')" [class]="cx('eventOpposite')" [attr.data-p]="dataP()">
                    <ng-container *ngTemplateOutlet="oppositeTemplate(); context: { $implicit: event }"></ng-container>
                </div>
                <div [pBind]="ptm('eventSeparator')" [class]="cx('eventSeparator')" [attr.data-p]="dataP()">
                    @if (markerTemplate()) {
                        <ng-container *ngTemplateOutlet="markerTemplate()!; context: { $implicit: event }"></ng-container>
                    } @else {
                        <div [pBind]="ptm('eventMarker')" [class]="cx('eventMarker')" [attr.data-p]="dataP()"></div>
                    }
                    @if (!last) {
                        <div [pBind]="ptm('eventConnector')" [class]="cx('eventConnector')" [attr.data-p]="dataP()"></div>
                    }
                </div>
                <div [pBind]="ptm('eventContent')" [class]="cx('eventContent')" [attr.data-p]="dataP()">
                    <ng-container *ngTemplateOutlet="contentTemplate(); context: { $implicit: event }"></ng-container>
                </div>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TimelineStyle, { provide: TIMELINE_INSTANCE, useExisting: Timeline }, { provide: PARENT_INSTANCE, useExisting: Timeline }],
    host: {
        '[class]': "cx('root')",
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class Timeline extends BaseComponent<TimelinePassThrough> implements BlockableUI {
    componentName = 'Timeline';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcTimeline: Timeline | undefined = inject(TIMELINE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    /**
     * An array of events to display.
     * @group Props
     */
    value = input<any[]>();
    /**
     * Position of the timeline bar relative to the content. Valid values are "left", "right" for vertical layout and "top", "bottom" for horizontal layout.
     * @group Props
     */
    align = input<TimelineAlign>('left');
    /**
     * Orientation of the timeline.
     * @group Props
     */
    layout = input<TimelineLayout>('vertical');
    /**
     * Custom content template.
     * @param {TimelineItemTemplateContext} context - item context.
     * @see {@link TimelineItemTemplateContext}
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<TimelineItemTemplateContext>>('content', { descendants: false });

    /**
     * Custom opposite item template.
     * @param {TimelineItemTemplateContext} context - item context.
     * @see {@link TimelineItemTemplateContext}
     * @group Templates
     */
    oppositeTemplate = contentChild<TemplateRef<TimelineItemTemplateContext>>('opposite', { descendants: false });

    /**
     * Custom marker template.
     * @param {TimelineItemTemplateContext} context - item context.
     * @see {@link TimelineItemTemplateContext}
     * @group Templates
     */
    markerTemplate = contentChild<TemplateRef<TimelineItemTemplateContext>>('marker', { descendants: false });

    _componentStyle = inject(TimelineStyle);

    dataP = computed(() =>
        this.cn({
            [this.layout()]: this.layout(),
            [this.align()]: this.align()
        })
    );

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }
}

@NgModule({
    imports: [Timeline],
    exports: [Timeline]
})
export class TimelineModule {}
