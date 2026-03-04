# Angular Virtual Scroller Component

VirtualScroller is a performance-approach to handle huge data efficiently.

## Accessibility

Screen Reader VirtualScroller uses a semantic list element to list the items. No specific role is enforced, still you may use any aria role and attributes as any valid attribute is passed to the container element. Keyboard Support Component does not include any built-in interactive elements.

## Basic

VirtualScroller requires items as the data to display, itemSize for the dimensions of an item and item template are required on component. In addition, an initial array is required based on the total number of items to display. Size of the viewport is configured using scrollWidth , scrollHeight properties directly or with CSS width and height styles.

## Delay

Scroll delay is adjusted by using delay property.

## Grid

Scrolling can be enabled vertically and horizontally when orientation is set as both . In this mode, itemSize should be an array where first value is the height of an item and second is the width.

## Horizontal

Setting orientation to horizontal enables scrolling horizontally. In this case, the itemSize should refer to the width of an item.

## lazyload-doc

Lazy mode is handy to deal with large datasets where instead of loading the entire data, small chunks of data are loaded on demand by invoking onLazyLoad callback everytime scrolling requires a new chunk. To implement lazy loading, enable lazy attribute, initialize your data as a placeholder with a length and finally implement a method callback using onLazyLoad that actually loads a chunk from a datasource. onLazyLoad gets an event object that contains information about the chunk of data to load such as the index and number of items to load. Notice that a new template called loadingItem is also required to display as a placeholder while the new items are being loaded.

## loader-doc

Busy state is enabled by adding showLoader property which blocks the UI with a modal by default. Alternatively, loader template can be used to customize items e.g. with Skeleton .

## Programmatic

Scrolling to a specific index can be done with the scrollToIndex function.

## Scroll Options

The properties of scroller component can be used like an object in it.

## Template

Scroller content is customizable by using ng-template . Valid values are content , item , loader and loadericon

## Scroller

Scroller is a performance-approach to handle huge data efficiently.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<VirtualScrollerPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| id | InputSignal<string> | ... | Unique identifier of the element. |
| style | InputSignal<any> | ... | Inline style of the component. |
| styleClass | InputSignal<string> | ... | Style class of the element. |
| tabindex | InputSignal<number> | ... | Index of the element in tabbing order. |
| items | InputSignal<any[]> | ... | An array of objects to display. |
| itemSize | InputSignal<number \| number[]> | ... | The height/width of item according to orientation. |
| scrollHeight | InputSignal<string> | ... | Height of the scroll viewport. |
| scrollWidth | InputSignal<string> | ... | Width of the scroll viewport. |
| orientation | InputSignal<"both" \| "vertical" \| "horizontal"> | ... | The orientation of scrollbar. |
| step | InputSignal<number> | ... | Used to specify how many items to load in each load method in lazy mode. |
| delay | InputSignal<number> | ... | Delay in scroll before new data is loaded. |
| resizeDelay | InputSignal<number> | ... | Delay after window's resize finishes. |
| appendOnly | InputSignal<boolean> | ... | Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash. |
| inline | InputSignal<boolean> | ... | Specifies whether the scroller should be displayed inline or not. |
| lazy | InputSignal<boolean> | ... | Defines if data is loaded and interacted with in lazy manner. |
| disabled | InputSignal<boolean> | ... | If disabled, the scroller feature is eliminated and the content is displayed directly. |
| loaderDisabled | InputSignal<boolean> | ... | Used to implement a custom loader instead of using the loader feature in the scroller. |
| columns | InputSignal<any[]> | ... | Columns to display. |
| showSpacer | InputSignal<boolean> | ... | Used to implement a custom spacer instead of using the spacer feature in the scroller. |
| showLoader | InputSignal<boolean> | ... | Defines whether to show loader. |
| numToleratedItems | InputSignal<any> | ... | Determines how many additional elements to add to the DOM outside of the view. According to the scrolls made up and down, extra items are added in a certain algorithm in the form of multiples of this number. Default value is half the number of items shown in the view. |
| loading | InputSignal<boolean> | ... | Defines whether the data is loaded. |
| autoSize | InputSignal<boolean> | ... | Defines whether to dynamically change the height or width of scrollable container. |
| trackBy | InputSignal<Function> | ... | Function to optimize the dom operations by delegating to ngForTrackBy, default algoritm checks for object identity. |
| options | InputSignal<ScrollerOptions> | ... | Defines whether to use the scroller feature. The properties of scroller component can be used like an object in it. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onLazyLoad | event: ScrollerLazyLoadEvent | Callback to invoke in lazy mode to load new data. |
| onScroll | event: ScrollerScrollEvent | Callback to invoke when scroll position changes. |
| onScrollIndexChange | event: ScrollerScrollIndexChangeEvent | Callback to invoke when scroll position and item's range in view changes. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | Signal<TemplateRef<ScrollerContentTemplateContext>> | Content template of the component. |
| item | Signal<TemplateRef<ScrollerItemTemplateContext>> | Item template of the component. |
| loader | Signal<TemplateRef<ScrollerLoaderTemplateContext>> | Loader template of the component. |
| loadericon | Signal<TemplateRef<ScrollerLoaderIconTemplateContext>> | Loader icon template of the component. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| spacer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the spacer's DOM element. |
| loader | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the loader's DOM element. |
| loadingIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the loading icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-virtualscroller | Class name of the root element |
| p-virtualscroller-content | Class name of the content element |
| p-virtualscroller-spacer | Class name of the spacer element |
| p-virtualscroller-loader | Class name of the loader element |
| p-virtualscroller-loading-icon | Class name of the loading icon element |

