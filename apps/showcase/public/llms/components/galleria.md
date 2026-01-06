# Angular Gallery Component

Galleria is an advanced content gallery component.

## accessibility-doc

Screen Reader Galleria uses region role and since any attribute is passed to the main container element, attributes such as aria-label and aria-roledescription can be used as well. The slides container has aria-live attribute set as "polite" if galleria is not in autoplay mode, otherwise "off" would be the value in autoplay. A slide has a group role with an aria-label that refers to the aria.slideNumber property of the locale API. Similarly aria.slide is used as the aria-roledescription of the item. Inactive slides are hidden from the readers with aria-hidden . Next and Previous navigators are button elements with aria-label attributes referring to the aria.nextPageLabel and aria.firstPageLabel properties of the locale API by default respectively, you may still use your own aria roles and attributes as any valid attribute is passed to the button elements implicitly by using nextButtonProps and prevButtonProps . Quick navigation elements and thumnbails follow the tab pattern. They are placed inside an element with a tablist role whereas each item has a tab role with aria-selected and aria-controls attributes. The aria-label attribute of a quick navigation item refers to the aria.pageLabel of the locale API. Current page is marked with aria-current . In full screen mode, modal element uses dialog role with aria-modal enabled. The close button retrieves aria-label from the aria.close property of the locale API. Next/Prev Keyboard Support Key Function tab Moves focus through interactive elements in the carousel. enter Activates navigation. space Activates navigation. Quick Navigation Keyboard Support Key Function tab Moves focus through the active slide link. enter Activates the focused slide link. space Activates the focused slide link. right arrow Moves focus to the next slide link. left arrow Moves focus to the previous slide link. home Moves focus to the first slide link. end Moves focus to the last slide link.

## advanced-doc

Galleria can be extended further to implement complex requirements.

## autoplay-doc

A slideshow implementation is defined by adding circular and autoPlay properties.

## basic-doc

Galleria requires a value as a collection of images, item template for the higher resolution image and thumbnail template to display as a thumbnail.

## caption-doc

Description of an image is specified with the caption template.

## controlled-doc

Galleria can be controlled programmatically using the activeIndex property.

## responsive-doc

Galleria responsiveness is defined with the responsiveOptions property.

## thumbnail-doc

Galleria can be controlled programmatically using the activeIndex property.

## Galleria

