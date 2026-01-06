# Angular Toast Component

Toast is used to display messages in an overlay.

## accessibility-doc

Screen Reader Toast component use alert role that implicitly defines aria-live as "assertive" and aria-atomic as "true". Close element is a button with an aria-label that refers to the aria.close property of the locale API by default. Close Button Keyboard Support Key Function enter Closes the message. space Closes the message.

## basic-doc

Toasts are displayed by calling the add and addAll method provided by the messageService . A single toast is specified by the Message interface that defines various properties such as severity , summary and detail .

## clear-doc

Clicking the close icon on the toast, removes it manually. Same can also be achieved programmatically using the clear function of the messageService . Calling it without any arguments, removes all displayed messages whereas calling it with a key, removes the messages displayed on a toast having the same key.

## headless-doc

Headless mode allows you to customize the entire user interface instead of the default elements.

## life-doc

A toast disappears after 3000ms by default, set the life option on either the message or toast to override this.

## multiple-doc

Multiple toasts are displayed by passing an array to the showAll method of the messageService .

## position-doc

Location of the toast is customized with the position property. Valid values are top-left , top-center , top-right , bottom-left , bottom-center , bottom-right and center .

## responsive-doc

Toast styling can be adjusted per screen size with the breakpoints option. The value of breakpoints should be an object literal whose keys are the maximum screen sizes and values are the styles per screen.

## severity-doc

The severity option specifies the type of the message. There are four types of messages: success , info , warn and error . The severity of the message is used to display the icon and the color of the toast.

## sticky-doc

A toast disappears after the time defined by the life option, set sticky option true on the message to override this and not hide the toast automatically.

## target-doc

A page may have multiple toast components, in case you'd like to target a specific message to a particular toast, use the key property so that toast and the message can match.

## template-doc

Templating allows customizing the content where the message instance is available as the implicit variable.

## Toast

