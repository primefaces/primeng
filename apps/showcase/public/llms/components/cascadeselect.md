# Angular CascadeSelect Component

CascadeSelect displays a nested structure of options.

## Accessibility

Screen Reader Value to describe the component can either be provided with ariaLabelledBy or ariaLabel props. The cascadeselect element has a combobox role in addition to aria-haspopup and aria-expanded attributes. The relation between the combobox and the popup is created with aria-controls that refers to the id of the popup. The popup list has an id that refers to the aria-controls attribute of the combobox element and uses tree as the role. Each list item has a treeitem role along with aria-label , aria-selected and aria-expanded attributes. The container element of a treenode has the group role. The aria-setsize , aria-posinset and aria-level attributes are calculated implicitly and added to each treeitem.

<details>
<summary>TypeScript Example</summary>

```typescript
<span id="dd1">Options</span>
<p-cascadeselect ariaLabelledBy="dd1"/>

<p-cascadeselect ariaLabel="Options"/>
```
</details>

## Basic

CascadeSelect requires a value to bind and a collection of arbitrary objects with a nested hierarchy. optionGroupLabel is used for the text of a category and optionGroupChildren is to define the children of the category. Note that order of the optionGroupChildren matters and it should correspond to the data hierarchy.

## Clear Icon

When showClear is enabled, a clear icon is displayed to clear the value.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-cascadeselect [(ngModel)]="selectedCity" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" placeholder="Select a City" [style]="{ minWidth: '14rem' }" [showClear]="true" />
        </div>
    `,
    standalone: true,
    imports: [CascadeSelectModule, FormsModule]
})
export class CascadeselectCleariconDemo implements OnInit {
    countries: any[] | undefined;
    selectedCity: any;

    ngOnInit() {
        this.countries = [
            {
                name: 'Australia',
                code: 'AU',
                states: [
                    {
                        name: 'New South Wales',
                        cities: [
                            { cname: 'Sydney', code: 'A-SY' },
                            { cname: 'Newcastle', code: 'A-NE' },
                            { cname: 'Wollongong', code: 'A-WO' }
                        ]
                    },
                    {
                        name: 'Queensland',
                        cities: [
                            { cname: 'Brisbane', code: 'A-BR' },
                            { cname: 'Townsville', code: 'A-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                states: [
                    {
                        name: 'Quebec',
                        cities: [
                            { cname: 'Montreal', code: 'C-MO' },
                            { cname: 'Quebec City', code: 'C-QU' }
                        ]
                    },
                    {
                        name: 'Ontario',
                        cities: [
                            { cname: 'Ottawa', code: 'C-OT' },
                            { cname: 'Toronto', code: 'C-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                states: [
                    {
                        name: 'California',
                        cities: [
                            { cname: 'Los Angeles', code: 'US-LA' },
                            { cname: 'San Diego', code: 'US-SD' },
                            { cname: 'San Francisco', code: 'US-SF' }
                        ]
                    },
                    {
                        name: 'Florida',
                        cities: [
                            { cname: 'Jacksonville', code: 'US-JA' },
                            { cname: 'Miami', code: 'US-MI' },
                            { cname: 'Tampa', code: 'US-TA' },
                            { cname: 'Orlando', code: 'US-OR' }
                        ]
                    },
                    {
                        name: 'Texas',
                        cities: [
                            { cname: 'Austin', code: 'US-AU' },
                            { cname: 'Dallas', code: 'US-DA' },
                            { cname: 'Houston', code: 'US-HO' }
                        ]
                    }
                ]
            }
        ];
    }
}
```
</details>

## Disabled

