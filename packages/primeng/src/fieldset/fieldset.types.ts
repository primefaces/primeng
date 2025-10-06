import { TemplateRef } from '@angular/core';
import { PassThrough, PassThroughOption } from 'primeng/api';
import { Fieldset } from './fieldset';
/**
 * Defines passthrough(pt) options type in component.
 */
export declare type FieldsetPassThroughOption<E> = PassThroughOption<E, Fieldset>;

/**
 * Custom passthrough(pt) options.
 * @see {@link FieldsetProps.pt}
 */
export interface FieldsetPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: FieldsetPassThroughOption<HTMLFieldSetElement>;
    /**
     * Used to pass attributes to the legend's DOM element.
     */
    legend?: FieldsetPassThroughOption<HTMLLegendElement>;
    /**
     * Used to pass attributes to the toggle button's DOM element.
     */
    toggleButton?: FieldsetPassThroughOption<HTMLButtonElement>;
    /**
     * Used to pass attributes to the toggle icon's DOM element.
     */
    toggleIcon?: FieldsetPassThroughOption<SVGElement>;
    /**
     * Used to pass attributes to the legend label's DOM element.
     */
    legendLabel?: FieldsetPassThroughOption<HTMLSpanElement>;
    /**
     * Used to pass attributes to the content container's DOM element.
     */
    contentContainer?: FieldsetPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: FieldsetPassThroughOption<HTMLDivElement>;
}

export type FieldsetPassThrough = PassThrough<Fieldset, FieldsetPassThroughOptions>;

/**
 * Custom panel toggle event, emits after toggle.
 * @see {@link Fieldset.onAfterToggle}
 * @group Events
 */
export interface FieldsetAfterToggleEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Collapsed state of the panel.
     */
    collapsed: boolean | undefined;
}

/**
 * Custom panel toggle event, emits before toggle.
 * @see {@link Fieldset.onBeforeToggle}
 * @extends {FieldsetAfterToggleEvent}
 * @group Events
 */
export interface FieldsetBeforeToggleEvent extends FieldsetAfterToggleEvent {}

/**
 * Defines valid templates in Fieldset.
 * @group Templates
 */
export interface FieldsetTemplates {
    /**
     * Custom header template.
     */
    header(): TemplateRef<any>;
    /**
     * Custom content template.
     */
    content(): TemplateRef<any>;
    /**
     * Custom footer template.
     */
    expandicon(): TemplateRef<any>;
    /**
     * Custom icons template of the panel toggler.
     */
    collapseicon(): TemplateRef<any>;
}
