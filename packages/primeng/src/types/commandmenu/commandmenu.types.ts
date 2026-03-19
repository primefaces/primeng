import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Defines valid pass-through options in CommandMenu component.
 * @template I Type of instance.
 *
 * @see {@link CommandMenu.pt}
 * @group Interface
 */
export interface CommandMenuPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the input's DOM element.
     */
    input?: PassThroughOption<HTMLInputElement, I>;
    /**
     * Used to pass attributes to the Listbox component.
     */
    pcListbox?: any;
    /**
     * Used to pass attributes to the empty message's DOM element.
     */
    empty?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in CommandMenu component.
 * @see {@link CommandMenuPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type CommandMenuPassThrough<I = unknown> = PassThrough<I, CommandMenuPassThroughOptions<I>>;

/**
 * Custom item select event.
 * @group Events
 */
export interface CommandMenuItemSelectEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected option value.
     */
    value: any;
    /**
     * Selected option data.
     */
    option: any;
}

/**
 * Custom search change event.
 * @group Events
 */
export interface CommandMenuSearchChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Search query value.
     */
    query: string;
}

/**
 * Custom item template context.
 * @group Interface
 */
export interface CommandMenuItemTemplateContext<T = any> {
    /**
     * Data of the option.
     */
    $implicit: T;
    /**
     * Index of the option.
     */
    index: number;
}

/**
 * Custom group template context.
 * @group Interface
 */
export interface CommandMenuGroupTemplateContext<T = any> {
    /**
     * Group option data.
     */
    $implicit: T;
}

/**
 * Custom header template context.
 * @group Interface
 */
export interface CommandMenuHeaderTemplateContext {
    /**
     * Current search value.
     */
    $implicit: string;
}

/**
 * Custom footer template context.
 * @group Interface
 */
export interface CommandMenuFooterTemplateContext {
    /**
     * Current search value.
     */
    $implicit: string;
}

/**
 * Custom empty template context.
 * @group Interface
 */
export interface CommandMenuEmptyTemplateContext {
    /**
     * Current search value.
     */
    $implicit: string;
}

/**
 * Defines valid templates in CommandMenu.
 * @group Templates
 */
export interface CommandMenuTemplates {
    /**
     * Custom item template.
     * @param {Object} context - item data.
     */
    item(context: CommandMenuItemTemplateContext): TemplateRef<CommandMenuItemTemplateContext>;
    /**
     * Custom group template.
     * @param {Object} context - group data.
     */
    group(context: CommandMenuGroupTemplateContext): TemplateRef<CommandMenuGroupTemplateContext>;
    /**
     * Custom header template.
     * @param {Object} context - header context.
     */
    header(context: CommandMenuHeaderTemplateContext): TemplateRef<CommandMenuHeaderTemplateContext>;
    /**
     * Custom footer template.
     * @param {Object} context - footer context.
     */
    footer(context: CommandMenuFooterTemplateContext): TemplateRef<CommandMenuFooterTemplateContext>;
    /**
     * Custom empty template.
     * @param {Object} context - empty context.
     */
    empty(context: CommandMenuEmptyTemplateContext): TemplateRef<CommandMenuEmptyTemplateContext>;
}

/**
 * Defines context options for CommandMenu passthrough.
 * @group Interface
 */
export interface CommandMenuContext {
    /**
     * Whether the option is focused.
     */
    focused?: boolean;
    /**
     * Whether the option is disabled.
     */
    disabled?: boolean;
}
