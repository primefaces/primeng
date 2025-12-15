# Angular Carousel Component

Carousel is a content slider featuring various customization options.

## Accessibility

Screen Reader Carousel uses region role and since any attribute is passed to the main container element, attributes such as aria-label and aria-roledescription can be used as well. The slides container has aria-live attribute set as "polite" if carousel is not in autoplay mode, otherwise "off" would be the value in autoplay. A slide has a group role with an aria-label that refers to the aria.slideNumber property of the locale API. Similarly aria.slide is used as the aria-roledescription of the item. Inactive slides are hidden from the readers with aria-hidden . Next and Previous navigators are button elements with aria-label attributes referring to the aria.nextPageLabel and aria.firstPageLabel properties of the locale API by default respectively, you may still use your own aria roles and attributes as any valid attribute is passed to the button elements implicitly by using nextButtonProps and prevButtonProps . Quick navigation elements are button elements with an aria-label attribute referring to the aria.pageLabel of the locale API. Current page is marked with aria-current . Next/Prev Keyboard Support Key Function tab Moves focus through interactive elements in the carousel. enter Activates navigation. space Activates navigation. Quick Navigation Keyboard Support Key Function tab Moves focus through the active slide link. enter Activates the focused slide link. space Activates the focused slide link. right arrow Moves focus to the next slide link. left arrow Moves focus to the previous slide link. home Moves focus to the first slide link. end Moves focus to the last slide link.

## Basic

Carousel requires a collection of items as its value along with a template to render each item.

```html
<p-carousel [value]="products" [numVisible]="3" [numScroll]="3" [circular]="false" [responsiveOptions]="responsiveOptions">
    <ng-template let-product #item>
        <div class="border border-surface rounded-border m-2 p-4">
            <div class="mb-4">
                <div class="relative mx-auto">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="w-full rounded-border" />
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" class="absolute dark:!bg-surface-900" [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                </div>
            </div>
            <div class="mb-4 font-medium">{{ product.name }}</div>
            <div class="flex justify-between items-center">
                <div class="mt-0 font-semibold text-xl">{{ '$' + product.price }}</div>
                <span>
                    <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                    <p-button icon="pi pi-shopping-cart" styleClass="ml-2" />
                </span>
            </div>
        </div>
    </ng-template>
</p-carousel>
```

## Circular

When autoplayInterval is defined in milliseconds, items are scrolled automatically. In addition, for infinite scrolling circular property needs to be added which is enabled automatically in auto play mode.

```html
<p-carousel [value]="products" [numVisible]="3" [numScroll]="1" [circular]="true" [responsiveOptions]="responsiveOptions" autoplayInterval="3000">
    <ng-template let-product #item>
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
            <div class="mb-4">
                <div class="relative mx-auto">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="w-full rounded-border" />
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" class="absolute dark:!bg-surface-900" [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                </div>
            </div>
            <div class="mb-4 font-medium">{{ product.name }}</div>
            <div class="flex justify-between items-center">
                <div class="mt-0 font-semibold text-xl">{{ '$' + product.price }}</div>
                <span>
                    <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                    <p-button icon="pi pi-shopping-cart" styleClass="ml-2" />
                </span>
            </div>
        </div>
    </ng-template>
</p-carousel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'carousel-circular-demo',
    templateUrl: './carousel-circular-demo.html',
    standalone: true,
    imports: [Carousel, ButtonModule, Tag],
    providers: [ProductService]
})
export class CarouselCircularDemo implements OnInit{
    products: Product[] | undefined;

    responsiveOptions: any[] | undefined;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then(data => {
            this.products = data.slice(0, 9);
        });

        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
        ]
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
}
```
</details>

## numscrolldoc

Number of items to scroll is specified with the numScroll option.

```html
<p-carousel
    [value]="products"
    [numVisible]="3"
    [numScroll]="1"
    [responsiveOptions]="responsiveOptions">
        <ng-template let-product #item>
            <div class="border border-surface rounded-border m-2 p-4">
                <div class="mb-4">
                    <div class="relative mx-auto">
                        <img
                            src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}"
                            [alt]="product.name"
                            class="w-full rounded-border" />
                        <p-tag
                            [value]="product.inventoryStatus"
                            [severity]="getSeverity(product.inventoryStatus)"
                            class="absolute"
                            styleClass="dark:!bg-surface-900"
                            [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                    </div>
                </div>
                <div class="mb-4 font-medium">
                    {{ product.name }}
                </div>
                <div class="flex justify-between items-center">
                    <div class="mt-0 font-semibold text-xl">
                        {{ '$' + product.price }}
                    </div>
                    <span>
                        <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                        <p-button icon="pi pi-shopping-cart" styleClass="ml-2" />
                    </span>
                </div>
            </div>
        </ng-template>
</p-carousel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'carousel-num-scroll-demo',
    templateUrl: './carousel-num-scroll-demo.html',
    standalone: true,
    imports: [Carousel, ButtonModule, Tag],
    providers: [ProductService]

})
export class CarouselNumScrollDemo implements OnInit {
    products: Product[] | undefined;

    responsiveOptions: any[] | undefined;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
        });

        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
}
```
</details>

