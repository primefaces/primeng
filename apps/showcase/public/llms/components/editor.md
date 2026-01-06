# Angular Editor Component

Editor is rich text editor component based on Quill.

## accessibility-doc

Quill performs generally well in terms of accessibility. The elements in the toolbar can be tabbed and have the necessary ARIA roles/attributes for screen readers. One known limitation is the lack of arrow key support for dropdowns in the toolbar that may be overcome with a custom toolbar.

## basic-doc

A model can be bound using the standard ngModel directive.

## customtoolbar-doc

Editor provides a default toolbar with common options, to customize it define your elements inside the header element. Refer to Quill documentation for available controls.

## quill-doc

Editor uses Quill editor underneath so it needs to be installed as a dependency.

## reactiveforms-doc

Editor can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

## readonly-doc

When readonly is present, the value cannot be edited.

## Editor

Editor groups a collection of contents in tabs.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<EditorPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| style | { [klass: string]: any } | - | Inline style of the container. |
| styleClass | string | - | Style class of the container. **(Deprecated)** |
| placeholder | string | - | Placeholder text to show when editor is empty. |
| formats | string[] | - | Whitelist of formats to display, see [here](https://quilljs.com/docs/formats/) for available options. |
| modules | object | - | Modules configuration of Editor, see [here](https://quilljs.com/docs/modules/) for available options. |
| bounds | string \| HTMLElement | - | DOM Element or a CSS selector for a DOM Element, within which the editor’s p elements (i.e. tooltips, etc.) should be confined. Currently, it only considers left and right boundaries. |
| scrollingContainer | string \| HTMLElement | - | DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars (i.e. overflow-y: auto), if is has been changed from the default ql-editor with custom CSS. Necessary to fix scroll jumping bugs when Quill is set to auto grow its height, and another ancestor container is responsible from the scrolling.. |
| debug | string | - | Shortcut for debug. Note debug is a static method and will affect other instances of Quill editors on the page. Only warning and error messages are enabled by default. |
| readonly | boolean | - | Whether to instantiate the editor to read-only mode. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onEditorInit | event: EditorInitEvent | Callback to invoke when the quill modules are loaded. |
| onTextChange | event: EditorTextChangeEvent | Callback to invoke when text of editor changes. |
| onSelectionChange | event: EditorSelectionChangeEvent | Callback to invoke when selection of the text changes. |
| onEditorChange | event: EditorChangeEvent | Callback to invoke when editor content changes (combines both text and selection changes). |
| onFocus | event: EditorFocusEvent | Callback to invoke when editor receives focus. |
| onBlur | event: EditorBlurEvent | Callback to invoke when editor loses focus. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| header | TemplateRef<any> | Custom item template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| toolbar | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the toolbar's DOM element. |
| formats | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the formats span's DOM element. |
| header | PassThroughOption<HTMLSelectElement, I> | Used to pass attributes to the header select's DOM element. |
| option | PassThroughOption<HTMLOptionElement, I> | Used to pass attributes to the option's DOM element. |
| bold | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the bold button's DOM element. |
| italic | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the italic button's DOM element. |
| underline | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the underline button's DOM element. |
| color | PassThroughOption<HTMLSelectElement, I> | Used to pass attributes to the color select's DOM element. |
| background | PassThroughOption<HTMLSelectElement, I> | Used to pass attributes to the background select's DOM element. |
| list | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the list button's DOM element. |
| select | PassThroughOption<HTMLSelectElement, I> | Used to pass attributes to the select's DOM element. |
| link | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the link button's DOM element. |
| image | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the image button's DOM element. |
| codeBlock | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the code block button's DOM element. |
| clean | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the clean button's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-editor | Class name of the root element |
| p-editor-toolbar | Class name of the toolbar element |
| p-editor-content | Class name of the content element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| editor.toolbar.background | --p-editor-toolbar-background | Background of toolbar |
| editor.toolbar.border.color | --p-editor-toolbar-border-color | Border color of toolbar |
| editor.toolbar.border.radius | --p-editor-toolbar-border-radius | Border radius of toolbar |
| editor.toolbar.item.color | --p-editor-toolbar-item-color | Color of toolbar item |
| editor.toolbar.item.hover.color | --p-editor-toolbar-item-hover-color | Hover color of toolbar item |
| editor.toolbar.item.active.color | --p-editor-toolbar-item-active-color | Active color of toolbar item |
| editor.toolbar.item.padding | --p-editor-toolbar-item-padding | Padding of toolbar item |
| editor.overlay.background | --p-editor-overlay-background | Background of overlay |
| editor.overlay.border.color | --p-editor-overlay-border-color | Border color of overlay |
| editor.overlay.border.radius | --p-editor-overlay-border-radius | Border radius of overlay |
| editor.overlay.color | --p-editor-overlay-color | Color of overlay |
| editor.overlay.shadow | --p-editor-overlay-shadow | Shadow of overlay |
| editor.overlay.padding | --p-editor-overlay-padding | Padding of overlay |
| editor.overlay.option.focus.background | --p-editor-overlay-option-focus-background | Focus background of overlay option |
| editor.overlay.option.color | --p-editor-overlay-option-color | Color of overlay option |
| editor.overlay.option.focus.color | --p-editor-overlay-option-focus-color | Focus color of overlay option |
| editor.overlay.option.padding | --p-editor-overlay-option-padding | Padding of overlay option |
| editor.overlay.option.border.radius | --p-editor-overlay-option-border-radius | Border radius of overlay option |
| editor.content.background | --p-editor-content-background | Background of content |
| editor.content.border.color | --p-editor-content-border-color | Border color of content |
| editor.content.color | --p-editor-content-color | Color of content |
| editor.content.border.radius | --p-editor-content-border-radius | Border radius of content |

