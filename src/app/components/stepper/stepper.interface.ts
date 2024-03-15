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
/**
 * Defines valid templates in StepperPanel.
 * @group Templates
 */
export interface StepperPanelTemplates {
    /**
     * Custom header template.
     */
    header(context: {
        /**
         * Index of the stepperpanel.
         */
        $index: number;
        /**
         * Current active state of the stepperpanel
         */
        $active: boolean;
        /**
         * Current active index state of the stepperpanel
         */
        $activeStep: number;
        /**
         * Current highlighted state of the stepperpanel
         */
        $highlighted: boolean;
        /**
         * Style class of the stepperpanel
         */
        $class: string;
        /**
         * Style class of the header content container
         */
        $headerClass: string;
        /**
         * Style class of the number content container
         */
        $numberClass: string;
        /**
         * Style class of the title content container
         */
        $titleClass: string;
        /**
         * Header click function.
         */
        $onClick: (event: Event) => void;
    }): TemplateRef<{ $index: number; $active: boolean; $activeStep: number; $highlighted: boolean; $class: string; $headerClass: string; $numberClass: string; $titleClass: string; $onClick: (event: Event) => void }>;
    /**
     * Custom header template.
     */
    content(context: {
        /**
         * Index of the stepperpanel.
         */
        $index: number;
        /**
         * Current active state of the stepperpanel
         */
        $active: boolean;
        /**
         * Current active index state of the stepperpanel
         */
        $activeStep: number;
        /**
         * Current highlighted state of the stepperpanel
         */
        $highlighted: boolean;
        /**
         * Style class of the stepperpanel
         */
        $class: string;
        /**
         * Style class of the header content container
         */
        $headerClass: string;
        /**
         * Style class of the number content container
         */
        $numberClass: string;
        /**
         * Style class of the title content container
         */
        $titleClass: string;
        /**
         * Content click function.
         */
        $onClick: (event: Event) => void;
        /**
         * Content previous panel click function.
         */
        $onPrevClick: (event: Event) => void;
        /**
         * Content next panel click function.
         */
        $onNextClick: (event: Event) => void;
    }): TemplateRef<{
        $index: number;
        $active: boolean;
        $activeStep: number;
        $highlighted: boolean;
        $class: string;
        $headerClass: string;
        $numberClass: string;
        $titleClass: string;
        $onClick: (event: Event) => void;
        $onPrevClick: (event: Event) => void;
        $onNextClick: (event: Event) => void;
    }>;

    /**
     * Custom separator template.
     */
    separator(context: {
        /**
         * Index of the stepperpanel.
         */
        $index: number;
        /**
         * Current active state of the stepperpanel
         */
        $active: boolean;
        /**
         * Current active index state of the stepperpanel
         */
        $activeStep: number;
        /**
         * Current highlighted state of the stepperpanel
         */
        $highlighted: boolean;
    }): TemplateRef<{
        $index: number;
        $active: boolean;
        $activeStep: number;
        $highlighted: boolean;
        $class: string;
    }>;
}
