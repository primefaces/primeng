import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Tag.
 * @group Templates
 */
export interface TagTemplates {
    /**
     * Custom icon template
     */
    icon(): TemplateRef<any>;
}

export type TagSeverity = string | 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined | null;
