# Angular Skeleton Component

Skeleton is a placeholder to display instead of the actual content.

## Accessibility

Screen Reader Skeleton uses aria-hidden as "true" so that it gets ignored by screen readers, any valid attribute is passed to the root element so you may customize it further if required. If multiple skeletons are grouped inside a container, you may use aria-busy on the container element as well to indicate the loading process.

## Card

Sample Card implementation using different Skeleton components and Tailwind CSS utilities.

```html
<div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
    <div class="flex mb-4">
        <p-skeleton shape="circle" size="4rem" class="mr-2" />
        <div>
            <p-skeleton width="10rem" class="mb-2" />
            <p-skeleton width="5rem" class="mb-2" />
            <p-skeleton height=".5rem" />
        </div>
    </div>
    <p-skeleton width="100%" height="150px" />
    <div class="flex justify-between mt-4">
        <p-skeleton width="4rem" height="2rem" />
        <p-skeleton width="4rem" height="2rem" />
    </div>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
    selector: 'skeleton-card-demo',
    templateUrl: './skeleton-card-demo.html',
    standalone: true,
    imports: [Skeleton]
})
export class SkeletonCardDemo {}
```
</details>

## DataTable

Sample DataTable implementation using different Skeleton components and Tailwind CSS utilities.

```html
<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
        <tr>
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'skeleton-data-table-demo',
    templateUrl: './skeleton-data-table-demo.html',
    standalone: true,
    imports: [Skeleton, TableModule]
})
export class SkeletonDataTableDemo implements OnInit {
    products: any[] | undefined;

    ngOnInit() {
        this.products = Array.from({ length: 5 }).map((_, i) => \`Item #\${i}\`);
    }
}
```
</details>

## List

Sample List implementation using different Skeleton components and Tailwind CSS utilities.

```html
<div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
    <ul class="m-0 p-0 list-none">
        <li class="mb-4">
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" class="mr-2" />
                <div class="self-center" style="flex: 1">
                    <p-skeleton width="100%" class="mb-2" />
                    <p-skeleton width="75%" />
                </div>
            </div>
        </li>
        <li class="mb-4">
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" class="mr-2" />
                <div class="self-center" style="flex: 1">
                    <p-skeleton width="100%" class="mb-2" />
                    <p-skeleton width="75%" />
                </div>
            </div>
        </li>
        <li class="mb-4">
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" class="mr-2" />
                <div class="self-center" style="flex: 1">
                    <p-skeleton width="100%" class="mb-2" />
                    <p-skeleton width="75%" />
                </div>
            </div>
        </li>
        <li>
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" class="mr-2" />
                <div class="self-center" style="flex: 1">
                    <p-skeleton width="100%" class="mb-2" />
                    <p-skeleton width="75%" />
                </div>
            </div>
        </li>
    </ul>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
    selector: 'skeleton-list-demo,
    templateUrl: './skeleton-list-demo.html',
    standalone: true,
    imports: [Skeleton]
})
export class SkeletonListDemo {}
```
</details>

## Shapes

Various shapes and sizes can be created using styling properties like shape , width , height , borderRadius and class .

```html
<h5>Rectangle</h5>
<p-skeleton class="mb-2" />
<p-skeleton width="10rem" class="mb-2" />
<p-skeleton width="5rem" class="mb-2" />
<p-skeleton height="2rem" class="mb-2" />
<p-skeleton width="10rem" height="4rem" />

<h5>Rounded</h5>
<p-skeleton class="mb-2" borderRadius="16px" />
<p-skeleton width="10rem" class="mb-2" borderRadius="16px" />
<p-skeleton width="5rem" class="mb-2" borderRadius="16px" />
<p-skeleton height="2rem" class="mb-2" borderRadius="16px" />
<p-skeleton width="10rem" height="4rem" borderRadius="16px" />

<h5 class="mt-4">Square</h5>
<p-skeleton size="2rem" class="mr-2" />
<p-skeleton size="3rem" class="mr-2" />
<p-skeleton size="4rem" class="mr-2" />
<p-skeleton size="5rem" />

<h5 class="mt-4">Circle</h5>
<p-skeleton shape="circle" size="2rem" class="mr-2" />
<p-skeleton shape="circle" size="3rem" class="mr-2" />
<p-skeleton shape="circle" size="4rem" class="mr-2" />
<p-skeleton shape="circle" size="5rem" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
    selector: 'skeleton-shapes-demo',
    templateUrl: './skeleton-shapes-demo.html',
    standalone: true,
    imports: [Skeleton]
})
export class SkeletonShapesDemo {}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Skeleton

Skeleton is a placeholder to display instead of the actual content.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<SkeletonPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| styleClass | string | - | Class of the element. **(Deprecated)** |
| shape | string | rectangle | Shape of the element. |
| borderRadius | string | - | Border radius of the element, defaults to value from theme. |
| size | string | - | Size of the skeleton. |
| width | string | 100% | Width of the element. |
| height | string | 1rem | Height of the element. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-skeleton | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| skeleton.border.radius | --p-skeleton-border-radius | Border radius of root |
| skeleton.background | --p-skeleton-background | Background of root |
| skeleton.animation.background | --p-skeleton-animation-background | Animation background of root |

