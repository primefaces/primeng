import { TemplateRef } from '@angular/core';
import { Rating } from './rating';
/**
 * Custom change event.
 * @see {@link Rating.onRate}
 * @group Events
 */
export interface RatingRateEvent {
    /**
     * Browser event
     */
    originalEvent: Event;
    /**
     * Selected option value
     */
    value: number;
}
/**
 * Defines valid templates in Rating.
 * @group Templates
 */
export interface RatingTemplates {
    /**
     * Custom on icon template.
     */
    onicon(): TemplateRef<any>;
    /**
     * Custom off icon template.
     */
    officon(): TemplateRef<any>;
    /**
     * Custom cancel icon template.
     */
    cancelicon(): TemplateRef<any>;
}
