# Angular Select Component

Select is used to choose an item from a collection of options.

## Accessibility

Screen Reader Value to describe the component can either be provided with ariaLabelledBy or ariaLabel props. The select element has a combobox role in addition to aria-haspopup and aria-expanded attributes. If the editable option is enabled aria-autocomplete is also added. The relation between the combobox and the popup is created with aria-controls and aria-activedescendant attribute is used to instruct screen reader which option to read during keyboard navigation within the popup list. The popup list has an id that refers to the aria-controls attribute of the combobox element and uses listbox as the role. Each list item has an option role, an id to match the aria-activedescendant of the input element along with aria-label , aria-selected and aria-disabled attributes. If filtering is enabled, filterInputProps can be defined to give aria-* props to the filter input element.

```html
<span id="dd1">Options</span>
<p-select ariaLabelledBy="dd1"/>

<p-select ariaLabel="Options"/>
```

## Basic

Select is used as a controlled component with ngModel property along with an options collection. Label and value of an option are defined with the optionLabel and optionValue properties respectively. Note that, when options are simple primitive values such as a string array, no optionLabel and optionValue would be necessary.

```html
<p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
```

## Checkmark

An alternative way to highlight the selected option is displaying a checkmark instead.

```html
<p-select [options]="cities" [(ngModel)]="selectedCity" [checkmark]="true" optionLabel="name" [showClear]="true" placeholder="Select a City" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-checkmark-demo',
    templateUrl: './select-checkmark-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectCheckmarkDemo implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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

## Clear Icon

When showClear is enabled, a clear icon is displayed to clear the value.

```html
<p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" [showClear]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-clear-icon-demo',
    templateUrl: './select-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectClearIconDemo implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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

## customfilterdoc

Custom filter can be applied with the filterTemplate .

```html
<p-select
    [options]="countries"
    [(ngModel)]="selectedCountry"
    optionLabel="name"
    [filter]="true"
    filterBy="name"
    [showClear]="true"
    placeholder="Select a Country"
>
    <ng-template pTemplate="filter" let-options="options">
        <div class="flex gap-1">
            <p-inputgroup (click)="$event.stopPropagation()">
                <p-inputgroup-addon><i class="pi pi-search"></i></p-inputgroup-addon>
                <input
                    type="text"
                    pInputText
                    placeholder="Filter"
                    [(ngModel)]="filterValue"
                    (keyup)="customFilterFunction($event, options)"
                />
            </p-inputgroup>
            <p-button icon="pi pi-times" (click)="resetFunction(options)" severity="secondary" />
        </div>
    </ng-template>
    <ng-template pTemplate="selectedItem" let-selectedOption>
        <div class="flex items-center gap-2">
            <img
                src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                [class]="'flag flag-' + selectedCountry.code.toLowerCase()"
                style="width: 18px"
            />
            <div>{{ selectedOption.name }}</div>
        </div>
    </ng-template>
    <ng-template let-country pTemplate="item">
        <div class="flex items-center gap-2">
            <img
                src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                [class]="'flag flag-' + country.code.toLowerCase()"
                style="width: 18px"
            />
            <div>{{ country.name }}</div>
        </div>
    </ng-template>
</p-select>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { SelectFilterOptions } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

interface City {
    name: string;
    code: string;
}
@Component({
    selector: 'select-custom-filter-demo',
    templateUrl: './select-custom-filter-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule, InputGroupModule, InputGroupAddonModule]
})
export class SelectCustomFilterDemo implements OnInit {
    countries: City[] | undefined;

    selectedCountry: string | undefined;

    filterValue: string | undefined = '';

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

    resetFunction(options: SelectFilterOptions) {
        options.reset();
        this.filterValue = '';
    }

    customFilterFunction(event: KeyboardEvent, options: SelectFilterOptions) {
        options.filter(event);
    }
}
```
</details>

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-select [options]="cities" [(ngModel)]="selectedCity" placeholder="Select a City" optionLabel="name" [disabled]="true" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-disabled-demo',
    templateUrl: './select-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectDisabledDemo {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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

## Editable

When editable is present, the input can also be entered with typing.

