# Angular Fieldset Component

Fieldset is a grouping component with a content toggle feature.

## Accessibility

Screen Reader Fieldset component uses the semantic fieldset element. When toggleable option is enabled, a clickable element with button role is included inside the legend element, this button has aria-controls to define the id of the content section along with aria-expanded for the visibility state. The value to read the button defaults to the value of the legend property and can be customized by defining an aria-label or aria-labelledby via the toggleButtonProps property. The content uses region , defines an id that matches the aria-controls of the content toggle button and aria-labelledby referring to the id of the header. Content Toggle Button Keyboard Support Key Function tab Moves focus to the next the focusable element in the page tab sequence. shift + tab Moves focus to the previous the focusable element in the page tab sequence. enter Toggles the visibility of the content. space Toggles the visibility of the content.

## Basic

A simple Fieldset is created with a legend property along with the content as children.

```html
<p-fieldset legend="Header">
    <p class="m-0">
        Lorem ipsum dolor sit amet...
    </p>
</p-fieldset>
```

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Header section can also be defined with custom content instead of primitive values.

```html
<p-fieldset>
    <ng-template #header>
        <div class="flex items-center gap-2 px-2">
            <p-avatar
                image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
                shape="circle" />
            <span class="font-bold">Amy Elsner</span>
        </div>
    </ng-template>
    <p class="m-0">
        Lorem ipsum dolor sit amet...
    </p>
</p-fieldset>
```

## Toggleable

Content of the fieldset can be expanded and collapsed using toggleable option, default state is defined with collapsed option.

```html
<p-fieldset legend="Header" [toggleable]="true">
    <p>
        Lorem ipsum dolor sit amet...
    </p>
</p-fieldset>
```

## Fieldset

Fieldset is a grouping component with the optional content toggle feature.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| pt | InputSignal<FieldsetPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| legend | string | - | Header text of the fieldset. |
| toggleable | boolean | false | When specified, content can toggled by clicking the legend. |
| collapsed | boolean | false | Defines the default visibility state of the content. * |
| style | { [klass: string]: any } | - | Inline style of the component. |
| styleClass | string | - | Style class of the component. |
| transitionOptions | string | 400ms cubic-bezier(0.86, 0, 0.07, 1) | Transition options of the panel animation. |
| enterAnimation | InputSignal<string> | 'p-collapsible-enter' | Enter animation class name. |
| leaveAnimation | InputSignal<string> | 'p-collapsible-leave' | Leave animation class name. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| collapsedChange | value: boolean | Emits when the collapsed state changes. |
| onBeforeToggle | event: FieldsetBeforeToggleEvent | Callback to invoke before panel toggle. |
| onAfterToggle | event: FieldsetAfterToggleEvent | Callback to invoke after panel toggle. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| header | TemplateRef<any> | Defines the header template. |
| expandicon | TemplateRef<any> | Defines the expandicon template. |
| collapseicon | TemplateRef<any> | Defines the collapseicon template. |
| content | TemplateRef<any> | Defines the content template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLFieldSetElement, I> | Used to pass attributes to the root's DOM element. |
| legend | PassThroughOption<HTMLLegendElement, I> | Used to pass attributes to the legend's DOM element. |
| toggleButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the toggle button's DOM element. |
| toggleIcon | PassThroughOption<HTMLSpanElement \| SVGElement, I> | Used to pass attributes to the toggle icon's DOM element. |
| legendLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the legend label's DOM element. |
| contentContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content container's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-fieldset | Class name of the root element |
| p-fieldset-legend | Class name of the legend element |
| p-fieldset-legend-label | Class name of the legend label element |
| p-fieldset-toggle-icon | Class name of the toggle icon element |
| p-fieldset-content-container | Class name of the content container element |
| p-fieldset-content | Class name of the content element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| fieldset.background | --p-fieldset-background | Background of root |
| fieldset.border.color | --p-fieldset-border-color | Border color of root |
| fieldset.border.radius | --p-fieldset-border-radius | Border radius of root |
| fieldset.color | --p-fieldset-color | Color of root |
| fieldset.padding | --p-fieldset-padding | Padding of root |
| fieldset.transition.duration | --p-fieldset-transition-duration | Transition duration of root |
| fieldset.legend.background | --p-fieldset-legend-background | Background of legend |
| fieldset.legend.hover.background | --p-fieldset-legend-hover-background | Hover background of legend |
| fieldset.legend.color | --p-fieldset-legend-color | Color of legend |
| fieldset.legend.hover.color | --p-fieldset-legend-hover-color | Hover color of legend |
| fieldset.legend.border.radius | --p-fieldset-legend-border-radius | Border radius of legend |
| fieldset.legend.border.width | --p-fieldset-legend-border-width | Border width of legend |
| fieldset.legend.border.color | --p-fieldset-legend-border-color | Border color of legend |
| fieldset.legend.padding | --p-fieldset-legend-padding | Padding of legend |
| fieldset.legend.gap | --p-fieldset-legend-gap | Gap of legend |
| fieldset.legend.font.weight | --p-fieldset-legend-font-weight | Font weight of legend |
| fieldset.legend.focus.ring.width | --p-fieldset-legend-focus-ring-width | Focus ring width of legend |
| fieldset.legend.focus.ring.style | --p-fieldset-legend-focus-ring-style | Focus ring style of legend |
| fieldset.legend.focus.ring.color | --p-fieldset-legend-focus-ring-color | Focus ring color of legend |
| fieldset.legend.focus.ring.offset | --p-fieldset-legend-focus-ring-offset | Focus ring offset of legend |
| fieldset.legend.focus.ring.shadow | --p-fieldset-legend-focus-ring-shadow | Focus ring shadow of legend |
| fieldset.toggle.icon.color | --p-fieldset-toggle-icon-color | Color of toggle icon |
| fieldset.toggle.icon.hover.color | --p-fieldset-toggle-icon-hover-color | Hover color of toggle icon |
| fieldset.content.padding | --p-fieldset-content-padding | Padding of content |

