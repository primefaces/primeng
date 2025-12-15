# Angular MultiSelect Component

MultiSelect is used to select multiple items from a collection.

## Accessibility

Screen Reader Value to describe the component can either be provided with ariaLabelledBy or ariaLabel props. The multiselect component has a combobox role in addition to aria-haspopup and aria-expanded attributes. The relation between the combobox and the popup is created with aria-controls attribute that refers to the id of the popup listbox. The popup listbox uses listbox as the role with aria-multiselectable enabled. Each list item has an option role along with aria-label , aria-selected and aria-disabled attributes. Checkbox component at the header uses a hidden native checkbox element internally that is only visible to screen readers. Value to read is defined with the selectAll and unselectAll keys of the aria property from the locale API. If filtering is enabled, filterInputProps can be defined to give aria-* props to the input element. Close button uses close key of the aria property from the locale API as the aria-label by default, this can be overriden with the closeButtonProps .

```html
<span id="dd1">Options</span>
<p-multiselect ariaLabelledBy="dd1"/>

<p-multiselect ariaLabel="Options"/>
```

## Basic

MultiSelect is used as a controlled component with ngModel property along with an options collection. Label and value of an option are defined with the optionLabel and optionValue properties respectively. Default property name for the optionLabel is label and value for the optionValue . If optionValue is omitted and the object has no value property, the object itself becomes the value of an option. Note that, when options are simple primitive values such as a string array, no optionLabel and optionValue would be necessary.

```html
<p-multiselect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" />
```

## Chips

Selected values are displayed as a comma separated list by default, setting display as chip displays them as chips.

```html
<p-multiselect [options]="cities" [(ngModel)]="selectedCities" placeholder="Select Cities" optionLabel="name" display="chip" class="w-full md:w-80" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-chips-demo',
    templateUrl: './multi-select-chips-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectChipsDemo implements OnInit {
    cities!: City[];

    selectedCities!: City[];

    constructor() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
}
```
</details>

## Clear Icon

When showClear is enabled, a clear icon is displayed to clear the value.

```html
<p-multiselect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" [showClear]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-clear-icon-demo',
    templateUrl: './multi-select-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectClearIconDemo implements OnInit {

    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
}
```
</details>

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-multiselect [options]="cities" [(ngModel)]="selectedCities" [disabled]="true" optionLabel="name" class="w-full md:w-80" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-disabled-demo',
    templateUrl: './multi-select-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectDisabledDemo implements OnInit {
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

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```html
<p-multiselect [options]="cities" [(ngModel)]="selectedCities" variant="filled" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-filled-demo',
    templateUrl: './multi-select-filled-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectFilledDemo implements OnInit {

    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
}
```
</details>

## Filter

MultiSelect provides built-in filtering that is enabled by adding the filter property.

```html
<p-multiselect [options]="cities" [(ngModel)]="selectedCities" [filter]="true" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-filter-demo',
    templateUrl: './multi-select-filter-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectFilterDemo implements OnInit {
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

## Float Label

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

```html
<p-floatlabel class="w-full md:w-80">
    <p-multiselect id="over_label" [(ngModel)]="value1" [options]="cities" optionLabel="name" filter [maxSelectedLabels]="3" class="w-full" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel class="w-full md:w-80" variant="in">
    <p-multiselect id="in_label" [(ngModel)]="value2" [options]="cities" optionLabel="name" filter [maxSelectedLabels]="3" class="w-full" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel class="w-full md:w-80" variant="on">
    <p-multiselect id="on_label" [(ngModel)]="value3" [options]="cities" optionLabel="name" filter [maxSelectedLabels]="3" class="w-full" />
    <label for="on_label">On Label</label>
</p-floatlabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabel } from 'primeng/floatlabel';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-floatlabel-demo',
    templateUrl: './multi-select-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule, FloatLabel]
})
export class MultiSelectFloatlabelDemo implements OnInit {
    cities!: City[];

    value1!: City[];

    value2!: City[];

    value3!: City[];

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' },
        ];
    }
}
```
</details>

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```html
<p-multiselect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" fluid />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-fluid-demo',
    templateUrl: './multi-select-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectFluidDemo implements OnInit {

    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
}
```
</details>

## Group

Options can be grouped when a nested data structures is provided.

```html
<p-multiselect [options]="groupedCities" [group]="true" [(ngModel)]="selectedCities" placeholder="Select Cities" scrollHeight="250px" display="chip" class="w-full md:w-80">
    <ng-template let-group #group>
        <div class="flex items-center">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'mr-2 flag flag-' + group.value" style="width: 20px" />
            <span>{{ group.label }}</span>
        </div>
    </ng-template>