```html
<p-select [options]="cities" [(ngModel)]="selectedCity" placeholder="Select a City" [editable]="true" optionLabel="name" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-editable-demo',
    templateUrl: './select-editable-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectEditableDemo implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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
<p-select [options]="cities" [(ngModel)]="selectedCity" variant="filled" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-filled-demo',
    templateUrl: './select-filled-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectFilledDemo implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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

Select provides built-in filtering that is enabled by adding the filter property.

```html
<p-select [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true" filterBy="name" [showClear]="true" placeholder="Select a Country" class="w-full md:w-56">
    <ng-template #selectedItem let-selectedOption>
        <div class="flex items-center gap-2">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + selectedCountry.code.toLowerCase()" style="width: 18px" />
            <div>{{ selectedOption.name }}</div>
        </div>
    </ng-template>
    <ng-template let-country #item>
        <div class="flex items-center gap-2">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
            <div>{{ country.name }}</div>
        </div>
    </ng-template>
</p-select>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'select-filter-demo',
    templateUrl: './select-filter-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule]
})
export class SelectFilterDemo implements OnInit {
    countries: any[] | undefined;

    selectedCountry: string | undefined;

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

## Float Label

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

```html
<p-floatlabel class="w-full md:w-56">
    <p-select [(ngModel)]="value1" inputId="over_label" [options]="cities" optionLabel="name" class="w-full" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel class="w-full md:w-56" variant="in">
    <p-select [(ngModel)]="value2" inputId="in_label" [options]="cities" optionLabel="name" class="w-full" variant="filled" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel class="w-full md:w-56" variant="on">
    <p-select [(ngModel)]="value3" inputId="on_label" [options]="cities" optionLabel="name" class="w-full" />
    <label for="on_label">On Label</label>
</p-floatlabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { FloatLabel } from "primeng/floatlabel"

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-floatlabel-demo',
    templateUrl: './select-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, Select, FloatLabel]
})
export class SelectFloatlabelDemo implements OnInit {
    cities: City[] | undefined;

    value1: City | undefined;

    value2: City | undefined;

    value3: City | undefined;

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
<p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-fluid-demo',
    templateUrl: './select-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectFluidDemo implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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
<p-select [options]="groupedCities" [(ngModel)]="selectedCity" placeholder="Select a City" [group]="true" class="w-full md:w-56">
    <ng-template let-group #group>
        <div class="flex items-center">
            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'mr-2 flag flag-' + group.value" style="width: 20px" />
            <span>{{ group.label }}</span>
        </div>
    </ng-template>
</p-select>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { SelectItemGroup } from 'primeng/api';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'select-group-demo',
    templateUrl: './select-group-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule]
})
export class SelectGroupDemo {
    groupedCities: SelectItemGroup[];

    selectedCity: string | undefined;

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
<p-iftalabel class="w-full md:w-56">
    <p-select [(ngModel)]="selectedCity" inputId="dd-city" [options]="cities" optionLabel="name" class="w-full" />
    <label for="dd-city">City</label>
</p-iftalabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-iftalabel-demo',
    templateUrl: './select-iftalabel-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule, IftaLabelModule]
})
export class SelectIftaLabelDemo implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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
<p-select [options]="cities" [(ngModel)]="selectedCity1" optionLabel="name" [showClear]="true" [invalid]="value1" placeholder="Select a City" class="w-full md:w-56" />
<p-select [options]="cities" [(ngModel)]="selectedCity2" optionLabel="name" [showClear]="true" [invalid]="value2" placeholder="Select a City" class="w-full md:w-56" variant="filled"/>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}
@Component({
    selector: 'select-invalid-demo',
    templateUrl: './select-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectInvalidDemo {
    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    selectedCity1: City | undefined;

    selectedCity2: City | undefined;

    value1 = true;

    value2 = true;

}
```
</details>

## Lazy Virtual Scroll

```html
<p-select [options]="items" [(ngModel)]="selectedItem" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="32" [virtualScrollOptions]="options" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { SelectItem } from 'primeng/api';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

@Component({
    selector: 'select-lazy-virtualscroll-demo',
    templateUrl: './select-lazy-virtualscroll-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectLazyVirtualscrollDemo {
    items: SelectItem[];

    selectedItem: string | undefined;

    loading: boolean = false;

    loadLazyTimeout = null;

    options: ScrollerOptions = {
        delay: 250,
        showLoader: true,
        lazy: true,
        onLazyLoad: this.onLazyLoad.bind(this)
    };

    constructor() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }
    onLazyLoad(event) {
        this.loading = true;

        if (this.loadLazyTimeout) {
            clearTimeout(this.loadLazyTimeout);
        }

        //imitate delay of a backend call
        this.loadLazyTimeout = setTimeout(() => {
            const { first, last } = event;
            const items = [...this.items];

            for (let i = first; i < last; i++) {
                items[i] = { label: \`Item #\${i}\`, value: i };
            }

            this.items = items;
            this.loading = false;
        }, Math.random() * 1000 + 250);
    }

}
```
</details>

## Loading State

Loading state can be used loading property.

```html
<p-select [options]="cities" [(ngModel)]="selectedCity" [loading]="true" optionLabel="name" placeholder="Loading..." class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-loading-state-demo',
    templateUrl: './select-loading-state-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectLoadingStateDemo implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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

Select can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-1">
        <p-select formControlName="selectedCity" [options]="cities" [invalid]="isInvalid('city')" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
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
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Select } from 'primeng/select';
import { Message } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-reactive-forms-demo',
    templateUrl: './select-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, Select, Message]
})
export class SelectReactiveFormsDemo implements OnInit {
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
          city: ['', Validators.required],
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
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
```
</details>

## Sizes

Select provides small and large sizes as alternatives to the base.

```html
<p-select [(ngModel)]="value1" [options]="cities" optionLabel="name" size="small" placeholder="Small" class="w-full md:w-56" />
<p-select [(ngModel)]="value2" [options]="cities" optionLabel="name" placeholder="Normal" class="w-full md:w-56" />
<p-select [(ngModel)]="value3" [options]="cities" optionLabel="name" size="large" placeholder="Large" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-size-demo',
    templateUrl: './select-size-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule]
})
export class SelectSizeDemo implements OnInit {
    value1: City | undefined;

    value2: City | undefined;

    value3: City | undefined;

    cities: City[];

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

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Both the selected option and the options list can be templated to provide customizated representation. Use selectedItem template to customize the selected label display and the item template to change the content of the options in the select panel. In addition when grouping is enabled, group template is available to customize the option groups. All templates get the option instance as the default local template variable.

```html
<p-select [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" placeholder="Select a country" class="w-full md:w-56">
    <ng-template #selectedItem let-selectedOption>
        <div class="flex items-center gap-2" *ngIf="selectedOption">
            <img
                src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                [class]="'flag flag-' + selectedOption.code.toLowerCase()"
                style="width: 18px"
            />
            <div>{{ selectedOption.name }}</div>
        </div>
    </ng-template>
    <ng-template let-country #item>
        <div class="flex items-center gap-2">
            <img
                src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                [class]="'flag flag-' + country.code.toLowerCase()"
                style="width: 18px"
            />
            <div>{{ country.name }}</div>
        </div>
    </ng-template>
    <ng-template #dropdownicon>
        <i class="pi pi-map"></i>
    </ng-template>
    <ng-template #header>
        <div class="font-medium p-3">Available Countries</div>
    </ng-template>
    <ng-template #footer>
        <div class="p-3">
            <p-button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" />
        </div>
    </ng-template>
</p-select>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'select-group-demo',
    templateUrl: './select-group-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule, ButtonModule]
})
export class SelectTemplateDemo implements OnInit {
    countries: any[] | undefined;

