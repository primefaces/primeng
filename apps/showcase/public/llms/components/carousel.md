# Angular Carousel Component

Carousel is a content slider featuring various customization options.

## Accessibility

Screen Reader Carousel uses region role and since any attribute is passed to the main container element, attributes such as aria-label and aria-roledescription can be used as well. The slides container has aria-live attribute set as "polite" if carousel is not in autoplay mode, otherwise "off" would be the value in autoplay. A slide has a group role with an aria-label that refers to the aria.slideNumber property of the locale API. Similarly aria.slide is used as the aria-roledescription of the item. Inactive slides are hidden from the readers with aria-hidden . Next and Previous navigators are button elements with aria-label attributes referring to the aria.nextPageLabel and aria.firstPageLabel properties of the locale API by default respectively, you may still use your own aria roles and attributes as any valid attribute is passed to the button elements implicitly by using nextButtonProps and prevButtonProps . Quick navigation elements are button elements with an aria-label attribute referring to the aria.pageLabel of the locale API. Current page is marked with aria-current . Next/Prev Keyboard Support Key Function tab Moves focus through interactive elements in the carousel. enter Activates navigation. space Activates navigation. Quick Navigation Keyboard Support Key Function tab Moves focus through the active slide link. enter Activates the focused slide link. space Activates the focused slide link. right arrow Moves focus to the next slide link. left arrow Moves focus to the previous slide link. home Moves focus to the first slide link. end Moves focus to the last slide link.

## Alignment

Use align to control snap alignment and slidesPerPage to show partial slides.

```typescript
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ChevronLeft } from '@primeicons/angular/chevron-left';
import { ChevronRight } from '@primeicons/angular/chevron-right';

@Component({
    template: `
        <div class="mt-8 mb-16">
            <p-carousel class="max-w-xl mx-auto" align="start" [slidesPerPage]="1.5">
                <p-carousel-content style="height: 240px">
                    @for (item of items; track item) {
                        <p-carousel-item>
                            <div class="h-full text-5xl font-semibold bg-surface-50 dark:bg-surface-950 text-surface-950 dark:text-surface-0 flex flex-col items-center justify-center gap-6 rounded-xl border border-surface">
                                <span>{{ item }}</span>
                            </div>
                        </p-carousel-item>
                    }
                </p-carousel-content>
                <div class="flex mt-4 gap-4">
                    <p-carousel-indicators></p-carousel-indicators>
                    <div class="flex items-center justify-end gap-2 flex-1">
                        <button
                            pCarouselPrev
                            class="w-9 h-9 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                        >
                            <svg data-p-icon="chevron-left" class="text-lg"></svg>
                        </button>
                        <button
                            pCarouselNext
                            class="w-9 h-9 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                        >
                            <svg data-p-icon="chevron-right" class="text-lg"></svg>
                        </button>
                    </div>
                </div>
            </p-carousel>
        </div>
    `,
    standalone: true,
    imports: [CarouselModule, ChevronLeft, ChevronRight]
})
export class CarouselAlignmentDemo {
    items: any[] = [1, 2, 3, 4, 5];
}
```

## Basic

Composition-based carousel using native scroll-snap with sub-components for root, content, items, navigation, and indicators.

```typescript
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ChevronLeft } from '@primeicons/angular/chevron-left';
import { ChevronRight } from '@primeicons/angular/chevron-right';

@Component({
    template: `
        <div class="mt-8 mb-16">
            <p-carousel class="max-w-xl mx-auto" align="center">
                <p-carousel-content style="height: 240px">
                    @for (item of items; track item) {
                        <p-carousel-item>
                            <div class="h-full text-5xl font-semibold bg-surface-50 dark:bg-surface-950 text-surface-950 dark:text-surface-0 flex flex-col items-center justify-center gap-6 rounded-xl border border-surface">
                                <span>{{ item }}</span>
                            </div>
                        </p-carousel-item>
                    }
                </p-carousel-content>
                <div class="flex mt-4 gap-4">
                    <p-carousel-indicators></p-carousel-indicators>
                    <div class="flex items-center justify-end gap-2 flex-1">
                        <button
                            pCarouselPrev
                            class="w-9 h-9 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                        >
                            <svg data-p-icon="chevron-left" class="text-lg"></svg>
                        </button>
                        <button
                            pCarouselNext
                            class="w-9 h-9 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                        >
                            <svg data-p-icon="chevron-right" class="text-lg"></svg>
                        </button>
                    </div>
                </div>
            </p-carousel>
        </div>
    `,
    standalone: true,
    imports: [CarouselModule, ChevronLeft, ChevronRight]
})
export class CarouselBasicDemo {
    items: any[] = [1, 2, 3, 4, 5];
}
```

