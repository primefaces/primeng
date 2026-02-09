# Angular Virtual Scroller Component

VirtualScroller is a performance-approach to handle huge data efficiently.

## Accessibility

Screen Reader VirtualScroller uses a semantic list element to list the items. No specific role is enforced, still you may use any aria role and attributes as any valid attribute is passed to the container element. Keyboard Support Component does not include any built-in interactive elements.

## Basic

VirtualScroller requires items as the data to display, itemSize for the dimensions of an item and item template are required on component. In addition, an initial array is required based on the total number of items to display. Size of the viewport is configured using scrollWidth , scrollHeight properties directly or with CSS width and height styles.

```typescript
import { Component, OnInit } from '@angular/core';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-virtualscroller [items]="items" [itemSize]="50" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        </div>
    `,
    standalone: true,
    imports: [VirtualScrollerModule]
})
export class ScrollerBasicDemo implements OnInit {
    items!: string[];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }
}
```

## Delay

Scroll delay is adjusted by using delay property.

```typescript
import { Component, OnInit } from '@angular/core';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center gap-4">
            <div>
                <span class="font-bold block mb-2">No Delay</span>
                <p-virtualscroller [items]="items" [itemSize]="50" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                    <ng-template #item let-item let-options="options">
                        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                            {{ item }}
                        </div>
                    </ng-template>
                </p-virtualscroller>
            </div>
            <div>
                <span class="font-bold block mb-2">150ms</span>
                <p-virtualscroller [items]="items" [itemSize]="50" [delay]="150" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                    <ng-template #item let-item let-options="options">
                        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                            {{ item }}
                        </div>
                    </ng-template>
                </p-virtualscroller>
            </div>
            <div>
                <span class="font-bold block mb-2">500ms</span>
                <p-virtualscroller [items]="items" [itemSize]="50" [delay]="500" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                    <ng-template #item let-item let-options="options">
                        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                            {{ item }}
                        </div>
                    </ng-template>
                </p-virtualscroller>
            </div>
        </div>
    `,
    standalone: true,
    imports: [VirtualScrollerModule]
})
export class ScrollerDelayDemo implements OnInit {
    items!: string[];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }
}
```

## Grid

Scrolling can be enabled vertically and horizontally when orientation is set as both . In this mode, itemSize should be an array where first value is the height of an item and second is the width.

```typescript
import { Component, OnInit } from '@angular/core';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-virtualscroller [items]="items" [itemSize]="[50, 100]" orientation="both" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                        <div *ngFor="let el of item" style="width: 100px">{{ el }}</div>
                    </div>
                </ng-template>
            </p-virtualscroller>
        </div>
    `,
    standalone: true,
    imports: [VirtualScrollerModule]
})
export class ScrollerGridDemo implements OnInit {
    items!: string[][];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => Array.from({ length: 1000 }).map((_j, j) => `Item #${i}_${j}`));
    }
}
```

## Horizontal

Setting orientation to horizontal enables scrolling horizontally. In this case, the itemSize should refer to the width of an item.

```typescript
import { Component, OnInit } from '@angular/core';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-virtualscroller [items]="items" [itemSize]="50" scrollHeight="200px" orientation="horizontal" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" style="writing-mode: vertical-lr; width: 50px;" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        </div>
    `,
    standalone: true,
    imports: [VirtualScrollerModule]
})
export class ScrollerHorizontalDemo implements OnInit {
    items!: string[];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }
}
```

## lazyload-doc

Lazy mode is handy to deal with large datasets where instead of loading the entire data, small chunks of data are loaded on demand by invoking onLazyLoad callback everytime scrolling requires a new chunk. To implement lazy loading, enable lazy attribute, initialize your data as a placeholder with a length and finally implement a method callback using onLazyLoad that actually loads a chunk from a datasource. onLazyLoad gets an event object that contains information about the chunk of data to load such as the index and number of items to load. Notice that a new template called loadingItem is also required to display as a placeholder while the new items are being loaded.

