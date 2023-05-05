import { TemplateRef } from '@angular/core';

/**
 * Custom panel resize start event.
 * @see {@link Splitter.onResizeStart}
 * @event
 */
export interface SplitterResizeStartEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Collapsed state of the panel.
     */
    sizes: number[];
}
/**
 * Custom panel resize end event.
 * @see {@link Splitter.onResizeEnd}
 * @event
 */
export interface SplitterResizeEndEvent extends SplitterResizeStartEvent {}

/**
 * Defines valid templates in Panel.
 * @group Templates
 */
export interface SplitterTemplates {
    /**
     * Custom panel template.
     */
    panel: TemplateRef<any> | null;
}