Galleria is an advanced content gallery component.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<GalleriaPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| activeIndex | number | - | Index of the first item. |
| fullScreen | boolean | false | Whether to display the component on fullscreen. |
| id | string | - | Unique identifier of the element. |
| value | any[] | - | An array of objects to display. |
| numVisible | number | 3 | Number of items per page. |
| responsiveOptions | GalleriaResponsiveOptions[] | - | An array of options for responsive design. |
| showItemNavigators | boolean | false | Whether to display navigation buttons in item section. |
| showThumbnailNavigators | boolean | true | Whether to display navigation buttons in thumbnail container. |
| showItemNavigatorsOnHover | boolean | false | Whether to display navigation buttons on item hover. |
| changeItemOnIndicatorHover | boolean | false | When enabled, item is changed on indicator hover. |
| circular | boolean | false | Defines if scrolling would be infinite. |
| autoPlay | boolean | false | Items are displayed with a slideshow in autoPlay mode. |
| shouldStopAutoplayByClick | boolean | true | When enabled, autorun should stop by click. |
| transitionInterval | number | 4000 | Time in milliseconds to scroll items. |
| showThumbnails | boolean | true | Whether to display thumbnail container. |
| thumbnailsPosition | "right" \| "left" \| "top" \| "bottom" | bottom | Position of thumbnails. |
| verticalThumbnailViewPortHeight | string | 300px | Height of the viewport in vertical thumbnail. |
| showIndicators | boolean | false | Whether to display indicator container. |
| showIndicatorsOnItem | boolean | false | When enabled, indicator container is displayed on item container. |
| indicatorsPosition | "right" \| "left" \| "top" \| "bottom" | bottom | Position of indicators. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| maskClass | string | - | Style class of the mask on fullscreen mode. |
| containerClass | string | - | Style class of the component on fullscreen mode. Otherwise, the 'class' property can be used. |
| containerStyle | { [klass: string]: any } | - | Inline style of the component on fullscreen mode. Otherwise, the 'style' property can be used. |
| showTransitionOptions | string | 150ms cubic-bezier(0, 0, 0.2, 1) | Transition options of the show animation. **(Deprecated)** |
| hideTransitionOptions | string | 150ms cubic-bezier(0, 0, 0.2, 1) | Transition options of the hide animation. **(Deprecated)** |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| maskMotionOptions | InputSignal<MotionOptions> | ... | The mask motion options. |
| visible | boolean | - | Specifies the visibility of the mask on fullscreen mode. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| activeIndexChange | value: number | Callback to invoke on active index change. |
| visibleChange | value: boolean | Callback to invoke on visiblity change. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| header | TemplateRef<void> | Custom header template. |
| footer | TemplateRef<void> | Custom footer template. |
| indicator | TemplateRef<GalleriaIndicatorTemplateContext> | Custom indicator template. |
| caption | TemplateRef<GalleriaCaptionTemplateContext<any>> | Custom caption template. |
| _closeicon | TemplateRef<void> | Custom close icon template. |
| _previousthumbnailicon | TemplateRef<void> | Custom previous thumbnail icon template. |
| _nextthumbnailicon | TemplateRef<void> | Custom next thumbnail icon template. |
| _itempreviousicon | TemplateRef<void> | Custom item previous icon template. |
| _itemnexticon | TemplateRef<void> | Custom item next icon template. |
| _item | TemplateRef<GalleriaItemTemplateContext<any>> | Custom item template. |
| _thumbnail | TemplateRef<GalleriaThumbnailTemplateContext<any>> | Custom thumbnail template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| mask | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the mask's DOM element. |
| closeButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the close button's DOM element. |
| closeIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the close icon's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| itemsContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the items container's DOM element. |
| items | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the items's DOM element. |
| prevButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the previous button's DOM element. |
| prevIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the previous icon's DOM element. |
| item | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the item's DOM element. |
| nextButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the next button's DOM element. |
| nextIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the next icon's DOM element. |
| caption | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the caption's DOM element. |
| indicatorList | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the indicator list's DOM element. |
| indicator | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the indicator's DOM element. |
| indicatorButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the indicator button's DOM element. |
| thumbnails | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the thumbnails's DOM element. |
| thumbnailContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the thumbnail content's DOM element. |
| thumbnailPrevButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the thumbnail previous button's DOM element. |
| thumbnailPrevIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the thumbnail previous icon's DOM element. |
| thumbnailsViewport | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the thumbnails viewport's DOM element. |
| thumbnailItems | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the thumbnail items's DOM element. |
| thumbnailItem | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the thumbnail item's DOM element. |
| thumbnail | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the thumbnail's DOM element. |
| thumbnailNextButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the thumbnail next button's DOM element. |
| thumbnailNextIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the thumbnail next icon's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-galleria-mask | Class name of the mask element |
| p-galleria | Class name of the root element |
| p-galleria-close-button | Class name of the close button element |
| p-galleria-close-icon | Class name of the close icon element |
| p-galleria-header | Class name of the header element |
| p-galleria-content | Class name of the content element |
| p-galleria-footer | Class name of the footer element |
| p-galleria-items-container | Class name of the items container element |
| p-galleria-items | Class name of the items element |
| p-galleria-prev-button | Class name of the previous item button element |
| p-galleria-prev-icon | Class name of the previous item icon element |
| p-galleria-item | Class name of the item element |
| p-galleria-next-button | Class name of the next item button element |
| p-galleria-next-icon | Class name of the next item icon element |
| p-galleria-caption | Class name of the caption element |
| p-galleria-indicator-list | Class name of the indicator list element |
| p-galleria-indicator | Class name of the indicator element |
| p-galleria-indicator-button | Class name of the indicator button element |
| p-galleria-thumbnails | Class name of the thumbnails element |
| p-galleria-thumbnails-content | Class name of the thumbnail content element |
| p-galleria-thumbnail-prev-button | Class name of the previous thumbnail button element |
| p-galleria-thumbnail-prev-icon | Class name of the previous thumbnail icon element |
| p-galleria-thumbnails-viewport | Class name of the thumbnails viewport element |
| p-galleria-thumbnail-items | Class name of the thumbnail items element |
| p-galleria-thumbnail-item | Class name of the thumbnail item element |
| p-galleria-thumbnail | Class name of the thumbnail element |
| p-galleria-thumbnail-next-button | Class name of the next thumbnail button element |
| p-galleria-thumbnail-next-icon | Class name of the next thumbnail icon element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| galleria.border.width | --p-galleria-border-width | Border width of root |
| galleria.border.color | --p-galleria-border-color | Border color of root |
| galleria.border.radius | --p-galleria-border-radius | Border radius of root |
| galleria.transition.duration | --p-galleria-transition-duration | Transition duration of root |
| galleria.nav.button.background | --p-galleria-nav-button-background | Background of nav button |
| galleria.nav.button.hover.background | --p-galleria-nav-button-hover-background | Hover background of nav button |
| galleria.nav.button.color | --p-galleria-nav-button-color | Color of nav button |
| galleria.nav.button.hover.color | --p-galleria-nav-button-hover-color | Hover color of nav button |
| galleria.nav.button.size | --p-galleria-nav-button-size | Size of nav button |
| galleria.nav.button.gutter | --p-galleria-nav-button-gutter | Gutter of nav button |
| galleria.nav.button.prev.border.radius | --p-galleria-nav-button-prev-border-radius | Prev border radius of nav button |
| galleria.nav.button.next.border.radius | --p-galleria-nav-button-next-border-radius | Next border radius of nav button |
| galleria.nav.button.focus.ring.width | --p-galleria-nav-button-focus-ring-width | Focus ring width of nav button |
| galleria.nav.button.focus.ring.style | --p-galleria-nav-button-focus-ring-style | Focus ring style of nav button |
| galleria.nav.button.focus.ring.color | --p-galleria-nav-button-focus-ring-color | Focus ring color of nav button |
| galleria.nav.button.focus.ring.offset | --p-galleria-nav-button-focus-ring-offset | Focus ring offset of nav button |
| galleria.nav.button.focus.ring.shadow | --p-galleria-nav-button-focus-ring-shadow | Focus ring shadow of nav button |
| galleria.nav.icon.size | --p-galleria-nav-icon-size | Size of nav icon |
| galleria.thumbnails.content.background | --p-galleria-thumbnails-content-background | Background of thumbnails content |
| galleria.thumbnails.content.padding | --p-galleria-thumbnails-content-padding | Padding of thumbnails content |
| galleria.thumbnail.nav.button.size | --p-galleria-thumbnail-nav-button-size | Size of thumbnail nav button |
| galleria.thumbnail.nav.button.border.radius | --p-galleria-thumbnail-nav-button-border-radius | Border radius of thumbnail nav button |
| galleria.thumbnail.nav.button.gutter | --p-galleria-thumbnail-nav-button-gutter | Gutter of thumbnail nav button |
| galleria.thumbnail.nav.button.focus.ring.width | --p-galleria-thumbnail-nav-button-focus-ring-width | Focus ring width of thumbnail nav button |
| galleria.thumbnail.nav.button.focus.ring.style | --p-galleria-thumbnail-nav-button-focus-ring-style | Focus ring style of thumbnail nav button |
| galleria.thumbnail.nav.button.focus.ring.color | --p-galleria-thumbnail-nav-button-focus-ring-color | Focus ring color of thumbnail nav button |
| galleria.thumbnail.nav.button.focus.ring.offset | --p-galleria-thumbnail-nav-button-focus-ring-offset | Focus ring offset of thumbnail nav button |
| galleria.thumbnail.nav.button.focus.ring.shadow | --p-galleria-thumbnail-nav-button-focus-ring-shadow | Focus ring shadow of thumbnail nav button |
| galleria.thumbnail.nav.button.hover.background | --p-galleria-thumbnail-nav-button-hover-background | Hover background of thumbnail nav button |
| galleria.thumbnail.nav.button.color | --p-galleria-thumbnail-nav-button-color | Color of thumbnail nav button |
| galleria.thumbnail.nav.button.hover.color | --p-galleria-thumbnail-nav-button-hover-color | Hover color of thumbnail nav button |
| galleria.thumbnail.nav.button.icon.size | --p-galleria-thumbnail-nav-button-icon-size | Size of thumbnail nav button icon |
| galleria.caption.background | --p-galleria-caption-background | Background of caption |
| galleria.caption.color | --p-galleria-caption-color | Color of caption |
| galleria.caption.padding | --p-galleria-caption-padding | Padding of caption |
| galleria.indicator.list.gap | --p-galleria-indicator-list-gap | Gap of indicator list |
| galleria.indicator.list.padding | --p-galleria-indicator-list-padding | Padding of indicator list |
| galleria.indicator.button.width | --p-galleria-indicator-button-width | Width of indicator button |
| galleria.indicator.button.height | --p-galleria-indicator-button-height | Height of indicator button |
| galleria.indicator.button.active.background | --p-galleria-indicator-button-active-background | Active background of indicator button |
| galleria.indicator.button.border.radius | --p-galleria-indicator-button-border-radius | Border radius of indicator button |
| galleria.indicator.button.focus.ring.width | --p-galleria-indicator-button-focus-ring-width | Focus ring width of indicator button |
| galleria.indicator.button.focus.ring.style | --p-galleria-indicator-button-focus-ring-style | Focus ring style of indicator button |
| galleria.indicator.button.focus.ring.color | --p-galleria-indicator-button-focus-ring-color | Focus ring color of indicator button |
| galleria.indicator.button.focus.ring.offset | --p-galleria-indicator-button-focus-ring-offset | Focus ring offset of indicator button |
| galleria.indicator.button.focus.ring.shadow | --p-galleria-indicator-button-focus-ring-shadow | Focus ring shadow of indicator button |
| galleria.indicator.button.background | --p-galleria-indicator-button-background | Background of indicator button |
| galleria.indicator.button.hover.background | --p-galleria-indicator-button-hover-background | Hover background of indicator button |
| galleria.inset.indicator.list.background | --p-galleria-inset-indicator-list-background | Background of inset indicator list |
| galleria.inset.indicator.button.background | --p-galleria-inset-indicator-button-background | Background of inset indicator button |
| galleria.inset.indicator.button.hover.background | --p-galleria-inset-indicator-button-hover-background | Hover background of inset indicator button |
| galleria.inset.indicator.button.active.background | --p-galleria-inset-indicator-button-active-background | Active background of inset indicator button |
| galleria.close.button.size | --p-galleria-close-button-size | Size of close button |
| galleria.close.button.gutter | --p-galleria-close-button-gutter | Gutter of close button |
| galleria.close.button.background | --p-galleria-close-button-background | Background of close button |
| galleria.close.button.hover.background | --p-galleria-close-button-hover-background | Hover background of close button |
| galleria.close.button.color | --p-galleria-close-button-color | Color of close button |
| galleria.close.button.hover.color | --p-galleria-close-button-hover-color | Hover color of close button |
| galleria.close.button.border.radius | --p-galleria-close-button-border-radius | Border radius of close button |
| galleria.close.button.focus.ring.width | --p-galleria-close-button-focus-ring-width | Focus ring width of close button |
| galleria.close.button.focus.ring.style | --p-galleria-close-button-focus-ring-style | Focus ring style of close button |
| galleria.close.button.focus.ring.color | --p-galleria-close-button-focus-ring-color | Focus ring color of close button |
| galleria.close.button.focus.ring.offset | --p-galleria-close-button-focus-ring-offset | Focus ring offset of close button |
| galleria.close.button.focus.ring.shadow | --p-galleria-close-button-focus-ring-shadow | Focus ring shadow of close button |
| galleria.close.button.icon.size | --p-galleria-close-button-icon-size | Size of close button icon |

