import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in ProgressBar.
 * @group Templates
 */
export interface ProgressBarTemplates {
    /**
     * Custom template of content.
     */
    content(context: {
        /**
         * Value of the progressbar.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: number | undefined }>;
}
