# Angular IconField Component

IconField wraps an input and an icon.

## Accessibility

Screen Reader IconField and InputIcon does not require any roles and attributes. Keyboard Support Components does not include any interactive elements.

## Basic

A group is created by wrapping the input and icon with the IconField component. Each icon is defined as a child of InputIcon component. In addition, position of the icon can be changed using iconPosition property that the default value is right and also left option is available.

```html
<p-iconfield>
    <p-inputicon class="pi pi-search" />
    <input type="text" pInputText placeholder="Search" />
</p-iconfield>
<p-iconfield>
    <input type="text" pInputText />
    <p-inputicon class="pi pi-spinner pi-spin" />
</p-iconfield>
```

## Float Label

FloatLabel visually integrates a label with its form element. Visit FloatLabel documentation for more information.

```html
<p-floatlabel>
    <p-iconfield>
        <p-inputicon class="pi pi-search" />
        <input pInputText id="over_label" [(ngModel)]="value1" autocomplete="off" />
    </p-iconfield>
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel variant="in">
    <p-iconfield>
        <p-inputicon class="pi pi-search" />
        <input pInputText id="in_label" [(ngModel)]="value2" autocomplete="off" />
    </p-iconfield>
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <p-iconfield>
        <p-inputicon class="pi pi-search" />
        <input pInputText id="on_label" [(ngModel)]="value3" autocomplete="off" />
    </p-iconfield>
    <label for="on_label">On Label</label>
</p-floatlabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'iconfield-float-label-demo',
    templateUrl: './iconfield-float-label-demo.html',
    standalone: true,
    imports: [InputIconModule, IconFieldModule, InputTextModule, FloatLabelModule, FormsModule]
})
export class IconFieldFloatLabelDemo {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}
```
</details>

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```html
<p-iftalabel>
    <p-iconfield>
        <p-inputicon class="pi pi-user" />
        <input pInputText id="username" [(ngModel)]="value" autocomplete="off" />
    </p-iconfield>
    <label for="username">Username</label>
</p-iftalabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'iconfield-ifta-label-demo',
    templateUrl: './iconfield-ifta-label-demo.html',
    standalone: true,
    imports: [InputIconModule, IconFieldModule, InputTextModule, IftaLabelModule, FormsModule]
})
export class IconFieldIftaLabelDemo {
  value: string | undefined;
}
```
</details>

## Sizes

IconField is compatible with the pSize setting of the input field.

```html
<p-iconfield>
    <p-inputicon class="pi pi-search" />
    <input pInputText [(ngModel)]="value1" placeholder="Small" pSize="small" />
</p-iconfield>

<p-iconfield>
    <input pInputText [(ngModel)]="value2" placeholder="Normal" />
    <p-inputicon class="pi pi-user" />
</p-iconfield>

<p-iconfield>
    <p-inputicon class="pi pi-lock" />
    <input pInputText [(ngModel)]="value3" placeholder="Large" pSize="large" />
    <p-inputicon class="pi pi-spin pi-spinner" />
</p-iconfield>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'iconfield-sizes-demo',
    templateUrl: './iconfield-sizes-demo.html',
    standalone: true,
    imports: [InputIcon, IconField, InputTextModule, FormsModule]
})
export class IconfieldSizesDemo {}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

An eye icon is displayed by default when the image is hovered in preview mode. Use the indicator template for custom content.

```html
<p-iconfield iconPosition="left">
    <p-inputicon>
        <svg width="20" height="20" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="..." fill="var(--p-primary-color)" />
            <path d="..." fill="var(--p-text-color)" />
        </svg>
    </p-inputicon>
    <input type="text" pInputText placeholder="Search" />
</p-iconfield>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'iconfield-template-demo',
    templateUrl: './iconfield-template-demo.html',
    standalone: true,
    imports: [InputIcon, IconField, InputTextModule, FormsModule]
})
export class IconFieldTemplateDemo {}
```
</details>

## Icon Field

IconField wraps an input and an icon.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<IconFieldPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| iconPosition | "right" \| "left" | left | Position of the icon. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-iconfield | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| iconfield.icon.color | --p-iconfield-icon-color | Color of icon |