When disabled is present, the element cannot be edited and focused.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-cascadeselect [disabled]="true" placeholder="Disabled" [style]="{ minWidth: '14rem' }" />
        </div>
    `,
    standalone: true,
    imports: [CascadeSelectModule]
})
export class CascadeselectDisabledDemo {}
```
</details>

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-cascadeselect [(ngModel)]="selectedCity" variant="filled" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" [style]="{ minWidth: '14rem' }" placeholder="Select a City" />
        </div>
    `,
    standalone: true,
    imports: [CascadeSelectModule, FormsModule]
})
export class CascadeselectFilledDemo implements OnInit {
    countries: any[] | undefined;
    selectedCity: any;

    ngOnInit() {
        this.countries = [
            {
                name: 'Australia',
                code: 'AU',
                states: [
                    {
                        name: 'New South Wales',
                        cities: [
                            { cname: 'Sydney', code: 'A-SY' },
                            { cname: 'Newcastle', code: 'A-NE' },
                            { cname: 'Wollongong', code: 'A-WO' }
                        ]
                    },
                    {
                        name: 'Queensland',
                        cities: [
                            { cname: 'Brisbane', code: 'A-BR' },
                            { cname: 'Townsville', code: 'A-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                states: [
                    {
                        name: 'Quebec',
                        cities: [
                            { cname: 'Montreal', code: 'C-MO' },
                            { cname: 'Quebec City', code: 'C-QU' }
                        ]
                    },
                    {
                        name: 'Ontario',
                        cities: [
                            { cname: 'Ottawa', code: 'C-OT' },
                            { cname: 'Toronto', code: 'C-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                states: [
                    {
                        name: 'California',
                        cities: [
                            { cname: 'Los Angeles', code: 'US-LA' },
                            { cname: 'San Diego', code: 'US-SD' },
                            { cname: 'San Francisco', code: 'US-SF' }
                        ]
                    },
                    {
                        name: 'Florida',
                        cities: [
                            { cname: 'Jacksonville', code: 'US-JA' },
                            { cname: 'Miami', code: 'US-MI' },
                            { cname: 'Tampa', code: 'US-TA' },
                            { cname: 'Orlando', code: 'US-OR' }
                        ]
                    },
                    {
                        name: 'Texas',
                        cities: [
                            { cname: 'Austin', code: 'US-AU' },
                            { cname: 'Dallas', code: 'US-DA' },
                            { cname: 'Houston', code: 'US-HO' }
                        ]
                    }
                ]
            }
        ];
    }
}
```
</details>

## floatlabel-doc

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel class="w-full md:w-56">
                <p-cascadeselect [(ngModel)]="value1" inputId="over_label" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" class="w-full" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>
            <p-floatlabel class="w-full md:w-56" variant="in">
                <p-cascadeselect [(ngModel)]="value2" inputId="in_label" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" class="w-full" />
                <label for="in_label">In Label</label>
            </p-floatlabel>
            <p-floatlabel class="w-full md:w-56" variant="on">
                <p-cascadeselect [(ngModel)]="value3" inputId="on_label" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" class="w-full" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
    `,
    standalone: true,
    imports: [CascadeSelectModule, FloatLabelModule, FormsModule]
})
export class CascadeselectFloatlabelDemo implements OnInit {
    value1: string | undefined;
    value2: string | undefined;
    value3: string | undefined;
    countries: any[] | undefined;
    selectedCity: any;

    ngOnInit() {
        this.countries = [
            {
                name: 'Australia',
                code: 'AU',
                states: [
                    {
                        name: 'New South Wales',
                        cities: [
                            { cname: 'Sydney', code: 'A-SY' },
                            { cname: 'Newcastle', code: 'A-NE' },
                            { cname: 'Wollongong', code: 'A-WO' }
                        ]
                    },
                    {
                        name: 'Queensland',
                        cities: [
                            { cname: 'Brisbane', code: 'A-BR' },
                            { cname: 'Townsville', code: 'A-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                states: [
                    {
                        name: 'Quebec',
                        cities: [
                            { cname: 'Montreal', code: 'C-MO' },
                            { cname: 'Quebec City', code: 'C-QU' }
                        ]
                    },
                    {
                        name: 'Ontario',
                        cities: [
                            { cname: 'Ottawa', code: 'C-OT' },
                            { cname: 'Toronto', code: 'C-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                states: [
                    {
                        name: 'California',
                        cities: [
                            { cname: 'Los Angeles', code: 'US-LA' },
                            { cname: 'San Diego', code: 'US-SD' },
                            { cname: 'San Francisco', code: 'US-SF' }
                        ]
                    },
                    {
                        name: 'Florida',
                        cities: [
                            { cname: 'Jacksonville', code: 'US-JA' },
                            { cname: 'Miami', code: 'US-MI' },
                            { cname: 'Tampa', code: 'US-TA' },
                            { cname: 'Orlando', code: 'US-OR' }
                        ]
                    },
                    {
                        name: 'Texas',
                        cities: [
                            { cname: 'Austin', code: 'US-AU' },
                            { cname: 'Dallas', code: 'US-DA' },
                            { cname: 'Houston', code: 'US-HO' }
                        ]
                    }
                ]
            }
        ];
    }
}
```
</details>

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
    template: `
        <div class="card">
            <p-cascadeselect [(ngModel)]="selectedCity" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" placeholder="Select a City" fluid />
        </div>
    `,
    standalone: true,
    imports: [CascadeSelectModule, FormsModule]
})
export class CascadeselectFluidDemo implements OnInit {
    countries: any[] | undefined;
    selectedCity: any;

