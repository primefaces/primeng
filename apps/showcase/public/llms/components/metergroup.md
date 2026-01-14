# Angular MeterGroup Component

MeterGroup displays scalar measurements within a known range.

## Accessibility

Screen Reader MeterGroup component uses meter role in addition to the aria-valuemin , aria-valuemax and aria-valuenow attributes. Value to describe the component can be defined using aria-labelledby prop. Keyboard Support Component does not include any interactive elements.

## Basic

MeterGroup requires a value as the data to display where each item in the collection should be a type of MeterItem .

```html
<p-metergroup [value]="value" />
```

## Icon

Icons can be displayed next to the labels instead of the default marker.

```html
<p-metergroup [value]="value" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <div class="card">
            <p-metergroup [value]="value" />
        </div>
    `,
    standalone: true,
    imports: [MeterGroupModule]
})
export class MetergroupIconDemo {
    value: any[];
}
```
</details>

## Label

The position of the labels relative to the meters is defined using the labelPosition property. The default orientation of the labels is horizontal, and the vertical alternative is available through the labelOrientation option.

```html
<p-metergroup [value]="value" labelPosition="start" labelOrientation="vertical" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <div class="card">
            <p-metergroup [value]="value" labelPosition="start" labelOrientation="vertical" />
        </div>
    `,
    standalone: true,
    imports: [MeterGroupModule]
})
export class MetergroupLabelDemo {
    value: any[];
}
```
</details>

## Min Max

Boundaries are configured with the min and max values whose defaults are 0 and 100 respectively.

```html
<p-metergroup [value]="value" [max]="200" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <div class="card">
            <p-metergroup [value]="value" [max]="200" />
        </div>
    `,
    standalone: true,
    imports: [MeterGroupModule]
})
export class MetergroupMinmaxDemo {
    value: any[];
}
```
</details>

## Multiple

Adding more items to the array displays the meters in a group.

```html
<p-metergroup [value]="value" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <div class="card">
            <p-metergroup [value]="value" />
        </div>
    `,
    standalone: true,
    imports: [MeterGroupModule]
})
export class MetergroupMultipleDemo {
    value: any[];
}
```
</details>

## Template

MeterGroup provides templating support for labels, meter items, and content around the meters.

