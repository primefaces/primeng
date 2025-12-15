# Angular Popover Component

Popover is a container component that can overlay other components on page.

## Accessibility

Screen Reader Popover component uses dialog role and since any attribute is passed to the root element you may define attributes like aria-label or aria-labelledby to describe the popup contents. In addition aria-modal is added since focus is kept within the popup. It is recommended to use a trigger component that can be accessed with keyboard such as a button, if not adding tabIndex would be necessary. Popover adds aria-expanded state attribute and aria-controls to the trigger so that the relation between the trigger and the popup is defined. Popover Keyboard Support When the popup gets opened, the first focusable element receives the focus and this can be customized by adding autofocus to an element within the popup. Key Function tab Moves focus to the next the focusable element within the popup. shift + tab Moves focus to the previous the focusable element within the popup. escape Closes the popup and moves focus to the trigger. Close Button Keyboard Support Key Function enter Closes the popup and moves focus to the trigger. space Closes the popup and moves focus to the trigger.

## Basic

Popover is accessed via its reference and visibility is controlled using toggle , show and hide methods with an event of the target.

```html
<p-button (click)="op.toggle($event)" icon="pi pi-share-alt" label="Share" />
<p-popover #op>
    <div class="flex flex-col gap-4 w-[25rem]">
        <div>
            <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Share this document</span>
            <p-inputgroup>
                <input pInputText value="https://primeng.org/12323ff26t2g243g423g234gg52hy25XADXAG3" readonly class="w-[25rem]" />
                <p-inputgroup-addon>
                    <i class="pi pi-copy"></i>
                </p-inputgroup-addon>
            </p-inputgroup>
        </div>
        <div>
            <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Invite Member</span>
            <div class="flex">
                <p-inputgroup>
                    <input pInputText disabled />
                    <button pButton label="Invite" icon="pi pi-users"></button>
                </p-inputgroup>
            </div>
        </div>
        <div>
            <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Team Members</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-4">
                @for(member of members; track member) {
                <li class="flex items-center gap-2">
                    <img [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + member.image" style="width: 32px" />
                    <div>
                        <span class="font-medium">{{ member.name }}</span>
                        <div class="text-sm text-muted-color">{{ member.email }}</div>
                    </div>
                    <div class="flex items-center gap-2 text-muted-color ml-auto text-sm">
                        <span>{{ member.role }}</span>
                        <i class="pi pi-angle-down"></i>
                    </div>
                </li>
                }
            </ul>
        </div>
    </div>
</p-popover>
```

## DataTable

Place the Popover outside of the data iteration components to avoid rendering it multiple times.

```html
<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [paginator]="true" [rows]="5">
    <ng-template #header>
        <tr>
            <th class="w-1/6">Id</th>
            <th class="w-1/6">Code</th>
            <th class="w-1/6">Name</th>
            <th class="w-1/6">Price</th>
            <th class="w-1/6">Image</th>
            <th class="w-1/6">Details</th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
        <tr>
            <td>{{ product.id }}</td>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>$ {{ product.price }}</td>
            <td>
                <img
                    [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image"
                    [alt]="product.image"
                    class="w-16 shadow-sm"
                />
            </td>
            <td>
                <p-button (onClick)="displayProduct($event, product)" icon="pi pi-search" severity="secondary" rounded />
            </td>
        </tr>
    </ng-template>
</p-table>
<p-popover #op (onHide)="selectedProduct = null">
    <ng-template #content>
        <div *ngIf="selectedProduct" class="rounded flex flex-col">
            <div class="flex justify-center rounded">
                <div class="relative mx-auto">
                    <img
                        class="rounded w-44 sm:w-64"
                        [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + selectedProduct.image"
                        [alt]="selectedProduct.name"
                    />
                    <p-tag
                        [value]="selectedProduct.inventoryStatus"
                        [severity]="getSeverity(selectedProduct)"
                        class="absolute dark:!bg-surface-900"
                        [style.left.px]="4"
                        [style.top.px]="4"
                    />
                </div>
            </div>
            <div class="pt-4">
                <div class="flex flex-row justify-between items-start gap-2 mb-4">
                    <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                            selectedProduct.category
                        }}</span>
                        <div class="text-lg font-medium mt-1">{{ selectedProduct.name }}</div>
                    </div>
                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                        <div
                            class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                            style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                        >
                            <span class="text-surface-900 font-medium text-sm">{{ selectedProduct.rating }}</span>
                            <i class="pi pi-star-fill text-yellow-500"></i>
                        </div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <p-button
                        icon="pi pi-shopping-cart"
                        [label]="'Buy Now | $' + selectedProduct.price"
                        [disabled]="selectedProduct.inventoryStatus === 'OUTOFSTOCK'"
                        class="flex-auto"
                        styleClass="w-full whitespace-nowrap"
                        (onClick)="hidePopover()"
                    />
                    <p-button icon="pi pi-heart" outlined (onClick)="hidePopover()" />
                </div>
            </div>
        </div>
    </ng-template>
</p-popover>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'popover-data-table-demo',
    templateUrl: './popover-data-table-demo.html',
    standalone: true,
    imports: [PopoverModule, TableModule, ButtonModule, TagModule],
    providers: [MessageService, ProductService]
})
export class PopoverDataTableDemo implements OnInit {

    constructor(
        private productService: ProductService,
        private cdr: ChangeDetectorRef,
    ) {}

    @ViewChild('op') op!: Popover;

    products: Product[] | undefined;

    selectedProduct: Product | undefined;

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
            this.cdr.markForCheck();
        });
    }

    displayProduct(event, product) {
        if (this.selectedProduct?.id === product.id) {
            this.op.hide();
            this.selectedProduct = null;
        } else {
            this.selectedProduct = product;
            this.op.show(event);

            if (this.op.container) {
                this.op.align();
            }
        }
    }

    hidePopover() {
        this.op.hide();
    }

    getSeverity(product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warn';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    }
}
```
</details>