    ngOnInit() {
        this.countries = [
            {
                name: 'Australia',
                code: 'AU',
                states: [
                    {
                        name: 'New South Wales',
                        cities: [
                            { cname: 'Sydney', code: 'A-SY' },
                            { cname: 'Newcastle', code: 'A-NE' },
                            { cname: 'Wollongong', code: 'A-WO' }
                        ]
                    },
                    {
                        name: 'Queensland',
                        cities: [
                            { cname: 'Brisbane', code: 'A-BR' },
                            { cname: 'Townsville', code: 'A-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                states: [
                    {
                        name: 'Quebec',
                        cities: [
                            { cname: 'Montreal', code: 'C-MO' },
                            { cname: 'Quebec City', code: 'C-QU' }
                        ]
                    },
                    {
                        name: 'Ontario',
                        cities: [
                            { cname: 'Ottawa', code: 'C-OT' },
                            { cname: 'Toronto', code: 'C-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                states: [
                    {
                        name: 'California',
                        cities: [
                            { cname: 'Los Angeles', code: 'US-LA' },
                            { cname: 'San Diego', code: 'US-SD' },
                            { cname: 'San Francisco', code: 'US-SF' }
                        ]
                    },
                    {
                        name: 'Florida',
                        cities: [
                            { cname: 'Jacksonville', code: 'US-JA' },
                            { cname: 'Miami', code: 'US-MI' },
                            { cname: 'Tampa', code: 'US-TA' },
                            { cname: 'Orlando', code: 'US-OR' }
                        ]
                    },
                    {
                        name: 'Texas',
                        cities: [
                            { cname: 'Austin', code: 'US-AU' },
                            { cname: 'Dallas', code: 'US-DA' },
                            { cname: 'Houston', code: 'US-HO' }
                        ]
                    }
                ]
            }
        ];
    }
}
```
</details>

## iftalabel-doc

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-iftalabel class="w-full md:w-56">
                <p-cascadeselect [(ngModel)]="selectedCity" inputId="cs_city" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" class="w-full" />
                <label for="cs_city">City</label>
            </p-iftalabel>
        </div>
    `,
    standalone: true,
    imports: [CascadeSelectModule, IftaLabelModule, FormsModule]
})
export class CascadeselectIftalabelDemo implements OnInit {
    countries: any[] | undefined;
    selectedCity: any;

    ngOnInit() {
        this.countries = [
            {
                name: 'Australia',
                code: 'AU',
                states: [
                    {
                        name: 'New South Wales',
                        cities: [
                            { cname: 'Sydney', code: 'A-SY' },
                            { cname: 'Newcastle', code: 'A-NE' },
                            { cname: 'Wollongong', code: 'A-WO' }
                        ]
                    },
                    {
                        name: 'Queensland',
                        cities: [
                            { cname: 'Brisbane', code: 'A-BR' },
                            { cname: 'Townsville', code: 'A-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                states: [
                    {
                        name: 'Quebec',
                        cities: [
                            { cname: 'Montreal', code: 'C-MO' },
                            { cname: 'Quebec City', code: 'C-QU' }
                        ]
                    },
                    {
                        name: 'Ontario',
                        cities: [
                            { cname: 'Ottawa', code: 'C-OT' },
                            { cname: 'Toronto', code: 'C-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                states: [
                    {
                        name: 'California',
                        cities: [
                            { cname: 'Los Angeles', code: 'US-LA' },
                            { cname: 'San Diego', code: 'US-SD' },
                            { cname: 'San Francisco', code: 'US-SF' }
                        ]
                    },
                    {
                        name: 'Florida',
                        cities: [
                            { cname: 'Jacksonville', code: 'US-JA' },
                            { cname: 'Miami', code: 'US-MI' },
                            { cname: 'Tampa', code: 'US-TA' },
                            { cname: 'Orlando', code: 'US-OR' }
                        ]
                    },
                    {
                        name: 'Texas',
                        cities: [
                            { cname: 'Austin', code: 'US-AU' },
                            { cname: 'Dallas', code: 'US-DA' },
                            { cname: 'Houston', code: 'US-HO' }
                        ]
                    }
                ]
            }
        ];
    }
}
```
</details>

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center gap-4">
            <p-cascadeselect [(ngModel)]="selectedCity1" [invalid]="!selectedCity1" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" class="w-full sm:w-56" placeholder="Select a City" />
            <p-cascadeselect
                [(ngModel)]="selectedCity2"
                [invalid]="!selectedCity2"
                [options]="countries"
                optionLabel="cname"
                optionGroupLabel="name"
                [optionGroupChildren]="['states', 'cities']"
                class="w-full sm:w-56"
                placeholder="Select a City"
                variant="filled"
            />
        </div>
    `,
    standalone: true,
    imports: [CascadeSelectModule, FormsModule]
})
export class CascadeselectInvalidDemo implements OnInit {
    countries: any[] | undefined;
    selectedCity1: any;
    selectedCity2: any;

    ngOnInit() {
        this.countries = [
            {
                name: 'Australia',
                code: 'AU',
                states: [
                    {
                        name: 'New South Wales',
                        cities: [
                            { cname: 'Sydney', code: 'A-SY' },
                            { cname: 'Newcastle', code: 'A-NE' },
                            { cname: 'Wollongong', code: 'A-WO' }
                        ]
                    },
                    {
                        name: 'Queensland',
                        cities: [
                            { cname: 'Brisbane', code: 'A-BR' },
                            { cname: 'Townsville', code: 'A-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                states: [
                    {
                        name: 'Quebec',
                        cities: [
                            { cname: 'Montreal', code: 'C-MO' },
                            { cname: 'Quebec City', code: 'C-QU' }
                        ]
                    },
                    {
                        name: 'Ontario',
                        cities: [
                            { cname: 'Ottawa', code: 'C-OT' },
                            { cname: 'Toronto', code: 'C-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                states: [
                    {
                        name: 'California',
                        cities: [
                            { cname: 'Los Angeles', code: 'US-LA' },
                            { cname: 'San Diego', code: 'US-SD' },
                            { cname: 'San Francisco', code: 'US-SF' }
                        ]
                    },
                    {
                        name: 'Florida',
                        cities: [
                            { cname: 'Jacksonville', code: 'US-JA' },
                            { cname: 'Miami', code: 'US-MI' },
                            { cname: 'Tampa', code: 'US-TA' },
                            { cname: 'Orlando', code: 'US-OR' }
                        ]
                    },
                    {
                        name: 'Texas',
                        cities: [
                            { cname: 'Austin', code: 'US-AU' },
                            { cname: 'Dallas', code: 'US-DA' },
                            { cname: 'Houston', code: 'US-HO' }
                        ]
                    }
                ]
            }
        ];
    }
}
```
</details>

## Loading State

Loading state can be used loading property.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-cascadeselect [loading]="true" [style]="{ minWidth: '14rem' }" placeholder="Loading..." />
        </div>
    `,
    standalone: true,
    imports: [CascadeSelectModule]
})
export class CascadeselectLoadingDemo {}
```
</details>

## reactiveforms-doc

CascadeSelect can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <p-cascadeselect
                        formControlName="selectedCity"
                        [options]="countries"
                        optionLabel="cname"
                        optionGroupLabel="name"
                        [optionGroupChildren]="['states', 'cities']"
                        [style]="{ minWidth: '14rem' }"
                        placeholder="Select a City"
                        [invalid]="isInvalid('selectedCity')"
                    />
                    @if (isInvalid('selectedCity')) {
                        <p-message severity="error" size="small" variant="simple">City is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [CascadeSelectModule, MessageModule, ToastModule, ButtonModule, ReactiveFormsModule]
})
export class CascadeselectReactiveformsDemo {
    countries: any[] | undefined;
    formGroup: FormGroup | undefined;
    messageService = inject(MessageService);
    exampleForm: FormGroup | undefined;
    formSubmitted: boolean = false;

    constructor() {
        this.countries = [
                    {
                        name: 'Australia',
                        code: 'AU',
                        states: [
                            {
                                name: 'New South Wales',
                                cities: [
                                    { cname: 'Sydney', code: 'A-SY' },
                                    { cname: 'Newcastle', code: 'A-NE' },
                                    { cname: 'Wollongong', code: 'A-WO' }
                                ]
                            },
                            {
                                name: 'Queensland',
                                cities: [
                                    { cname: 'Brisbane', code: 'A-BR' },
                                    { cname: 'Townsville', code: 'A-TO' }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Canada',
                        code: 'CA',
                        states: [
                            {
                                name: 'Quebec',
                                cities: [
                                    { cname: 'Montreal', code: 'C-MO' },
                                    { cname: 'Quebec City', code: 'C-QU' }
                                ]
                            },
                            {
                                name: 'Ontario',
                                cities: [
                                    { cname: 'Ottawa', code: 'C-OT' },
                                    { cname: 'Toronto', code: 'C-TO' }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'United States',
                        code: 'US',
                        states: [
                            {
                                name: 'California',
                                cities: [
                                    { cname: 'Los Angeles', code: 'US-LA' },
                                    { cname: 'San Diego', code: 'US-SD' },
                                    { cname: 'San Francisco', code: 'US-SF' }
                                ]
                            },
                            {
                                name: 'Florida',
                                cities: [
                                    { cname: 'Jacksonville', code: 'US-JA' },
                                    { cname: 'Miami', code: 'US-MI' },
                                    { cname: 'Tampa', code: 'US-TA' },
                                    { cname: 'Orlando', code: 'US-OR' }
                                ]
                            },
                            {
                                name: 'Texas',
                                cities: [
                                    { cname: 'Austin', code: 'US-AU' },
                                    { cname: 'Dallas', code: 'US-DA' },
                                    { cname: 'Houston', code: 'US-HO' }
                                ]
                            }
                        ]
                    }
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

## Sizes

CascadeSelect provides small and large sizes as alternatives to the base.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
    template: `
        <div class="card flex flex-col items-center gap-4">
            <p-cascadeselect [(ngModel)]="value1" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" class="w-56" size="small" placeholder="Small" />
            <p-cascadeselect [(ngModel)]="value2" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" class="w-56" placeholder="Normal" />
            <p-cascadeselect [(ngModel)]="value3" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" class="w-56" size="large" placeholder="Large" />
        </div>
    `,
    standalone: true,
    imports: [CascadeSelectModule, FormsModule]
})
export class CascadeselectSizesDemo implements OnInit {
    countries: any[] | undefined;
    value1: any;
    value2: any;
    value3: any;

    ngOnInit() {
        this.countries = [
            {
                name: 'Australia',
                code: 'AU',
                states: [
                    {
                        name: 'New South Wales',
                        cities: [
                            { cname: 'Sydney', code: 'A-SY' },
                            { cname: 'Newcastle', code: 'A-NE' },
                            { cname: 'Wollongong', code: 'A-WO' }
                        ]
                    },
                    {
                        name: 'Queensland',
                        cities: [
                            { cname: 'Brisbane', code: 'A-BR' },
                            { cname: 'Townsville', code: 'A-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                states: [
                    {
                        name: 'Quebec',
                        cities: [
                            { cname: 'Montreal', code: 'C-MO' },
                            { cname: 'Quebec City', code: 'C-QU' }
                        ]
                    },
                    {
                        name: 'Ontario',
                        cities: [
                            { cname: 'Ottawa', code: 'C-OT' },
                            { cname: 'Toronto', code: 'C-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                states: [
                    {
                        name: 'California',
                        cities: [
                            { cname: 'Los Angeles', code: 'US-LA' },
                            { cname: 'San Diego', code: 'US-SD' },
                            { cname: 'San Francisco', code: 'US-SF' }
                        ]
                    },
                    {
                        name: 'Florida',
                        cities: [
                            { cname: 'Jacksonville', code: 'US-JA' },
                            { cname: 'Miami', code: 'US-MI' },
                            { cname: 'Tampa', code: 'US-TA' },
                            { cname: 'Orlando', code: 'US-OR' }
                        ]
                    },
                    {
                        name: 'Texas',
                        cities: [
                            { cname: 'Austin', code: 'US-AU' },
                            { cname: 'Dallas', code: 'US-DA' },
                            { cname: 'Houston', code: 'US-HO' }
                        ]
                    }
                ]
            }
        ];
    }
}
```
</details>

## Template

Label of an option is used as the display text of an item by default, for custom content support define an option template that gets the option instance as a parameter. In addition value , dropdownicon , loadingicon , and optiongroupicon slots are provided for further customization.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-cascadeselect [(ngModel)]="selectedCity" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" [style]="{ minWidth: '14rem' }" placeholder="Select a City">
                <ng-template #option let-option>
                    <div class="flex items-center">
                        <img *ngIf="option.states" src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'mr-2 flag flag-' + option.code.toLowerCase()" style="width: 18px" />
                        <i class="pi pi-compass mr-2" *ngIf="option.cities"></i>
                        <i class="pi pi-map-marker mr-2" *ngIf="option.cname"></i>
                        <span>{{ option.cname || option.name }}</span>
                    </div>
                </ng-template>
                <ng-template #triggericon>
                    <i class="pi pi-map"></i>
                </ng-template>
                <ng-template #header>
                    <div class="font-medium px-3 py-2">Available Countries</div>
                </ng-template>
                <ng-template #footer>
                    <div class="px-3 py-1">
                        <p-button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" />
                    </div>
                </ng-template>
            </p-cascadeselect>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, CascadeSelectModule, FormsModule]
})
export class CascadeselectTemplateDemo implements OnInit {
    countries: any[] | undefined;
    selectedCity: any;

    ngOnInit() {
        this.countries = [
            {
                name: 'Australia',
                code: 'AU',
                states: [
                    {
                        name: 'New South Wales',
                        cities: [
                            { cname: 'Sydney', code: 'A-SY' },
                            { cname: 'Newcastle', code: 'A-NE' },
                            { cname: 'Wollongong', code: 'A-WO' }
                        ]
                    },
                    {
                        name: 'Queensland',
                        cities: [
                            { cname: 'Brisbane', code: 'A-BR' },
                            { cname: 'Townsville', code: 'A-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                states: [
                    {
                        name: 'Quebec',
                        cities: [
                            { cname: 'Montreal', code: 'C-MO' },
                            { cname: 'Quebec City', code: 'C-QU' }
                        ]
                    },
                    {
                        name: 'Ontario',
                        cities: [
                            { cname: 'Ottawa', code: 'C-OT' },
                            { cname: 'Toronto', code: 'C-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                states: [
                    {
                        name: 'California',
                        cities: [
                            { cname: 'Los Angeles', code: 'US-LA' },
                            { cname: 'San Diego', code: 'US-SD' },
                            { cname: 'San Francisco', code: 'US-SF' }
                        ]
                    },
                    {
                        name: 'Florida',
                        cities: [
                            { cname: 'Jacksonville', code: 'US-JA' },
                            { cname: 'Miami', code: 'US-MI' },
                            { cname: 'Tampa', code: 'US-TA' },
                            { cname: 'Orlando', code: 'US-OR' }
                        ]
                    },
                    {
                        name: 'Texas',
                        cities: [
                            { cname: 'Austin', code: 'US-AU' },
                            { cname: 'Dallas', code: 'US-DA' },
                            { cname: 'Houston', code: 'US-HO' }
                        ]
                    }
                ]
            }
        ];
    }
}
```
</details>

## templatedrivenforms-doc

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <p-cascadeselect
                        #city="ngModel"
                        [(ngModel)]="selectedCity"
                        [options]="countries"
                        [invalid]="city.invalid && (city.touched || exampleForm.submitted)"
                        name="city"
                        optionLabel="cname"
                        optionGroupLabel="name"
                        [optionGroupChildren]="['states', 'cities']"
                        [style]="{ minWidth: '14rem' }"
                        placeholder="Select a City"
                        required
                    />
                    @if (city.invalid && (city.touched || exampleForm.submitted)) {
                        <p-message severity="error" size="small" variant="simple">City is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [CascadeSelectModule, MessageModule, ToastModule, ButtonModule, FormsModule]
})
export class CascadeselectTemplatedrivenformsDemo {
    messageService = inject(MessageService);
    countries: any[] | undefined;
    selectedCity: any = null;

    constructor() {
        this.countries = [
                    {
                        name: 'Australia',
                        code: 'AU',
                        states: [
                            {
                                name: 'New South Wales',
                                cities: [
                                    { cname: 'Sydney', code: 'A-SY' },
                                    { cname: 'Newcastle', code: 'A-NE' },
                                    { cname: 'Wollongong', code: 'A-WO' }
                                ]
                            },
                            {
                                name: 'Queensland',
                                cities: [
                                    { cname: 'Brisbane', code: 'A-BR' },
                                    { cname: 'Townsville', code: 'A-TO' }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Canada',
                        code: 'CA',
                        states: [
                            {
                                name: 'Quebec',
                                cities: [
                                    { cname: 'Montreal', code: 'C-MO' },
                                    { cname: 'Quebec City', code: 'C-QU' }
                                ]
                            },
                            {
                                name: 'Ontario',
                                cities: [
                                    { cname: 'Ottawa', code: 'C-OT' },
                                    { cname: 'Toronto', code: 'C-TO' }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'United States',
                        code: 'US',
                        states: [
                            {
                                name: 'California',
                                cities: [
                                    { cname: 'Los Angeles', code: 'US-LA' },
                                    { cname: 'San Diego', code: 'US-SD' },
                                    { cname: 'San Francisco', code: 'US-SF' }
                                ]
                            },
                            {
                                name: 'Florida',
                                cities: [
                                    { cname: 'Jacksonville', code: 'US-JA' },
                                    { cname: 'Miami', code: 'US-MI' },
                                    { cname: 'Tampa', code: 'US-TA' },
                                    { cname: 'Orlando', code: 'US-OR' }
                                ]
                            },
                            {
                                name: 'Texas',
                                cities: [
                                    { cname: 'Austin', code: 'US-AU' },
                                    { cname: 'Dallas', code: 'US-DA' },
                                    { cname: 'Houston', code: 'US-HO' }
                                ]
                            }
                        ]
                    }
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

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| hiddenInputWrapper | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the hidden input wrapper's DOM element. |
| hiddenInput | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the hidden input's DOM element. |
| label | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the label's DOM element. |
| dropdown | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the dropdown's DOM element. |
| loadingIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the loading icon's DOM element. |
| dropdownIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the dropdown icon's DOM element. |
| clearIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the clear icon's DOM element. |
| overlay | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the overlay's DOM element. |
| listContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the list container's DOM element. |
| list | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the list's DOM element. |
| optionList | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the option list's DOM element. |
| option | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the option's DOM element. |
| optionContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the option content's DOM element. |
| optionText | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the option text's DOM element. |
| groupIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the group icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-cascadeselect | Class name of the root element |
| p-cascadeselect-label | Class name of the label element |
| p-cascadeselect-dropdown | Class name of the dropdown element |
| p-cascadeselect-loading-icon | Class name of the loading icon element |
| p-cascadeselect-clear-icon | Class name of the dropdown icon element |
| p-cascadeselect-dropdown-icon | Class name of the dropdown icon element |
| p-cascadeselect-overlay | Class name of the overlay element |
| p-cascadeselect-list-container | Class name of the list container element |
| p-cascadeselect-list | Class name of the list element |
| p-cascadeselect-item | Class name of the item element |
| p-cascadeselect-item-content | Class name of the item content element |
| p-cascadeselect-item-text | Class name of the item text element |
| p-cascadeselect-group-icon | Class name of the group icon element |
| p-cascadeselect-item-list | Class name of the item list element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| cascadeselect.background | --p-cascadeselect-background | Background of root |
| cascadeselect.disabled.background | --p-cascadeselect-disabled-background | Disabled background of root |
| cascadeselect.filled.background | --p-cascadeselect-filled-background | Filled background of root |
| cascadeselect.filled.hover.background | --p-cascadeselect-filled-hover-background | Filled hover background of root |
| cascadeselect.filled.focus.background | --p-cascadeselect-filled-focus-background | Filled focus background of root |
| cascadeselect.border.color | --p-cascadeselect-border-color | Border color of root |
| cascadeselect.hover.border.color | --p-cascadeselect-hover-border-color | Hover border color of root |
| cascadeselect.focus.border.color | --p-cascadeselect-focus-border-color | Focus border color of root |
| cascadeselect.invalid.border.color | --p-cascadeselect-invalid-border-color | Invalid border color of root |
| cascadeselect.color | --p-cascadeselect-color | Color of root |
| cascadeselect.disabled.color | --p-cascadeselect-disabled-color | Disabled color of root |
| cascadeselect.placeholder.color | --p-cascadeselect-placeholder-color | Placeholder color of root |
| cascadeselect.invalid.placeholder.color | --p-cascadeselect-invalid-placeholder-color | Invalid placeholder color of root |
| cascadeselect.shadow | --p-cascadeselect-shadow | Shadow of root |
| cascadeselect.padding.x | --p-cascadeselect-padding-x | Padding x of root |
| cascadeselect.padding.y | --p-cascadeselect-padding-y | Padding y of root |
| cascadeselect.border.radius | --p-cascadeselect-border-radius | Border radius of root |
| cascadeselect.focus.ring.width | --p-cascadeselect-focus-ring-width | Focus ring width of root |
| cascadeselect.focus.ring.style | --p-cascadeselect-focus-ring-style | Focus ring style of root |
| cascadeselect.focus.ring.color | --p-cascadeselect-focus-ring-color | Focus ring color of root |
| cascadeselect.focus.ring.offset | --p-cascadeselect-focus-ring-offset | Focus ring offset of root |
| cascadeselect.focus.ring.shadow | --p-cascadeselect-focus-ring-shadow | Focus ring shadow of root |
| cascadeselect.transition.duration | --p-cascadeselect-transition-duration | Transition duration of root |
| cascadeselect.sm.font.size | --p-cascadeselect-sm-font-size | Sm font size of root |
| cascadeselect.sm.padding.x | --p-cascadeselect-sm-padding-x | Sm padding x of root |
| cascadeselect.sm.padding.y | --p-cascadeselect-sm-padding-y | Sm padding y of root |
| cascadeselect.lg.font.size | --p-cascadeselect-lg-font-size | Lg font size of root |
| cascadeselect.lg.padding.x | --p-cascadeselect-lg-padding-x | Lg padding x of root |
| cascadeselect.lg.padding.y | --p-cascadeselect-lg-padding-y | Lg padding y of root |
| cascadeselect.dropdown.width | --p-cascadeselect-dropdown-width | Width of dropdown |
| cascadeselect.dropdown.color | --p-cascadeselect-dropdown-color | Color of dropdown |
| cascadeselect.overlay.background | --p-cascadeselect-overlay-background | Background of overlay |
| cascadeselect.overlay.border.color | --p-cascadeselect-overlay-border-color | Border color of overlay |
| cascadeselect.overlay.border.radius | --p-cascadeselect-overlay-border-radius | Border radius of overlay |
| cascadeselect.overlay.color | --p-cascadeselect-overlay-color | Color of overlay |
| cascadeselect.overlay.shadow | --p-cascadeselect-overlay-shadow | Shadow of overlay |
| cascadeselect.list.padding | --p-cascadeselect-list-padding | Padding of list |
| cascadeselect.list.gap | --p-cascadeselect-list-gap | Gap of list |
| cascadeselect.list.mobile.indent | --p-cascadeselect-list-mobile-indent | Mobile indent of list |
| cascadeselect.option.focus.background | --p-cascadeselect-option-focus-background | Focus background of option |
| cascadeselect.option.selected.background | --p-cascadeselect-option-selected-background | Selected background of option |
| cascadeselect.option.selected.focus.background | --p-cascadeselect-option-selected-focus-background | Selected focus background of option |
| cascadeselect.option.color | --p-cascadeselect-option-color | Color of option |
| cascadeselect.option.focus.color | --p-cascadeselect-option-focus-color | Focus color of option |
| cascadeselect.option.selected.color | --p-cascadeselect-option-selected-color | Selected color of option |
| cascadeselect.option.selected.focus.color | --p-cascadeselect-option-selected-focus-color | Selected focus color of option |
| cascadeselect.option.padding | --p-cascadeselect-option-padding | Padding of option |
| cascadeselect.option.border.radius | --p-cascadeselect-option-border-radius | Border radius of option |
| cascadeselect.option.icon.color | --p-cascadeselect-option-icon-color | Icon color of option |
| cascadeselect.option.icon.focus.color | --p-cascadeselect-option-icon-focus-color | Icon focus color of option |
| cascadeselect.option.icon.size | --p-cascadeselect-option-icon-size | Icon size of option |
| cascadeselect.clear.icon.color | --p-cascadeselect-clear-icon-color | Color of clear icon |

