# Angular Scroll Panel Component

ScrollPanel is a cross browser, lightweight and skinnable alternative to native browser scrollbar.

## Accessibility

Screen Reader Scrollbars of the ScrollPanel has a scrollbar role along with the aria-controls attribute that refers to the id of the scrollable content container and the aria-orientation to indicate the orientation of scrolling. Header Keyboard Support Key Function down arrow Scrolls content down when vertical scrolling is available. up arrow Scrolls content up when vertical scrolling is available. left Scrolls content left when horizontal scrolling is available. right Scrolls content right when horizontal scrolling is available.

## Basic

ScrollPanel is defined using dimensions for the scrollable viewport.

```html
<p-scrollpanel [style]="{ width: '100%', height: '150px' }">
    <p>
        Lorem ipsum dolor sit amet...
    </p>
    <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
    </p>
    <p class="m-0">
        At vero eos et accusamus et iusto odio dignissimos...
    </p>
</p-scrollpanel>
```

## Custom

Scrollbar visuals can be styled for a unified look across different platforms.

```html
<p-scrollpanel [style]="{ width: '100%', height: '200px' }" >
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
    </p>
    <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
    </p>
    <p>
        At vero eos et accusamus et iusto odio dignissimos...
    </p>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
    </p>
    <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
    </p>
    <p>
        At vero eos et accusamus et iusto odio dignissimos...
    </p>
</p-scrollpanel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
    selector: 'scroll-panel-custom-demo',
    templateUrl: './scroll-panel-custom-demo.html',
    standalone: true,
    imports: [ScrollPanelModule],
    styles: [ \`:host ::ng-deep {
    .p-scrollpanel {
        &.custombar {
            .p-scrollpanel-bar {
                background-color: var(--p-primary-color);
            }
        }
    }
}\`
    ],
})
export class ScrollPanelCustomDemo {}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Scroll Panel

ScrollPanel is a cross browser, lightweight and themable alternative to native browser scrollbar.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ScrollPanelPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| step | number | 5 | Step factor to scroll the content while pressing the arrow keys. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | TemplateRef<void> | Custom content template. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| scrollTop | scrollTop: number | void | Scrolls the top location to the given value. |
| refresh |  | void | Refreshes the position and size of the scrollbar. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| contentContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content container's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| barX | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the horizontal panel's DOM element. |
| barY | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the vertical panel's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-scrollpanel | Class name of the root element |
| p-scrollpanel-content-container | Class name of the content container element |
| p-scrollpanel-content | Class name of the content element |
| p-scrollpanel-bar-x | Class name of the bar x element |
| p-scrollpanel-bar-y | Class name of the bar y element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| scrollpanel.transition.duration | --p-scrollpanel-transition-duration | Transition duration of root |
| scrollpanel.bar.size | --p-scrollpanel-bar-size | Size of bar |
| scrollpanel.bar.border.radius | --p-scrollpanel-bar-border-radius | Border radius of bar |
| scrollpanel.bar.focus.ring.width | --p-scrollpanel-bar-focus-ring-width | Focus ring width of bar |
| scrollpanel.bar.focus.ring.style | --p-scrollpanel-bar-focus-ring-style | Focus ring style of bar |
| scrollpanel.bar.focus.ring.color | --p-scrollpanel-bar-focus-ring-color | Focus ring color of bar |
| scrollpanel.bar.focus.ring.offset | --p-scrollpanel-bar-focus-ring-offset | Focus ring offset of bar |
| scrollpanel.bar.focus.ring.shadow | --p-scrollpanel-bar-focus-ring-shadow | Focus ring shadow of bar |
| scrollpanel.bar.background | --p-scrollpanel-bar-background | Background of bar |