## Gallery

Two carousels synchronized via slide input to create a gallery with thumbnail navigation.

```typescript
import { Component, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
    template: `
        <div class="mt-8 mb-16">
            <div class="max-w-2xl mx-auto">
                <p-carousel align="center" [slide]="selectedImage()" (onSlideChange)="onSlideChange($event)">
                    <p-carousel-content style="height: 396px">
                        @for (image of images; track image; let i = $index) {
                            <p-carousel-item class="basis-full!">
                                <img [attr.draggable]="false" [src]="image" [alt]="'Image ' + (i + 1)" class="h-full w-full object-cover select-none" />
                            </p-carousel-item>
                        }
                    </p-carousel-content>
                </p-carousel>
                <p-carousel class="mt-3" [spacing]="8" align="center" [slide]="selectedImage()">
                    <p-carousel-content style="height: 90px">
                        @for (image of images; track image; let i = $index) {
                            <p-carousel-item class="cursor-pointer basis-1/4! transition-opacity" [class.opacity-60]="selectedImage() !== i" [class.hover:opacity-40]="selectedImage() !== i" (click)="selectImage(i)">
                                <img [attr.draggable]="false" [src]="image" [alt]="'Image ' + (i + 1)" class="h-full w-full object-cover select-none" />
                            </p-carousel-item>
                        }
                    </p-carousel-content>
                </p-carousel>
            </div>
        </div>
    `,
    standalone: true,
    imports: [CarouselModule]
})
export class CarouselGalleryDemo {
    images: any = images;
    selectedImage = signal(0);

    selectImage(index: number) {
        this.selectedImage.set(index);
    }

    onSlideChange(event: { value: number }) {
        this.selectedImage.set(event.value);
    }
}
```

## Loop

Enable continuous looping with the loop property. Use slidesPerPage to show partial slides.

```typescript
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ChevronLeft } from '@primeicons/angular/chevron-left';
import { ChevronRight } from '@primeicons/angular/chevron-right';

@Component({
    template: `
        <div class="mt-8 mb-16">
            <p-carousel class="max-w-xl mx-auto" align="center" [loop]="true" [slidesPerPage]="1.75">
                <p-carousel-content style="height: 240px">
                    @for (item of items; track item) {
                        <p-carousel-item>
                            <div class="h-full text-5xl font-semibold bg-surface-50 dark:bg-surface-950 text-surface-950 dark:text-surface-0 flex flex-col items-center justify-center gap-6 rounded-xl border border-surface">
                                <span>{{ item }}</span>
                            </div>
                        </p-carousel-item>
                    }
                </p-carousel-content>
                <div class="flex mt-4 gap-4">
                    <p-carousel-indicators></p-carousel-indicators>
                    <div class="flex items-center justify-end gap-2 flex-1">
                        <button
                            pCarouselPrev
                            class="w-9 h-9 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                        >
                            <svg data-p-icon="chevron-left" class="text-lg"></svg>
                        </button>
                        <button
                            pCarouselNext
                            class="w-9 h-9 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                        >
                            <svg data-p-icon="chevron-right" class="text-lg"></svg>
                        </button>
                    </div>
                </div>
            </p-carousel>
        </div>
    `,
    standalone: true,
    imports: [CarouselModule, ChevronLeft, ChevronRight]
})
export class CarouselLoopDemo {
    items: any[] = [1, 2, 3, 4, 5];
}
```

## Orientation

Set orientation to vertical for a vertical carousel layout.

```typescript
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ChevronUp } from '@primeicons/angular/chevron-up';
import { ChevronDown } from '@primeicons/angular/chevron-down';

@Component({
    template: `
        <div class="mt-8 mb-16">
            <p-carousel class="max-w-sm mx-auto flex flex-col gap-8 items-center" orientation="vertical" [slidesPerPage]="1.3">
                <button
                    pCarouselPrev
                    class="w-10 h-10 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                >
                    <svg data-p-icon="chevron-up" class="text-lg"></svg>
                </button>
                <p-carousel-content style="height: 240px; width: 100%">
                    @for (item of items; track item) {
                        <p-carousel-item>
                            <div class="h-full text-5xl font-semibold bg-surface-50 dark:bg-surface-950 text-surface-950 dark:text-surface-0 flex flex-col items-center justify-center gap-6 rounded-xl border border-surface">
                                <span>{{ item }}</span>
                            </div>
                        </p-carousel-item>
                    }
                </p-carousel-content>
                <button
                    pCarouselNext
                    class="w-10 h-10 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                >
                    <svg data-p-icon="chevron-down" class="text-lg"></svg>
                </button>
            </p-carousel>
        </div>
    `,
    standalone: true,
    imports: [CarouselModule, ChevronUp, ChevronDown]
})
export class CarouselOrientationDemo {
    items: any[] = [1, 2, 3, 4, 5];
}
```

