import { TemplateRef } from '@angular/core';
import { Splitter } from './splitter';
/**
 * Custom panel resize start event.
 * @see {@link Splitter.onResizeStart}
 */
export interface SplitterResizeStartEvent {
    /**
     * Browser event.
     */
    originalEvent: TouchEvent | MouseEvent;
    /**
     * Collapsed state of the panel.
     */
    sizes: number[];
}
/**
 * Custom panel resize end event.
 * @see {@link Splitter.onResizeEnd}
 * @extends {SplitterResizeStartEvent}
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
