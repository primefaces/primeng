# Angular Paginator Component

Paginator displays data in paged format and provides navigation between pages.

## Accessibility

Screen Reader Paginator is placed inside a nav element to indicate a navigation section. All of the paginator elements can be customized using templating however the default behavious is listed below. First, previous, next and last page navigators elements with aria-label attributes referring to the aria.firstPageLabel , aria.prevPageLabel , aria.nextPageLabel and aria.lastPageLabel properties of the locale API respectively. Page links are also button elements with an aria-label attribute derived from the aria.pageLabel of the locale API. Current page is marked with aria-current set to "page" as well. Current page report uses aria-live="polite" to instruct screen reader about the changes to the pagination state. Rows per page dropdown internally uses a dropdown component, refer to the dropdown documentation for accessibility details. Additionally, the dropdown uses an aria-label from the aria.rowsPerPage property of the locale API. Jump to page input is an input element with an aria-label that refers to the aria.jumpToPage property of the locale API. Keyboard Support Key Function tab Moves focus through the paginator elements. enter Executes the paginator element action. space Executes the paginator element action. Rows Per Page Dropdown Keyboard Support Refer to the dropdown documentation for more details about keyboard support.

## Basic

Paginator is used as a controlled component with first , rows and onPageChange properties to manage the first index and number of records to display per page. Total number of records need to be with totalRecords property. Default template includes a dropdown to change the rows so rowsPerPageOptions is also necessary for the dropdown options.

```html
<p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]" />
```

## currentpagereportdoc

Current page report item in the template displays information about the pagination state. Default value is ({{ '{' }}currentPage{{ '}' }} of {{ '{' }}totalPages{{ '}' }}) whereas available placeholders are the following; {{ '{' }}currentPage{{ '}' }} {{ '{' }}totalPages{{ '}' }} {{ '{' }}rows{{ '}' }} {{ '{' }}first{{ '}' }} {{ '{' }}last{{ '}' }} {{ '{' }}totalRecords{{ '}' }}

```html
<p-paginator
    (onPageChange)="onPageChange($event)"
    [first]="first"
    [rows]="rows"
    [totalRecords]="120"
    [showCurrentPageReport]="true"
    [showPageLinks]="false"
    [showJumpToPageDropdown]="false"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
    selector: 'paginator-current-page-report-demo',
    templateUrl: './paginator-current-page-report-demo.html',
    standalone: true,
    imports: [PaginatorModule]
})
export class PaginatorCurrentPageReportDemo {
    first: number = 0;

    rows: number = 10;

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
    }
}
```
</details>

## Images

Sample image gallery implementation using paginator.

```html
<p-paginator [first]="first" [rows]="1" [totalRecords]="120" (onPageChange)="onPageChange($event)" [showJumpToPageDropdown]="true" [showPageLinks]="false"></p-paginator>
        
<img [src]="'https://primefaces.org/cdn/primeng/images/demo/nature/nature' + (first + 1) + '.jpg'" class="max-w-full rounded-xl" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

@Component({
    selector: 'paginator-images-demo',
    templateUrl: './paginator-images-demo.html'
})
export class PaginatorImagesDemo {
    first: number = 0;

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Templating allows overriding the default content of the UI elements by defining callbacks using the element name.

```html
<div class="flex items-center justify-center">
    <div>
        <p-button icon="pi pi-star" outlined />
    </div>
    <div class="flex-1">
        <p-paginator (onPageChange)="onPageChange1($event)" [first]="first1" [rows]="rows1" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]" [showFirstLastIcon]="false" />
    </div>
    <div class="justify-end">
        <p-button icon="pi pi-search" />
    </div>
</div>

<div class="flex items-center justify-end">
    <span class="mx-1 text-color">Items per page: </span>
    <p-select [options]="options" optionLabel="label" optionValue="value" [(ngModel)]="rows2" (ngModelChange)="first2 = 0" />
    <p-paginator [first]="first2" [rows]="rows2" [totalRecords]="120" (onPageChange)="onPageChange2($event)" [showCurrentPageReport]="true"
        currentPageReportTemplate="{first} - {last} of {totalRecords}" [showPageLinks]="false" [showFirstLastIcon]="false" ></p-paginator>
