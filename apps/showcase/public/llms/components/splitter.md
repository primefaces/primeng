# Angular Splitter Component

Splitter is utilized to separate and resize panels.

## Accessibility

Screen Reader Splitter bar defines separator as the role with aria-orientation set to either horizontal or vertical. Keyboard Support Key Function tab Moves focus through the splitter bar. down arrow Moves a vertical splitter down. up arrow Moves a vertical splitter up. left arrow Moves a vertical splitter to the left. right arrow Moves a vertical splitter to the right.

## Horizontal

Splitter requires two SplitterPanel components as children which are displayed horizontally by default.

```html
<p-splitter [style]="{ height: '300px' }" class="mb-8">
    <ng-template #panel>
        <div class="flex items-center justify-center h-full">Panel 1</div>
    </ng-template>
    <ng-template #panel>
        <div class="flex items-center justify-center h-full">Panel 2</div>
    </ng-template>
</p-splitter>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';

@Component({
    selector: 'splitter-horizontal-demo',
    templateUrl: './splitter-horizontal-demo.html',
    standalone: true,
    imports: [SplitterModule]
})
export class SplitterHorizontalDemo {}
```
</details>

## Nested

Splitters can be combined to create advanced layouts.

```html
<p-splitter [style]="{ height: '300px' }" [panelSizes]="[20, 80]" [minSizes]="[10, 0]" class="mb-8">
    <ng-template #panel>
        <div class="col flex w-full items-center justify-center">Panel 1</div>
    </ng-template>
    <ng-template #panel>
        <p-splitter layout="vertical" [panelSizes]="[50, 50]">
            <ng-template #panel>
                <div style="flex-grow: 1;" class="flex items-center justify-center">Panel 2</div>
            </ng-template>
            <ng-template #panel>
                <p-splitter [panelSizes]="[20, 80]">
                    <ng-template #panel>
                        <div class="col h-full flex items-center justify-center">Panel 3</div>
                    </ng-template>
                    <ng-template #panel>
                        <div class="col h-full flex items-center justify-center">Panel 4</div>
                    </ng-template>
                </p-splitter>
            </ng-template>
        </p-splitter>
    </ng-template>
</p-splitter>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';

@Component({
    selector: 'splitter-nested-demo',
    templateUrl: './splitter-nested-demo.html',
    standalone: true,
    imports: [SplitterModule]
})
export class SplitterNestedDemo {}
```
</details>

## Size

When no panelSizes are defined, panels are split 50/50, use the panelSizes property to give relative widths e.g. [25, 75].

```html
<p-splitter [panelSizes]="[25, 75]" [style]="{ height: '300px' }" class="mb-8">
    <ng-template #panel>
        <div class="flex items-center justify-center h-full">Panel 1</div>
    </ng-template>
    <ng-template #panel>
        <div class="flex items-center justify-center h-full">Panel 2</div>
    </ng-template>
</p-splitter>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';

@Component({
    selector: 'splitter-size-demo',
    templateUrl: './splitter-size-demo.html',
    standalone: true,
    imports: [SplitterModule]
})
export class SplitterSizeDemo {}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Vertical

Panels are displayed as stacked by setting the layout to vertical .

```html
<p-splitter [style]="{ height: '300px' }" class="mb-8" layout="vertical">
    <ng-template #panel>
        <div class="flex items-center justify-center h-full">Panel 1</div>
    </ng-template>
    <ng-template #panel>
        <div class="flex items-center justify-center h-full">Panel 2</div>
    </ng-template>
</p-splitter>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';

@Component({
    selector: 'splitter-vertical-demo',
    templateUrl: './splitter-vertical-demo.html',
    standalone: true,
    imports: [SplitterModule]
})
export class SplitterVerticalDemo {}
```
</details>

## Splitter

Splitter is utilized to separate and resize panels.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<SplitterPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| panelStyleClass | string | - | Style class of the panel. |
| panelStyle | { [klass: string]: any } | - | Inline style of the panel. |
| stateStorage | string | session | Defines where a stateful splitter keeps its state, valid values are 'session' for sessionStorage and 'local' for localStorage. |
| stateKey | string | null | Storage identifier of a stateful Splitter. |
| layout | string | horizontal | Orientation of the panels. Valid values are 'horizontal' and 'vertical'. |
| gutterSize | number | 4 | Size of the divider in pixels. |
| step | number | 5 | Step factor to increment/decrement the size of the panels while pressing the arrow keys. |
| minSizes | number[] | [] | Minimum size of the elements relative to 100%. |
| panelSizes | number[] | - | Size of the elements relative to 100%. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onResizeEnd | event: SplitterResizeEndEvent | Callback to invoke when resize ends. |
| onResizeStart | event: SplitterResizeStartEvent | Callback to invoke when resize starts. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| panel | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the panel's DOM element. |
| gutter | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the gutter's DOM element. |
| gutterHandle | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the gutter handle's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-splitter | Class name of the root element |
| p-splitter-gutter | Class name of the gutter element |
| p-splitter-gutter-handle | Class name of the gutter handle element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| splitter.background | --p-splitter-background | Background of root |
| splitter.border.color | --p-splitter-border-color | Border color of root |
| splitter.color | --p-splitter-color | Color of root |
| splitter.transition.duration | --p-splitter-transition-duration | Transition duration of root |
| splitter.gutter.background | --p-splitter-gutter-background | Background of gutter |
| splitter.handle.size | --p-splitter-handle-size | Size of handle |
| splitter.handle.background | --p-splitter-handle-background | Background of handle |
| splitter.handle.border.radius | --p-splitter-handle-border-radius | Border radius of handle |
| splitter.handle.focus.ring.width | --p-splitter-handle-focus-ring-width | Focus ring width of handle |
| splitter.handle.focus.ring.style | --p-splitter-handle-focus-ring-style | Focus ring style of handle |
| splitter.handle.focus.ring.color | --p-splitter-handle-focus-ring-color | Focus ring color of handle |
| splitter.handle.focus.ring.offset | --p-splitter-handle-focus-ring-offset | Focus ring offset of handle |
| splitter.handle.focus.ring.shadow | --p-splitter-handle-focus-ring-shadow | Focus ring shadow of handle |