## Variable Size

Enable autoSize to allow items with variable widths.

```typescript
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ChevronLeft } from '@primeicons/angular/chevron-left';
import { ChevronRight } from '@primeicons/angular/chevron-right';

@Component({
    template: `
        <div class="mt-8 mb-16">
            <p-carousel class="max-w-xl mx-auto" align="center" [autoSize]="true">
                <p-carousel-content class="h-35">
                    @for (item of items; track item.width; let i = $index) {
                        <p-carousel-item [style.width]="item.width">
                            <div class="h-full text-4xl font-semibold bg-surface-50 dark:bg-surface-950 text-surface-950 dark:text-surface-0 flex flex-col items-center justify-center gap-6 rounded-lg border border-surface">
                                <span>{{ i + 1 }}</span>
                            </div>
                        </p-carousel-item>
                    }
                </p-carousel-content>
                <div class="flex mt-4 gap-4">
                    <p-carousel-indicators></p-carousel-indicators>
                    <div class="flex items-center justify-end gap-2 flex-1">
                        <button
                            pCarouselPrev
                            class="w-9 h-9 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                        >
                            <svg data-p-icon="chevron-left" class="text-lg"></svg>
                        </button>
                        <button
                            pCarouselNext
                            class="w-9 h-9 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                        >
                            <svg data-p-icon="chevron-right" class="text-lg"></svg>
                        </button>
                    </div>
                </div>
            </p-carousel>
        </div>
    `,
    standalone: true,
    imports: [CarouselModule, ChevronLeft, ChevronRight]
})
export class CarouselVariableSizeDemo {
    items: any[] = [{ width: '120px' }, { width: '80px' }, { width: '200px' }, { width: '160px' }, { width: '220px' }, { width: '180px' }, { width: '280px' }, { width: '100px' }];
}
```

## Carousel

Carousel is a content slider featuring various customization options.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | Object | undefined | Defines scoped design tokens of the component. |
| unstyled | boolean | undefined | Indicates whether the component should be rendered without styles. |
| pt | any | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | PassThroughOptions | undefined | Used to configure passthrough(pt) options of the component. |
| page | number | 0 | Index of the first item. |
| numVisible | number | 1 | Number of items per page. |
| numScroll | number | 1 | Number of items to scroll. |
| responsiveOptions | CarouselResponsiveOptions[] | - | An array of options for responsive design. |
| orientation | "horizontal" \| "vertical" | - | Specifies the layout of the component. |
| verticalViewPortHeight | string | - | Height of the viewport in vertical layout. |
| contentClass | string | - | Style class of main content. |
| indicatorsContentClass | string | - | Style class of the indicator items. |
| indicatorsContentStyle | Partial<CSSStyleDeclaration> | - | Inline style of the indicator items. |
| indicatorStyleClass | string | - | Style class of the indicators. |
| indicatorStyle | Partial<CSSStyleDeclaration> | - | Style of the indicators. |
| value | any[] | null | An array of objects to display. |
| circular | boolean | - | Defines if scrolling would be infinite. |
| showIndicators | boolean | - | Whether to display indicator container. |
| showNavigators | boolean | - | Whether to display navigation buttons in container. |
| autoplayInterval | number | - | Time in milliseconds to scroll items automatically. |
| prevButtonProps | ButtonProps | - | Used to pass all properties of the ButtonProps to the Button component. |
| nextButtonProps | ButtonProps | - | Used to pass all properties of the ButtonProps to the Button component. |
| align | "center" \| "start" \| "end" | 'start' | Alignment of the carousel items (composition mode). |
| loop | boolean | false | Whether the carousel should loop (composition mode). |
| snapType | "mandatory" \| "proximity" | 'mandatory' | Scroll snap type applied to the track (composition mode). |
| spacing | number | 16 | Spacing between carousel items in pixels (composition mode). |
| autoSize | boolean | false | Whether the carousel should auto size items (composition mode). |
| slidesPerPage | number | 1 | How many slides are visible per page (composition mode). Supports fractions (e.g. 1.5). |
| slide | number | - | Index of the active slide (composition mode). |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onPage | event: CarouselPageEvent | Callback to invoke after scroll. |
| onPageChange | value: { value: number } | Callback fired when the carousel's page changes (composition mode). |
| onSlideChange | value: { value: number } | Callback fired when the active slide changes (composition mode). |

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

