import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Card.
 * @group Templates
 */
export interface CardTemplates {
    /**
     * Custom template of header.
     */
    header(): TemplateRef<any>;
    /**
     * Custom template of title.
     */
    title(): TemplateRef<any>;
    /**
     * Custom template of subtitle.
     */
    subtitle(): TemplateRef<any>;
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of footer.
     */
    footer(): TemplateRef<any>;
}
