# Angular Float Label Component

FloatLabel appears on top of the input field when focused.

## Accessibility

Screen Reader FloatLabel does not require any roles and attributes. Keyboard Support Component does not include any interactive elements.

## Basic

FloatLabel is used by wrapping the input and its label.

```html
<p-floatlabel>
    <input id="username" pInputText [(ngModel)]="value" />
    <label for="username">Username</label>
</p-floatlabel>
```

## Invalid

When the form element is invalid, the label is also highlighted.

```html
<p-floatlabel>
    <input pInputText id="value1" [(ngModel)]="value1" [invalid]="!value1" autocomplete="off" />
    <label for="value1">Username</label>
</p-floatlabel>

<p-floatlabel variant="in">
    <input pInputText id="value2" [(ngModel)]="value2" [invalid]="!value2" autocomplete="off" />
    <label for="value2">Username</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <input pInputText id="value3" [(ngModel)]="value3" [invalid]="!value3" autocomplete="off" />
    <label for="value3">Username</label>
</p-floatlabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'float-label-invalid-demo',
    templateUrl: './float-label-invalid-demo.html',
    standalone: true,
    imports: [FloatLabelModule, InputTextModule, FormsModule]
})
export class FloatLabelInvalidDemo {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Variants

The variant property defines the position of the label. Default value is over , whereas in and on are the alternatives.

```html
<p-floatlabel variant="in">
    <input pInputText id="in_label" [(ngModel)]="value1" autocomplete="off" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <input pInputText id="on_label" [(ngModel)]="value2" autocomplete="off" />
    <label for="on_label">On Label</label>
</p-floatlabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'float-label-variants-demo',
    templateUrl: './float-label-variants-demo.html',
    standalone: true,
    imports: [FloatLabelModule, InputTextModule, FormsModule]
})
export class FloatLabelVariantsDemo {
    value1: string | undefined;

    value2: string | undefined;
}
```
</details>

## Float Label

FloatLabel appears on top of the input field when focused.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<FloatLabelPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| variant | "in" \| "on" \| "over" | over | Defines the positioning of the label relative to the input. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-floatlabel | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| floatlabel.color | --p-floatlabel-color | Color of root |
| floatlabel.focus.color | --p-floatlabel-focus-color | Focus color of root |
| floatlabel.active.color | --p-floatlabel-active-color | Active color of root |
| floatlabel.invalid.color | --p-floatlabel-invalid-color | Invalid color of root |
| floatlabel.transition.duration | --p-floatlabel-transition-duration | Transition duration of root |
| floatlabel.position.x | --p-floatlabel-position-x | Position x of root |
| floatlabel.position.y | --p-floatlabel-position-y | Position y of root |
| floatlabel.font.weight | --p-floatlabel-font-weight | Font weight of root |
| floatlabel.active.font.size | --p-floatlabel-active-font-size | Active font size of root |
| floatlabel.active.font.weight | --p-floatlabel-active-font-weight | Active font weight of root |
| floatlabel.over.active.top | --p-floatlabel-over-active-top | Active top of over |
| floatlabel.in.input.padding.top | --p-floatlabel-in-input-padding-top | Input padding top of in |
| floatlabel.in.input.padding.bottom | --p-floatlabel-in-input-padding-bottom | Input padding bottom of in |
| floatlabel.in.active.top | --p-floatlabel-in-active-top | Active top of in |
| floatlabel.on.border.radius | --p-floatlabel-on-border-radius | Border radius of on |
| floatlabel.on.active.background | --p-floatlabel-on-active-background | Active background of on |
| floatlabel.on.active.padding | --p-floatlabel-on-active-padding | Active padding of on |

