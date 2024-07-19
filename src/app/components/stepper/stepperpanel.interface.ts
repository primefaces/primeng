import { TemplateRef } from '@angular/core';
/**
 * StepperPanel is a helper component for Stepper component.
 * @group Components
 */
export interface StepperPanelProps {
    /**
     * Orientation of tab headers.
     * @group Props
     */
    header: string | undefined;
}

/**
 * Defines valid templates in StepperPanel.
 * @group Templates
 */
export interface StepperPanelTemplates {
    /**
     * Custom header template.
     */
    header(context: StepperPanelHeaderTemplate): TemplateRef<StepperPanelHeaderTemplate>;
    /**
     * Custom header template.
     */
    content(context: StepperPanelContentTemplate): TemplateRef<StepperPanelContentTemplate>;
    /**
     * Custom separator template.
     */
    separator(context: StepperPanelSeparatorProps): TemplateRef<StepperPanelSeparatorProps>;
}

/**
 * Props of stepper panel header.
 * @group Interface
 */
export interface StepperPanelHeaderTemplate {
    /**
     * Index of the stepperpanel.
     */
    index: number;
    /**
     * Current active state of the stepperpanel
     */
    active: boolean;
    /**
     * Current highlighted state of the stepperpanel
     */
    highlighted: boolean;
    /**
     * Style class of the stepperpanel
     */
    class: string;
    /**
     * Style class of the header content container
     */
    headerClass: string;
    /**
     * Style class of the number content container
     */
    numberClass: string;
    /**
     * Style class of the title content container
     */
    titleClass: string;
    /**
     * Header click function.
     */
    onClick: (event: Event) => void;
}

/**
 * Props of stepper panel content.
 * @group Interface
 */
export interface StepperPanelContentTemplate {
    /**
     * Index of the stepperpanel.
     */
    index: number;
    /**
     * Current active state of the stepperpanel
     */
    active: boolean;
    /**
     * Current highlighted state of the stepperpanel
     */
    highlighted: boolean;
    /**
     * Style class of the stepperpanel
     */
    class: string;
    /**
     * Style class of the header content container
     */
    headerClass: string;
    /**
     * Style class of the number content container
     */
    numberClass: string;
    /**
     * Style class of the title content container
     */
    titleClass: string;
    /**
     * Content click function.
     */
    onClick: (event: Event) => void;
    /**
     * Content previous panel click function.
     */
    prevCallback: (event: Event) => void;
    /**
     * Content next panel click function.
     */
    nextCallback: (event: Event) => void;
}
/**
 * Props of stepper panel separator.
 * @group Interface
 */
export interface StepperPanelSeparatorProps {
    /**
     * Index of the stepperpanel.
     */
    index: number;
    /**
     * Current active state of the stepperpanel
     */
    active: boolean;
    /**
     * Current highlighted state of the stepperpanel
     */
    highlighted: boolean;
}