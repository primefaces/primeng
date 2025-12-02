# Angular AutoComplete Component

AutoComplete is an input component that provides real-time suggestions when being typed.

## Accessibility

Screen Reader Value to describe the component can either be provided via label tag combined with inputId prop or using ariaLabelledBy , ariaLabel props. The input element has combobox role in addition to aria-autocomplete , aria-haspopup and aria-expanded attributes. The relation between the input and the popup is created with aria-controls and aria-activedescendant attribute is used to instruct screen reader which option to read during keyboard navigation within the popup list. In multiple mode, chip list uses listbox role whereas each chip has the option role with aria-label set to the label of the chip. The popup list has an id that refers to the aria-controls attribute of the input element and uses listbox as the role. Each list item has option role and an id to match the aria-activedescendant of the input element.

```html
<label for="ac1">Username</label>
<p-autocomplete inputId="ac1"/>

<span id="ac2">Email</span>
<p-autocomplete ariaLabelledBy="ac2" />

<p-autocomplete ariaLabel="City" />
```

## Advanced

This example demonstrates an advanced use case with templating, object handling, dropdown, and multiple mode.

```html
<p-autocomplete
    [(ngModel)]="selectedProducts"
    [suggestions]="filteredProducts"
    (completeMethod)="filterProducts($event)"
    inputId="advanced-chips"
    [multiple]="true"
    [fluid]="true"
    [typeahead]="false"
    [dropdown]="true"
    [optionLabel]="getProductLabel"
    [optionValue]="getProductValue"
    placeholder="Add products"
>
    <ng-template let-product #item>
        <div class="flex flex-wrap p-1 items-center gap-4 w-full">
            <img class="w-12 shrink-0 rounded" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" />
            <div class="flex-1 flex flex-col">
                <span class="font-medium text-sm">{{ product.name }}</span>
                <span class="text-sm text-surface-500 dark:text-surface-400">{{ product.category }}</span>
            </div>
            <span class="font-bold sm:ml-8">\${{ product.price }}</span>
        </div>
    </ng-template>
    <ng-template let-value #selecteditem>
        @if (value.price) {
            <div class="flex align-items-center gap-2">
                <span class="font-semibold">{{ value.name }}</span>
                <span class="text-primary text-sm font-bold">\${{ value.price }}</span>
            </div>
        } @else {
            <span class="font-semibold">{{ value }}</span>
        }
    </ng-template>
</p-autocomplete>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipModule } from 'primeng/chip';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';

@Component({
    selector: 'autocomplete-advanced-chips-demo',
    templateUrl: './autocomplete-advanced-chips-demo.html',
    standalone: true,
    imports: [CommonModule, FormsModule, AutoCompleteModule, ChipModule],
    providers: [ProductService]
})
export class AutocompleteAdvancedChipsDemo implements OnInit {
    products = signal<Product[]>([]);

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((data) => this.products.set(data));
    }

    selectedProducts = signal<any[]>([]);

    filteredProducts: Product[] = [];

    filterProducts(event: any) {
        let filtered: Product[] = [];
        let query = event.query;

        for (let i = 0; i < this.products().length; i++) {
            let product = this.products()[i];
            if (product.name?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(product);
            }
        }

        this.filteredProducts = filtered;
    }

    getProductLabel(product: any): string {
        if (typeof product === 'string') {
            return product;
        }
        return product?.name || '';
    }

    getProductValue(product: any): any {
        if (typeof product === 'string') {
            return { name: product, custom: true };
        }
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        };
    }
}
```
</details>

## Basic

With ⁠multiple enabled, the AutoComplete component behaves like a chips or tags input. Use addOnBlur , ⁠addOnTab , and ⁠separator properties to customize the keystroke behavior for adding items.

```html
<!-- With Add On Blur -->
<p-autocomplete
    [(ngModel)]="valueBlur"
    multiple
    [typeahead]="false"
    [addOnBlur]="true"
    placeholder="Type and click outside to add..."
/>

<!-- With Add On Tab -->
<p-autocomplete
    [(ngModel)]="valueTab"
    multiple
    [typeahead]="false"
    [addOnTab]="true"
    placeholder="Type and press Tab to add..."
/>

<!-- With Separator -->
<p-autocomplete
    [(ngModel)]="valueSeparator"
    multiple
    [typeahead]="false"
    separator=","
    placeholder="Type items separated by comma..."
/>

<!-- Combined Features -->
<p-autocomplete
    [(ngModel)]="valueCombined"
    multiple
    [typeahead]="false"
    [addOnBlur]="true"
    [addOnTab]="true"
    separator=","
    placeholder="Use Tab, Blur, or Comma to add items..."
/>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
    selector: 'autocomplete-basic-chips-demo',
    templateUrl: './autocomplete-basic-chips-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule]
})
export class AutocompleteBasicChipsDemo {
    valueBlur: any[] = [];
    valueTab: any[] = [];
    valueSeparator: any[] = [];
    valueCombined: any[] = [];
}
```
</details>

