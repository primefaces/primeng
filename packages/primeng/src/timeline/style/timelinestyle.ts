import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/timeline';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => ['p-timeline p-component', 'p-timeline-' + instance.align, 'p-timeline-' + instance.layout],
    event: 'p-timeline-event',
    eventOpposite: 'p-timeline-event-opposite',
    eventSeparator: 'p-timeline-event-separator',
    eventMarker: 'p-timeline-event-marker',
    eventConnector: 'p-timeline-event-connector',
    eventContent: 'p-timeline-event-content'
};

@Injectable()
export class TimelineStyle extends BaseStyle {
    name = 'timeline';

    theme = style;

    classes = classes;
}

/**
 *
 * Timeline visualizes a series of chained events.
 *
 * [Live Demo](https://primeng.org/timeline)
 *
 * @module timelinestyle
 *
 */
export enum TimelineClasses {
    /**
     * Class name of the root element
     */
    root = 'p-timeline',
    /**
     * Class name of the event element
     */
    event = 'p-timeline-event',
    /**
     * Class name of the event opposite element
     */
    eventOpposite = 'p-timeline-event-opposite',
    /**
     * Class name of the event separator element
     */
    eventSeparator = 'p-timeline-event-separator',
    /**
     * Class name of the event marker element
     */
    eventMarker = 'p-timeline-event-marker',
    /**
     * Class name of the event connector element
     */
    eventConnector = 'p-timeline-event-connector',
    /**
     * Class name of the event content element
     */
    eventContent = 'p-timeline-event-content'
}

export interface TimelineStyle extends BaseStyle {}