## Responsive

Carousel supports specific configuration per screen size with the responsiveOptions property that takes an array of objects where each object defines the max-width breakpoint , numVisible for the number of items items per page and numScroll for number of items to scroll. When responsiveOptions is defined, the numScroll and numVisible properties of the Carousel are used as default when there is breakpoint that applies.

```html
<p-carousel [value]="products" [numVisible]="3" [numScroll]="1" [responsiveOptions]="responsiveOptions">
    <ng-template let-product #item>
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
            <div class="mb-4">
                <div class="relative mx-auto">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="w-full rounded-border" />
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" class="absolute dark:!bg-surface-900" [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                </div>
            </div>
            <div class="mb-4 font-medium">{{ product.name }}</div>
            <div class="flex justify-between items-center">
                <div class="mt-0 font-semibold text-xl">{{ '$' + product.price }}</div>
                <span>
                    <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                    <p-button icon="pi pi-shopping-cart" styleClass="ml-2" />
                </span>
            </div>
        </div>
    </ng-template>
</p-carousel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'carousel-responsive-demo',
    templateUrl: './carousel-responsive-demo.html',
    standalone: true,
    imports: [Carousel, ButtonModule, Tag],
    providers: [ProductService]
})
export class CarouselResponsiveDemo {
    products: Product[] | undefined;

    responsiveOptions: any[] | undefined;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
        });


        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1,
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1,
            },
        ];
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## templatedoc

Custom content projection is available using the header and footer templates.

```html
<p-carousel
    [value]="products"
    [numVisible]="3"
    [numScroll]="1"
    [responsiveOptions]="responsiveOptions">
        <ng-template #header>
            <p>Header content</p>
        </ng-template>
        <ng-template let-product #item>
            <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
                <div class="mb-4">
                    <div class="relative mx-auto">
                        <img
                            src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}"
                            [alt]="product.name"
                            class="w-full rounded-border" />
                        <p-tag
                            [value]="product.inventoryStatus"
                            [severity]="getSeverity(product.inventoryStatus)"
                            class="absolute dark:!bg-surface-900"
                            [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                    </div>
                </div>
                <div class="mb-4 font-medium">
                    {{ product.name }}
                </div>
                <div class="flex justify-between items-center">
                    <div class="mt-0 font-semibold text-xl">
                        {{ '$' + product.price }}
                    </div>
                    <span>
                        <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                        <p-button icon="pi pi-shopping-cart" styleClass="ml-2" />
                    </span>
                </div>
            </div>
        </ng-template>
        <ng-template #footer>
            <p>Footer content</p>
        </ng-template>
</p-carousel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'carousel-template-demo',
    templateUrl: './carousel-template-demo.html',
    standalone: true,
    imports: [Carousel, ButtonModule, Tag],
    providers: [ProductService]
})
export class CarouselTemplateDemo implements OnInit{
    products: Product[] | undefined;

    responsiveOptions: any[] | undefined;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
        });

        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
}
```
</details>

## Vertical

To create a vertical Carousel, orientation needs to be set to vertical along with a verticalViewPortHeight .

```html
<p-carousel [value]="products" [numVisible]="1" [numScroll]="1" orientation="vertical" verticalViewPortHeight="330px" contentClass="flex items-center">
    <ng-template let-product #item>
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
            <div class="mb-4">
                <div class="relative mx-auto">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="w-full rounded" />
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" class="absolute dark:!bg-surface-900" [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                </div>
            </div>
            <div class="mb-4 font-medium">{{ product.name }}</div>
            <div class="flex justify-between items-center">
                <div class="mt-0 font-semibold text-xl">{{ '$' + product.price }}</div>
                <span>
                    <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                    <p-button icon="pi pi-shopping-cart" styleClass="ml-2" />
                </span>
            </div>
        </div>
    </ng-template>
</p-carousel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'carousel-vertical-demo',
    templateUrl: './carousel-vertical-demo.html',
    standalone: true,
    imports: [Carousel, ButtonModule, Tag],
    providers: [ProductService]
})
export class CarouselVerticalDemo implements OnInit {
    products: Product[] | undefined;

