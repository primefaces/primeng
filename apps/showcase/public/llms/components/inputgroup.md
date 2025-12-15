# Angular InputGroup Component

Text, icon, buttons and other content can be grouped next to an input.

## Accessibility

Screen Reader InputGroup and InputGroupAddon does not require any roles and attributes. Keyboard Support Component does not include any interactive elements.

## Basic

A group is created by wrapping the input and add-ons with the p-inputgroup component. Each add-on element is defined as a child of p-inputgroup-addon component.

```html
<p-inputgroup>
    <p-inputgroup-addon>
        <i class="pi pi-user"></i>
    </p-inputgroup-addon>
    <input pInputText [(ngModel)]="text1" placeholder="Username" />
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon>$</p-inputgroup-addon>
    <p-inputnumber [(ngModel)]="number" placeholder="Price" />
    <p-inputgroup-addon>.00</p-inputgroup-addon>
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon>www</p-inputgroup-addon>
    <input pInputText  [(ngModel)]="text2" placeholder="Website" />
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon>
        <i class="pi pi-map"></i>
    </p-inputgroup-addon>
    <p-select [(ngModel)]="selectedCity" [options]="cities" optionLabel="name" placeholder="City" />
</p-inputgroup>
```

## Button

Buttons can be placed at either side of an input element.

```html
<p-inputgroup>
    <p-button label="Search" />
    <input pInputText placeholder="Keyword" />
</p-inputgroup>

<p-inputgroup>
    <input pInputText placeholder="Keyword" />
    <p-inputgroup-addon>
        <p-button icon="pi pi-search" severity="secondary" variant="text" (click)="menu.toggle($event)" />
    </p-inputgroup-addon>
</p-inputgroup>
<p-menu #menu [model]="items" popup styleClass="!min-w-fit" />

<p-inputgroup>
    <p-inputgroup-addon>
        <p-button icon="pi pi-check" severity="secondary" />
    </p-inputgroup-addon>
    <input pInputText placeholder="Vote" />
    <p-inputgroup-addon>
        <p-button icon="pi pi-times" severity="secondary" />
    </p-inputgroup-addon>
</p-inputgroup>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'input-group-button-demo',
    templateUrl: './input-group-button-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroup, InputGroupAddonModule, InputTextModule, ButtonModule, MenuModule]
})
export class InputGroupButtonDemo {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [{ label: 'Web Search' }, { label: 'AI Assistant' }, { label: 'History' }];
    }
}
```
</details>

## Checkbox & Radio

Checkbox and RadioButton components can be combined with an input element under the same group.

```html
<p-inputgroup>
    <input type="text" pInputText placeholder="Price" />
    <p-inputgroup-addon>
        <p-radiobutton [(ngModel)]="radioValue1" name="rb1" value="rb1"/>
    </p-inputgroup-addon>
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon><p-checkbox [(ngModel)]="checked1" [binary]="true"/></p-inputgroup-addon>
    <input type="text" pInputText placeholder="Username" />
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon><p-checkbox [(ngModel)]="checked2" [binary]="true"/></p-inputgroup-addon>
    <input type="text" pInputText placeholder="Website" />
    <p-inputgroup-addon><p-radiobutton name="rb2" value="rb2" [(ngModel)]="category"/></p-inputgroup-addon>
</p-inputgroup>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';

@Component({
    selector: 'input-group-checkbox-demo',
    templateUrl: './input-group-checkbox-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroup, InputGroupAddonModule, InputTextModule, Checkbox, RadioButton]
})
export class InputGroupCheckboxDemo {
    radioValue1: boolean = false;

    checked1: boolean = false;

    checked2: boolean = false;

    category: string | undefined;
}
```
</details>

## Float Label

FloatLabel visually integrates a label with its form element. Visit FloatLabel documentation for more information.

```html
<p-inputgroup>
    <p-inputgroup-addon>
        <i class="pi pi-user"></i>
    </p-inputgroup-addon>
    <p-floatlabel>
        <input pInputText id="over_label" [(ngModel)]="value1" />
        <label for="over_label">Over Label</label>
    </p-floatlabel>
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon>$</p-inputgroup-addon>
    <p-floatlabel variant="in">
        <input pInputText id="in_label" [(ngModel)]="value2" />
        <label for="in_label">In Label</label>
    </p-floatlabel>
    <p-inputgroup-addon>.00</p-inputgroup-addon>
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon>www</p-inputgroup-addon>
    <p-floatlabel variant="on">
        <input pInputText id="on_label" [(ngModel)]="value3" />
        <label for="on_label">On Label</label>
    </p-floatlabel>
</p-inputgroup>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'input-group-float-label-demo',
    templateUrl: './input-group-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, FloatLabelModule]
})
export class InputGroupFloatLabelDemo {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}
```
</details>

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```html
<p-inputgroup class="md:!w-80">
    <p-inputgroup-addon>
        <i class="pi pi-shopping-cart"></i>
    </p-inputgroup-addon>
    <p-iftalabel>
        <p-inputnumber [(ngModel)]="value" inputId="price" mode="currency" currency="USD" locale="en-US" />
        <label for="price">Price</label>
    </p-iftalabel>
</p-inputgroup>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'input-group-ifta-label-demo',
    templateUrl: './input-group-ifta-label-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroupModule, InputGroupAddonModule, IftaLabelModule , InputNumberModule]
})
export class InputGroupIftaLabelDemo {
    value: number = 10;
}
```
</details>

## Multiple

Multiple add-ons can be placed inside the same group.

```html
<p-inputgroup class="w-full md:!w-[30rem]">
    <p-inputgroup-addon>
        <i class="pi pi-clock"></i>
    </p-inputgroup-addon>
    <p-inputgroup-addon>
        <i class="pi pi-star-fill"></i>
    </p-inputgroup-addon>
    <input type="text" pInputText placeholder="Price" />
    <p-inputgroup-addon>$</p-inputgroup-addon>
    <p-inputgroup-addon>.00</p-inputgroup-addon>
</p-inputgroup>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'input-group-multiple-demo',
    templateUrl: './input-group-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroup, InputGroupAddonModule, InputTextModule]
})
export class InputGroupMultipleDemo {
}
```
</details>

## Input Group

InputGroup displays text, icon, buttons and other content can be grouped next to an input.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<InputGroupPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| styleClass | string | - | Class of the element. **(Deprecated)** |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-inputgroup | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| inputgroup.addon.background | --p-inputgroup-addon-background | Background of addon |
| inputgroup.addon.border.color | --p-inputgroup-addon-border-color | Border color of addon |
| inputgroup.addon.color | --p-inputgroup-addon-color | Color of addon |
| inputgroup.addon.border.radius | --p-inputgroup-addon-border-radius | Border radius of addon |
| inputgroup.addon.padding | --p-inputgroup-addon-padding | Padding of addon |
| inputgroup.addon.min.width | --p-inputgroup-addon-min-width | Min width of addon |