</p-multiselect>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-group-demo',
    templateUrl: './multi-select-group-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectGroupDemo {
    groupedCities!: SelectItemGroup[];

    selectedCities!: City[];

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

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```html
<p-iftalabel class="w-full md:w-80">
    <p-multiselect [(ngModel)]="selectedCities" inputId="ms_cities" [options]="cities" optionLabel="name" [filter]="true" [maxSelectedLabels]="3" class="w-full" />
    <label for="ms_cities">Cities</label>
</p-iftalabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { IftaLabelModule } from 'primeng/iftalabel';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-iftalabel-demo',
    templateUrl: './multi-select-iftalabel-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule, IftaLabelModule]
})
export class MultiSelectIftalabelDemo implements OnInit {
    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' },
        ];
    }
}
```
</details>

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<p-multiselect [options]="cities" [(ngModel)]="selectedCities1" [invalid]="value1" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" />
<p-multiselect [options]="cities" [(ngModel)]="selectedCities2" [invalid]="value2" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" variant="filled" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-invalid-demo',
    templateUrl: './multi-select-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectInvalidDemo {
    value1: boolean = true;

    value2: boolean = true;

    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    selectedCities1!: City[];

    selectedCities2!: City[];
}
```
</details>

## Loading State

Loading state can be used loading property.

```html
<p-multiselect [options]="cities" [(ngModel)]="selectedCities" [loading]="true" optionLabel="name" placeholder="Loading..." class="w-full md:w-80" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-loading-state-demo',
    templateUrl: './multi-select-loading-state-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectLoadingStateDemo implements OnInit {

    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
}
```
</details>

## reactiveformsdoc

MultiSelect can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex justify-center flex-col gap-4 w-full md:w-80">
    <div class="flex flex-col gap-1">
        <p-multiselect [options]="cities" formControlName="city" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" [fluid]="true" [invalid]="isInvalid('city')" />
        @if (isInvalid('city')) {
            <p-message severity="error" size="small" variant="simple">City is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import {Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-reactive-forms-demo',
    templateUrl: './multi-select-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, MultiSelectModule, Message, Button, Toast]
})
export class MultiSelectReactiveFormsDemo implements OnInit {
    messageService = inject(MessageService);

    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    exampleForm: FormGroup | undefined;

    formSubmitted = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            city: ['', Validators.required]
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            this.exampleForm.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.exampleForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
```
</details>

## Sizes

MultiSelect provides small and large sizes as alternatives to the base.

```html
<p-multiselect [(ngModel)]="value1" [options]="cities" optionLabel="name" [maxSelectedLabels]="3" class="w-full md:w-80" size="small" placeholder="Small" />
<p-multiselect [(ngModel)]="value2" [options]="cities" optionLabel="name" [maxSelectedLabels]="3" class="w-full md:w-80" placeholder="Normal" />
<p-multiselect [(ngModel)]="value3" [options]="cities" optionLabel="name" [maxSelectedLabels]="3" class="w-full md:w-80" size="large" placeholder="Large" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-sizes-demo',
    templateUrl: './multi-select-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectSizesDemo implements OnInit {

    cities!: City[];

    value1: any[];

    value2: any[];

    value3: any[];

    ngOnInit() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Available options and the selected options support customization with item and selecteditems templates respectively. In addition, header, footer and filter sections can be templated as well.

```html
<p-multiselect [options]="countries" [(ngModel)]="selectedCountries" placeholder="Select Countries" optionLabel="name" class="w-full md:w-80" display="chip">
    <ng-template let-country #item>
        <div class="flex items-center gap-2">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
            <div>{{ country.name }}</div>
        </div>
    </ng-template>
    <ng-template #dropdownicon>
        <i class="pi pi-map"></i>
    </ng-template>
    <ng-template #filtericon>
        <i class="pi pi-map-marker"></i>
    </ng-template>
    <ng-template #header>
        <div class="font-medium px-3 py-2">Available Countries</div>
    </ng-template>
    <ng-template #footer>
        <div class="p-3 flex justify-between">
            <p-button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
            <p-button label="Remove All" severity="danger" text size="small" icon="pi pi-times" />
        </div>
    </ng-template>
</p-multiselect>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';

