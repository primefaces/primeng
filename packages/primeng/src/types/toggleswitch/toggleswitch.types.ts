import { TemplateRef } from '@angular/core';
import { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom passthrough(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ToggleSwitch.pt}
 * @group Interface
 */
export interface ToggleSwitchPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the input's DOM element.
     */
    input?: PassThroughOption<HTMLInputElement, I>;
    /**
     * Used to pass attributes to the slider's DOM element.
     */
    slider?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the handle's DOM element.
     */
    handle?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in ToggleSwitch component.
 * @see {@link ToggleSwitchPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ToggleSwitchPassThrough<I = unknown> = PassThrough<I, ToggleSwitchPassThroughOptions<I>>;

/**
 * Custom change event.
 * @see {@link ToggleSwitch.onChange}
 * @group Events
 */
export interface ToggleSwitchChangeEvent {
    /**
     * Browser event
     */
    originalEvent: Event;
    /**
     * Checked state as a boolean.
     */
    checked: boolean;
}

/**
 * Custom handle template context.
 * @group Interface
 */
export interface ToggleSwitchHandleTemplateContext {
    /**
     * Checked state of the toggle switch.
     */
    checked: boolean;
}

/**
 * Defines valid templates in ToggleSwitch.
 * @group Templates
 */
export interface ToggleSwitchTemplates {
    /**
     * Custom handle template.
     * @param {ToggleSwitchHandleTemplateContext} context - handle context.
     */
    handle(context: ToggleSwitchHandleTemplateContext): TemplateRef<ToggleSwitchHandleTemplateContext>;
}
