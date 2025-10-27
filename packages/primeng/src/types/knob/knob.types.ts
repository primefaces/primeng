import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Knob.pt}
 * @group Interface
 */
export interface KnobPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the SVG's DOM element.
     */
    svg?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the range's DOM element.
     */
    range?: PassThroughOption<SVGPathElement, I>;
    /**
     * Used to pass attributes to the value's DOM element.
     */
    value?: PassThroughOption<SVGPathElement, I>;
    /**
     * Used to pass attributes to the text's DOM element.
     */
    text?: PassThroughOption<SVGTextElement, I>;
}

/**
 * Defines valid pass-through options in Knob component.
 * @see {@link KnobPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type KnobPassThrough<I = unknown> = PassThrough<I, KnobPassThroughOptions<I>>;