## Basic

AutoComplete uses ngModel for two-way binding, requires a list of suggestions and a completeMethod to query for the results. The completeMethod gets the query text as event.query property and should update the suggestions with the search results.

```html
<p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" />
```

## Clear Icon

When showClear is enabled, a clear icon is displayed to clear the value.

```html
<p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" [showClear]="true" inputStyleClass="w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-clear-icon-demo',
    templateUrl: './autocomplete-clear-icon-demo.html',
    imports: [AutoComplete, FormsModule],
    standalone: true,
})
export class AutocompleteClearIconDemo {
    items: any[] = [];

    value: any;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
}
```
</details>

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-autocomplete [(ngModel)]="selectedItem" [suggestions]="suggestions" placeholder="Disabled" (completeMethod)="search($event)" [disabled]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-disabled-demo',
    templateUrl: './autocomplete-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, AutoComplete]
})
export class AutocompleteDisabledDemo {
    items: any[] | undefined;

    selectedItem: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
}
```
</details>

## Dropdown

Enabling dropdown property displays a button next to the input field where click behavior of the button is defined using dropdownMode property that takes blank or current as possible values. blank is the default mode to send a query with an empty string whereas current setting sends a query with the current value of the input.

```html
<p-autocomplete [(ngModel)]="value" [dropdown]="true" [suggestions]="items" (completeMethod)="search($event)" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-dropdown-demo',
    templateUrl: './autocomplete-dropdown-demo.html',
    standalone:true,
    imports: [FormsModule, AutoCompleteModule]
})
export class AutocompleteDropdownDemo {
    items: any[] | undefined;

    value: any;

    search(event: AutoCompleteCompleteEvent) {
    let _items = [...Array(10).keys()];

    this.items = event.query ? [...Array(10).keys()].map((item) => event.query + '-' + item) : _items;
    }
}
```
</details>

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```html
<p-autocomplete [(ngModel)]="selectedItem" [suggestions]="suggestions" (completeMethod)="search($event)" variant="filled" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-filled-demo',
    templateUrl: './autocomplete-filled-demo.html',
    imports: [AutoComplete, FormsModule],
    standalone: true,
})
export class AutocompleteFilledDemo {
    items: any[] | undefined;

    selectedItem: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
}
```
</details>

## Float Label

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

```html
<p-floatlabel>
    <p-autocomplete [(ngModel)]="value1" [suggestions]="items" (completeMethod)="search($event)" inputId="over_label" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel variant="in">
    <p-autocomplete [(ngModel)]="value2" [suggestions]="items" (completeMethod)="search($event)" inputId="in_label" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <p-autocomplete [(ngModel)]="value3" [suggestions]="items" (completeMethod)="search($event)" inputId="on_label" />
    <label for="on_label">On Label</label>
</p-floatlabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { FloatLabel } from 'primeng/floatlabel';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-float-label-demo',
    templateUrl: './autocomplete-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, AutoComplete, FloatLabel]
})
export class AutocompleteFloatLabelDemo {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;

    items: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}
```
</details>

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```html
<p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" fluid />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-fluid-demo',
    templateUrl: './autocomplete-fluid-demo.html',
    imports: [AutoComplete, FormsModule],
    standalone: true,
})
export class AutocompleteFluidDemo {
    items: any[] = [];

    value: any;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map(item => event.query + '-' + item);
    }
}
```
</details>

## Force Selection

ForceSelection mode validates the manual input to check whether it also exists in the suggestions list, if not the input value is cleared to make sure the value passed to the model is always one of the suggestions.

```html
<p-autocomplete [(ngModel)]="selectedCountry" [forceSelection]="true" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { CountryService } from '@/service/countryservice';
import { AutoComplete } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-force-selection-demo',
    templateUrl: './autocomplete-force-selection-demo.html',
    standalone: true,
    imports: [FormsModule, AutoComplete],
    providers: [CountryService]
})
export class AutocompleteForceSelectionDemo implements OnInit {
    countries: any[] | undefined;

