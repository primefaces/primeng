import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { Panel } from './panel';

/**
 * Defines passthrough(pt) options type in component.
 */
export declare type PanelPassThroughOption<E> = PassThroughOption<E, Panel>;

/**
 * Custom passthrough(pt) options.
 * @see {@link Panel.pt}
 */
export interface PanelPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PanelPassThroughOption<HTMLButtonElement>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PanelPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the title's DOM element.
     */
    title?: PanelPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the header actions' DOM element.
     */
    headerActions?: PanelPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the toggle button button's DOM element.
     * @see {@link ButtonPassThroughOptions}
     */
    //pcToggleButton?: ButtonPassThroughOptions<PanelSharedPassThroughMethodOptions>;
    /**
     * Used to pass attributes to the content container's DOM element.
     */
    contentContainer?: PanelPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PanelPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: PanelPassThroughOption<HTMLDivElement>;
}

export type PanelPassThrough = PassThrough<Panel, PanelPassThroughOptions>;

/**
 * Custom panel toggle event, emits before panel toggle.
 * @see {@link onBeforeToggle}
 * @group Interface
 */
export interface PanelBeforeToggleEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Collapsed state of the panel.
     */
    collapsed: boolean | undefined;
}

/**
 * Custom panel toggle event, emits after panel toggle.
 * @see {@link onAfterToggle}
 * @extends {PanelBeforeToggleEvent}
 * @group Interface
 */
export interface PanelAfterToggleEvent extends PanelBeforeToggleEvent {}

/**
 * Toggle icon template context.
 * @param {boolean} $implicit - Collapsed state as a boolean, implicit value.
 * @group Interface
 */
export interface PanelHeaderIconsTemplateContext {
    /**
     * Collapsed state as a boolean, implicit value.
     */
    $implicit: boolean;
}
