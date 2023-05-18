import { PickList } from './picklist';
import { TemplateRef } from '@angular/core';
/**
 * Callbacks to invoke on filter.
 */
export interface PickListFilterOptions {
    filter?: (value?: any) => void;
    reset?: () => void;
}

/**
 * Custom move to source event.
 * @see {@link PickList.onMoveToSource}
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
 */
export interface PickListMoveAllToSourceEvent extends PickListMoveToSourceEvent {}
/**
 * Custom move all to target event.
 * @see {@link PickList.onMoveAllToTarget}
 * @extends {PickListMoveToSourceEvent}
 */
export interface PickListMoveAllToTargetEvent extends PickListMoveToSourceEvent {}
/**
 * Custom move to target event.
 * @see {@link PickList.onMoveToTarget}
 * @extends {PickListMoveToSourceEvent}
 */
export interface PickListMoveToTargetEvent extends PickListMoveToSourceEvent {}
/**
 * Custom move source reorder event.
 * @see {@link PickList.onSourceReorder}
 * @extends {PickListMoveToSourceEvent}
 */
export interface PickListSourceReorderEvent extends PickListMoveToSourceEvent {}
/**
 * Custom move target reorder event.
 * @see {@link PickList.onTargetReorder}
 * @extends {PickListMoveToSourceEvent}
 */
export interface PickListTargetReorderEvent extends PickListMoveToSourceEvent {}
/**
 * Custom source select event.
 * @see {@link PickList.onSourceSelect}
 * @extends {PickListMoveToSourceEvent}
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
 */
export interface PickListTargetSelectEvent extends PickListSourceSelectEvent {}
/**
 * Custom source filter event.
 * @see {@link PickList.onSourceFilter}
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
 */
export interface PickListTargetFilterEvent extends PickListSourceFilterEvent {}
/**
 * Defines valid templates in PickList.
 * @group Templates
 */
export interface PickListTemplates {
    /**
     * Custom item template.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: any;
        /**
         * Item index.
         */
        index: number;
    }): TemplateRef<{ $implicit: any; index: number }>;
    /**
     * Custom source header template.
     */
    sourceHeader: TemplateRef<any>;
    /**
     * Custom target header template.
     */
    targetHeader: TemplateRef<any>;
    /**
     * Custom source filter template.
     */
    sourceFilter(context: {
        /**
         * Source filter options.
         */
        options: PickListFilterOptions;
    }): TemplateRef<{ options: PickListFilterOptions }>;
    /**
     * Custom target filter template.
     */
    targetFilter(context: {
        /**
         * Target filter options.
         */
        options: PickListFilterOptions;
    }): TemplateRef<{ options: PickListFilterOptions }>;
    /**
     * Custom source list empty message template.
     */
    emptymessagesource: TemplateRef<any>;
    /**
     * Custom source list empty filter message template.
     */
    emptyfiltermessagesource: TemplateRef<any>;
    /**
     * Custom target list empty message template.
     */
    emptymessagetarget: TemplateRef<any>;
    /**
     * Custom target list empty filter message template.
     */
    emptyfiltermessagetarget: TemplateRef<any>;
    /**
     * Custom move up icon template.
     */
    moveupicon: TemplateRef<any>;
    /**
     * Custom move top icon template.
     */
    movetopicon: TemplateRef<any>;
    /**
     * Custom move down icon template.
     */
    movedownicon: TemplateRef<any>;
    /**
     * Custom move bottom icon template.
     */
    movebottomicon: TemplateRef<any>;
    /**
     * Custom move to target icon template.
     */
    movetotargeticon(context: {
        /**
         * Boolean value indicates if the view is changed according to breakpoints.
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: boolean }>;
    /**
     * Custom move all to target icon template.
     */
    movealltotargeticon(context: {
        /**
         * Boolean value indicates if the view is changed according to breakpoints.
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: boolean }>;
    /**
     * Custom move to source icon template.
     */
    movetosourceicon(context: {
        /**
         * Boolean value indicates if the view is changed according to breakpoints.
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: boolean }>;
    /**
     * Custom move all to source icon template.
     */
    movealltosourceicon(context: {
        /**
         * Boolean value indicates if the view is changed according to breakpoints.
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: boolean }>;
    /**
     * Custom target filter icon template.
     */
    targetfiltericon: TemplateRef<any>;
    /**
     * Custom source filter icon template.
     */
    sourcefiltericon: TemplateRef<any>;
}
