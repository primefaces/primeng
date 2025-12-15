# Angular Listbox Component

Listbox is used to select one or more values from a list of items.

## Accessibility

Screen Reader Value to describe the component can be provided ariaLabelledBy or ariaLabel props. The list element has a listbox role with the aria-multiselectable attribute that sets to true when multiple selection is enabled. Each list item has an option role with aria-selected and aria-disabled as their attributes.

```html
<span id="lb">Options</span>
<p-listbox ariaLabelledBy="lb"/>

<p-listbox ariaLabel="City"/>
```

## Basic

Listbox is used as a controlled component with ngModel property along with an options collection. Label and value of an option are defined with the optionLabel and optionValue properties respectively. Default property name for the optionLabel is label and value for the optionValue . If optionValue is omitted and the object has no value property, the object itself becomes the value of an option. Note that, when options are simple primitive values such as a string array, no optionLabel and optionValue would be necessary.

```html
<p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" class="w-full md:w-56" />
```

## Checkbox

Listbox allows item selection using checkboxes.

```html
<p-listbox [(ngModel)]="selectedCity" [options]="cities" [multiple]="true" [checkbox]="true" optionLabel="name" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-checkbox-demo',
    templateUrl: './listbox-checkbox-demo.html',
    standalone: true,
    imports: [FormsModule, ListboxModule]
})
export class ListboxCheckboxDemo implements OnInit {
    cities!: City[];

    selectedCity!: City;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
```
</details>

## Checkmark

An alternative way to highlight the selected option is displaying a checkmark instead.

```html
<p-listbox [(ngModel)]="selectedCity" [options]="cities" optionLabel="name" [checkmark]="true" [highlightOnSelect]="false" class="w-full md:w-56"/>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-checkmark-demo',
    templateUrl: './listbox-checkmark-demo.html',
    standalone: true,
    imports: [FormsModule, ListboxModule]
})
export class ListboxCheckmarkDemo implements OnInit {
    cities!: City[];

    selectedCity!: City;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
```
</details>

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [disabled]="true" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-disabled-demo',
    templateUrl: './listbox-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, Listbox]
})
export class ListboxDisabledDemo implements OnInit {
    cities!: City[];

    selectedCity!: City;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
```
</details>

## dragdropdoc

Items can be reordered using drag and drop by enabling dragdrop property. Depends on &#64;angular/cdk package.

```html
<p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [dragdrop]="true" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

@Component({
    selector: 'listbox-dragdrop-demo',
    templateUrl: './listbox-dragdrop-demo.html',
    standalone: true,
    imports: [FormsModule, Listbox]
})
export class ListboxDragDropDemo implements OnInit {
    cities!: any[];
    selectedCity!: any;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
```
</details>

## Filter

ListBox provides built-in filtering that is enabled by adding the filter property.

```html
<p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [filter]="true" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-filter-demo',
    templateUrl: './listbox-filter-demo.html',
    standalone: true,
    imports: [FormsModule, Listbox]
})
export class ListboxFilterDemo implements OnInit {
    cities!: City[];

    selectedCity!: City;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
```
</details>

## Group

Options can be grouped when a nested data structures is provided.

```html
<p-listbox [options]="groupedCities" [group]="true" [(ngModel)]="selectedCountry" class="w-full md:w-56">
    <ng-template let-group #group>
        <div class="flex items-center">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'mr-2 flag flag-' + group.value" style="width: 20px" />
            <span>{{ group.label }}</span>
        </div>
    </ng-template>
</p-listbox>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

interface Country {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-group-demo',
    templateUrl: './listbox-group-demo.html',
    standalone: true,
    imports: [FormsModule, ListboxModule]
})
export class ListboxGroupDemo {
    groupedCities!: SelectItemGroup[];

    selectedCountry!: Country;

    constructor() {
        this.groupedCities = [
            {
                label: 'Germany',
                value: 'de',
                items: [
                    { label: 'Berlin', value: 'Berlin' },
                    { label: 'Frankfurt', value: 'Frankfurt' },
                    { label: 'Hamburg', value: 'Hamburg' },
                    { label: 'Munich', value: 'Munich' }
                ]
            },
            {
                label: 'USA',
                value: 'us',
                items: [
                    { label: 'Chicago', value: 'Chicago' },
                    { label: 'Los Angeles', value: 'Los Angeles' },
                    { label: 'New York', value: 'New York' },
                    { label: 'San Francisco', value: 'San Francisco' }
                ]
            },
            {
                label: 'Japan',
                value: 'jp',
                items: [
                    { label: 'Kyoto', value: 'Kyoto' },
                    { label: 'Osaka', value: 'Osaka' },
                    { label: 'Tokyo', value: 'Tokyo' },
                    { label: 'Yokohama', value: 'Yokohama' }
                ]
            }
        ];
    }
}
```
</details>

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" class="w-full md:w-56" [invalid]="selectedCity === undefined" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, ngOnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-invalid-demo',
    templateUrl: './listbox-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, Listbox]
})
export class ListboxInvalidDemo implements OnInit {
    cities!: City[];

    selectedCity!: City;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
```
</details>

