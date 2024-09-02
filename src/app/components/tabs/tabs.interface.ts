import { TemplateRef } from '@angular/core';
import { Tabs } from './tabs';
/**
 * Custom tab change event.
 * @see {@link Tabs.onChange}
 * @group Events
 */
export interface TabsChangeEvent {
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
 * @see {@link Tabs.onClose}
 * @group Events
 */
export interface TabsCloseEvent {
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
 * Defines valid templates in Tabs.
 * @group Templates
 */
export interface TabsTemplates {
    /**
     * Previous button icon template for the scrollable component.
     */
    previousicon(): TemplateRef<any>;
    /**
     * Next button icon template for the scrollable component.
     */
    nexticon(): TemplateRef<any>;
}
