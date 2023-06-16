import { TemplateRef } from '@angular/core';
import { Chips } from './chips';
/**
 * Custom add event.
 * @see {@link Chips.onAdd}
 * @group Events
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
 * @extends {ChipsAddEvent}
 * @group Events
 */
export interface ChipsRemoveEvent extends ChipsAddEvent {}
/**
 * Custom click event.
 * @see {@link Chips.onChipClick}
 * @extends {ChipsAddEvent}
 * @group Events
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
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom remove icon template.
     */
    removetokenicon(): TemplateRef<any>;
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<any>;
}
