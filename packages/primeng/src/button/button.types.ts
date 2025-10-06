import type { PassThrough, PassThroughOption } from 'primeng/api';
import { NgClass } from '@angular/common';
import { TemplateRef } from '@angular/core';
import { Button } from './button';
import { BadgePassThroughOption } from '../badge/badge.types';
/**
 * Defines passthrough(pt) options type in component.
 */
export declare type ButtonPassThroughOption<E> = PassThroughOption<E, Button>;

/**
 * Custom passthrough(pt) options.
 * @see {@link ButtonProps.pt}
 */
export interface ButtonPassThroughOptions<T = any> {
    /**
     * Used to pass attributes to the host DOM element.
     */
    host: ButtonPassThroughOption<HTMLElement>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: ButtonPassThroughOption<HTMLButtonElement>;
    /**
     * Used to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: ButtonPassThroughOption<HTMLSpanElement>;
    /**
     * Used to pass attributes to the icon's DOM element.
     */
    icon?: ButtonPassThroughOption<HTMLSpanElement>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: ButtonPassThroughOption<HTMLSpanElement>;
    /**
     * Used to pass attributes to the Badge component.
     */
    pcBadge?: BadgePassThroughOption<T>;
}

export type ButtonPassThrough = PassThrough<Button, ButtonPassThroughOptions>;

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