    selectedCountry: any;

    filteredCountries: any[] | undefined;

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}
```
</details>

## Group

Option grouping is enabled when group property is set to true . group template is available to customize the option groups. All templates get the option instance as the default local template variable.

```html
<p-autocomplete [(ngModel)]="selectedCity" [group]="true" [suggestions]="filteredGroups" (completeMethod)="filterGroupedCity($event)" placeholder="Hint: type 'a'">
    <ng-template let-group #group>
        <div class="flex items-center">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'mr-2 flag flag-' + group.value" style="width: 20px" />
            <span>{{ group.label }}</span>
        </div>
    </ng-template>
</p-autocomplete>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FilterService, SelectItemGroup } from 'primeng/api';
import { AutoComplete } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-grouped-demo',
    templateUrl: './autocomplete-grouped-demo.html',
    standalone: true,
    imports: [AutoComplete, FormsModule],
  })
export class AutocompleteGroupedDemo implements OnInit {
    selectedCity: any;

    filteredGroups: any[] | undefined;

    groupedCities: SelectItemGroup[] | undefined;

    constructor(private filterService: FilterService) { }

    ngOnInit() {
        this.groupedCities = [
            {
                label: 'Germany', value: 'de',
                items: [
                    { label: 'Berlin', value: 'Berlin' },
                    { label: 'Frankfurt', value: 'Frankfurt' },
                    { label: 'Hamburg', value: 'Hamburg' },
                    { label: 'Munich', value: 'Munich' }
                ]
            },
            {
                label: 'USA', value: 'us',
                items: [
                    { label: 'Chicago', value: 'Chicago' },
                    { label: 'Los Angeles', value: 'Los Angeles' },
                    { label: 'New York', value: 'New York' },
                    { label: 'San Francisco', value: 'San Francisco' }
                ]
            },
            {
                label: 'Japan', value: 'jp',
                items: [
                    { label: 'Kyoto', value: 'Kyoto' },
                    { label: 'Osaka', value: 'Osaka' },
                    { label: 'Tokyo', value: 'Tokyo' },
                    { label: 'Yokohama', value: 'Yokohama' }
                ]
            }
        ];
    }

    filterGroupedCity(event: AutoCompleteCompleteEvent) {
        let query = event.query;
        let filteredGroups = [];

        for (let optgroup of this.groupedCities) {
            let filteredSubOptions = this.filterService.filter(optgroup.items, ['label'], query, "contains");
            if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push({
                    label: optgroup.label,
                    value: optgroup.value,
                    items: filteredSubOptions
                });
            }
        }

        this.filteredGroups = filteredGroups;
    }
}
```
</details>

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```html
<p-iftalabel>
    <p-autocomplete [(ngModel)]="value" [suggestions]="items" (completeMethod)="search($event)" inputId="ac" />
    <label for="ac">Identifier</label>
</p-iftalabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-ifta-label-demo',
    templateUrl: './autocomplete-ifta-label-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, IftaLabelModule]
})
export class AutocompleteIftaLabelDemo {
    items: any[] | undefined;

    value: any;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}
```
</details>

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<p-autocomplete [(ngModel)]="value1" [suggestions]="suggestions" [invalid]="!value1" (completeMethod)="search($event)" placeholder="Code" />
<p-autocomplete [(ngModel)]="value2" [suggestions]="suggestions" [invalid]="!value2" (completeMethod)="search($event)" variant="filled" placeholder="Code" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-invalid-demo',
    templateUrl: './autocomplete-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, AutoComplete]
})
export class AutocompleteInvalidDemo {

    value1: any;

    value2: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}
```
</details>

## Multiple

Enable multiple selection mode using the ⁠multiple property to allow users to select more than one value from the autocomplete. When enabled, the value reference must be an array.

```html
<label for="multiple-ac-1" class="font-bold mb-2 block">With Typeahead</label>
<p-autocomplete [(ngModel)]="value1" inputId="multiple-ac-1" multiple fluid [suggestions]="items" (completeMethod)="search($event)" />

<label for="multiple-ac-2" class="font-bold mt-8 mb-2 block">Without Typeahead</label>
<p-autocomplete [(ngModel)]="value2" inputId="multiple-ac-2" multiple fluid (completeMethod)="search($event)" [typeahead]="false" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-multiple-demo',
    templateUrl: './autocomplete-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, AutoComplete]
})
export class AutocompleteMultipleDemo {
    value1: any[] | undefined;

    value2: any[] | undefined;

    items: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}
```
</details>

