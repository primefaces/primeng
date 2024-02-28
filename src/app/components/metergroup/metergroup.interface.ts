import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in MeterGroup.
 * @group Templates
 */
export interface MeterGroupTemplates {
    /**
     * Custom content template.
     */
    content(): TemplateRef<any>;
    /**
     * Custom label template.
     */
    label(): TemplateRef<any>;
    /**
     * Custom meter item template.
     */
    meter(): TemplateRef<any>;
    /**
     * Custom start template.
     */
    start(): TemplateRef<any>;
    /**
     * Custom start template.
     */
    end(): TemplateRef<any>;
    /**
     * Custom icon template.
     */
    icon(): TemplateRef<any>;
}

export interface MeterItem {
    label?: string;
    value?: number;
    color?: string;
    icon?: string;
}