    selectedCountry: string | undefined;

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
<form #exampleForm (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-1">
        <p-select #city="ngModel" [(ngModel)]="selectedCity" [options]="cities" [invalid]="city.invalid && (city.touched || exampleForm.submitted)" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" required />
        @if (city.invalid && (city.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">City is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Message } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-template-driven-forms-demo',
    templateUrl: './select-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, Select, Message, Toast]
})
export class TemplateDrivenFormsDemo {
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

## Virtual Scroll

VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance issues. Usage is simple as setting virtualScroll property to true and defining virtualScrollItemSize to specify the height of an item.

```html
<p-select [options]="items" [(ngModel)]="selectedItem" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="32" class="w-full md:w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { SelectItem } from 'primeng/api';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

@Component({
    selector: 'select-virtualscroll-demo',
    templateUrl: './select-virtualscroll-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectVirtualscrollDemo {
    items: SelectItem[];

    selectedItem: string | undefined;

    constructor() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }
}
```
</details>

## Select

Select is used to choose an item from a collection of options.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<SelectPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| fluid | InputSignalWithTransform<boolean, unknown> | false | Spans 100% width of the container when enabled. |
| variant | InputSignal<"outlined" \| "filled"> | 'outlined' | Specifies the input variant of the component. |
| size | InputSignal<"small" \| "large"> | undefined | Specifies the size of the component. |
| inputSize | InputSignal<number> | undefined | Specifies the visible width of the input element in characters. |
| pattern | InputSignal<string> | undefined | Specifies the value must match the pattern. |
| min | InputSignal<number> | undefined | The value must be greater than or equal to the value. |
| max | InputSignal<number> | undefined | The value must be less than or equal to the value. |
| step | InputSignal<number> | undefined | Unless the step is set to the any literal, the value must be min + an integral multiple of the step. |
| minlength | InputSignal<number> | undefined | The number of characters (code points) must not be less than the value of the attribute, if non-empty. |
| maxlength | InputSignal<number> | undefined | The number of characters (code points) must not exceed the value of the attribute. |
| id | string | - | Unique identifier of the component |
| scrollHeight | string | 200px | Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value. |
| filter | boolean | false | When specified, displays an input field to filter the items on keyup. |
| panelStyle | { [klass: string]: any } | - | Inline style of the overlay panel element. |
| styleClass | string | - | Style class of the element. **(Deprecated)** |
| panelStyleClass | string | - | Style class of the overlay panel element. |
| readonly | boolean | false | When present, it specifies that the component cannot be edited. |
| editable | boolean | false | When present, custom value instead of predefined options can be entered using the editable input field. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| placeholder | Signal<string> | - | Default text to display when no option is selected. |
| loadingIcon | string | - | Icon to display in loading state. |
| filterPlaceholder | string | - | Placeholder text to show when filter input is empty. |
| filterLocale | string | - | Locale to use in filtering. The default locale is the host environment's current locale. |
| inputId | string | - | Identifier of the accessible input element. |
| dataKey | string | - | A property to uniquely identify a value in options. |
| filterBy | string | - | When filtering is enabled, filterBy decides which field or fields (comma separated) to search against. |
| filterFields | any[] | - | Fields used when filtering the options, defaults to optionLabel. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| resetFilterOnHide | boolean | false | Clears the filter value when hiding the select. |
| checkmark | boolean | false | Whether the selected option will be shown with a check mark. |
| dropdownIcon | string | - | Icon class of the select icon. |
| loading | boolean | false | Whether the select is in loading state. |
| optionLabel | string | - | Name of the label field of an option. |
| optionValue | string | - | Name of the value field of an option. |
| optionDisabled | string | - | Name of the disabled field of an option. |
| optionGroupLabel | string | label | Name of the label field of an option group. |
| optionGroupChildren | string | items | Name of the options field of an option group. |
| group | boolean | false | Whether to display options as grouped when nested options are provided. |
| showClear | boolean | false | When enabled, a clear icon is displayed to clear the value. |
| emptyFilterMessage | string | - | Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration. |
| emptyMessage | string | - | Text to display when there is no data. Defaults to global value in i18n translation configuration. |
| lazy | boolean | false | Defines if data is loaded and interacted with in lazy manner. |
| virtualScroll | boolean | false | Whether the data should be loaded on demand during scroll. |
| virtualScrollItemSize | number | - | Height of an item in the list for VirtualScrolling. |
| virtualScrollOptions | ScrollerOptions | - | Whether to use the scroller feature. The properties of scroller component can be used like an object in it. |
| overlayOptions | OverlayOptions | - | Whether to use overlay API feature. The properties of overlay API can be used like an object in it. |
| ariaFilterLabel | string | - | Defines a string that labels the filter input. |
| ariaLabel | string | - | Used to define a aria label attribute the current element. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| filterMatchMode | "startsWith" \| "contains" \| "endsWith" \| "equals" \| "notEquals" \| "in" \| "lt" \| "lte" \| "gt" \| "gte" | contains | Defines how the items are filtered. |
| tooltip | string | - | Advisory information to display in a tooltip on hover. |
| tooltipPosition | "right" \| "left" \| "top" \| "bottom" | right | Position of the tooltip. |
| tooltipPositionStyle | string | absolute | Type of CSS position. |
| tooltipStyleClass | string | - | Style class of the tooltip. |
| focusOnHover | boolean | true | Fields used when filtering the options, defaults to optionLabel. |
| selectOnFocus | boolean | false | Determines if the option will be selected on focus. |
| autoOptionFocus | boolean | false | Whether to focus on the first visible or selected element when the overlay panel is shown. |
| autofocusFilter | boolean | true | Applies focus to the filter element when the overlay is shown. |
| filterValue | string | - | When specified, filter displays with this value. |
| options | any[] | - | An array of objects to display as the available options. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | event: SelectChangeEvent | Callback to invoke when value of select changes. |
| onFilter | event: SelectFilterEvent | Callback to invoke when data is filtered. |
| onFocus | event: Event | Callback to invoke when select gets focus. |
| onBlur | event: Event | Callback to invoke when select loses focus. |
| onClick | event: MouseEvent | Callback to invoke when component is clicked. |
| onShow | event: AnimationEvent | Callback to invoke when select overlay gets visible. |
| onHide | event: AnimationEvent | Callback to invoke when select overlay gets hidden. |
| onClear | event: Event | Callback to invoke when select clears the value. |
| onLazyLoad | event: SelectLazyLoadEvent | Callback to invoke in lazy mode to load new data. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| item | TemplateRef<SelectItemTemplateContext<any>> | Custom item template. |
| group | TemplateRef<SelectGroupTemplateContext<any>> | Custom group template. |
| loader | TemplateRef<SelectLoaderTemplateContext> | Custom loader template. |
| selecteditem | TemplateRef<SelectSelectedItemTemplateContext<any>> | Custom selected item template. |
| header | TemplateRef<void> | Custom header template. |
| filter | TemplateRef<SelectFilterTemplateContext> | Custom filter template. |
| footer | TemplateRef<void> | Custom footer template. |
| emptyfilter | TemplateRef<void> | Custom empty filter template. |
| empty | TemplateRef<void> | Custom empty template. |
| dropdownicon | TemplateRef<SelectIconTemplateContext> | Custom dropdown icon template. |
| loadingicon | TemplateRef<void> | Custom loading icon template. |
| clearicon | TemplateRef<SelectIconTemplateContext> | Custom clear icon template. |
| filtericon | TemplateRef<void> | Custom filter icon template. |
| onicon | TemplateRef<void> | Custom on icon template. |
| officon | TemplateRef<void> | Custom off icon template. |
| cancelicon | TemplateRef<void> | Custom cancel icon template. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| resetFilter |  | void | Callback to invoke on filter reset. |
| show | isFocus: any | void | Displays the panel. |
| hide | isFocus: any | void | Hides the panel. |
| focus |  | void | Applies focus. |
| clear | event: Event | void | Clears the model. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the root's DOM element. |
| label | PassThroughOption<HTMLSpanElement \| HTMLInputElement, I> | Used to pass attributes to the label's DOM element. |
| clearIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the clear icon's DOM element. |
| dropdown | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the dropdown's DOM element. |
| loadingIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the loading icon's DOM element. |
| dropdownIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the dropdown icon's DOM element. |
| pcOverlay | OverlayPassThrough | Used to pass attributes to the Overlay component. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| pcFilterContainer | IconFieldPassThrough | Used to pass attributes to the filter container's DOM element. |
| pcFilter | InputTextPassThrough | Used to pass attributes to the filter input's DOM element. |
| pcFilterIconContainer | InputIconPassThrough | Used to pass attributes to the filter icon container's DOM element. |
| filterIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the filter icon's DOM element. |
| listContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the list container's DOM element. |
| virtualScroller | VirtualScrollerPassThrough | Used to pass attributes to the VirtualScroller component. |
| list | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the list's DOM element. |
| optionGroup | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the option group's DOM element. |
| optionGroupLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the option group label's DOM element. |
| option | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the option's DOM element. |
| optionCheckIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the option check icon's DOM element. |
| optionBlankIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the option blank icon's DOM element. |
| optionLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the option label's DOM element. |
| emptyMessage | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the empty message's DOM element. |
| hiddenFirstFocusableEl | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hidden first focusable element's DOM element. |
| hiddenFilterResult | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hidden filter result's DOM element. |
| hiddenEmptyMessage | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hidden empty message's DOM element. |
| hiddenSelectedMessage | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hidden selected message's DOM element. |
| hiddenLastFocusableEl | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hidden last focusable element's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-select | Class name of the root element |
| p-select-label | Class name of the label element |
| p-select-clear-icon | Class name of the clear icon element |
| p-select-dropdown | Class name of the dropdown element |
| p-select-loading-icon | Class name of the loadingicon element |
| p-select-dropdown-icon | Class name of the dropdown icon element |
| p-select-overlay | Class name of the overlay element |
| p-select-header | Class name of the header element |
| p-select-filter | Class name of the filter element |
| p-select-list-container | Class name of the list container element |
| p-select-list | Class name of the list element |
| p-select-option-group | Class name of the option group element |
| p-select-option-group-label | Class name of the option group label element |
| p-select-option | Class name of the option element |
| p-select-option-label | Class name of the option label element |
| p-select-option-check-icon | Class name of the option check icon element |
| p-select-option-blank-icon | Class name of the option blank icon element |
| p-select-empty-message | Class name of the empty message element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| select.background | --p-select-background | Background of root |
| select.disabled.background | --p-select-disabled-background | Disabled background of root |
| select.filled.background | --p-select-filled-background | Filled background of root |
| select.filled.hover.background | --p-select-filled-hover-background | Filled hover background of root |
| select.filled.focus.background | --p-select-filled-focus-background | Filled focus background of root |
| select.border.color | --p-select-border-color | Border color of root |
| select.hover.border.color | --p-select-hover-border-color | Hover border color of root |
| select.focus.border.color | --p-select-focus-border-color | Focus border color of root |
| select.invalid.border.color | --p-select-invalid-border-color | Invalid border color of root |
| select.color | --p-select-color | Color of root |
| select.disabled.color | --p-select-disabled-color | Disabled color of root |
| select.placeholder.color | --p-select-placeholder-color | Placeholder color of root |
| select.invalid.placeholder.color | --p-select-invalid-placeholder-color | Invalid placeholder color of root |
| select.shadow | --p-select-shadow | Shadow of root |
| select.padding.x | --p-select-padding-x | Padding x of root |
| select.padding.y | --p-select-padding-y | Padding y of root |
| select.border.radius | --p-select-border-radius | Border radius of root |
| select.focus.ring.width | --p-select-focus-ring-width | Focus ring width of root |
| select.focus.ring.style | --p-select-focus-ring-style | Focus ring style of root |
| select.focus.ring.color | --p-select-focus-ring-color | Focus ring color of root |
| select.focus.ring.offset | --p-select-focus-ring-offset | Focus ring offset of root |
| select.focus.ring.shadow | --p-select-focus-ring-shadow | Focus ring shadow of root |
| select.transition.duration | --p-select-transition-duration | Transition duration of root |
| select.sm.font.size | --p-select-sm-font-size | Sm font size of root |
| select.sm.padding.x | --p-select-sm-padding-x | Sm padding x of root |
| select.sm.padding.y | --p-select-sm-padding-y | Sm padding y of root |
| select.lg.font.size | --p-select-lg-font-size | Lg font size of root |
| select.lg.padding.x | --p-select-lg-padding-x | Lg padding x of root |
| select.lg.padding.y | --p-select-lg-padding-y | Lg padding y of root |
| select.dropdown.width | --p-select-dropdown-width | Width of dropdown |
| select.dropdown.color | --p-select-dropdown-color | Color of dropdown |
| select.overlay.background | --p-select-overlay-background | Background of overlay |
| select.overlay.border.color | --p-select-overlay-border-color | Border color of overlay |
| select.overlay.border.radius | --p-select-overlay-border-radius | Border radius of overlay |
| select.overlay.color | --p-select-overlay-color | Color of overlay |
| select.overlay.shadow | --p-select-overlay-shadow | Shadow of overlay |
| select.list.padding | --p-select-list-padding | Padding of list |
| select.list.gap | --p-select-list-gap | Gap of list |
| select.list.header.padding | --p-select-list-header-padding | Header padding of list |
| select.option.focus.background | --p-select-option-focus-background | Focus background of option |
| select.option.selected.background | --p-select-option-selected-background | Selected background of option |
| select.option.selected.focus.background | --p-select-option-selected-focus-background | Selected focus background of option |
| select.option.color | --p-select-option-color | Color of option |
| select.option.focus.color | --p-select-option-focus-color | Focus color of option |
| select.option.selected.color | --p-select-option-selected-color | Selected color of option |
| select.option.selected.focus.color | --p-select-option-selected-focus-color | Selected focus color of option |
| select.option.padding | --p-select-option-padding | Padding of option |
| select.option.border.radius | --p-select-option-border-radius | Border radius of option |
| select.option.group.background | --p-select-option-group-background | Background of option group |
| select.option.group.color | --p-select-option-group-color | Color of option group |
| select.option.group.font.weight | --p-select-option-group-font-weight | Font weight of option group |
| select.option.group.padding | --p-select-option-group-padding | Padding of option group |
| select.clear.icon.color | --p-select-clear-icon-color | Color of clear icon |
| select.checkmark.color | --p-select-checkmark-color | Color of checkmark |
| select.checkmark.gutter.start | --p-select-checkmark-gutter-start | Gutter start of checkmark |
| select.checkmark.gutter.end | --p-select-checkmark-gutter-end | Gutter end of checkmark |
| select.empty.message.padding | --p-select-empty-message-padding | Padding of empty message |

