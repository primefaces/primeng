import { NgClass } from '@angular/common';
import { TemplateRef } from '@angular/core';

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
    severity?: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
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
}
