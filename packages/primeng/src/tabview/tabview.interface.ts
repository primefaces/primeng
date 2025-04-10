import { TemplateRef } from '@angular/core';
import { TabView } from './tabview';
/**
 * Custom tab change event.
 * @see {@link TabView.onChange}
 * @group Events
 */
export interface TabViewChangeEvent {
    /**
     * Browser event
     */
    originalEvent: Event;
    /**
     * Index of the selected tab
     */
    index: number;
}

/**
 * Custom tab close event.
 * @see {@link TabView.onClose}
 * @group Events
 */
export interface TabViewCloseEvent {
    /**
     * Browser event
     */
    originalEvent: Event;
    /**
     * Index of the closed tab
     */
    index: number;
    /**
     * Used to close tab.
     */
    close?(): void;
}

/**
 * Defines valid templates in TabView.
 * @group Templates
 */
export interface TabViewTemplates {
    /**
     * Previous button icon template for the scrollable component.
     */
    previousicon(): TemplateRef<any>;
    /**
     * Next button icon template for the scrollable component.
     */
    nexticon(): TemplateRef<any>;
}