## Objects

AutoComplete can also work with objects using the optionLabel property that defines the label to display as a suggestion. The value passed to the model would still be the object instance of a suggestion. Here is an example with a Country object that has name and code fields such as &#123;name: "United States", code:"USA"&#125; .

```html
<p-autocomplete [(ngModel)]="selectedCountry" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { CountryService } from '@/service/countryservice';
import { AutoComplete } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-objects-demo',
    templateUrl: './autocomplete-objects-demo.html',
    standalone: true,
    imports: [AutoComplete, FormsModule],
    providers: [CountryService]

})
export class AutocompleteObjectsDemo implements OnInit {
    countries: any[] | undefined;

    selectedCountry: any;

    filteredCountries: any[] | undefined;

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}
```
</details>

## reactiveformsdoc

AutoComplete can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex justify-center flex-col gap-4 md:w-56">
    <div class="flex flex-col gap-1">
        <p-autocomplete formControlName="value" [suggestions]="items" [invalid]="isInvalid('value')" (completeMethod)="search($event)" fluid />
        @if (isInvalid('value')) {
            <p-message severity="error" size="small" variant="simple">Value is required.</p-message>
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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-reactive-forms-demo',
    templateUrl: './autocomplete-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, AutoCompleteModule, MessageModule, ToastModule, ButtonModule],
})
export class AutocompleteReactiveFormsDemo {
    messageService = inject(MessageService);

    items: any[] | undefined;

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            value: ['', Validators.required]
        });
    }

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
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
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
```
</details>

## Sizes

AutoComplete provides small and large sizes as alternatives to the base.

```html
<p-autocomplete [(ngModel)]="value1" [suggestions]="items" (completeMethod)="search()" size="small" placeholder="Small" dropdown />
<p-autocomplete [(ngModel)]="value2" [suggestions]="items" (completeMethod)="search()" placeholder="Normal" dropdown />
<p-autocomplete [(ngModel)]="value3" [suggestions]="items" (completeMethod)="search()" size="large" placeholder="Large" dropdown />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'autocomplete-size-demo',
    templateUrl: './autocomplete-size-demo.html',
    imports: [AutoComplete, FormsModule],
    standalone: true,
})
export class AutocompleteSizesDemo {
    items: any[] | undefined;

    value1: any;

    value2: any;

    value3: any;

    search() {
        this.items = [];
    }

}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

AutoComplete offers multiple templates for customization through templating.

```html
<p-autocomplete [(ngModel)]="selectedCountryAdvanced" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name">
    <ng-template let-country #item>
        <div class="flex items-center gap-2">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
            <div>{{ country.name }}</div>
        </div>
    </ng-template>
    <ng-template #header>
        <div class="font-medium px-3 py-2">Available Countries</div>
    </ng-template>
    <ng-template #footer>
        <div class="px-3 py-3">
            <p-button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" />
        </div>
    </ng-template>
</p-autocomplete>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { CountryService } from '@/service/countryservice';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-template-demo',
    templateUrl: './autocomplete-template-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, ButtonModule],
    providers: [CountryService]
})
export class AutocompleteTemplateDemo {
    countries: any[] | undefined;

    selectedCountryAdvanced: any[] | undefined;

    filteredCountries: any[] | undefined;

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}
```
</details>

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 md:w-56">
    <div class="flex flex-col gap-1">
        <p-autocomplete
            #val="ngModel"
            [(ngModel)]="value"
            [suggestions]="items"
            [invalid]="val.invalid && (val.touched || exampleForm.submitted)"
            name="val"
            (completeMethod)="search($event)"
            required
            fluid
        />
        @if (val.invalid && (val.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">Value is required.</p-message>
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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'autocomplete-template-driven-forms-demo',
    templateUrl: './autocomplete-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, MessageModule, ToastModule, ButtonModule]
})
export class TemplateDrivenFormsDemo {
    messageService = inject(MessageService);

    items: any[] = [];

