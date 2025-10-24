import { NgClass } from '@angular/common';
import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { BadgePassThrough } from 'primeng/types/badge';
import type { Button } from 'primeng/button';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Button.pt}
 * @group Interface
 */
export interface ButtonPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the icon's DOM element.
     */
    icon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the Badge component.
     */
    pcBadge?: BadgePassThrough;
}

/**
 * Defines valid pass-through options in Button component.
 * @see {@link ButtonPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ButtonPassThrough<I = unknown> = PassThrough<I, ButtonPassThroughOptions<I>>;

/**
 * Defines valid templates in Button.
 * @group Templates
 */
export interface ButtonTemplates {
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of icon.
     */
    icon(context: {
        /**
         * Icon class.
         */
        class: NgClass;
    }): TemplateRef<NgClass>;
    /**
     * Custom template of loadingicon.
     */
    loadingicon(context: {
        /**
         * Icon class.
         */
        class: NgClass;
    }): TemplateRef<NgClass>;
}

type ButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';

export interface ButtonProps {
    type?: string;
    iconPos?: ButtonIconPosition;
    icon?: string | undefined;
    badge?: string | undefined;
    label?: string | undefined;
    disabled?: boolean | undefined;
    loading?: boolean;
    loadingIcon?: string | undefined;
    raised?: boolean;
    rounded?: boolean;
    text?: boolean;
    plain?: boolean;
    severity?: ButtonSeverity;
    outlined?: boolean;
    link?: boolean;
    tabindex?: number | undefined;
    size?: 'small' | 'large' | undefined;
    style?: { [klass: string]: any } | null | undefined;
    styleClass?: string | undefined;
    badgeClass?: string | undefined;
    badgeSeverity?: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
    ariaLabel?: string | undefined;
    autofocus?: boolean | undefined;
    variant?: string | undefined;
}

export type ButtonSeverity = 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
