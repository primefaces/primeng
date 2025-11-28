# Angular ImageCompare Component

Compare two images side by side with a slider.

## Accessibility

Screen Reader ImageComponent component uses a native range slider internally. Value to describe the component can be defined using aria-labelledby and aria-label props. Keyboard Support Key Function tab Moves focus to the component. left arrow up arrow Decrements the value. right arrow down arrow Increments the value. home Set the minimum value. end Set the maximum value. page up Increments the value by 10 steps. page down Decrements the value by 10 steps.

## Basic

Images are defined using templating with left and right templates. Use the style or class properties to define the size of the container.

```html
<p-imagecompare class="shadow-lg rounded-2xl">
    <ng-template #left>
        <img src="https://primefaces.org/cdn/primevue/images/compare/island1.jpg" />
    </ng-template>
    <ng-template #right>
        <img src="https://primefaces.org/cdn/primevue/images/compare/island2.jpg" />
    </ng-template>
</p-imagecompare>
```

## Responsive

Apply responsive styles to the container element to optimize display per screen size.

```html
<p-imagecompare class="sm:!w-96 shadow-lg rounded-2xl">
    <ng-template #left>
        <img src="https://primefaces.org/cdn/primevue/images/compare/island1.jpg" />
    </ng-template>
    <ng-template #right>
        <img src="https://primefaces.org/cdn/primevue/images/compare/island2.jpg" />
    </ng-template>
</p-imagecompare>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ImageCompareModule } from 'primeng/imagecompare';

@Component({
    selector: 'image-compare-responsive-demo',
    templateUrl: './image-compare-responsive-demo.html',
    standalone: true,
    imports: [ImageCompareModule]
})
export class ImageCompareResponsiveDemo {
}
```
</details>

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| slider | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the slider's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-imagecompare | Class name of the root element |
| p-imagecompare-slider | Class name of the slider element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| imagecompare.handle.size | --p-imagecompare-handle-size | Size of handle |
| imagecompare.handle.hover.size | --p-imagecompare-handle-hover-size | Hover size of handle |
| imagecompare.handle.background | --p-imagecompare-handle-background | Background of handle |
| imagecompare.handle.hover.background | --p-imagecompare-handle-hover-background | Hover background of handle |
| imagecompare.handle.border.color | --p-imagecompare-handle-border-color | Border color of handle |
| imagecompare.handle.hover.border.color | --p-imagecompare-handle-hover-border-color | Hover border color of handle |
| imagecompare.handle.border.width | --p-imagecompare-handle-border-width | Border width of handle |
| imagecompare.handle.border.radius | --p-imagecompare-handle-border-radius | Border radius of handle |
| imagecompare.handle.transition.duration | --p-imagecompare-handle-transition-duration | Transition duration of handle |
| imagecompare.handle.focus.ring.width | --p-imagecompare-handle-focus-ring-width | Focus ring width of handle |
| imagecompare.handle.focus.ring.style | --p-imagecompare-handle-focus-ring-style | Focus ring style of handle |
| imagecompare.handle.focus.ring.color | --p-imagecompare-handle-focus-ring-color | Focus ring color of handle |
| imagecompare.handle.focus.ring.offset | --p-imagecompare-handle-focus-ring-offset | Focus ring offset of handle |
| imagecompare.handle.focus.ring.shadow | --p-imagecompare-handle-focus-ring-shadow | Focus ring shadow of handle |