    value: any;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
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

Virtual scrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable virtual scrolling to avoid performance issues. Usage is simple as setting virtualScroll property to true and defining virtualScrollItemSize to specify the height of an item.

```html
<p-autocomplete [(ngModel)]="selectedItem" [virtualScroll]="true" [suggestions]="filteredItems" [virtualScrollItemSize]="34" (completeMethod)="filterItems($event)" optionLabel="label" [dropdown]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-virtual-scroll-demo',
    templateUrl: './autocomplete-virtual-scroll-demo.html',
    standalone: true,
    imports: [FormsModule, AutoComplete]
})
export class AutocompleteVirtualScrollDemo {
    selectedItem: any;

    filteredItems: any[] | undefined;

    items: any[] | undefined;

    filterItems(event: AutoCompleteCompleteEvent) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.items as any[]).length; i++) {
            let item = (this.items as any[])[i];
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredItems = filtered;
    }

    ngOnInit() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }
}
```
</details>

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| pcInputText | InputTextPassThrough | Used to pass attributes to the InputText component. |
| inputMultiple | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the input multiple's DOM element. |
| chipItem | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the chip item's DOM element. |
| pcChip | ChipPassThrough | Used to pass attributes to the Chip component. |
| chipIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the chip icon's DOM element. |
| inputChip | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the input chip's DOM element. |
| clearIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the clear icon's DOM element. |
| loader | PassThroughOption<SVGElement, I> | Used to pass attributes to the loader's DOM element. |
| dropdown | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the dropdown button's DOM element. |
| pcOverlay | OverlayPassThrough | Used to pass attributes to the Overlay component. |
| overlay | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the overlay's DOM element. |
| listContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the list container's DOM element. |
| pcScroller | VirtualScrollerPassThrough | Used to pass attributes to the Scroller component. |
| list | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the list's DOM element. |
| optionGroup | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the option group's DOM element. |
| option | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the option's DOM element. |
| emptyMessage | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the empty message's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-autocomplete | Class name of the root element |
| p-autocomplete-input | Class name of the input element |
| p-autocomplete-input-multiple | Class name of the input multiple element |
| p-autocomplete-chip-item | Class name of the chip item element |
| p-autocomplete-chip | Class name of the chip element |
| p-autocomplete-chip-icon | Class name of the chip icon element |
| p-autocomplete-input-chip | Class name of the input chip element |
| p-autocomplete-loader | Class name of the loader element |
| p-autocomplete-dropdown | Class name of the dropdown element |
| p-autocomplete-overlay | Class name of the panel element |
| p-autocomplete-list | Class name of the list element |
| p-autocomplete-option-group | Class name of the option group element |
| p-autocomplete-option | Class name of the option element |
| p-autocomplete-empty-message | Class name of the empty message element |
| p-autocomplete-clear-icon | Class name of the clear icon |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| autocomplete.background | --p-autocomplete-background | Background of root |
| autocomplete.disabled.background | --p-autocomplete-disabled-background | Disabled background of root |
| autocomplete.filled.background | --p-autocomplete-filled-background | Filled background of root |
| autocomplete.filled.hover.background | --p-autocomplete-filled-hover-background | Filled hover background of root |
| autocomplete.filled.focus.background | --p-autocomplete-filled-focus-background | Filled focus background of root |
| autocomplete.border.color | --p-autocomplete-border-color | Border color of root |
| autocomplete.hover.border.color | --p-autocomplete-hover-border-color | Hover border color of root |
| autocomplete.focus.border.color | --p-autocomplete-focus-border-color | Focus border color of root |
| autocomplete.invalid.border.color | --p-autocomplete-invalid-border-color | Invalid border color of root |
| autocomplete.color | --p-autocomplete-color | Color of root |
| autocomplete.disabled.color | --p-autocomplete-disabled-color | Disabled color of root |
| autocomplete.placeholder.color | --p-autocomplete-placeholder-color | Placeholder color of root |
| autocomplete.invalid.placeholder.color | --p-autocomplete-invalid-placeholder-color | Invalid placeholder color of root |
| autocomplete.shadow | --p-autocomplete-shadow | Shadow of root |
| autocomplete.padding.x | --p-autocomplete-padding-x | Padding x of root |
| autocomplete.padding.y | --p-autocomplete-padding-y | Padding y of root |
| autocomplete.border.radius | --p-autocomplete-border-radius | Border radius of root |
| autocomplete.focus.ring.width | --p-autocomplete-focus-ring-width | Focus ring width of root |
| autocomplete.focus.ring.style | --p-autocomplete-focus-ring-style | Focus ring style of root |
| autocomplete.focus.ring.color | --p-autocomplete-focus-ring-color | Focus ring color of root |
| autocomplete.focus.ring.offset | --p-autocomplete-focus-ring-offset | Focus ring offset of root |
| autocomplete.focus.ring.shadow | --p-autocomplete-focus-ring-shadow | Focus ring shadow of root |
| autocomplete.transition.duration | --p-autocomplete-transition-duration | Transition duration of root |
| autocomplete.overlay.background | --p-autocomplete-overlay-background | Background of overlay |
| autocomplete.overlay.border.color | --p-autocomplete-overlay-border-color | Border color of overlay |
| autocomplete.overlay.border.radius | --p-autocomplete-overlay-border-radius | Border radius of overlay |
| autocomplete.overlay.color | --p-autocomplete-overlay-color | Color of overlay |
| autocomplete.overlay.shadow | --p-autocomplete-overlay-shadow | Shadow of overlay |
| autocomplete.list.padding | --p-autocomplete-list-padding | Padding of list |
| autocomplete.list.gap | --p-autocomplete-list-gap | Gap of list |
| autocomplete.option.focus.background | --p-autocomplete-option-focus-background | Focus background of option |
| autocomplete.option.selected.background | --p-autocomplete-option-selected-background | Selected background of option |
| autocomplete.option.selected.focus.background | --p-autocomplete-option-selected-focus-background | Selected focus background of option |
| autocomplete.option.color | --p-autocomplete-option-color | Color of option |
| autocomplete.option.focus.color | --p-autocomplete-option-focus-color | Focus color of option |
| autocomplete.option.selected.color | --p-autocomplete-option-selected-color | Selected color of option |
| autocomplete.option.selected.focus.color | --p-autocomplete-option-selected-focus-color | Selected focus color of option |
| autocomplete.option.padding | --p-autocomplete-option-padding | Padding of option |
| autocomplete.option.border.radius | --p-autocomplete-option-border-radius | Border radius of option |
| autocomplete.option.group.background | --p-autocomplete-option-group-background | Background of option group |
| autocomplete.option.group.color | --p-autocomplete-option-group-color | Color of option group |
| autocomplete.option.group.font.weight | --p-autocomplete-option-group-font-weight | Font weight of option group |
| autocomplete.option.group.padding | --p-autocomplete-option-group-padding | Padding of option group |
| autocomplete.dropdown.width | --p-autocomplete-dropdown-width | Width of dropdown |
| autocomplete.dropdown.sm.width | --p-autocomplete-dropdown-sm-width | Sm width of dropdown |
| autocomplete.dropdown.lg.width | --p-autocomplete-dropdown-lg-width | Lg width of dropdown |
| autocomplete.dropdown.border.color | --p-autocomplete-dropdown-border-color | Border color of dropdown |
| autocomplete.dropdown.hover.border.color | --p-autocomplete-dropdown-hover-border-color | Hover border color of dropdown |
| autocomplete.dropdown.active.border.color | --p-autocomplete-dropdown-active-border-color | Active border color of dropdown |
| autocomplete.dropdown.border.radius | --p-autocomplete-dropdown-border-radius | Border radius of dropdown |
| autocomplete.dropdown.focus.ring.width | --p-autocomplete-dropdown-focus-ring-width | Focus ring width of dropdown |
| autocomplete.dropdown.focus.ring.style | --p-autocomplete-dropdown-focus-ring-style | Focus ring style of dropdown |
| autocomplete.dropdown.focus.ring.color | --p-autocomplete-dropdown-focus-ring-color | Focus ring color of dropdown |
| autocomplete.dropdown.focus.ring.offset | --p-autocomplete-dropdown-focus-ring-offset | Focus ring offset of dropdown |
| autocomplete.dropdown.focus.ring.shadow | --p-autocomplete-dropdown-focus-ring-shadow | Focus ring shadow of dropdown |
| autocomplete.dropdown.background | --p-autocomplete-dropdown-background | Background of dropdown |
| autocomplete.dropdown.hover.background | --p-autocomplete-dropdown-hover-background | Hover background of dropdown |
| autocomplete.dropdown.active.background | --p-autocomplete-dropdown-active-background | Active background of dropdown |
| autocomplete.dropdown.color | --p-autocomplete-dropdown-color | Color of dropdown |
| autocomplete.dropdown.hover.color | --p-autocomplete-dropdown-hover-color | Hover color of dropdown |
| autocomplete.dropdown.active.color | --p-autocomplete-dropdown-active-color | Active color of dropdown |
| autocomplete.chip.border.radius | --p-autocomplete-chip-border-radius | Border radius of chip |
| autocomplete.chip.focus.background | --p-autocomplete-chip-focus-background | Focus background of chip |
| autocomplete.chip.focus.color | --p-autocomplete-chip-focus-color | Focus color of chip |
| autocomplete.empty.message.padding | --p-autocomplete-empty-message-padding | Padding of empty message |

