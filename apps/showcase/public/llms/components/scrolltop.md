# Angular Scroll Top Component

ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly.

## accessibility-doc

Screen Reader ScrollTop uses a button element with an aria-label that refers to the aria.scrollTop property of the locale API by default, you may use your own aria roles and attributes as any valid attribute is passed to the button element implicitly.

## basic-doc

ScrollTop listens window scroll by default.

## element-doc

Setting the target property to parent binds ScrollTop to its parent element that has scrolling content.

## Scroll Top

ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ScrollTopPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| styleClass | string | - | Class of the element. |
| style | { [klass: string]: any } | - | Inline style of the element. |
| target | "window" \| "parent" | window | Target of the ScrollTop. |
| threshold | number | 400 | Defines the threshold value of the vertical scroll position of the target to toggle the visibility. |
| icon | string | - | Name of the icon or JSX.Element for icon. |
| behavior | "auto" \| "smooth" | smooth | Defines the scrolling behavior, "smooth" adds an animation and "auto" scrolls with a jump. |
| showTransitionOptions | string | .15s | A string value used to determine the display transition options. **(Deprecated)** |
| hideTransitionOptions | string | .15s | A string value used to determine the hiding transition options. **(Deprecated)** |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| buttonAriaLabel | string | - | Establishes a string value that labels the scroll-top button. |
| buttonProps | ButtonProps | ... | Used to pass all properties of the ButtonProps to the Button component. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| icon | TemplateRef<ScrollTopIconTemplateContext> | Custom icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| pcButton | ButtonPassThrough | Used to pass attributes to the Button component. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-scrolltop | Class name of the root element |
| p-scrolltop-icon | Class name of the icon element |