Toast is used to display messages in an overlay.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ToastPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| key | string | - | Key of the message in case message is targeted to a specific toast component. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| life | number | 3000 | The default time to display messages for in milliseconds. |
| styleClass | string | - | Inline class of the component. **(Deprecated)** |
| position | ToastPositionType | - | Position of the toast in viewport. |
| preventOpenDuplicates | boolean | false | It does not add the new message if there is already a toast displayed with the same content |
| preventDuplicates | boolean | false | Displays only once a message with the same content. |
| showTransformOptions | string | translateY(100%) | Transform options of the show animation. **(Deprecated)** |
| hideTransformOptions | string | translateY(-100%) | Transform options of the hide animation. **(Deprecated)** |
| showTransitionOptions | string | 300ms ease-out | Transition options of the show animation. **(Deprecated)** |
| hideTransitionOptions | string | 250ms ease-in | Transition options of the hide animation. **(Deprecated)** |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| breakpoints | { [key: string]: any } | - | Object literal to define styles per screen size. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onClose | event: ToastCloseEvent | Callback to invoke when a message is closed. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| template | TemplateRef<ToastMessageTemplateContext> | Custom message template. |
| headless | TemplateRef<ToastHeadlessTemplateContext> | Custom headless template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| message | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the message's DOM element. |
| messageContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the message content's DOM element. |
| messageIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the message icon's DOM element. |
| messageText | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the message text's DOM element. |
| summary | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the summary's DOM element. |
| detail | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the detail's DOM element. |
| closeButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the close button's DOM element. |
| closeIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the close icon's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-toast | Class name of the root element |
| p-toast-message | Class name of the message element |
| p-toast-message-content | Class name of the message content element |
| p-toast-message-icon | Class name of the message icon element |
| p-toast-message-text | Class name of the message text element |
| p-toast-summary | Class name of the summary element |
| p-toast-detail | Class name of the detail element |
| p-toast-close-button | Class name of the close button element |
| p-toast-close-icon | Class name of the close icon element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| toast.width | --p-toast-width | Width of root |
| toast.border.radius | --p-toast-border-radius | Border radius of root |
| toast.border.width | --p-toast-border-width | Border width of root |
| toast.transition.duration | --p-toast-transition-duration | Transition duration of root |
| toast.blur | --p-toast-blur | Used to pass tokens of the blur section |
| toast.icon.size | --p-toast-icon-size | Size of icon |
| toast.content.padding | --p-toast-content-padding | Padding of content |
| toast.content.gap | --p-toast-content-gap | Gap of content |
| toast.text.gap | --p-toast-text-gap | Gap of text |
| toast.summary.font.weight | --p-toast-summary-font-weight | Font weight of summary |
| toast.summary.font.size | --p-toast-summary-font-size | Font size of summary |
| toast.detail.font.weight | --p-toast-detail-font-weight | Font weight of detail |
| toast.detail.font.size | --p-toast-detail-font-size | Font size of detail |
| toast.close.button.width | --p-toast-close-button-width | Width of close button |
| toast.close.button.height | --p-toast-close-button-height | Height of close button |
| toast.close.button.border.radius | --p-toast-close-button-border-radius | Border radius of close button |
| toast.close.button.focus.ring.width | --p-toast-close-button-focus-ring-width | Focus ring width of close button |
| toast.close.button.focus.ring.style | --p-toast-close-button-focus-ring-style | Focus ring style of close button |
| toast.close.button.focus.ring.offset | --p-toast-close-button-focus-ring-offset | Focus ring offset of close button |
| toast.close.icon.size | --p-toast-close-icon-size | Size of close icon |
| toast.info.background | --p-toast-info-background | Background of info |
| toast.info.border.color | --p-toast-info-border-color | Border color of info |
| toast.info.color | --p-toast-info-color | Color of info |
| toast.info.detail.color | --p-toast-info-detail-color | Detail color of info |
| toast.info.shadow | --p-toast-info-shadow | Shadow of info |
| toast.info.close.button.hover.background | --p-toast-info-close-button-hover-background | Close button hover background of info |
| toast.info.close.button.focus.ring.color | --p-toast-info-close-button-focus-ring-color | Close button focus ring color of info |
| toast.info.close.button.focus.ring.shadow | --p-toast-info-close-button-focus-ring-shadow | Close button focus ring shadow of info |
| toast.success.background | --p-toast-success-background | Background of success |
| toast.success.border.color | --p-toast-success-border-color | Border color of success |
| toast.success.color | --p-toast-success-color | Color of success |
| toast.success.detail.color | --p-toast-success-detail-color | Detail color of success |
| toast.success.shadow | --p-toast-success-shadow | Shadow of success |
| toast.success.close.button.hover.background | --p-toast-success-close-button-hover-background | Close button hover background of success |
| toast.success.close.button.focus.ring.color | --p-toast-success-close-button-focus-ring-color | Close button focus ring color of success |
| toast.success.close.button.focus.ring.shadow | --p-toast-success-close-button-focus-ring-shadow | Close button focus ring shadow of success |
| toast.warn.background | --p-toast-warn-background | Background of warn |
| toast.warn.border.color | --p-toast-warn-border-color | Border color of warn |
| toast.warn.color | --p-toast-warn-color | Color of warn |
| toast.warn.detail.color | --p-toast-warn-detail-color | Detail color of warn |
| toast.warn.shadow | --p-toast-warn-shadow | Shadow of warn |
| toast.warn.close.button.hover.background | --p-toast-warn-close-button-hover-background | Close button hover background of warn |
| toast.warn.close.button.focus.ring.color | --p-toast-warn-close-button-focus-ring-color | Close button focus ring color of warn |
| toast.warn.close.button.focus.ring.shadow | --p-toast-warn-close-button-focus-ring-shadow | Close button focus ring shadow of warn |
| toast.error.background | --p-toast-error-background | Background of error |
| toast.error.border.color | --p-toast-error-border-color | Border color of error |
| toast.error.color | --p-toast-error-color | Color of error |
| toast.error.detail.color | --p-toast-error-detail-color | Detail color of error |
| toast.error.shadow | --p-toast-error-shadow | Shadow of error |
| toast.error.close.button.hover.background | --p-toast-error-close-button-hover-background | Close button hover background of error |
| toast.error.close.button.focus.ring.color | --p-toast-error-close-button-focus-ring-color | Close button focus ring color of error |
| toast.error.close.button.focus.ring.shadow | --p-toast-error-close-button-focus-ring-shadow | Close button focus ring shadow of error |
| toast.secondary.background | --p-toast-secondary-background | Background of secondary |
| toast.secondary.border.color | --p-toast-secondary-border-color | Border color of secondary |
| toast.secondary.color | --p-toast-secondary-color | Color of secondary |
| toast.secondary.detail.color | --p-toast-secondary-detail-color | Detail color of secondary |
| toast.secondary.shadow | --p-toast-secondary-shadow | Shadow of secondary |
| toast.secondary.close.button.hover.background | --p-toast-secondary-close-button-hover-background | Close button hover background of secondary |
| toast.secondary.close.button.focus.ring.color | --p-toast-secondary-close-button-focus-ring-color | Close button focus ring color of secondary |
| toast.secondary.close.button.focus.ring.shadow | --p-toast-secondary-close-button-focus-ring-shadow | Close button focus ring shadow of secondary |
| toast.contrast.background | --p-toast-contrast-background | Background of contrast |
| toast.contrast.border.color | --p-toast-contrast-border-color | Border color of contrast |
| toast.contrast.color | --p-toast-contrast-color | Color of contrast |
| toast.contrast.detail.color | --p-toast-contrast-detail-color | Detail color of contrast |
| toast.contrast.shadow | --p-toast-contrast-shadow | Shadow of contrast |
| toast.contrast.close.button.hover.background | --p-toast-contrast-close-button-hover-background | Close button hover background of contrast |
| toast.contrast.close.button.focus.ring.color | --p-toast-contrast-close-button-focus-ring-color | Close button focus ring color of contrast |
| toast.contrast.close.button.focus.ring.shadow | --p-toast-contrast-close-button-focus-ring-shadow | Close button focus ring shadow of contrast |

