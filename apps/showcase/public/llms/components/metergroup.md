# Angular MeterGroup Component

MeterGroup displays scalar measurements within a known range.

## Accessibility

Screen Reader MeterGroup component uses meter role in addition to the aria-valuemin , aria-valuemax and aria-valuenow attributes. Value to describe the component can be defined using aria-labelledby prop. Keyboard Support Component does not include any interactive elements.

## Basic

MeterGroup requires a value as the data to display where each item in the collection should be a type of MeterItem .

```typescript
import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <app-demo-wrapper>
            <p-metergroup [value]="value" />
        </app-demo-wrapper>
    `,
    standalone: true,
    imports: [MeterGroupModule]
})
export class MetergroupBasicDemo {
    value: any[] = [{ label: 'Space used', value: 15, color: 'var(--p-primary-color)' }];
}
```

## Icon

Icons can be displayed next to the labels instead of the default marker.

```typescript
import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <app-demo-wrapper>
            <p-metergroup [value]="value" />
        </app-demo-wrapper>
    `,
    standalone: true,
    imports: [MeterGroupModule]
})
export class MetergroupIconDemo {
    value: any[] = [
        { label: 'Apps', color: '#34d399', value: 16, icon: 'pi pi-table' },
        { label: 'Messages', color: '#fbbf24', value: 8, icon: 'pi pi-inbox' },
        { label: 'Media', color: '#60a5fa', value: 24, icon: 'pi pi-image' },
        { label: 'System', color: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ];
}
```

## Label

The position of the labels relative to the meters is defined using the labelPosition property. The default orientation of the labels is horizontal, and the vertical alternative is available through the labelOrientation option.

```typescript
import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <app-demo-wrapper>
            <p-metergroup [value]="value" labelPosition="start" labelOrientation="vertical" />
        </app-demo-wrapper>
    `,
    standalone: true,
    imports: [MeterGroupModule]
})
export class MetergroupLabelDemo {
    value: any[] = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
}
```

## Min Max

Boundaries are configured with the min and max values whose defaults are 0 and 100 respectively.

```typescript
import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <app-demo-wrapper>
            <p-metergroup [value]="value" [max]="200" />
        </app-demo-wrapper>
    `,
    standalone: true,
    imports: [MeterGroupModule]
})
export class MetergroupMinmaxDemo {
    value: any[] = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
}
```

## Multiple

Adding more items to the array displays the meters in a group.

```typescript
import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <app-demo-wrapper>
            <p-metergroup [value]="value" />
        </app-demo-wrapper>
    `,
    standalone: true,
    imports: [MeterGroupModule]
})
export class MetergroupMultipleDemo {
    value: any[] = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
}
```

## Template

MeterGroup provides templating support for labels, meter items, and content around the meters.

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <app-demo-wrapper>
            <p-metergroup [value]="value" labelPosition="start">
                <ng-template #label>
                    <div class="flex flex-wrap gap-4">
                        @for (meterItem of value; track $index; let index = $index) {
                            <p-card class="flex-1" styleClass="border border-surface shadow-none">
                                <div class="flex justify-between gap-7">
                                    <div class="flex flex-col gap-1">
                                        <span class="text-surface-500 dark:text-surface-400 text-sm">{{ meterItem.label }}</span>
                                        <span class="font-bold">{{ meterItem.value }}%</span>
                                    </div>
                                    <span class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center" [style]="{ 'background-color': meterItem.color1, color: '#ffffff' }">
                                        <i [class]="meterItem.icon"></i>
                                    </span>
                                </div>
                            </p-card>
                        }
                    </div>
                </ng-template>
                <ng-template #meter let-value let-class="class" let-width="size">
                    <span [class]="class" [style]="{ background: 'linear-gradient(to right, ' + value.color1 + ', ' + value.color2 + ')', width: width }"></span>
                </ng-template>
                <ng-template #start let-totalPercent="totalPercent">
                    <div class="flex justify-between mt-4 mb-2 relative">
                        <span class="text-sm">Storage</span>
                        <span [style]="{ width: totalPercent + '%' }" class="absolute text-right text-sm">{{ totalPercent }}%</span>
                        <span class="font-medium text-sm">1TB</span>
                    </div>
                </ng-template>
                <ng-template #end>
                    <div class="flex justify-between mt-4">
                        <p-button label="Manage Storage" [outlined]="true" size="small" />
                        <p-button label="Update Plan" size="small" />
                    </div>
                </ng-template>
            </p-metergroup>
        </app-demo-wrapper>
    `,
    standalone: true,
    imports: [ButtonModule, CardModule, MeterGroupModule]
})
export class MetergroupTemplateDemo {
    value: any[] = [
        { label: 'Apps', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-table' },
        { label: 'Messages', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-inbox' },
        { label: 'Media', color1: '#60a5fa', color2: '#c084fc', value: 20, icon: 'pi pi-image' },
        { label: 'System', color1: '#c084fc', color2: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ];
}
```

## Vertical

Layout of the MeterGroup is configured with the orientation property that accepts either horizontal or vertical as available options.

```typescript
import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    template: `
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-metergroup [value]="value" orientation="vertical" labelOrientation="vertical" [style]="{ height: '300px' }" />
            </div>
        </app-demo-wrapper>
    `,
    standalone: true,
    imports: [MeterGroupModule]
})
export class MetergroupVerticalDemo {
    value: any[] = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
}
```

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
| metergroup.label.text.font.weight | --p-metergroup-label-text-font-weight | Font weight of label text |
| metergroup.label.text.font.size | --p-metergroup-label-text-font-size | Font size of label text |
| metergroup.label.icon.size | --p-metergroup-label-icon-size | Size of label icon |
| metergroup.label.list.vertical.gap | --p-metergroup-label-list-vertical-gap | Vertical gap of label list |
| metergroup.label.list.horizontal.gap | --p-metergroup-label-list-horizontal-gap | Horizontal gap of label list |

