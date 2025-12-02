import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThrough } from 'primeng/types/button';
import { MenuPassThrough } from 'primeng/types/menu';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link SplitButton.pt}
 * @group Interface
 */
export interface SplitButtonPassThroughOptions<I = unknown> {
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
     * Used to pass attributes to the dropdown Button component.
     * @see {@link ButtonPassThrough}
     */
    pcDropdown?: ButtonPassThrough;
    /**
     * Used to pass attributes to the TieredMenu component.
     */
    pcMenu?: MenuPassThrough;
}

/**
 * Defines valid pass-through options in SplitButton component.
 * @see {@link SplitButtonPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type SplitButtonPassThrough<I = unknown> = PassThrough<I, SplitButtonPassThroughOptions<I>>;

/**
 * Defines valid templates in SplitButton.
 * @group Templates
 */
export interface SplitButtonTemplates {
    /**
     * Custom content template.
     */
    content(): TemplateRef<void>;
    /**
     * Custom dropdown icon template.
     */
    dropdownicon(): TemplateRef<void>;
}
/**
 * Defines ButtonProps interface.
 */
export interface ButtonProps {
    ariaLabel?: string;
}
/**
 * Defines MenuButtonProps interface.
 */
export interface MenuButtonProps {
    ariaLabel?: string;
    ariaHasPopup?: boolean;
    ariaExpanded?: boolean;
    ariaControls?: string;
}