```html
<p-metergroup [value]="value" labelPosition="start">
    <ng-template #label>
        <div class="flex flex-wrap gap-4">
            <ng-container *ngFor="let meterItem of value; let index = index">
                <p-card class="flex-1" styleClass="border border-surface shadow-none">
                    <div class="flex justify-between gap-8">
                        <div class="flex flex-col gap-1">
                            <span class="text-surface-500 dark:text-surface-400 text-sm">{{ meterItem.label }}</span>
                            <span class="font-bold text-lg">{{ meterItem.value }}%</span>
                        </div>
                        <span class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center" [style]="{ 'background-color': meterItem.color1, color: '#ffffff' }">
                            <i [class]="meterItem.icon"></i>
                        </span>
                    </div>
                </p-card>
            </ng-container>
        </div>
    </ng-template>
    <ng-template #meter let-value let-class="class" let-width="size">
        <span [class]="class" [style]="{ background: 'linear-gradient(to right, ' + value.color1 + ', ' + value.color2 + ')', width: width }"></span>
    </ng-template>
    <ng-template #start let-totalPercent="totalPercent">
        <div class="flex justify-between mt-4 mb-2 relative">
            <span>Storage</span>
            <span [style]="{ width: totalPercent + '%' }" class="absolute text-right">{{ totalPercent }}%</span>
            <span class="font-medium">1TB</span>
        </div>
    </ng-template>
    <ng-template #end>
        <div class="flex justify-between mt-4">
            <p-button label="Manage Storage" [outlined]="true" size="small" />
            <p-button label="Update Plan" size="small" />
        </div>
    </ng-template>
</p-metergroup>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <div class="card">
            <p-metergroup [value]="value" labelPosition="start">
                <ng-template #label>
                    <div class="flex flex-wrap gap-4">
                        <ng-container *ngFor="let meterItem of value; let index = index">
                            <p-card class="flex-1" styleClass="border border-surface shadow-none">
                                <div class="flex justify-between gap-8">
                                    <div class="flex flex-col gap-1">
                                        <span class="text-surface-500 dark:text-surface-400 text-sm">{{ meterItem.label }}</span>
                                        <span class="font-bold text-lg">{{ meterItem.value }}%</span>
                                    </div>
                                    <span class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center" [style]="{ 'background-color': meterItem.color1, color: '#ffffff' }">
                                        <i [class]="meterItem.icon"></i>
                                    </span>
                                </div>
                            </p-card>
                        </ng-container>
                    </div>
                </ng-template>
                <ng-template #meter let-value let-class="class" let-width="size">
                    <span [class]="class" [style]="{ background: 'linear-gradient(to right, ' + value.color1 + ', ' + value.color2 + ')', width: width }"></span>
                </ng-template>
                <ng-template #start let-totalPercent="totalPercent">
                    <div class="flex justify-between mt-4 mb-2 relative">
                        <span>Storage</span>
                        <span [style]="{ width: totalPercent + '%' }" class="absolute text-right">{{ totalPercent }}%</span>
                        <span class="font-medium">1TB</span>
                    </div>
                </ng-template>
                <ng-template #end>
                    <div class="flex justify-between mt-4">
                        <p-button label="Manage Storage" [outlined]="true" size="small" />
                        <p-button label="Update Plan" size="small" />
                    </div>
                </ng-template>
            </p-metergroup>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, CardModule, MeterGroupModule]
})
export class MetergroupTemplateDemo {
    value: any[];
}
```
</details>

## Vertical

Layout of the MeterGroup is configured with the orientation property that accepts either horizontal or vertical as available options.

```html
<p-metergroup [value]="value" orientation="vertical" labelOrientation="vertical" [style]="{ height: '300px' }" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-metergroup [value]="value" orientation="vertical" labelOrientation="vertical" [style]="{ height: '300px' }" />
        </div>
    `,
    standalone: true,
    imports: [MeterGroupModule]
})
export class MetergroupVerticalDemo {
    value: any[];
}
```
</details>

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| meters | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the meters' DOM element. |
| meter | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the meter's DOM element. |
| labelList | PassThroughOption<HTMLOListElement, I> | Used to pass attributes to the label list's DOM element. |
| label | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the label's DOM element. |
| labelIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the label icon's DOM element. |
| labelMarker | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the label marker's DOM element. |
| labelText | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the label text's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-metergroup | Class name of the root element |
| p-metergroup-meters | Class name of the meters element |
| p-metergroup-meter | Class name of the meter element |
| p-metergroup-label-list | Class name of the label list element |
| p-metergroup-label | Class name of the label element |
| p-metergroup-label-icon | Class name of the label icon element |
| p-metergroup-label-marker | Class name of the label marker element |
| p-metergroup-label-text | Class name of the label text element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| metergroup.border.radius | --p-metergroup-border-radius | Border radius of root |
| metergroup.gap | --p-metergroup-gap | Gap of root |
| metergroup.meters.background | --p-metergroup-meters-background | Background of meters |
| metergroup.meters.size | --p-metergroup-meters-size | Size of meters |
| metergroup.label.gap | --p-metergroup-label-gap | Gap of label |
| metergroup.label.marker.size | --p-metergroup-label-marker-size | Size of label marker |
| metergroup.label.icon.size | --p-metergroup-label-icon-size | Size of label icon |
| metergroup.label.list.vertical.gap | --p-metergroup-label-list-vertical-gap | Vertical gap of label list |
| metergroup.label.list.horizontal.gap | --p-metergroup-label-list-horizontal-gap | Horizontal gap of label list |

