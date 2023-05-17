import { ElementRef, TemplateRef } from '@angular/core';
import { Overlay } from 'primeng/overlay';

/**
 * Custom panel show event.
 * @see {@link CascadeSelect.onShow}
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
 */
export interface CascadeSelectHideEvent extends CascadeSelectShowEvent {}
/**
 * Custom panel show event emits right before the panel is shown.
 * @see {@link CascadeSelect.onBeforeShow}
 */
export interface CascadeSelectBeforeShowEvent extends CascadeSelectShowEvent {}
/**
 * Custom panel hide event emits right before the panel is hidden.
 * @see {@link CascadeSelect.onBeforeHide}
 */
export interface CascadeSelectBeforeHideEvent extends CascadeSelectShowEvent {}

/**
 * Defines valid templates in CascadeSelect.
 * @group Templates
 */
export interface CascadeSelectTemplates {
    /**
     * Custom value template.
     * @param {Object} implicit - value.
     */
    value: TemplateRef<any>;
    /**
     * Custom option template.
     * @param {Object} implicit - option.
     */
    option: TemplateRef<any>;
    /**
     * Custom dropdown trigger icon template.
     */
    triggericon: TemplateRef<any>;
    /**
     * Custom clear icon template.
     */
    clearicon: TemplateRef<any>;
    /**
     * Custom option group icon template.
     */
    optiongroupicon: TemplateRef<any>;
}