## Multiple

ListBox allows choosing a single item by default, enable multiple property to choose more than one. When the optional metaKeySelection is present, behavior is changed in a way that selecting a new item requires meta key to be present.

```html
<p-listbox [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" [multiple]="true" [metaKeySelection]="false" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-multiple-demo',
    templateUrl: './listbox-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, Listbox]
})
export class ListboxMultipleDemo implements OnInit {
    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
```
</details>

## reactiveformsdoc

Listbox can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 sm:w-56">
    <div class="flex flex-col gap-1">
        <p-listbox [options]="cities" formControlName="selectedCity" optionLabel="name" class="w-full md:w-56" [invalid]="isInvalid('selectedCity')" />
        @if (isInvalid('selectedCity')) {
            <p-message severity="error" size="small" variant="simple">City is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-reactive-forms-demo',
    templateUrl: './listbox-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, ListboxModule, ToastModule, MessageService, ButtonModule]
})
export class ListboxReactiveFormsDemo implements OnInit {
    messageService = inject(MessageService);

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    cities!: City[];

    constructor(private fb: FormBuilder) {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.exampleForm = this.fb.group({
            selectedCity: ['', Validators.required]
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            this.exampleForm.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.exampleForm.get(controlName);
        return control?.invalid && this.formSubmitted;
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

For custom content support define a template named item where the default local template variable refers to an option.

```html
<p-listbox [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" class="w-full md:w-56">
    <ng-template #item let-country>
        <div class="flex items-center gap-2">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
            <div>{{ country.name }}</div>
        </div>
    </ng-template>
</p-listbox>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

interface Country {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-template-demo',
    templateUrl: './listbox-template-demo.html',
    standalone: true,
    imports: [FormsModule, ListboxModule]
})
export class ListboxTemplateDemo implements OnInit {
    countries!: Country[];

    selectedCountry!: Country;

    ngOnInit() {
        this.countries = [
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];
    }
}
```
</details>

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 md:w-56">
    <div class="flex flex-col gap-1">
        <p-listbox #city="ngModel" [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" class="w-full md:w-56" [invalid]="city.invalid && exampleForm.submitted" name="city" required />
        @if (city.invalid && exampleForm.submitted) {
            <p-message severity="error" size="small" variant="simple">City is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'autocomplete-template-driven-forms-demo',
    templateUrl: './autocomplete-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, MessageModule, ToastModule, ButtonModule, ListboxModule]
})
export class TemplateDrivenFormsDemo {
    messageService = inject(MessageService);

    selectedCity!: City;

    cities!: City[];

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}
```
</details>

## Virtual Scroll

VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance issues. Usage is simple as setting virtualScroll property to true and defining virtualScrollItemSize to specify the height of an item.

```html
<p-listbox [options]="items" [(ngModel)]="selectedItems" [checkbox]="true" [filter]="true" [selectAll]="selectAll" optionLabel="label" [virtualScroll]="true" [virtualScrollItemSize]="40" [multiple]="true" [metaKeySelection]="false" (onSelectAllChange)="onSelectAllChange($event)" (onChange)="onChange($event)" scrollHeight="250px" [striped]="true" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

@Component({
    selector: 'listbox-virtual-scroll-demo',
    templateUrl: './listbox-virtual-scroll-demo.html',
    standalone: true,
    imports: [FormsModule, Listbox]
})
export class ListboxVirtualScrollDemo {
    items = Array.from({ length: 100000 }, (_, i) => ({ label: \`Item #\${i}\`, value: i }))

    selectedItems!: any[];

    selectAll = false;

    onSelectAllChange(event) {
        this.selectedItems = event.checked ? [...this.items] : [];
        this.selectAll = event.checked;
        event.updateModel(this.selectedItems, event.originalEvent)
    }

    onChange(event) {
        const { originalEvent, value } = event
        if(value) this.selectAll = value.length === this.items.length;
    }

}
```
</details>

## Listbox

ListBox is used to select one or more values from a list of items.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ListBoxPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| id | string | - | Unique identifier of the component. |
| searchMessage | string | '{0} results are available' | Text to display when the search is active. Defaults to global value in i18n translation configuration. |
| emptySelectionMessage | string | 'No selected item' | Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration. |
| selectionMessage | string | '{0} items selected' | Text to be displayed in hidden accessible field when options are selected. Defaults to global value in i18n translation configuration. |
| autoOptionFocus | boolean | true | Whether to focus on the first visible or selected element when the overlay panel is shown. |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| selectOnFocus | boolean | false | When enabled, the focused option is selected. |
| searchLocale | boolean | false | Locale to use in searching. The default locale is the host environment's current locale. |
| focusOnHover | boolean | true | When enabled, the hovered option will be focused. |
| filterMessage | string | - | Text to display when filtering. |
| filterFields | any[] | - | Fields used when filtering the options, defaults to optionLabel. |
| lazy | boolean | false | Defines if data is loaded and interacted with in lazy manner. |
| virtualScroll | boolean | false | Whether the data should be loaded on demand during scroll. |
| virtualScrollItemSize | number | - | Height of an item in the list for VirtualScrolling. |
| virtualScrollOptions | ScrollerOptions | - | Whether to use the scroller feature. The properties of scroller component can be used like an object in it. |
| scrollHeight | string | 14rem | Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| multiple | boolean | false | When specified, allows selecting multiple values. |
| styleClass | string | - | Style class of the container. **(Deprecated)** |
| listStyle | { [klass: string]: any } | - | Inline style of the list element. |
| listStyleClass | string | - | Style class of the list element. |
| readonly | boolean | false | When present, it specifies that the element value cannot be changed. |
| checkbox | boolean | false | When specified, allows selecting items with checkboxes. |
| filter | boolean | false | When specified, displays a filter input at header. |
| filterBy | string | - | When filtering is enabled, filterBy decides which field or fields (comma separated) to search against. |
| filterMatchMode | string | contains | Defines how the items are filtered. |
| filterLocale | string | - | Locale to use in filtering. The default locale is the host environment's current locale. |
| metaKeySelection | boolean | false | Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically. |
| dataKey | string | - | A property to uniquely identify a value in options. |
| showToggleAll | boolean | true | Whether header checkbox is shown in multiple mode. |
| optionLabel | string | - | Name of the label field of an option. |
| optionValue | string | - | Name of the value field of an option. |
| optionGroupChildren | string | items | Name of the options field of an option group. |
| optionGroupLabel | string | label | Name of the label field of an option group. |
| optionDisabled | string \| ((item: any) => boolean) | - | Name of the disabled field of an option or function to determine disabled state. |
| ariaFilterLabel | string | - | Defines a string that labels the filter input. |
| filterPlaceHolder | string | - | Defines placeholder of the filter input. |
| emptyFilterMessage | string | - | Text to display when filtering does not return any results. |
| emptyMessage | string | - | Text to display when there is no data. Defaults to global value in i18n translation configuration. |
| group | boolean | false | Whether to display options as grouped when nested options are provided. |
| options | any[] | - | An array of selectitems to display as the available options. |
| filterValue | string | - | When specified, filter displays with this value. |
| selectAll | boolean | - | Whether all data is selected. |
| striped | boolean | false | Whether to displays rows with alternating colors. |
| highlightOnSelect | boolean | true | Whether the selected option will be add highlight class. |
| checkmark | boolean | false | Whether the selected option will be shown with a check mark. |
| dragdrop | boolean | false | Whether to enable dragdrop based reordering. |
| dropListData | any[] | - | Array to use for CDK drop list data binding. When not provided, uses options array. |
| fluid | InputSignalWithTransform<boolean, unknown> | undefined | Spans 100% width of the container when enabled. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | event: ListboxChangeEvent | Callback to invoke on value change. |
| onClick | event: ListboxClickEvent | Callback to invoke when option is clicked. |
| onDblClick | event: ListboxDoubleClickEvent | Callback to invoke when option is double clicked. |
| onFilter | event: ListboxFilterEvent | Callback to invoke when data is filtered. |
| onFocus | event: FocusEvent | Callback to invoke when component receives focus. |
| onBlur | event: FocusEvent | Callback to invoke when component loses focus. |
| onSelectAllChange | event: ListboxSelectAllChangeEvent | Callback to invoke when all data is selected. |
| onLazyLoad | event: ScrollerLazyLoadEvent | Emits on lazy load. |
| onDrop | value: CdkDragDrop<string[], string[], any | Emits on item is dropped. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| item | TemplateRef<ListboxItemTemplateContext<any>> | Custom item template. |
| group | TemplateRef<ListboxGroupTemplateContext<any>> | Custom group template. |
| header | TemplateRef<ListboxHeaderTemplateContext<any>> | Custom header template. |
| filter | TemplateRef<ListboxFilterTemplateContext> | Custom filter template. |
| footer | TemplateRef<ListboxFooterTemplateContext<any>> | Custom footer template. |
| emptyfilter | TemplateRef<void> | Custom empty filter message template. |
| empty | TemplateRef<void> | Custom empty message template. |
| filtericon | TemplateRef<void> | Custom filter icon template. |
| checkicon | TemplateRef<ListboxCheckIconTemplateContext> | Custom check icon template. |
| checkmark | TemplateRef<ListboxCheckmarkTemplateContext> | Custom checkmark icon template. |
| loader | TemplateRef<ListboxLoaderTemplateContext> | Custom loader template. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| updateModel | value: any, event: any | void | Updates the model value. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| pcCheckbox | any | Used to pass attributes to the Checkbox component. |
| pcFilterContainer | any | Used to pass attributes to the IconField component. |
| pcFilter | any | Used to pass attributes to the filter input's DOM element. |
| pcFilterIconContainer | any | Used to pass attributes to the InputIcon component. |
| filterIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the filter icon's DOM element. |
| hiddenFilterResult | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hidden filter result's DOM element. |
| listContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the list container's DOM element. |
| virtualScroller | any | Used to pass attributes to the VirtualScroller component. |
| list | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the list's DOM element. |
| optionGroup | PassThroughOption<HTMLLIElement, I, ListBoxContext> | Used to pass attributes to the option group's DOM element. |
| option | PassThroughOption<HTMLLIElement, I, ListBoxContext> | Used to pass attributes to the option's DOM element. |
| optionCheckIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the option check icon's DOM element. |
| optionBlankIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the option blank icon's DOM element. |
| emptyMessage | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the empty message's DOM element. |
| hiddenEmptyMessage | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hidden empty message's DOM element. |
| hiddenSelectedMessage | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hidden selected message's DOM element. |
| hiddenFirstFocusableEl | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the first hidden focusable element. |
| hiddenLastFocusableEl | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the last hidden focusable element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-listbox | Class name of the root element |
| p-listbox-header | Class name of the header element |
| p-listbox-filter | Class name of the filter element |
| p-listbox-list-container | Class name of the list container element |
| p-listbox-list | Class name of the list element |
| p-listbox-option-group | Class name of the option group element |
| p-listbox-option | Class name of the option element |
| p-listbox-option-check-icon | Class name of the option check icon element |
| p-listbox-option-blank-icon | Class name of the option blank icon element |
| p-listbox-empty-message | Class name of the empty message element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| listbox.background | --p-listbox-background | Background of root |
| listbox.disabled.background | --p-listbox-disabled-background | Disabled background of root |
| listbox.border.color | --p-listbox-border-color | Border color of root |
| listbox.invalid.border.color | --p-listbox-invalid-border-color | Invalid border color of root |
| listbox.color | --p-listbox-color | Color of root |
| listbox.disabled.color | --p-listbox-disabled-color | Disabled color of root |
| listbox.shadow | --p-listbox-shadow | Shadow of root |
| listbox.border.radius | --p-listbox-border-radius | Border radius of root |
| listbox.transition.duration | --p-listbox-transition-duration | Transition duration of root |
| listbox.list.padding | --p-listbox-list-padding | Padding of list |
| listbox.list.gap | --p-listbox-list-gap | Gap of list |
| listbox.list.header.padding | --p-listbox-list-header-padding | Header padding of list |
| listbox.option.focus.background | --p-listbox-option-focus-background | Focus background of option |
| listbox.option.selected.background | --p-listbox-option-selected-background | Selected background of option |
| listbox.option.selected.focus.background | --p-listbox-option-selected-focus-background | Selected focus background of option |
| listbox.option.color | --p-listbox-option-color | Color of option |
| listbox.option.focus.color | --p-listbox-option-focus-color | Focus color of option |
| listbox.option.selected.color | --p-listbox-option-selected-color | Selected color of option |
| listbox.option.selected.focus.color | --p-listbox-option-selected-focus-color | Selected focus color of option |
| listbox.option.padding | --p-listbox-option-padding | Padding of option |
| listbox.option.border.radius | --p-listbox-option-border-radius | Border radius of option |
| listbox.option.striped.background | --p-listbox-option-striped-background | Striped background of option |
| listbox.option.group.background | --p-listbox-option-group-background | Background of option group |
| listbox.option.group.color | --p-listbox-option-group-color | Color of option group |
| listbox.option.group.font.weight | --p-listbox-option-group-font-weight | Font weight of option group |
| listbox.option.group.padding | --p-listbox-option-group-padding | Padding of option group |
| listbox.checkmark.color | --p-listbox-checkmark-color | Color of checkmark |
| listbox.checkmark.gutter.start | --p-listbox-checkmark-gutter-start | Gutter start of checkmark |
| listbox.checkmark.gutter.end | --p-listbox-checkmark-gutter-end | Gutter end of checkmark |
| listbox.empty.message.padding | --p-listbox-empty-message-padding | Padding of empty message |