```typescript
import { Component, OnInit } from '@angular/core';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

interface LazyEvent {
    first: number;
    last: number;
}

@Component({
    template: `
        <div class="card flex justify-center">
            <p-virtualscroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" [loading]="lazyLoading" [lazy]="true" (onLazyLoad)="onLazyLoad($event)" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        </div>
    `,
    standalone: true,
    imports: [VirtualScrollerModule]
})
export class ScrollerLazyloadDemo implements OnInit {
    items!: string[];
    lazyLoading: boolean = true;
    loadLazyTimeout: any;

    ngOnInit() {
        this.items = Array.from({ length: 1000 });
    }

    onLazyLoad(event: LazyEvent) {
        this.lazyLoading = true;
        
        if (this.loadLazyTimeout) {
            clearTimeout(this.loadLazyTimeout);
        }
        
        //imitate delay of a backend call
        this.loadLazyTimeout = setTimeout(
            () => {
                const { first, last } = event;
                const lazyItems = [...this.items];
        
                for (let i = first; i < last; i++) {
                    lazyItems[i] = `Item #${i}`;
                }
        
                this.items = lazyItems;
                this.lazyLoading = false;
                this.cd.markForCheck();
            },
            Math.random() * 1000 + 250
        );
    }
}
```

## loader-doc

Busy state is enabled by adding showLoader property which blocks the UI with a modal by default. Alternatively, loader template can be used to customize items e.g. with Skeleton .

```typescript
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center gap-4">
            <div>
                <p-virtualscroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                    <ng-template #item let-item let-options="options">
                        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                            {{ item }}
                        </div>
                    </ng-template>
                </p-virtualscroller>
            </div>
            <div>
                <p-virtualscroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                    <ng-template #item let-item let-options="options">
                        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                            {{ item }}
                        </div>
                    </ng-template>
                    <ng-template pTemplate="loader" let-options="options">
                        <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                            <p-skeleton [width]="options.even ? '60%' : '50%'" height="1.3rem"></p-skeleton>
                        </div>
                    </ng-template>
                </p-virtualscroller>
            </div>
        </div>
    `,
    standalone: true,
    imports: [SkeletonModule, VirtualScrollerModule]
})
export class ScrollerLoaderDemo implements OnInit {
    items!: string[];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }
}
```

## Programmatic

Scrolling to a specific index can be done with the scrollToIndex function.

```typescript
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@Component({
    template: `
        <div class="card flex flex-col items-center gap-4">
            <p-button label="Reset" (click)="reset()" />
            <p-virtualscroller #sc [items]="items" [itemSize]="50" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, VirtualScrollerModule]
})
export class ScrollerProgrammaticDemo implements OnInit {
    items: string[] = [];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }

    reset() {
        this.sc.scrollToIndex(0, 'smooth');
    }
}
```

## Scroll Options

The properties of scroller component can be used like an object in it.

## Template

Scroller content is customizable by using ng-template . Valid values are content , item , loader and loadericon

```typescript
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-virtualscroller [items]="items" [itemSize]="25 * 7" [showLoader]="true" [delay]="250" [numToleratedItems]="20" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex flex-col align-items-strech" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }">
                        <div class="flex items-center px-2" style="height: 25px">Item: {{ item }}</div>
                        <div class="flex items-center px-2" style="height: 25px">Index: {{ options.index }}</div>
                        <div class="flex items-center px-2" style="height: 25px">Count: {{ options.count }}</div>
                        <div class="flex items-center px-2" style="height: 25px">First: {{ options.first }}</div>
                        <div class="flex items-center px-2" style="height: 25px">Last: {{ options.last }}</div>
                        <div class="flex items-center px-2" style="height: 25px">Even: {{ options.even }}</div>
                        <div class="flex items-center px-2" style="height: 25px">Odd: {{ options.odd }}</div>
                    </div>
                </ng-template>
                <ng-template #loader let-options="options">
                    <div class="flex flex-col items-stretch" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }">
                        <div class="flex items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
                        <div class="flex items-center px-2" style="height: 25px"><p-skeleton width="50%" height="1.2rem"></p-skeleton></div>
                        <div class="flex items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
                        <div class="flex items-center px-2" style="height: 25px"><p-skeleton width="50%" height="1.2rem"></p-skeleton></div>
                        <div class="flex items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
                        <div class="flex items-center px-2" style="height: 25px"><p-skeleton width="50%" height="1.2rem"></p-skeleton></div>
                        <div class="flex items-center px-2" style="height: 25px"><p-skeleton width="60%" height="1.2rem"></p-skeleton></div>
                    </div>
                </ng-template>
            </p-virtualscroller>
        </div>
    `,
    standalone: true,
    imports: [SkeletonModule, VirtualScrollerModule]
})
export class ScrollerTemplateDemo implements OnInit {
    items!: string[];

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }
}
```

