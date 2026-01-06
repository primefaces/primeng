# Angular Dialog Component

Dialog is a container to display content in an overlay window.

## accessibility-doc

Screen Reader Dialog component uses dialog role along with aria-labelledby referring to the header element however any attribute is passed to the root element so you may use aria-labelledby to override this default behavior. In addition aria-modal is added since focus is kept within the popup. It is recommended to use a trigger component that can be accessed with keyboard such as a button, if not adding tabIndex would be necessary. Trigger element also requires aria-expanded and aria-controls to be handled explicitly. Close element is a button with an aria-label that refers to the aria.close property of the locale API by default, you may use closeButtonProps to customize the element and override the default aria-label . Maximize element is a button with an aria-label that refers to the aria.maximizeLabel and aria.minimizeLabel property of the locale API. It cannot be customized using the maximizeButtonProps . Overlay Keyboard Support Key Function tab Moves focus to the next the focusable element within the dialog. shift + tab Moves focus to the previous the focusable element within the dialog. escape Closes the dialog if closeOnEscape is true. Close Button Keyboard Support Key Function enter Closes the dialog. space Closes the dialog.

## basic-doc

Dialog is used as a container and visibility is controlled with visible property.

## headless-doc

Headless mode allows you to customize the entire user interface instead of the default elements.

## longcontent-doc

Dialog automatically displays a scroller when content exceeds viewport.

## maximizable-doc

Setting maximizable property to true enables the full screen mode.

## modal-doc

Mask layer behind the Dialog can be turned on by setting the modal property to true .

## overlaysinside-doc

When dialog includes other components with overlays such as dropdown, the overlay part cannot exceed dialog boundaries due to overflow. In order to solve this, you can either append the overlay to the body by using appendTo property or allow overflow in dialog.

## position-doc

The position property is used to display a Dialog at all edges and corners of the screen.

## responsive-doc

Dialog width can be adjusted per screen size with the breakpoints option where a key defines the max-width for the breakpoint and value for the corresponding width. When no breakpoint matches width defined in style property is used.

## template-doc

Dialog can be customized using header and footer templates.

## withoutmodal-doc

Mask layer behind the Dialog is configured with the modal property. By default, no modal layer is added.

## Dialog