    responsiveOptions: any[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
        });

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
}
```
</details>

## Carousel

Carousel is a content slider featuring various customization options.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<any> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| page | number | - | Index of the first item. |
| numVisible | number | - | Number of items per page. |
| numScroll | number | - | Number of items to scroll. |
| responsiveOptions | CarouselResponsiveOptions[] | - | An array of options for responsive design. |
| orientation | "vertical" \| "horizontal" | horizontal | Specifies the layout of the component. |
| verticalViewPortHeight | string | 300px | Height of the viewport in vertical layout. |
| contentClass | string | - | Style class of main content. |
| indicatorsContentClass | string | - | Style class of the indicator items. |
| indicatorsContentStyle | { [klass: string]: any } | - | Inline style of the indicator items. |
| indicatorStyleClass | string | - | Style class of the indicators. |
| indicatorStyle | { [klass: string]: any } | - | Style of the indicators. |
| value | any[] | - | An array of objects to display. |
| circular | boolean | false | Defines if scrolling would be infinite. |
| showIndicators | boolean | true | Whether to display indicator container. |
| showNavigators | boolean | true | Whether to display navigation buttons in container. |
| autoplayInterval | number | 0 | Time in milliseconds to scroll items automatically. |
| styleClass | string | - | Style class of the viewport container. **(Deprecated)** |
| prevButtonProps | ButtonProps | ... | Used to pass all properties of the ButtonProps to the Button component. |
| nextButtonProps | ButtonProps | ... | Used to pass all properties of the ButtonProps to the Button component. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onPage | event: CarouselPageEvent | Callback to invoke after scroll. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| item | TemplateRef<CarouselItemTemplateContext<any>> | Custom item template. |
| header | TemplateRef<void> | Custom header template. |
| footer | TemplateRef<void> | Custom footer template. |
| previousicon | TemplateRef<void> | Custom previous icon template. |
| nexticon | TemplateRef<void> | Custom next icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| contentContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content container's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| pcPrevButton | ButtonPassThroughOptions | Used to pass attributes to the previous button's DOM element. |
| viewport | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the viewport's DOM element. |
| itemList | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the item list's DOM element. |
| item | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the item's DOM element. |
| itemClone | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the item clone's DOM element. |
| pcNextButton | ButtonPassThroughOptions | Used to pass attributes to the next button's DOM element. |
| indicatorList | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the indicator list's DOM element. |
| indicator | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the indicator's DOM element. |
| indicatorButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the indicator button's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-carousel | Class name of the root element |
| p-carousel-header | Class name of the header element |
| p-carousel-content-container | Class name of the content container element |
| p-carousel-content | Class name of the content element |
| p-carousel-prev-button | Class name of the previous button element |
| p-carousel-viewport | Class name of the viewport element |
| p-carousel-item-list | Class name of the item list element |
| p-carousel-item-clone | Class name of the item clone element |
| p-carousel-item | Class name of the item element |
| p-carousel-next-button | Class name of the next button element |
| p-carousel-indicator-list | Class name of the indicator list element |
| p-carousel-indicator | Class name of the indicator element |
| p-carousel-indicator-button | Class name of the indicator button element |
| p-carousel-footer | Class name of the footer element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| carousel.transition.duration | --p-carousel-transition-duration | Transition duration of root |
| carousel.content.gap | --p-carousel-content-gap | Gap of content |
| carousel.indicator.list.padding | --p-carousel-indicator-list-padding | Padding of indicator list |
| carousel.indicator.list.gap | --p-carousel-indicator-list-gap | Gap of indicator list |
| carousel.indicator.width | --p-carousel-indicator-width | Width of indicator |
| carousel.indicator.height | --p-carousel-indicator-height | Height of indicator |
| carousel.indicator.border.radius | --p-carousel-indicator-border-radius | Border radius of indicator |
| carousel.indicator.focus.ring.width | --p-carousel-indicator-focus-ring-width | Focus ring width of indicator |
| carousel.indicator.focus.ring.style | --p-carousel-indicator-focus-ring-style | Focus ring style of indicator |
| carousel.indicator.focus.ring.color | --p-carousel-indicator-focus-ring-color | Focus ring color of indicator |
| carousel.indicator.focus.ring.offset | --p-carousel-indicator-focus-ring-offset | Focus ring offset of indicator |
| carousel.indicator.focus.ring.shadow | --p-carousel-indicator-focus-ring-shadow | Focus ring shadow of indicator |
| carousel.indicator.background | --p-carousel-indicator-background | Background of indicator |
| carousel.indicator.hover.background | --p-carousel-indicator-hover-background | Hover background of indicator |
| carousel.indicator.active.background | --p-carousel-indicator-active-background | Active background of indicator |

