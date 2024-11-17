/**
 * Options for the scroller.
 * @group Interface
 */
export interface ScrollerOptions {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * Inline style of the component.
     */
    style?: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the element.
     */
    styleClass?: string | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabindex?: number | undefined;
    /**
     * An array of objects to display.
     */
    items?: any[];
    /**
     * The height/width of item according to orientation.
     */
    itemSize?: any;
    /**
     * Height of the scroll viewport.
     */
    scrollHeight?: string | undefined;
    /**
     * Width of the scroll viewport.
     */
    scrollWidth?: string | undefined;
    /**
     * The orientation of scrollbar.
     */
    orientation?: 'vertical' | 'horizontal' | 'both';
    /**
     * Used to specify how many items to load in each load method in lazy mode.
     */
    step?: number | undefined;
    /**
     * Delay in scroll before new data is loaded.
     */
    delay?: number | undefined;
    /**
     * Delay after window's resize finishes.
     */
    resizeDelay?: number | undefined;
    /**
     * Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash.
     */
    appendOnly?: boolean;
    /**
     * Specifies whether the scroller should be displayed inline or not.
     */
    inline?: boolean;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     */
    lazy?: boolean;
    /**
     * If disabled, the scroller feature is eliminated and the content is displayed directly.
     */
    disabled?: boolean;
    /**
     * Used to implement a custom loader instead of using the loader feature in the scroller.
     */
    loaderDisabled?: boolean;
    /**
     * Columns to display.
     */
    columns?: any[] | undefined;
    /**
     * Used to implement a custom spacer instead of using the spacer feature in the scroller.
     */
    showSpacer?: boolean;
    /**
     * Defines whether to show loader.
     */
    showLoader?: boolean;
    /**
     * Determines how many additional elements to add to the DOM outside of the view. According to the scrolls made up and down, extra items are added in a certain algorithm in the form of multiples of this number. Default value is half the number of items shown in the view.
     */
    numToleratedItems?: any;
    /**
     * Defines whether the data is loaded.
     */
    loading?: boolean;
    /**
     * Defines whether to dynamically change the height or width of scrollable container.
     */
    autoSize?: boolean;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algoritm checks for object identity.
     */
    trackBy?: Function;
    /**
     * Callback to invoke in lazy mode to load new data.
     */
    onLazyLoad?: Function | undefined;
    /**
     * Callback to invoke when scroll position changes.
     */
    onScroll?: Function | undefined;
    /**
     * Callback to invoke when scroll position and item's range in view changes.
     */
    onScrollIndexChange?: Function | undefined;
}