## Select Data

In this sample, data is retrieved from the content inside the popover.

```html
<p-button type="button" [label]="selectedMember ? selectedMember.name : 'Select Member'" (onClick)="toggle($event)" styleClass="min-w-48" />

<p-popover #op>
    <div class="flex flex-col gap-4">
        <div>
            <span class="font-medium block mb-2">Team Members</span>
            <ul class="list-none p-0 m-0 flex flex-col">
                <li *ngFor="let member of members" class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border" (click)="selectMember(member)">
                    <img [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + member.image" style="width: 32px" />
                    <div>
                        <span class="font-medium">{{ member.name }}</span>
                        <div class="text-sm text-surface-500 dark:text-surface-400">{{ member.email }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</p-popover>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, ViewChild } from '@angular/core';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'popover-basic-demo',
    templateUrl: './popover-basic-demo.html',
    standalone: true,
    imports: [PopoverModule, ButtonModule, CommonModule]
})
export class PopoverBasicDemo {
   @ViewChild('op') op!: Popover;

    selectedMember = null;

    members = [
        { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' },
    ];

    toggle(event) {
        this.op.toggle(event);
    }

    selectMember(member) {
        this.selectedMember = member;
        this.op.hide();
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Target

show method takes two parameters, first one is the event and it is mandatory. By default the target component to align the overlay is the event target, if you'd like to align it to another element, provide it as the second parameter target .

```html
<p-button (click)="op.show($event, targetEl)" icon="pi pi-image" label="Show"></p-button>
<div #targetEl class="mt-8 w-40 h-20 border border-surface rounded-border flex items-center justify-center">
    <span>Target Element</span>
</div>
<p-popover #op>
    <img src="https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg" alt="product" />
</p-popover>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'overlay-panel-target-demo',
    templateUrl: './overlay-panel-target-demo.html'
})
export class OverlayPanelTargetDemo {}
```
</details>

## Template

Content of the OverlayPanel is defined by content template.

```html
<p-popover #op>
    <ng-template #content>
        <h4>Custom Content</h4>
    </ng-template>
</p-popover>
<p-button (click)="op.toggle($event)" icon="pi pi-image" label="Show"></p-button>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'overlay-panel-template-demo',
    templateUrl: './overlay-panel-template-demo.html'
})
export class OverlayPanelTemplateDemo {}
```
</details>

## Popover

Popover is a container component that can overlay other components on page.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<PopoverPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| dismissable | boolean | true | Enables to hide the overlay when outside is clicked. |
| style | { [klass: string]: any } | - | Inline style of the component. |
| styleClass | string | - | Style class of the component. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| ariaCloseLabel | string | - | Aria label of the close icon. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| focusOnShow | boolean | true | When enabled, first button receives focus on show. |
| showTransitionOptions | string | .12s cubic-bezier(0, 0, 0.2, 1) | Transition options of the show animation. **(Deprecated)** |
| hideTransitionOptions | string | .1s linear | Transition options of the hide animation. **(Deprecated)** |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onShow | value: any | Callback to invoke when an overlay becomes visible. |
| onHide | value: any | Callback to invoke when an overlay gets hidden. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | TemplateRef<PopoverContentTemplateContext> | Custom content template. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| toggle | event: any, target: any | void | Toggles the visibility of the panel. |
| show | event: any, target: any | void | Displays the panel. |
| hide |  | void | Hides the panel. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| popover.background | --p-popover-background | Background of root |
| popover.border.color | --p-popover-border-color | Border color of root |
| popover.color | --p-popover-color | Color of root |
| popover.border.radius | --p-popover-border-radius | Border radius of root |
| popover.shadow | --p-popover-shadow | Shadow of root |
| popover.gutter | --p-popover-gutter | Gutter of root |
| popover.arrow.offset | --p-popover-arrow-offset | Arrow offset of root |
| popover.content.padding | --p-popover-content-padding | Padding of content |

