import { ElementRef, TemplateRef } from '@angular/core';
import { Overlay } from 'primeng/overlay';
import { CascadeSelect } from './cascadeselect';

/**
 * Custom panel show event.
 * @see {@link CascadeSelect.onShow}
 * @group Events
 */
export interface CascadeSelectShowEvent {
    /**
     * Overlay element.
     */
    overlay?: Overlay | ElementRef | TemplateRef<any> | HTMLElement | null | undefined;
    /**
     * Target element.
     */
    target?: Overlay | ElementRef | TemplateRef<any> | HTMLElement | null | undefined;
    /**
     * Overlay mode.
     */
    overlayMode?: 'modal' | 'overlay' | string;
}
/**
 * Custom panel hide event.
 * @see {@link CascadeSelect.onHide}
 * @extends {CascadeSelectShowEvent}
 * @group Events
 */
export interface CascadeSelectHideEvent extends CascadeSelectShowEvent {}
/**
 * Custom panel show event emits right before the panel is shown.
 * @see {@link CascadeSelect.onBeforeShow}
 * @extends {CascadeSelectShowEvent}
 * @group Events
 */
export interface CascadeSelectBeforeShowEvent extends CascadeSelectShowEvent {}
/**
 * Custom panel hide event emits right before the panel is hidden.
 * @see {@link CascadeSelect.onBeforeHide}
 * @extends {CascadeSelectShowEvent}
 * @group Events
 */
export interface CascadeSelectBeforeHideEvent extends CascadeSelectShowEvent {}
/**
 * Custom panel change event emits when selection changed.
 * @see {@link CascadeSelect.onChange}
 * @group Events
 */
export interface CascadeSelectChangeEvent {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Selected value.
     */
    value?: any;
    /**
     * Focus state.
     */
    isFocus?: boolean;
}
/**
 * Defines valid templates in CascadeSelect.
 * @group Templates
 */
export interface CascadeSelectTemplates {
    /**
     * Custom value template.
     * @param {Object} context - value data.
     */
    value(context: {
        /**
         * Value.
         */
        $implicit: any;
        /**
         * Placeholder.
         */
        placeholder: string;
    }): TemplateRef<{ $implicit: any; placeholder: string }>;
    /**
     * Custom option template.
     * @param {Object} context - option data.
     */
    option(context: {
        /**
         * Option instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom dropdown trigger icon template.
     */
    triggericon(): TemplateRef<any>;
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<any>;
    /**
     * Custom option group icon template.
     */
    optiongroupicon(): TemplateRef<any>;
    /**
     * Custom loading icon template.
     */
    loadingicon(): TemplateRef<any>;
}
