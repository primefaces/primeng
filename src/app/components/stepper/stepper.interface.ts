import { TemplateRef } from '@angular/core';
import { Stepper } from './stepper';

/**
 * Defines valid templates in Stepper.
 * @group Templates
 */
export interface StepperTemplates {
    /**
     * Custom start template.
     */
    start(): TemplateRef<any>;
    /**
     * Custom end template.
     */
    end(): TemplateRef<any>;
}
/**
 * Custom active step change event.
 * @see {@link Stepper.onActiveStepChange}
 * @group Events
 */
export interface ActiveStepChangeEvent {
    /**
     * Emitted when the value changes.
     */
    value: number | undefined | null;
}
