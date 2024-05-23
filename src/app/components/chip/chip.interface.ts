import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Chip.
 * @group Templates
 */
export interface ChipTemplates {
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of remove icon.
     */
    removeicon(): TemplateRef<any>;
}


export interface ChipProps {
    label?: string;
    icon?: string | undefined;
    image?: string | undefined;
    alt?: string | undefined;
    style?: { [klass: string]: any } | null | undefined;
    styleClass?: string | undefined;
    removable?: boolean | undefined;
    removeIcon?: string | undefined;
}
