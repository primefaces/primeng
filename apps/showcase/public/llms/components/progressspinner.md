# Angular ProgressSpinner Component

ProgressSpinner is a process status indicator.

## Accessibility

Screen Reader ProgressSpinner components uses progressbar role. Value to describe the component can be defined using aria-labelledby and aria-label props.

## Basic

An infinite spin animation is displayed by default.

```html
<p-progress-spinner ariaLabel="loading" />
```

## Custom

ProgressSpinner can be customized with styling property like strokeWidth and fill .

```html
<p-progress-spinner strokeWidth="8" fill="transparent" animationDuration=".5s" [style]="{ width: '50px', height: '50px' }" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
    selector: 'progress-spinner-custom-demo',
    templateUrl: './progress-spinner-custom-demo.html',
    standalone: true,
    imports: [ProgressSpinner]
})
export class ProgressSpinnerCustomDemo {}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Progress Spinner

ProgressSpinner is a process status indicator.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ProgressSpinnerPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| styleClass | string | - | Class of the element. **(Deprecated)** |
| strokeWidth | string | 2 | Width of the circle stroke. |
| fill | string | none | Color for the background of the circle. |
| animationDuration | string | 2s | Duration of the rotate animation. |
| ariaLabel | string | - | Used to define a aria label attribute the current element. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<SVGSVGElement, I> | Used to pass attributes to the root's DOM element. |
| spin | PassThroughOption<SVGSVGElement, I> | Used to pass attributes to the spin's DOM element. |
| circle | PassThroughOption<SVGCircleElement, I> | Used to pass attributes to the circle's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-progressspinner | Class name of the root element |
| p-progressspinner-spin | Class name of the spin element |
| p-progressspinner-circle | Class name of the circle element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| progressspinner.color.one | --p-progressspinner-color-one | Color one of root |
| progressspinner.color.two | --p-progressspinner-color-two | Color two of root |
| progressspinner.color.three | --p-progressspinner-color-three | Color three of root |
| progressspinner.color.four | --p-progressspinner-color-four | Color four of root |

