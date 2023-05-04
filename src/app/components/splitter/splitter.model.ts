import { TemplateRef } from '@angular/core';

/**
 * Custom panel resize event.
 * @see {@link Splitter.onResizeStart}
 * @see {@link Splitter.onResizeEnd}
 * @event
 */
export interface SplitterResizeEvent {
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
 * Defines valid templates in Panel.
 * @group Templates
 */
export interface SplitterTemplates {
    /**
     * Custom panel template.
     */
    panel: TemplateRef<any> | null;
}
