# Angular Ifta Label Component

IftaLabel is used to create infield top aligned labels.

## Accessibility

Screen Reader IftaLabel does not require any roles and attributes. Keyboard Support Component does not include any interactive elements.

## Basic

IftaLabel is used by wrapping the input and its label.

```html
<p-iftalabel>
    <input pInputText id="username" [(ngModel)]="value" autocomplete="off" />
    <label for="username">Username</label>
</p-iftalabel>
```

## Invalid

When the form element is invalid, the label is also highlighted.

```html
<p-iftalabel>
    <input pInputText id="username" [(ngModel)]="value" [invalid]="!value" autocomplete="off" />
    <label for="username">Username</label>
</p-iftalabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-iftalabel>
                <input pInputText id="username" [(ngModel)]="value" [invalid]="!value" autocomplete="off" />
                <label for="username">Username</label>
            </p-iftalabel>
        </div>
    `,
    standalone: true,
    imports: [IftaLabelModule, InputTextModule, FormsModule]
})
export class IftaLabelInvalidDemo {
    value: string | undefined;
}
```
</details>

## Ifta Label

IftaLabel is used to create infield top aligned labels.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<IftaLabelPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-iftalabel | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| iftalabel.color | --p-iftalabel-color | Color of root |
| iftalabel.focus.color | --p-iftalabel-focus-color | Focus color of root |
| iftalabel.invalid.color | --p-iftalabel-invalid-color | Invalid color of root |
| iftalabel.transition.duration | --p-iftalabel-transition-duration | Transition duration of root |
| iftalabel.position.x | --p-iftalabel-position-x | Position x of root |
| iftalabel.top | --p-iftalabel-top | Top of root |
| iftalabel.font.size | --p-iftalabel-font-size | Font size of root |
| iftalabel.font.weight | --p-iftalabel-font-weight | Font weight of root |
| iftalabel.input.padding.top | --p-iftalabel-input-padding-top | Padding top of input |
| iftalabel.input.padding.bottom | --p-iftalabel-input-padding-bottom | Padding bottom of input |

