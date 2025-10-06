import { PassThrough, PassThroughOption } from 'primeng/api';
import { Step, StepItem, StepList, StepPanel, StepPanels, Stepper, StepperSeparator } from './stepper';

/**
 * Defines passthrough(pt) options type in Stepper component.
 */
export declare type StepperPassThroughOption<E> = PassThroughOption<E, Stepper>;

/**
 * Custom passthrough(pt) options for Stepper.
 * @see {@link StepperProps.pt}
 */
export interface StepperPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: StepperPassThroughOption<HTMLElement>;
}

export type StepperPassThrough = PassThrough<Stepper, StepperPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in StepList component.
 */
export declare type StepListPassThroughOption<E> = PassThroughOption<E, StepList>;

/**
 * Custom passthrough(pt) options for StepList.
 * @see {@link StepListProps.pt}
 */
export interface StepListPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: StepListPassThroughOption<HTMLElement>;
}

export type StepListPassThrough = PassThrough<StepList, StepListPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in StepperSeparator component.
 */
export declare type StepperSeparatorPassThroughOption<E> = PassThroughOption<E, StepperSeparator>;

/**
 * Custom passthrough(pt) options for StepperSeparator.
 * @see {@link StepperSeparatorProps.pt}
 */
export interface StepperSeparatorPassThroughOptions {
    /**
     * Used to pass attributes to the separator's DOM element.
     */
    root?: StepperSeparatorPassThroughOption<HTMLElement>;
}

export type StepperSeparatorPassThrough = PassThrough<StepperSeparator, StepperSeparatorPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in StepItem component.
 */
export declare type StepItemPassThroughOption<E> = PassThroughOption<E, StepItem>;

/**
 * Custom passthrough(pt) options for StepItem.
 * @see {@link StepItemProps.pt}
 */
export interface StepItemPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: StepItemPassThroughOption<HTMLElement>;
}

export type StepItemPassThrough = PassThrough<StepItem, StepItemPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in Step component.
 */
export declare type StepPassThroughOption<E> = PassThroughOption<E, Step>;

/**
 * Custom passthrough(pt) options for Step.
 * @see {@link StepProps.pt}
 */
export interface StepPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: StepPassThroughOption<HTMLElement>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: StepPassThroughOption<HTMLButtonElement>;
    /**
     * Used to pass attributes to the number's DOM element.
     */
    number?: StepPassThroughOption<HTMLSpanElement>;
    /**
     * Used to pass attributes to the title's DOM element.
     */
    title?: StepPassThroughOption<HTMLSpanElement>;
}

export type StepPassThrough = PassThrough<Step, StepPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in StepPanel component.
 */
export declare type StepPanelPassThroughOption<E> = PassThroughOption<E, StepPanel>;

/**
 * Custom passthrough(pt) options for StepPanel.
 * @see {@link StepPanelProps.pt}
 */
export interface StepPanelPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: StepPanelPassThroughOption<HTMLElement>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: StepPanelPassThroughOption<HTMLDivElement>;
}

export type StepPanelPassThrough = PassThrough<StepPanel, StepPanelPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in StepPanels component.
 */
export declare type StepPanelsPassThroughOption<E> = PassThroughOption<E, StepPanels>;

/**
 * Custom passthrough(pt) options for StepPanels.
 * @see {@link StepPanelsProps.pt}
 */
export interface StepPanelsPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: StepPanelsPassThroughOption<HTMLElement>;
}

export type StepPanelsPassThrough = PassThrough<StepPanels, StepPanelsPassThroughOptions>;
