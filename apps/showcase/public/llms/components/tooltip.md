# Angular Tooltip Component

Tooltip directive provides advisory information for a component. Tooltip is integrated within various PrimeNG components.

## Accessibility

Screen Reader Tooltip component uses tooltip role and when it becomes visible the generated id of the tooltip is defined as the aria-describedby of the target. Keyboard Support Key Function escape Closes the tooltip when focus is on the target.

## Auto Hide

Tooltip is hidden when mouse leaves the target element, in cases where tooltip needs to be interacted with, set autoHide to false to change the default behavior.

```html
<input type="text" pInputText pTooltip="Enter your username" [autoHide]="false" placeholder="autoHide: false" />
<input type="text" pInputText pTooltip="Enter your username" placeholder="autoHide: true" />
```

## Custom

Tooltip can use either a string or a TemplateRef .

```html
<p-button [pTooltip]="tooltipContent" severity="secondary" tooltipPosition="bottom" label="Button" />
<ng-template #tooltipContent>
    <div class="flex items-center">
        <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
            <path
                d="..."
                fill="var(--p-primary-color)"
            />
        </svg>
        <span> <b>PrimeNG</b> rocks! </span>
    </div>
</ng-template>
```

## Delay

Adding delays to the show and hide events are defined with showDelay and hideDelay options respectively.

```html
<p-button pTooltip="Confirm to proceed" showDelay="1000" hideDelay="300" label="Save" />
```

## Event

Tooltip gets displayed on hover event of its target by default, other option is the focus event to display and blur to hide.

```html
<input type="text" pInputText pTooltip="Enter your username" tooltipEvent="focus" placeholder="focus to display tooltip" />
```

## Tooltip Options

Tooltip is also configurable by using tooltipOptions property.

```html
<input type="text" pInputText pTooltip="Enter your username" [tooltipOptions]="tooltipOptions" placeholder="hover to display tooltip" />
```

## Position

Position of the tooltip is specified using tooltipPosition attribute. Valid values are top , bottom , right and left . Default position of the tooltip is right .

```html
<input type="text" pInputText pTooltip="Enter your username" tooltipPosition="right" placeholder="Right" />
<input type="text" pInputText pTooltip="Enter your username" tooltipPosition="top" placeholder="Top" />
<input type="text" pInputText pTooltip="Enter your username" tooltipPosition="bottom" placeholder="Bottom" />
<input type="text" pInputText pTooltip="Enter your username" tooltipPosition="left" placeholder="Left" />
```

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Tooltip

Tooltip directive provides advisory information for a component.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| pt | InputSignal<TooltipPassThroughOptions<unknown>> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| tooltipPosition | string | - | Position of the tooltip. |
| tooltipEvent | any | hover | Event to show the tooltip. |
| positionStyle | string | - | Type of CSS position. |
| tooltipStyleClass | string | - | Style class of the tooltip. |
| tooltipZIndex | string | - | Whether the z-index should be managed automatically to always go on top or have a fixed value. |
| escape | boolean | true | By default the tooltip contents are rendered as text. Set to false to support html tags in the content. |
| showDelay | number | - | Delay to show the tooltip in milliseconds. |
| hideDelay | number | - | Delay to hide the tooltip in milliseconds. |
| life | number | - | Time to wait in milliseconds to hide the tooltip even it is active. |
| positionTop | number | - | Specifies the additional vertical offset of the tooltip from its default position. |
| positionLeft | number | - | Specifies the additional horizontal offset of the tooltip from its default position. |
| autoHide | boolean | true | Whether to hide tooltip when hovering over tooltip content. |
| fitContent | boolean | true | Automatically adjusts the element position when there is not enough space on the selected position. |
| hideOnEscape | boolean | true | Whether to hide tooltip on escape key press. |
| content | string \| TemplateRef<HTMLElement> | - | Content of the tooltip. |
| disabled | boolean | - | When present, it specifies that the component should be disabled. |
| tooltipOptions | TooltipOptions | - | Specifies the tooltip configuration options for the component. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| arrow | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the arrow's DOM element. |
| text | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the text's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-tooltip | Class name of the root element |
| p-tooltip-arrow | Class name of the arrow element |
| p-tooltip-text | Class name of the text element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| tooltip.max.width | --p-tooltip-max-width | Max width of root |
| tooltip.gutter | --p-tooltip-gutter | Gutter of root |
| tooltip.shadow | --p-tooltip-shadow | Shadow of root |
| tooltip.padding | --p-tooltip-padding | Padding of root |
| tooltip.border.radius | --p-tooltip-border-radius | Border radius of root |
| tooltip.background | --p-tooltip-background | Background of root |
| tooltip.color | --p-tooltip-color | Color of root |

