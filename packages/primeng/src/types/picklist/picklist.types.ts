import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThrough } from 'primeng/types/button';
import type { ListBoxPassThrough } from 'primeng/types/listbox';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link PickList.pt}
 * @group Interface
 */
export interface PickListPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the source controls' DOM element.
     */
    sourceControls?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the source list container's DOM element.
     */
    sourceListContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the transfer controls' DOM element.
     */
    transferControls?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the target list container's DOM element.
     */
    targetListContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the target controls' DOM element.
     */
    targetControls?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the source move up Button component.
     * @see {@link ButtonPassThrough}
     */
    pcSourceMoveUpButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the source move top Button component.
     * @see {@link ButtonPassThrough}
     */
    pcSourceMoveTopButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the source move down Button component.
     * @see {@link ButtonPassThrough}
     */
    pcSourceMoveDownButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the source move bottom Button component.
     * @see {@link ButtonPassThrough}
     */
    pcSourceMoveBottomButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the move to target Button component.
     * @see {@link ButtonPassThrough}
     */
    pcMoveToTargetButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the move all to target Button component.
     * @see {@link ButtonPassThrough}
     */
    pcMoveAllToTargetButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the move to source Button component.
     * @see {@link ButtonPassThrough}
     */
    pcMoveToSourceButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the move all to source Button component.
     * @see {@link ButtonPassThrough}
     */
    pcMoveAllToSourceButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the target move up Button component.
     * @see {@link ButtonPassThrough}
     */
    pcTargetMoveUpButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the target move top Button component.
     * @see {@link ButtonPassThrough}
     */
    pcTargetMoveTopButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the target move down Button component.
     * @see {@link ButtonPassThrough}
     */
    pcTargetMoveDownButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the target move bottom Button component.
     * @see {@link ButtonPassThrough}
     */
    pcTargetMoveBottomButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the Listbox component.
     * @see {@link ListBoxPassThrough}
     */
    pcListbox?: ListBoxPassThrough;
}

/**
 * Defines valid pass-through options in PickList.
 * @see {@link PickListPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type PickListPassThrough<I = unknown> = PassThrough<I, PickListPassThroughOptions<I>>;

/**
 * Callbacks to invoke on filter.
 * @group Interface
 */
export interface PickListFilterOptions {
    filter?: (value?: any) => void;
    reset?: () => void;
}

/**
 * Custom move to source event.
 * @see {@link PickList.onMoveToSource}
 * @group Events
 */
export interface PickListMoveToSourceEvent {
    /**
     * Moved items.
     */
    items: any[];
}
/**
 * Custom move all to source event.
 * @see {@link PickList.onMoveAllToSource}
 * @extends {PickListMoveToSourceEvent}
 * @group Events
 */
export interface PickListMoveAllToSourceEvent extends PickListMoveToSourceEvent {}
/**
 * Custom move all to target event.
 * @see {@link PickList.onMoveAllToTarget}
 * @extends {PickListMoveToSourceEvent}
 * @group Events
 */
export interface PickListMoveAllToTargetEvent extends PickListMoveToSourceEvent {}
/**
 * Custom move to target event.
 * @see {@link PickList.onMoveToTarget}
 * @extends {PickListMoveToSourceEvent}
 * @group Events
 */
export interface PickListMoveToTargetEvent extends PickListMoveToSourceEvent {}
/**
 * Custom move source reorder event.
 * @see {@link PickList.onSourceReorder}
 * @extends {PickListMoveToSourceEvent}
 * @group Events
 */
export interface PickListSourceReorderEvent extends PickListMoveToSourceEvent {}
/**
 * Custom move target reorder event.
 * @see {@link PickList.onTargetReorder}
 * @extends {PickListMoveToSourceEvent}
 * @group Events
 */
export interface PickListTargetReorderEvent extends PickListMoveToSourceEvent {}
/**
 * Custom source select event.
 * @see {@link PickList.onSourceSelect}
 * @group Events
 */
export interface PickListSourceSelectEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected items.
     */
    items: any[];
}
/**
 * Custom target select event.
 * @see {@link PickList.onTargetSelect}
 * @extends {PickListSourceSelectEvent}
 * @group Events
 */
