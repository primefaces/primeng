import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Card.
 * @group Templates
 */
export interface CardTemplates {
    /**
     * Custom template of header.
     */
    header: TemplateRef<any> | null;
    /**
     * Custom template of title.
     */
    title: TemplateRef<any> | null;
    /**
     * Custom template of subtitle.
     */
    subtitle: TemplateRef<any> | null;
    /**
     * Custom template of content.
     */
    content: TemplateRef<any> | null;
    /**
     * Custom template of footer.
     */
    footer: TemplateRef<any> | null;
}
