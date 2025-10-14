import { TemplateRef } from '@angular/core';
import { PassThrough, PassThroughOption } from 'primeng/api';
import type { Fieldset } from 'primeng/fieldset';

/**
 * Custom passthrough(pt) options.
 * @see {@link Fieldset.pt}
 * @group Interface
 */
export interface FieldsetPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLFieldSetElement, I>;
    /**
     * Used to pass attributes to the legend's DOM element.
     */
    legend?: PassThroughOption<HTMLLegendElement, I>;
    /**
     * Used to pass attributes to the toggle button's DOM element.
     */
    toggleButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the toggle icon's DOM element.
     */
    toggleIcon?: PassThroughOption<SVGElement | HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the legend label's DOM element.
     */
    legendLabel?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the content container's DOM element.
     */
    contentContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Fieldset component.
 * @see {@link FieldsetPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type FieldsetPassThrough<I = unknown> = PassThrough<I, FieldsetPassThroughOptions<I>>;

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
