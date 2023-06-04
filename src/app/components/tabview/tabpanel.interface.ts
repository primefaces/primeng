import { TemplateRef } from "@angular/core";

/**
 * Defines valid templates in TabPanel.
 * @group Templates
 */
export interface TabPanelTemplates {
    /**
     * Custom header template.
     *
     */
    header(): TemplateRef<any>;
    /**
     * Custom content template(Default).
     * @default
     */
    content(): TemplateRef<any>;
    /**
     * Custom right icon template.
     */
    righticon(): TemplateRef<any>;
    /**
     * Custom left icon template.
     */
    lefticon(): TemplateRef<any>;
    /**
     * Custom close icon template.
     */
    closeicon(): TemplateRef<any>;
}