interface Country {
    name: string;
    code: string;
}

@Component({
    selector: 'multi-select-template-demo',
    templateUrl: './multi-select-template-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule, ButtonModule]
})
export class MultiSelectTemplateDemo implements OnInit {
    countries!: Country[];

    selectedCountries!: Country[];

    constructor() {
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
<div class="card flex justify-center">
    <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 w-full md:w-80">
        <div class="flex flex-col gap-1">
            <p-multiselect
                #city="ngModel"
                [(ngModel)]="selectedCity"
                [options]="cities"
                optionLabel="name"
                name="city"
                placeholder="Select Cities"
                [maxSelectedLabels]="3"
                [invalid]="city.invalid && (city.touched || exampleForm.submitted)"
                fluid
                required
            />
            @if (city.invalid && (city.touched || exampleForm.submitted)) {
                <p-message severity="error" size="small" variant="simple">City is required.</p-message>
            }
        </div>
        <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
    </form>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { Message } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'multi-select-template-driven-forms-demo',
    templateUrl: './multi-select-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelect, Message, Toast]
})
export class TemplateDrivenFormsDemo{
    messageService = inject(MessageService);

    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    selectedCity: City | undefined;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}
```
</details>

## VirtualScroll

VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance issues. Usage is simple as setting virtualScroll property to true and defining virtualScrollItemSize to specify the height of an item.

```html
<p-multiselect [options]="items" [showToggleAll]="true" [selectAll]="selectAll" [(ngModel)]="selectedItems" optionLabel="label" [virtualScroll]="true" [virtualScrollItemSize]="43" placeholder="Select Cities" (onSelectAllChange)="onSelectAllChange($event)" [maxSelectedLabels]="3" class="w-full md:w-80" #ms>
    <ng-template #headercheckboxicon let-allSelected let-partialSelected="partialSelected">
        <i class="pi pi-check" *ngIf="allSelected"></i>
        <i class="pi pi-minus" *ngIf="partialSelected" [ngStyle]="{ color: 'var(--text-color)' }"></i>
    </ng-template>
</p-multiselect>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { MultiSelect } from 'primeng/multiselect';