</div>

<div class="flex items-center justify-start">
    <div class="flex justify-center items-center gap-4">
        <span>Items per page: </span>
        <p-slider [(ngModel)]="rows3" (ngModelChange)="first3 = 0" [style]="{ width: '10rem' }" [min]="10" [max]="120" [step]="30" />
    </div>
    <p-paginator (onPageChange)="onPageChange3($event)" [first]="first3" [rows]="rows3" [totalRecords]="totalRecords" [showFirstLastIcon]="false"
        [showCurrentPageReport]="true" currentPageReportTemplate="{first} - {last} of {totalRecords}" ></p-paginator>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Slider } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'paginator-template-demo',
    templateUrl: './paginator-template-demo.html',
    standalone: true,
    imports: [PaginatorModule, ButtonModule, DividerModule, Slider, FormsModule]
})
export class PaginatorTemplateDemo {
    first1: number = 0;

    rows1: number = 10;

    first2: number = 0;

    rows2: number = 10;

    first3: number = 0;

    rows3: number = 10;

    totalRecords: number = 120;

    options = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 120, value: 120 }
    ];

    onPageChange1(event: PaginatorState) {
        this.first1 = event.first ?? 0;
        this.rows1 = event.rows ?? 10;
    }

    onPageChange2(event: PaginatorState) {
        this.first2 = event.first ?? 0;
        this.rows2 = event.rows ?? 10;
    }

    onPageChange3(event: PaginatorState) {
        this.first3 = event.first ?? 0;
        this.rows3 = event.rows ?? 10;
    }
}
```
</details>

## Paginator

Paginator is a generic component to display content in paged format.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<PaginatorPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| pageLinkSize | number | 5 | Number of page links to display. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| alwaysShow | boolean | true | Whether to show it even there is only one page. |
| dropdownAppendTo | any | - | Target element to attach the dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). **(Deprecated)** |
| templateLeft | TemplateRef<PaginatorTemplateContext> | - | Template instance to inject into the left side of the paginator. |
| templateRight | TemplateRef<PaginatorTemplateContext> | - | Template instance to inject into the right side of the paginator. |
| dropdownScrollHeight | string | 200px | Dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value. |
| currentPageReportTemplate | string | {currentPage} of {totalPages} | Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords} |
| showCurrentPageReport | boolean | false | Whether to display current page report. |
| showFirstLastIcon | boolean | true | When enabled, icons are displayed on paginator to go first and last page. |
| totalRecords | number | 0 | Number of total records. |
| rows | number | 0 | Data count to display per page. |
| rowsPerPageOptions | any[] | - | Array of integer/object values to display inside rows per page dropdown. A object that have 'showAll' key can be added to it to show all data. Exp; [10,20,30,{showAll:'All'}] |
| showJumpToPageDropdown | boolean | false | Whether to display a dropdown to navigate to any page. |
| showJumpToPageInput | boolean | false | Whether to display a input to navigate to any page. |
| jumpToPageItemTemplate | TemplateRef<PaginatorDropdownItemTemplateContext> | - | Template instance to inject into the jump to page dropdown item inside in the paginator. |
| showPageLinks | boolean | true | Whether to show page links. |
| locale | string | - | Locale to be used in formatting. |
| dropdownItemTemplate | TemplateRef<PaginatorDropdownItemTemplateContext> | - | Template instance to inject into the rows per page dropdown item inside in the paginator. |
| first | number | - | Zero-relative number of the first row to be displayed. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onPageChange | value: PaginatorState | Callback to invoke when page changes, the event object contains information about the new state. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| dropdownicon | TemplateRef<void> | Template for the dropdown icon. |
| firstpagelinkicon | TemplateRef<void> | Template for the first page link icon. |
| previouspagelinkicon | TemplateRef<void> | Template for the previous page link icon. |
| lastpagelinkicon | TemplateRef<void> | Template for the last page link icon. |
| nextpagelinkicon | TemplateRef<void> | Template for the next page link icon. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| contentStart | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content start's DOM element. |
| current | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the current page report's DOM element. |
| first | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the first page button's DOM element. |
| firstIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the first page button icon's DOM element. |
| prev | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the previous page button's DOM element. |
| prevIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the previous page button icon's DOM element. |
| pages | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the pages container's DOM element. |
| page | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the page button's DOM element. |
| next | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the next page button's DOM element. |
| nextIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the next page button icon's DOM element. |
| last | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the last page button's DOM element. |
| lastIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the last page button icon's DOM element. |
| contentEnd | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content end's DOM element. |
| pcJumpToPageDropdown | SelectPassThrough | Used to pass attributes to the Select component (jump to page dropdown). |
| pcJumpToPageInput | InputNumberPassThrough | Used to pass attributes to the InputNumber component (jump to page input). |
| pcRowPerPageDropdown | SelectPassThrough | Used to pass attributes to the Select component (rows per page dropdown). |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-paginator | Class name of the paginator element |
| p-paginator-content-start | Class name of the content start element |
| p-paginator-content-end | Class name of the content end element |
| p-paginator-first | Class name of the first element |
| p-paginator-first-icon | Class name of the first icon element |
| p-paginator-prev | Class name of the prev element |
| p-paginator-prev-icon | Class name of the prev icon element |
| p-paginator-next | Class name of the next element |
| p-paginator-next-icon | Class name of the next icon element |
| p-paginator-last | Class name of the last element |
| p-paginator-last-icon | Class name of the last icon element |
| p-paginator-pages | Class name of the pages element |
| p-paginator-page | Class name of the page element |
| p-paginator-current | Class name of the current element |
| p-paginator-rpp-dropdown | Class name of the row per page dropdown element |
| p-paginator-jtp-dropdown | Class name of the jump to page dropdown element |
| p-paginator-jtp-input | Class name of the jump to page input element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| paginator.padding | --p-paginator-padding | Padding of root |
| paginator.gap | --p-paginator-gap | Gap of root |
| paginator.border.radius | --p-paginator-border-radius | Border radius of root |
| paginator.background | --p-paginator-background | Background of root |
| paginator.color | --p-paginator-color | Color of root |
| paginator.transition.duration | --p-paginator-transition-duration | Transition duration of root |
| paginator.nav.button.background | --p-paginator-nav-button-background | Background of nav button |
| paginator.nav.button.hover.background | --p-paginator-nav-button-hover-background | Hover background of nav button |
| paginator.nav.button.selected.background | --p-paginator-nav-button-selected-background | Selected background of nav button |
| paginator.nav.button.color | --p-paginator-nav-button-color | Color of nav button |
| paginator.nav.button.hover.color | --p-paginator-nav-button-hover-color | Hover color of nav button |
| paginator.nav.button.selected.color | --p-paginator-nav-button-selected-color | Selected color of nav button |
| paginator.nav.button.width | --p-paginator-nav-button-width | Width of nav button |
| paginator.nav.button.height | --p-paginator-nav-button-height | Height of nav button |
| paginator.nav.button.border.radius | --p-paginator-nav-button-border-radius | Border radius of nav button |
| paginator.nav.button.focus.ring.width | --p-paginator-nav-button-focus-ring-width | Focus ring width of nav button |
| paginator.nav.button.focus.ring.style | --p-paginator-nav-button-focus-ring-style | Focus ring style of nav button |
| paginator.nav.button.focus.ring.color | --p-paginator-nav-button-focus-ring-color | Focus ring color of nav button |
| paginator.nav.button.focus.ring.offset | --p-paginator-nav-button-focus-ring-offset | Focus ring offset of nav button |
| paginator.nav.button.focus.ring.shadow | --p-paginator-nav-button-focus-ring-shadow | Focus ring shadow of nav button |
| paginator.current.page.report.color | --p-paginator-current-page-report-color | Color of current page report |
| paginator.jump.to.page.input.max.width | --p-paginator-jump-to-page-input-max-width | Max width of jump to page input |