## Scroller

Scroller is a performance-approach to handle huge data efficiently.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<VirtualScrollerPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| id | string | - | Unique identifier of the element. |
| style | any | - | Inline style of the component. |
| styleClass | string | - | Style class of the element. |
| tabindex | number | - | Index of the element in tabbing order. |
| items | any[] | - | An array of objects to display. |
| itemSize | number \| number[] | - | The height/width of item according to orientation. |
| scrollHeight | string | - | Height of the scroll viewport. |
| scrollWidth | string | - | Width of the scroll viewport. |
| orientation | "both" \| "vertical" \| "horizontal" | - | The orientation of scrollbar. |
| step | number | - | Used to specify how many items to load in each load method in lazy mode. |
| delay | number | - | Delay in scroll before new data is loaded. |
| resizeDelay | number | - | Delay after window's resize finishes. |
| appendOnly | boolean | - | Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash. |
| inline | boolean | - | Specifies whether the scroller should be displayed inline or not. |
| lazy | boolean | - | Defines if data is loaded and interacted with in lazy manner. |
| disabled | boolean | - | If disabled, the scroller feature is eliminated and the content is displayed directly. |
| loaderDisabled | boolean | - | Used to implement a custom loader instead of using the loader feature in the scroller. |
| columns | any[] | - | Columns to display. |
| showSpacer | boolean | - | Used to implement a custom spacer instead of using the spacer feature in the scroller. |
| showLoader | boolean | - | Defines whether to show loader. |
| numToleratedItems | number | - | Determines how many additional elements to add to the DOM outside of the view. According to the scrolls made up and down, extra items are added in a certain algorithm in the form of multiples of this number. Default value is half the number of items shown in the view. |
| loading | boolean | - | Defines whether the data is loaded. |
| autoSize | boolean | - | Defines whether to dynamically change the height or width of scrollable container. |
| trackBy | Function | - | Function to optimize the dom operations by delegating to ngForTrackBy, default algoritm checks for object identity. |
| options | ScrollerOptions | - | Defines whether to use the scroller feature. The properties of scroller component can be used like an object in it. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onLazyLoad | event: ScrollerLazyLoadEvent | Callback to invoke in lazy mode to load new data. |
| onScroll | event: ScrollerScrollEvent | Callback to invoke when scroll position changes. |
| onScrollIndexChange | event: ScrollerScrollIndexChangeEvent | Callback to invoke when scroll position and item's range in view changes. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | TemplateRef<ScrollerContentTemplateContext> | Content template of the component. |
| item | TemplateRef<ScrollerItemTemplateContext> | Item template of the component. |
| loader | TemplateRef<ScrollerLoaderTemplateContext> | Loader template of the component. |
| loadericon | TemplateRef<ScrollerLoaderIconTemplateContext> | Loader icon template of the component. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| spacer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the spacer's DOM element. |
| loader | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the loader's DOM element. |
| loadingIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the loading icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-virtualscroller | Class name of the root element |
| p-virtualscroller-content | Class name of the content element |
| p-virtualscroller-spacer | Class name of the spacer element |
| p-virtualscroller-loader | Class name of the loader element |
| p-virtualscroller-loading-icon | Class name of the loading icon element |

