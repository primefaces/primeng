import { TemplateRef } from "@angular/core";

/**
 * Defines valid templates in Password.
 * @group Templates
 */
export interface PasswordTemplates {
    /**
     * Custom template of header.
     */
    header(): TemplateRef<any>;
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of footer.
     */
    footer(): TemplateRef<any>;
    /**
     * Custom template of clear icon.
     */
    clearicon(): TemplateRef<any>;
    /**
     * Custom template of hide icon.
     */
    hideicon(): TemplateRef<any>;
    /**
     * Custom template of show icon.
     */
    showicon(): TemplateRef<any>;
}