import { TemplateRef } from '@angular/core';
import { TabView } from './tabview';
/**
 * Custom tab change event.
 * @see {@link TabView.onChange}
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
    previousicon: TemplateRef<any> | null;
    /**
     * Next button icon template for the scrollable component.
     */
    nexticon: TemplateRef<any> | null;
}

/**
 * Defines valid templates in TabPanel.
 * @group Templates
 */
export interface TabPanelTemplates {
    /**
     * Custom header template.
     *
     */
    header: TemplateRef<any> | null;
    /**
     * Custom content template(Default).
     * @default
     */
    content: TemplateRef<any> | null;
    /**
     * Custom right icon template.
     */
    righticon: TemplateRef<any> | null;
    /**
     * Custom left icon template.
     */
    lefticon: TemplateRef<any> | null;
    /**
     * Custom close icon template.
     */
    closeicon: TemplateRef<any> | null;
}