@Component({
    selector: 'multi-select-virtual-scroll-demo',
    templateUrl: './multi-select-virtual-scroll-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectVirtualScrollDemo {
    @ViewChild('ms') ms: MultiSelect;

    items = Array.from({ length: 100000 }, (_, i) => ({ label: \`Item #\${i}\`, value: i }))

    selectedItems!: any[];

    selectAll: boolean = false;

    onSelectAllChange(event) {
        this.selectedItems = event.checked ? [...this.ms.visibleOptions()] : [];
        this.selectAll = event.checked;
    }

}
```
</details>

## Multi Select

MultiSelect is used to select multiple items from a collection.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<MultiSelectPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| id | string | - | Unique identifier of the component |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| styleClass | string | - | Style class of the element. **(Deprecated)** |
| panelStyle | any | - | Inline style of the overlay panel. |
| panelStyleClass | string | - | Style class of the overlay panel element. |
| inputId | string | - | Identifier of the focus input to match a label defined for the component. |
| readonly | boolean | false | When present, it specifies that the component cannot be edited. |
| group | boolean | false | Whether to display options as grouped when nested options are provided. |
| filter | boolean | true | When specified, displays an input field to filter the items on keyup. |
| filterPlaceHolder | string | - | Defines placeholder of the filter input. |
| filterLocale | string | - | Locale to use in filtering. The default locale is the host environment's current locale. |
| overlayVisible | boolean | false | Specifies the visibility of the options panel. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| dataKey | string | - | A property to uniquely identify a value in options. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| displaySelectedLabel | boolean | - | Whether to show labels of selected item labels or use default label. |
| maxSelectedLabels | number | - | Decides how many selected item labels to show at most. |
| selectionLimit | number | - | Maximum number of selectable items. |
| selectedItemsLabel | string | - | Label to display after exceeding max selected labels e.g. ({0} items selected), defaults "ellipsis" keyword to indicate a text-overflow. |
| showToggleAll | boolean | true | Whether to show the checkbox at header to toggle all items at once. |
| emptyFilterMessage | string | - | Text to display when filtering does not return any results. |
| emptyMessage | string | - | Text to display when there is no data. Defaults to global value in i18n translation configuration. |
| resetFilterOnHide | boolean | false | Clears the filter value when hiding the dropdown. |
| dropdownIcon | string | - | Icon class of the dropdown icon. |
| chipIcon | string | - | Icon class of the chip icon. |
| optionLabel | string | - | Name of the label field of an option. |
| optionValue | string | - | Name of the value field of an option. |
| optionDisabled | string | - | Name of the disabled field of an option. |
| optionGroupLabel | string | label | Name of the label field of an option group. |
| optionGroupChildren | string | items | Name of the options field of an option group. |
| showHeader | boolean | true | Whether to show the header. |
| filterBy | string | - | When filtering is enabled, filterBy decides which field or fields (comma separated) to search against. |
| scrollHeight | string | 200px | Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value. |
| lazy | boolean | false | Defines if data is loaded and interacted with in lazy manner. |
| virtualScroll | boolean | false | Whether the data should be loaded on demand during scroll. |
| loading | boolean | false | Whether the multiselect is in loading state. |
| virtualScrollItemSize | number | - | Height of an item in the list for VirtualScrolling. |
| loadingIcon | string | - | Icon to display in loading state. |
| virtualScrollOptions | ScrollerOptions | - | Whether to use the scroller feature. The properties of scroller component can be used like an object in it. |
| overlayOptions | OverlayOptions | - | Whether to use overlay API feature. The properties of overlay API can be used like an object in it. |
| ariaFilterLabel | string | - | Defines a string that labels the filter input. |
| filterMatchMode | "startsWith" \| "contains" \| "endsWith" \| "equals" \| "notEquals" \| "in" \| "lt" \| "lte" \| "gt" \| "gte" | contains | Defines how the items are filtered. |
| tooltip | string | - | Advisory information to display in a tooltip on hover. |
| tooltipPosition | "right" \| "left" \| "top" \| "bottom" | right | Position of the tooltip. |
| tooltipPositionStyle | string | absolute | Type of CSS position. |
| tooltipStyleClass | string | - | Style class of the tooltip. |
| autofocusFilter | boolean | false | Applies focus to the filter element when the overlay is shown. |
| display | string | comma | Defines how the selected items are displayed. |
| autocomplete | string | off | Defines the autocomplete is active. |
| showClear | boolean | false | When enabled, a clear icon is displayed to clear the value. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| placeholder | Signal<string> | - | Label to display when there are no selections. |
| options | any[] | - | An array of objects to display as the available options. |
| filterValue | string | - | When specified, filter displays with this value. |
| selectAll | boolean | - | Whether all data is selected. |
| focusOnHover | boolean | true | Indicates whether to focus on options when hovering over them, defaults to optionLabel. |
| filterFields | any[] | - | Fields used when filtering the options, defaults to optionLabel. |
| selectOnFocus | boolean | false | Determines if the option will be selected on focus. |
| autoOptionFocus | boolean | false | Whether to focus on the first visible or selected element when the overlay panel is shown. |
| highlightOnSelect | boolean | true | Whether the selected option will be add highlight class. |
| size | InputSignal<"small" \| "large"> | undefined | Specifies the size of the component. |
| variant | InputSignal<"outlined" \| "filled"> | undefined | Specifies the input variant of the component. |
| fluid | InputSignalWithTransform<boolean, unknown> | undefined | Spans 100% width of the container when enabled. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | event: MultiSelectChangeEvent | Callback to invoke when value changes. |
| onFilter | event: MultiSelectFilterEvent | Callback to invoke when data is filtered. |
| onFocus | event: MultiSelectFocusEvent | Callback to invoke when multiselect receives focus. |
| onBlur | event: MultiSelectBlurEvent | Callback to invoke when multiselect loses focus. |
| onClick | event: Event | Callback to invoke when component is clicked. |
| onClear | value: void | Callback to invoke when input field is cleared. |
| onPanelShow | event: AnimationEvent | Callback to invoke when overlay panel becomes visible. |
| onPanelHide | event: AnimationEvent | Callback to invoke when overlay panel becomes hidden. |
| onLazyLoad | event: MultiSelectLazyLoadEvent | Callback to invoke in lazy mode to load new data. |
| onRemove | event: MultiSelectRemoveEvent | Callback to invoke in lazy mode to load new data. |
| onSelectAllChange | event: MultiSelectSelectAllChangeEvent | Callback to invoke when all data is selected. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| item | TemplateRef<MultiSelectItemTemplateContext<any>> | Custom item template. |
| group | TemplateRef<MultiSelectGroupTemplateContext<any>> | Custom group template. |
| loader | TemplateRef<MultiSelectLoaderTemplateContext> | Custom loader template. |
| header | TemplateRef<void> | Custom header template. |
| filter | TemplateRef<MultiSelectFilterTemplateContext> | Custom filter template. |
| footer | TemplateRef<void> | Custom footer template. |
| emptyfilter | TemplateRef<void> | Custom empty filter template. |
| empty | TemplateRef<void> | Custom empty template. |
| selecteditems | TemplateRef<MultiSelectSelectedItemsTemplateContext<any>> | Custom selected items template. |
| loadingicon | TemplateRef<void> | Custom loading icon template. |
| filtericon | TemplateRef<void> | Custom filter icon template. |
| removetokenicon | TemplateRef<MultiSelectChipIconTemplateContext> | Custom remove token icon template. |
| chipicon | TemplateRef<MultiSelectChipIconTemplateContext> | Custom chip icon template. |
| clearicon | TemplateRef<void> | Custom clear icon template. |
| dropdownicon | TemplateRef<MultiSelectDropdownIconTemplateContext> | Custom dropdown icon template. |
| itemcheckboxicon | TemplateRef<MultiSelectItemCheckboxIconTemplateContext> | Custom item checkbox icon template. |
| headercheckboxicon | TemplateRef<MultiSelectHeaderCheckboxIconTemplateContext> | Custom header checkbox icon template. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| updateModel | value: any, event: any | void | Updates the model value. |
| show | isFocus: any | void | Displays the panel. |
| hide | isFocus: any | void | Hides the panel. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| labelContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the label container's DOM element. |
| label | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the label's DOM element. |
| clearIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the clear icon's DOM element. |
| chipItem | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the chip item's DOM element. |
| pcChip | ChipPassThrough | Used to pass attributes to the Chip component. |
| dropdown | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the dropdown's DOM element. |
| loadingIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the loading icon's DOM element. |
| dropdownIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the dropdown icon's DOM element. |
| overlay | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the overlay's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| pcHeaderCheckbox | CheckboxPassThrough | Used to pass attributes to the header checkbox component. |
| pcFilterContainer | IconFieldPassThrough | Used to pass attributes to the IconField component. |
| pcFilter | InputTextPassThrough | Used to pass attributes to the InputText component. |
| pcFilterIconContainer | InputIconPassThrough | Used to pass attributes to the InputIcon component. |
| filterIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the filter icon's DOM element. |
| listContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the list container's DOM element. |
| list | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the list's DOM element. |
| optionGroup | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the option group's DOM element. |
| option | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the option's DOM element. |
| pcOptionCheckbox | CheckboxPassThrough | Used to pass attributes to the option checkbox component. |
| emptyMessage | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the empty message's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-multiselect | Class name of the root element |
| p-multiselect-label-container | Class name of the label container element |
| p-multiselect-label | Class name of the label element |
| p-multiselect-chip-item | Class name of the chip item element |
| p-multiselect-chip | Class name of the chip element |
| p-multiselect-chip-icon | Class name of the chip icon element |
| p-multiselect-dropdown | Class name of the dropdown element |
| p-multiselect-loading-icon | Class name of the loading icon element |
| p-multiselect-dropdown-icon | Class name of the dropdown icon element |
| p-multiselect-overlay | Class name of the overlay element |
| p-multiselect-header | Class name of the header element |
| p-multiselect-filter-container | Class name of the filter container element |
| p-multiselect-filter | Class name of the filter element |
| p-multiselect-list-container | Class name of the list container element |
| p-multiselect-list | Class name of the list element |
| p-multiselect-option-group | Class name of the option group element |
| p-multiselect-option | Class name of the option element |
| p-multiselect-empty-message | Class name of the empty message element |
| p-autocomplete-clear-icon | Class name of the clear icon |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| multiselect.background | --p-multiselect-background | Background of root |
| multiselect.disabled.background | --p-multiselect-disabled-background | Disabled background of root |
| multiselect.filled.background | --p-multiselect-filled-background | Filled background of root |
| multiselect.filled.hover.background | --p-multiselect-filled-hover-background | Filled hover background of root |
| multiselect.filled.focus.background | --p-multiselect-filled-focus-background | Filled focus background of root |
| multiselect.border.color | --p-multiselect-border-color | Border color of root |
| multiselect.hover.border.color | --p-multiselect-hover-border-color | Hover border color of root |
| multiselect.focus.border.color | --p-multiselect-focus-border-color | Focus border color of root |
| multiselect.invalid.border.color | --p-multiselect-invalid-border-color | Invalid border color of root |
| multiselect.color | --p-multiselect-color | Color of root |
| multiselect.disabled.color | --p-multiselect-disabled-color | Disabled color of root |
| multiselect.placeholder.color | --p-multiselect-placeholder-color | Placeholder color of root |
| multiselect.invalid.placeholder.color | --p-multiselect-invalid-placeholder-color | Invalid placeholder color of root |
| multiselect.shadow | --p-multiselect-shadow | Shadow of root |
| multiselect.padding.x | --p-multiselect-padding-x | Padding x of root |
| multiselect.padding.y | --p-multiselect-padding-y | Padding y of root |
| multiselect.border.radius | --p-multiselect-border-radius | Border radius of root |
| multiselect.focus.ring.width | --p-multiselect-focus-ring-width | Focus ring width of root |
| multiselect.focus.ring.style | --p-multiselect-focus-ring-style | Focus ring style of root |
| multiselect.focus.ring.color | --p-multiselect-focus-ring-color | Focus ring color of root |
| multiselect.focus.ring.offset | --p-multiselect-focus-ring-offset | Focus ring offset of root |
| multiselect.focus.ring.shadow | --p-multiselect-focus-ring-shadow | Focus ring shadow of root |
| multiselect.transition.duration | --p-multiselect-transition-duration | Transition duration of root |
| multiselect.sm.font.size | --p-multiselect-sm-font-size | Sm font size of root |
| multiselect.sm.padding.x | --p-multiselect-sm-padding-x | Sm padding x of root |
| multiselect.sm.padding.y | --p-multiselect-sm-padding-y | Sm padding y of root |
| multiselect.lg.font.size | --p-multiselect-lg-font-size | Lg font size of root |
| multiselect.lg.padding.x | --p-multiselect-lg-padding-x | Lg padding x of root |
| multiselect.lg.padding.y | --p-multiselect-lg-padding-y | Lg padding y of root |
| multiselect.dropdown.width | --p-multiselect-dropdown-width | Width of dropdown |
| multiselect.dropdown.color | --p-multiselect-dropdown-color | Color of dropdown |
| multiselect.overlay.background | --p-multiselect-overlay-background | Background of overlay |
| multiselect.overlay.border.color | --p-multiselect-overlay-border-color | Border color of overlay |
| multiselect.overlay.border.radius | --p-multiselect-overlay-border-radius | Border radius of overlay |
| multiselect.overlay.color | --p-multiselect-overlay-color | Color of overlay |
| multiselect.overlay.shadow | --p-multiselect-overlay-shadow | Shadow of overlay |
| multiselect.list.padding | --p-multiselect-list-padding | Padding of list |
| multiselect.list.gap | --p-multiselect-list-gap | Gap of list |
| multiselect.list.header.padding | --p-multiselect-list-header-padding | Header padding of list |
| multiselect.option.focus.background | --p-multiselect-option-focus-background | Focus background of option |
| multiselect.option.selected.background | --p-multiselect-option-selected-background | Selected background of option |
| multiselect.option.selected.focus.background | --p-multiselect-option-selected-focus-background | Selected focus background of option |
| multiselect.option.color | --p-multiselect-option-color | Color of option |
| multiselect.option.focus.color | --p-multiselect-option-focus-color | Focus color of option |
| multiselect.option.selected.color | --p-multiselect-option-selected-color | Selected color of option |
| multiselect.option.selected.focus.color | --p-multiselect-option-selected-focus-color | Selected focus color of option |
| multiselect.option.padding | --p-multiselect-option-padding | Padding of option |
| multiselect.option.border.radius | --p-multiselect-option-border-radius | Border radius of option |
| multiselect.option.gap | --p-multiselect-option-gap | Gap of option |
| multiselect.option.group.background | --p-multiselect-option-group-background | Background of option group |
| multiselect.option.group.color | --p-multiselect-option-group-color | Color of option group |
| multiselect.option.group.font.weight | --p-multiselect-option-group-font-weight | Font weight of option group |
| multiselect.option.group.padding | --p-multiselect-option-group-padding | Padding of option group |
| multiselect.clear.icon.color | --p-multiselect-clear-icon-color | Color of clear icon |
| multiselect.chip.border.radius | --p-multiselect-chip-border-radius | Border radius of chip |
| multiselect.empty.message.padding | --p-multiselect-empty-message-padding | Padding of empty message |