export interface PickListTargetSelectEvent extends PickListSourceSelectEvent {}
/**
 * Custom source filter event.
 * @see {@link PickList.onSourceFilter}
 * @group Events
 */
export interface PickListSourceFilterEvent {
    /**
     * Filter value.
     */
    query: string | null | undefined;
    /**
     * Filtered items.
     */
    value: any[] | null | undefined;
}
/**
 * Custom target filter event.
 * @see {@link PickList.onTargetFilter}
 * @extends {PickListSourceFilterEvent}
 * @group Events
 */
export interface PickListTargetFilterEvent extends PickListSourceFilterEvent {}
/**
 * Custom item template context.
 * @group Interface
 */
export interface PickListItemTemplateContext {
    /**
     * Item instance.
     */
    $implicit: any;
    /**
     * Item index.
     */
    index: number;
    /**
     * Whether the item is selected.
     */
    selected: boolean;
    /**
     * Whether the item is disabled.
     */
    disabled: boolean;
}

/**
 * Custom filter template context.
 * @group Interface
 */
export interface PickListFilterTemplateContext {
    /**
     * Filter options.
     */
    options: PickListFilterOptions;
}

/**
 * Custom transfer icon template context.
 * @group Interface
 */
export interface PickListTransferIconTemplateContext {
    /**
     * Boolean value indicates if the view is changed according to breakpoints.
     */
    $implicit: boolean;
}

/**
 * Defines valid templates in PickList.
 * @group Templates
 */
export interface PickListTemplates {
    /**
     * Custom item template.
     * @param {PickListItemTemplateContext} context - item context.
     */
    item(context: PickListItemTemplateContext): TemplateRef<PickListItemTemplateContext>;
    /**
     * Custom source header template.
     */
    sourceHeader(): TemplateRef<void>;
    /**
     * Custom target header template.
     */
    targetHeader(): TemplateRef<void>;
    /**
     * Custom source filter template.
     * @param {PickListFilterTemplateContext} context - filter context.
     */
    sourceFilter(context: PickListFilterTemplateContext): TemplateRef<PickListFilterTemplateContext>;
    /**
     * Custom target filter template.
     * @param {PickListFilterTemplateContext} context - filter context.
     */
    targetFilter(context: PickListFilterTemplateContext): TemplateRef<PickListFilterTemplateContext>;
    /**
     * Custom source list empty message template.
     */
    emptymessagesource(): TemplateRef<void>;
    /**
     * Custom source list empty filter message template.
     */
    emptyfiltermessagesource(): TemplateRef<void>;
    /**
     * Custom target list empty message template.
     */
    emptymessagetarget(): TemplateRef<void>;
    /**
     * Custom target list empty filter message template.
     */
    emptyfiltermessagetarget(): TemplateRef<void>;
    /**
     * Custom move up icon template.
     */
    moveupicon(): TemplateRef<void>;
    /**
     * Custom move top icon template.
     */
    movetopicon(): TemplateRef<void>;
    /**
     * Custom move down icon template.
     */
    movedownicon(): TemplateRef<void>;
    /**
     * Custom move bottom icon template.
     */
    movebottomicon(): TemplateRef<void>;
    /**
     * Custom move to target icon template.
     * @param {PickListTransferIconTemplateContext} context - icon context.
     */
    movetotargeticon(context: PickListTransferIconTemplateContext): TemplateRef<PickListTransferIconTemplateContext>;
    /**
     * Custom move all to target icon template.
     * @param {PickListTransferIconTemplateContext} context - icon context.
     */
    movealltotargeticon(context: PickListTransferIconTemplateContext): TemplateRef<PickListTransferIconTemplateContext>;
    /**
     * Custom move to source icon template.
     * @param {PickListTransferIconTemplateContext} context - icon context.
     */
    movetosourceicon(context: PickListTransferIconTemplateContext): TemplateRef<PickListTransferIconTemplateContext>;
    /**
     * Custom move all to source icon template.
     * @param {PickListTransferIconTemplateContext} context - icon context.
     */
    movealltosourceicon(context: PickListTransferIconTemplateContext): TemplateRef<PickListTransferIconTemplateContext>;
    /**
     * Custom target filter icon template.
     */
    targetfiltericon(): TemplateRef<void>;
    /**
     * Custom source filter icon template.
     */
    sourcefiltericon(): TemplateRef<void>;
}
