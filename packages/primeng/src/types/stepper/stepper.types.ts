import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Defines valid pass-through options in Stepper component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface StepperPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in Stepper component.
 * @see {@link StepperPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type StepperPassThrough<I = unknown> = PassThrough<I, StepperPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in StepList component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface StepListPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in StepList component.
 * @see {@link StepListPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type StepListPassThrough<I = unknown> = PassThrough<I, StepListPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in StepperSeparator component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface StepperSeparatorPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the separator's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in StepperSeparator component.
 * @see {@link StepperSeparatorPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type StepperSeparatorPassThrough<I = unknown> = PassThrough<I, StepperSeparatorPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in StepItem component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface StepItemPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in StepItem component.
 * @see {@link StepItemPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type StepItemPassThrough<I = unknown> = PassThrough<I, StepItemPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in Step component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface StepPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the number's DOM element.
     */
    number?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the title's DOM element.
     */
    title?: PassThroughOption<HTMLSpanElement, I>;
}

/**
 * Defines valid pass-through options in Step component.
 * @see {@link StepPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type StepPassThrough<I = unknown> = PassThrough<I, StepPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in StepPanel component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface StepPanelPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in StepPanel component.
 * @see {@link StepPanelPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type StepPanelPassThrough<I = unknown> = PassThrough<I, StepPanelPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in StepPanels component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface StepPanelsPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in StepPanels component.
 * @see {@link StepPanelsPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type StepPanelsPassThrough<I = unknown> = PassThrough<I, StepPanelsPassThroughOptions<I>>;
