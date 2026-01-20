# Angular Tooltip Component

Tooltip directive provides advisory information for a component. Tooltip is integrated within various PrimeNG components.

## Accessibility

Screen Reader Tooltip component uses tooltip role and when it becomes visible the generated id of the tooltip is defined as the aria-describedby of the target. Keyboard Support Key Function escape Closes the tooltip when focus is on the target.

## Auto Hide

Tooltip is hidden when mouse leaves the target element, in cases where tooltip needs to be interacted with, set autoHide to false to change the default behavior.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center gap-2">
            <input type="text" pInputText pTooltip="Enter your username" [autoHide]="false" placeholder="autoHide: false" />
            <input type="text" pInputText pTooltip="Enter your username" placeholder="autoHide: true" />
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, TooltipModule]
})
export class TooltipAutohideDemo {}
```
</details>

## Custom

Tooltip can use either a string or a TemplateRef .

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-button [pTooltip]="tooltipContent" severity="secondary" tooltipPosition="bottom" label="Button" />
            <ng-template #tooltipContent>
                <div class="flex items-center">
                    <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                        <path d="M15.1934 0V0V0L0.0391235 5.38288L2.35052 25.3417L15.1934 32.427V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1934 0Z" fill="var(--p-primary-color)" />
                        <mask id="mask0_1_52" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="33">
                            <path d="M15.1934 0V0V0L0.0391235 5.38288L2.35052 25.3417L15.1934 32.427V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1934 0Z" fill="var(--ground-background)" />
                        </mask>
                        <g mask="url(#mask0_1_52)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1935 0V3.5994V3.58318V20.0075V20.0075V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1935 0Z" fill="var(--p-primary-color)" />
                        </g>
                        <path d="M19.6399 15.3776L18.1861 15.0547L19.3169 16.6695V21.6755L23.1938 18.4458V12.9554L21.4169 13.6013L19.6399 15.3776Z" fill="var(--ground-background)" />
                        <path d="M10.5936 15.3776L12.0474 15.0547L10.9166 16.6695V21.6755L7.03966 18.4458V12.9554L8.81661 13.6013L10.5936 15.3776Z" fill="var(--ground-background)" />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.3853 16.9726L12.6739 15.0309L13.4793 15.5163H16.7008L17.5061 15.0309L18.7947 16.9726V24.254L17.8283 25.7103L16.7008 26.843H13.4793L12.3518 25.7103L11.3853 24.254V16.9726Z"
                            fill="var(--ground-background)"
                        />
                        <path d="M19.3168 24.7437L21.4168 22.6444V20.5451L19.3168 22.3214V24.7437Z" fill="var(--ground-background)" />
                        <path d="M10.9166 24.7437L8.81662 22.6444V20.5451L10.9166 22.3214V24.7437Z" fill="var(--ground-background)" />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.0167 5.68861L11.7244 8.7568L13.8244 14.8932H14.7936V5.68861H13.0167ZM15.4397 5.68861V14.8932H16.5706L18.5091 8.7568L17.2167 5.68861H15.4397Z"
                            fill="var(--ground-background)"
                        />
                        <path d="M13.8244 14.8932L6.87813 12.3094L5.90888 8.27235L11.8859 8.7568L13.9859 14.8932H13.8244Z" fill="var(--ground-background)" />
                        <path d="M16.5706 14.8932L23.5169 12.3094L24.4861 8.27235L18.3476 8.7568L16.4091 14.8932H16.5706Z" fill="var(--ground-background)" />
                        <path d="M18.8321 8.27235L22.2245 7.94938L19.9629 5.68861H17.7013L18.8321 8.27235Z" fill="var(--ground-background)" />
                        <path d="M11.4013 8.27235L8.00893 7.94938L10.2705 5.68861H12.5321L11.4013 8.27235Z" fill="var(--ground-background)" />
                    </svg>
                    <span> <b>PrimeNG</b> rocks! </span>
                </div>
            </ng-template>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, TooltipModule]
})
export class TooltipCustomDemo {}
```
</details>

## Delay

Adding delays to the show and hide events are defined with showDelay and hideDelay options respectively.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-button pTooltip="Confirm to proceed" showDelay="1000" hideDelay="300" label="Save" />
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, TooltipModule]
})
export class TooltipDelayDemo {}
```
</details>

## Event

Tooltip gets displayed on hover event of its target by default, other option is the focus event to display and blur to hide.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center gap-2">
            <input type="text" pInputText pTooltip="Enter your username" tooltipEvent="focus" placeholder="focus to display tooltip" />
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, TooltipModule]
})
export class TooltipEventDemo {}
```
</details>

## Tooltip Options

Tooltip is also configurable by using tooltipOptions property.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    template: `
        <div class="card flex justify-center">
            <input type="text" pInputText pTooltip="Enter your username" [tooltipOptions]="tooltipOptions" placeholder="hover to display tooltip" />
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, TooltipModule]
})
export class TooltipOptionsDemo {
    tooltipOptions: any;
}
```
</details>

## Position

Position of the tooltip is specified using tooltipPosition attribute. Valid values are top , bottom , right and left . Default position of the tooltip is right .

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center gap-2">
            <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="right" placeholder="Right" />
            <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="top" placeholder="Top" />
            <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="bottom" placeholder="Bottom" />
            <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="left" placeholder="Left" />
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, TooltipModule]
})
export class TooltipPositionDemo {}
```
</details>

## Tooltip

Tooltip directive provides advisory information for a component.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
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
| ptTooltip | InputSignal<TooltipPassThrough> | undefined | Used to pass attributes to DOM elements inside the Tooltip component. **(Deprecated)** |
| pTooltipPT | InputSignal<TooltipPassThrough> | undefined | Used to pass attributes to DOM elements inside the Tooltip component. |
| pTooltipUnstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |

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

