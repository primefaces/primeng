import { TemplateRef } from '@angular/core';

/**
 * Custom add event.
 * @see {@link Chips.onAdd}
 * @event
 */
export interface ChipsAddEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Added/Removed item value.
     */
    value: any;
}
/**
 * Custom remove event.
 * @see {@link Chips.onRemove}
 * @event
 */
export interface ChipsRemoveEvent extends ChipsAddEvent {}
/**
 * Custom click event.
 * @see {@link Chips.onChipClick}
 * @event
 */
export interface ChipsClickEvent extends ChipsAddEvent {}
/**
 * Defines valid templates in Chips.
 * @group Templates
 */
export interface ChipsTemplates {
    /**
     * Custom item template.
     * @param {Object} context - item data.
     */
    item(context: {
        /**
         * Value of the chip element.
         */
        $implicit: any;
    }): TemplateRef<{$implicit: any}> | null;
    /**
     * Custom remove icon template.
     */
    removetokenicon: TemplateRef<any> | null;
    /**
     * Custom clear icon template.
     */
    clearicon: TemplateRef<any> | null;
}
