# Angular Toolbar Component

Toolbar is a grouping component for buttons and other content.

## accessibility-doc

Screen Reader Toolbar uses toolbar role for the root element, aria-orientation is not included as it defaults to horizontal . Any valid attribute is passed to the root element so you may add additional properties like aria-labelledby and aria-labelled to define the element if required. Keyboard Support Component does not include any interactive elements. Arbitrary content can be placed with templating and elements like buttons inside should follow the page tab sequence.

## basic-doc

Toolbar is a grouping component for buttons and other content. Its content can be placed inside the start , center and end sections.

## custom-doc

Content can also be placed using the start , center and end templates.

## Toolbar

Toolbar is a grouping component for buttons and other content.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ToolbarPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| ariaLabelledBy | string | - | Defines a string value that labels an interactive element. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| start | TemplateRef<void> | Custom start template. |
| end | TemplateRef<void> | Custom end template. |
| center | TemplateRef<void> | Custom center template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| start | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the start's DOM element. |
| center | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the center's DOM element. |
| end | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the right's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-toolbar | Class name of the root element |
| p-toolbar-start | Class name of the start element |
| p-toolbar-center | Class name of the center element |
| p-toolbar-end | Class name of the end element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| toolbar.background | --p-toolbar-background | Background of root |
| toolbar.border.color | --p-toolbar-border-color | Border color of root |
| toolbar.border.radius | --p-toolbar-border-radius | Border radius of root |
| toolbar.color | --p-toolbar-color | Color of root |
| toolbar.gap | --p-toolbar-gap | Gap of root |
| toolbar.padding | --p-toolbar-padding | Padding of root |

