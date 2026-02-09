import { TemplateRef } from '@angular/core';
import type { MenuItem, PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThrough } from 'primeng/types/button';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link SpeedDial.pt}
 * @group Interface
 */
export interface SpeedDialPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the Button component.
     * @see {@link ButtonPassThrough}
     */
    pcButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the list's DOM element.
     */
    list?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the item's DOM element.
     */
    item?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the action's Button component.
     * @see {@link ButtonPassThrough}
     */
    pcAction?: ButtonPassThrough;
    /**
     * Used to pass attributes to the action icon's DOM element.
     */
    actionIcon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the mask's DOM element.
     */
    mask?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in SpeedDial component.
 * @see {@link SpeedDialPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type SpeedDialPassThrough<I = unknown> = PassThrough<I, SpeedDialPassThroughOptions<I>>;

/**
 * Custom button template context.
 * @group Interface
 */
export interface SpeedDialButtonTemplateContext {
    /**
     * Callback to toggle the speed dial visibility.
     */
    toggleCallback: (event: MouseEvent) => void;
}

/**
 * Custom item template context.
 * @group Interface
 */
export interface SpeedDialItemTemplateContext {
    /**
     * Menu item instance.
     */
    $implicit: MenuItem;
    /**
     * Index of the item.
     */
    index: number;
    /**
     * Callback to handle item click.
     */
    toggleCallback: (event: Event, item: MenuItem) => void;
}

/**
 * Defines valid templates in SpeedDial.
 * @group Templates
 */
export interface SpeedDialTemplates {
    /**
     * Custom button template.
     * @param {SpeedDialButtonTemplateContext} context - button context.
     */
    button(context: SpeedDialButtonTemplateContext): TemplateRef<SpeedDialButtonTemplateContext>;
    /**
     * Custom icon template.
     */
    icon(): TemplateRef<void>;
    /**
     * Custom item template.
     * @param {SpeedDialItemTemplateContext} context - item context.
     */
    item(context: SpeedDialItemTemplateContext): TemplateRef<SpeedDialItemTemplateContext>;
}