Dialog is a container to display content in an overlay window.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<DialogPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| header | string | - | Title text of the dialog. |
| draggable | boolean | true | Enables dragging to change the position using header. |
| resizable | boolean | true | Enables resizing of the content. |
| contentStyle | any | - | Style of the content section. |
| contentStyleClass | string | - | Style class of the content. |
| modal | boolean | false | Defines if background should be blocked when dialog is displayed. |
| closeOnEscape | boolean | true | Specifies if pressing escape key should hide the dialog. |
| dismissableMask | boolean | false | Specifies if clicking the modal background should hide the dialog. |
| rtl | boolean | false | When enabled dialog is displayed in RTL direction. |
| closable | boolean | true | Adds a close icon to the header to hide the dialog. |
| breakpoints | any | - | Object literal to define widths per screen size. |
| styleClass | string | - | Style class of the component. |
| maskStyleClass | string | - | Style class of the mask. |
| maskStyle | { [klass: string]: any } | - | Style of the mask. |
| showHeader | boolean | true | Whether to show the header or not. |
| blockScroll | boolean | false | Whether background scroll should be blocked when dialog is visible. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| minX | number | 0 | Minimum value for the left coordinate of dialog in dragging. |
| minY | number | 0 | Minimum value for the top coordinate of dialog in dragging. |
| focusOnShow | boolean | true | When enabled, first focusable element receives focus on show. |
| maximizable | boolean | false | Whether the dialog can be displayed full screen. |
| keepInViewport | boolean | true | Keeps dialog in the viewport. |
| focusTrap | boolean | true | When enabled, can only focus on elements inside the dialog. |
| transitionOptions | string | 150ms cubic-bezier(0, 0, 0.2, 1) | Transition options of the animation. **(Deprecated)** |
| maskMotionOptions | InputSignal<MotionOptions> | ... | The motion options for the mask. |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| closeIcon | string | - | Name of the close icon. |
| closeAriaLabel | string | - | Defines a string that labels the close button for accessibility. |
| closeTabindex | string | 0 | Index of the close button in tabbing order. |
| minimizeIcon | string | - | Name of the minimize icon. |
| maximizeIcon | string | - | Name of the maximize icon. |
| closeButtonProps | ButtonProps | ... | Used to pass all properties of the ButtonProps to the Button component. |
| maximizeButtonProps | ButtonProps | ... | Used to pass all properties of the ButtonProps to the Button component. |
| visible | boolean | - | Specifies the visibility of the dialog. |
| style | any | - | Inline style of the component. |
| position | "right" \| "left" \| "top" \| "bottom" \| "center" \| "topleft" \| "bottomleft" \| "topright" \| "bottomright" | - | Position of the dialog. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| role | value: undefined | Role attribute of html element. |
| onShow | value: any | Callback to invoke when dialog is shown. |
| onHide | value: any | Callback to invoke when dialog is hidden. |
| visibleChange | value: boolean | This EventEmitter is used to notify changes in the visibility state of a component. |
| onResizeInit | event: MouseEvent | Callback to invoke when dialog resizing is initiated. |
| onResizeEnd | event: MouseEvent | Callback to invoke when dialog resizing is completed. |
| onDragEnd | event: DragEvent | Callback to invoke when dialog dragging is completed. |
| onMaximize | value: any | Callback to invoke when dialog maximized or unmaximized. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| header | TemplateRef<void> | Header template. |
| content | TemplateRef<void> | Content template. |
| footer | TemplateRef<void> | Footer template. |
| closeicon | TemplateRef<void> | Close icon template. |
| maximizeicon | TemplateRef<void> | Maximize icon template. |
| minimizeicon | TemplateRef<void> | Minimize icon template. |
| headless | TemplateRef<void> | Headless template. |
| _header | TemplateRef<void> | Custom header template. |
| _content | TemplateRef<void> | Custom content template. |
| _footer | TemplateRef<void> | Custom footer template. |
| _closeicon | TemplateRef<void> | Custom close icon template. |
| _maximizeicon | TemplateRef<void> | Custom maximize icon template. |
| _minimizeicon | TemplateRef<void> | Custom minimize icon template. |
| _headless | TemplateRef<void> | Custom headless template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| mask | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the mask's DOM element. |
| resizeHandle | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the resize handle's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| title | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the title's DOM element. |
| headerActions | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header actions' DOM element. |
| pcMaximizeButton | ButtonPassThrough | Used to pass attributes to the maximize Button component. |
| pcCloseButton | ButtonPassThrough | Used to pass attributes to the close Button component. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-dialog-mask | Class name of the mask element |
| p-dialog | Class name of the root element |
| p-dialog-header | Class name of the header element |
| p-dialog-title | Class name of the title element |
| p-dialog-header-actions | Class name of the header actions element |
| p-dialog-maximize-button | Class name of the maximize button element |
| p-dialog-close-button | Class name of the close button element |
| p-dialog-content | Class name of the content element |
| p-dialog-footer | Class name of the footer element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| dialog.background | --p-dialog-background | Background of root |
| dialog.border.color | --p-dialog-border-color | Border color of root |
| dialog.color | --p-dialog-color | Color of root |
| dialog.border.radius | --p-dialog-border-radius | Border radius of root |
| dialog.shadow | --p-dialog-shadow | Shadow of root |
| dialog.header.padding | --p-dialog-header-padding | Padding of header |
| dialog.header.gap | --p-dialog-header-gap | Gap of header |
| dialog.title.font.size | --p-dialog-title-font-size | Font size of title |
| dialog.title.font.weight | --p-dialog-title-font-weight | Font weight of title |
| dialog.content.padding | --p-dialog-content-padding | Padding of content |
| dialog.footer.padding | --p-dialog-footer-padding | Padding of footer |
| dialog.footer.gap | --p-dialog-footer-gap | Gap of footer |

