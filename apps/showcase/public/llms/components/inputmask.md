# Angular InputMask Component

InputMask component is used to enter input in a certain format such as numeric, date, currency and phone.

## Accessibility

Screen Reader InputMask component renders a native input element that implicitly includes any passed prop. Value to describe the component can either be provided via label tag combined with id prop or using ariaLabelledBy , ariaLabel props.

## Basic

InputMask is used as a controlled input with ngModel properties.

```html
<p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" />
```

## Clear Icon

When showClear is enabled, a clear icon is displayed to clear the value.

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-inputmask mask="999-99-9999" [(ngModel)]="value" [disabled]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-inputmask mask="999-99-9999" [(ngModel)]="value" [disabled]="true" />
        </div>
    `,
    standalone: true,
    imports: [InputMaskModule, FormsModule]
})
export class InputMaskDisabledDemo {
    value: string | undefined;
}
```
</details>

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```html
<p-inputmask mask="99-999999" [(ngModel)]="value" variant="filled" placeholder="99-999999" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-inputmask mask="99-999999" [(ngModel)]="value" variant="filled" placeholder="99-999999" />
        </div>
    `,
    standalone: true,
    imports: [InputMaskModule, FormsModule]
})
export class InputMaskFilledDemo {
    value: string | undefined;
}
```
</details>

## Float Label

FloatLabel visually integrates a label with its form element. Visit FloatLabel documentation for more information.

```html
<p-floatlabel>
    <p-inputmask id="over_label" [(ngModel)]="value1" mask="999-99-9999" />
    <label for="over_label">Over Label</label>
</p-floatlabel>
<p-floatlabel variant="in">
    <p-inputmask id="in_label" [(ngModel)]="value2" mask="999-99-9999" />
    <label for="in_label">In Label</label>
</p-floatlabel>
<p-floatlabel variant="on">
    <p-inputmask id="on_label" [(ngModel)]="value3" mask="999-99-9999" />
    <label for="on_label">On Label</label>
</p-floatlabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel>
                <p-inputmask id="over_label" [(ngModel)]="value1" mask="999-99-9999" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>
            <p-floatlabel variant="in">
                <p-inputmask id="in_label" [(ngModel)]="value2" mask="999-99-9999" />
                <label for="in_label">In Label</label>
            </p-floatlabel>
            <p-floatlabel variant="on">
                <p-inputmask id="on_label" [(ngModel)]="value3" mask="999-99-9999" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
    `,
    standalone: true,
    imports: [FloatLabelModule, InputMaskModule, FormsModule]
})
export class InputMaskFloatlabelDemo {
    value1: string | undefined;
    value2: string | undefined;
    value3: string | undefined;
}
```
</details>

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```html
<p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" fluid />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    template: `
        <div class="card">
            <p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" fluid />
        </div>
    `,
    standalone: true,
    imports: [InputMaskModule, FormsModule]
})
export class InputMaskFluidDemo {
    value: string | undefined;
}
```
</details>

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```html
<p-iftalabel>
    <p-inputmask id="ssn" [(ngModel)]="value" mask="999-99-9999" autocomplete="off" />
    <label for="ssn">SSN</label>
</p-iftalabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-iftalabel>
                <p-inputmask id="ssn" [(ngModel)]="value" mask="999-99-9999" autocomplete="off" />
                <label for="ssn">SSN</label>
            </p-iftalabel>
        </div>
    `,
    standalone: true,
    imports: [IftaLabelModule, InputMaskModule, FormsModule]
})
export class InputMaskIftalabelDemo {
    value: string | undefined;
}
```
</details>

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<p-inputmask [(ngModel)]="value1" mask="99-999999" placeholder="Serial Key" [invalid]="!value1" />
<p-inputmask [(ngModel)]="value2" mask="99-999999" placeholder="Serial Key" [invalid]="!value2" variant="filled" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center gap-4">
            <p-inputmask [(ngModel)]="value1" mask="99-999999" placeholder="Serial Key" [invalid]="!value1" />
            <p-inputmask [(ngModel)]="value2" mask="99-999999" placeholder="Serial Key" [invalid]="!value2" variant="filled" />
        </div>
    `,
    standalone: true,
    imports: [InputMaskModule, FormsModule]
})
export class InputMaskInvalidDemo {
    value1: string | undefined;
    value2: string | undefined;
}
```
</details>

## Mask

Mask format can be a combination of the following definitions; a for alphabetic characters, 9 for numeric characters and * for alphanumberic characters. In addition, formatting characters like ( , ) , - are also accepted.

```html
<span class="font-bold block mb-2">SSN</span>
<p-inputmask mask="999-99-9999" [(ngModel)]="value1" placeholder="999-99-9999" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    template: `
        <p-fluid class="card flex flex-wrap gap-4">
            <div class="flex-auto">
                <span class="font-bold block mb-2">SSN</span>
                <p-inputmask mask="999-99-9999" [(ngModel)]="value1" placeholder="999-99-9999" />
            </div>
            <div class="flex-auto">
                <span class="font-bold block mb-2">Phone</span>
                <p-inputmask mask="(999) 999-9999" [(ngModel)]="value2" placeholder="(999) 999-9999" />
            </div>
            <div class="flex-auto">
                <span class="font-bold block mb-2">Serial Number</span>
                <p-inputmask mask="a*-999-a999" [(ngModel)]="value3" placeholder="a*-999-a999" />
            </div>
        </p-fluid>
    `,
    standalone: true,
    imports: [InputMaskModule, FormsModule]
})
export class InputMaskMaskDemo {
    value1: string | undefined;
    value2: string | undefined;
    value3: string | undefined;
}
```
</details>

## Optional

When the input does not complete the mask definition, it is cleared by default. Use autoClear property to control this behavior. In addition, ? is used to mark anything after the question mark optional.

```html
<p-inputmask mask="(999) 999-9999? x99999" [(ngModel)]="value" placeholder="(999) 999-9999? x99999" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-inputmask mask="(999) 999-9999? x99999" [(ngModel)]="value" placeholder="(999) 999-9999? x99999" />
        </div>
    `,
    standalone: true,
    imports: [InputMaskModule, FormsModule]
})
export class InputMaskOptionalDemo {
    value: string | undefined;
}
```
</details>

## reactiveformsdoc

InputMask can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

## Sizes

InputMask provides small and large sizes as alternatives to the base.

```html
<p-inputmask [(ngModel)]="value1" placeholder="Small" size="small" mask="99-999999" />
<p-inputmask [(ngModel)]="value2" placeholder="Normal" mask="99-999999" />
<p-inputmask [(ngModel)]="value3" placeholder="Large" size="large" mask="99-999999" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    template: `
        <div class="card flex flex-col items-center gap-4">
            <p-inputmask [(ngModel)]="value1" placeholder="Small" size="small" mask="99-999999" />
            <p-inputmask [(ngModel)]="value2" placeholder="Normal" mask="99-999999" />
            <p-inputmask [(ngModel)]="value3" placeholder="Large" size="large" mask="99-999999" />
        </div>
    `,
    standalone: true,
    imports: [InputMaskModule, FormsModule]
})
export class InputMaskSizesDemo {
    value1: string | undefined;
    value2: string | undefined;
    value3: string | undefined;
}
```
</details>

## SlotChar

Default placeholder for a mask is underscore that can be customized using slotChar property.

## Input Mask

InputMask component is used to enter input in a certain format such as numeric, date, currency, email and phone.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<InputMaskPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
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
| type | string | text | HTML5 input type. |
| slotChar | string | _ | Placeholder character in mask, default is underscore. |
| autoClear | boolean | true | Clears the incomplete value on blur. |
| showClear | boolean | false | When enabled, a clear icon is displayed to clear the value. |
| style | { [klass: string]: any } | - | Inline style of the input field. |
| inputId | string | - | Identifier of the focus input to match a label defined for the component. |
| styleClass | string | - | Style class of the input field. |
| placeholder | string | - | Advisory information to display on input. |
| tabindex | string | - | Specifies tab order of the element. |
| title | string | - | Title text of the input text. |
| ariaLabel | string | - | Used to define a string that labels the input element. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| ariaRequired | boolean | false | Used to indicate that user input is required on an element before a form can be submitted. |
| readonly | boolean | false | When present, it specifies that an input field is read-only. |
| unmask | boolean | false | Defines if ngModel sets the raw unmasked value to bound value or the formatted mask value. |
| characterPattern | string | [A-Za-z] | Regex pattern for alpha characters |
| autofocus | boolean | false | When present, the input gets a focus automatically on load. |
| autocomplete | string | - | Used to define a string that autocomplete attribute the current element. |
| keepBuffer | boolean | false | When present, it specifies that whether to clean buffer value from model. |
| mask | string | - | Mask pattern. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onComplete | value: any | Callback to invoke when the mask is completed. |
| onFocus | event: Event | Callback to invoke when the component receives focus. |
| onBlur | event: Event | Callback to invoke when the component loses focus. |
| onInput | event: Event | Callback to invoke on input. |
| onKeydown | event: Event | Callback to invoke on input key press. |
| onClear | value: any | Callback to invoke when input field is cleared. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| clearicon | TemplateRef<void> | Custom clear icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the root's DOM element. |
| pcInputText | InputTextPassThrough | Used to pass attributes to the InputText component. |
| clearIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the clear icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-inputmask | Class name of the root element |
| p-inputmask-clear-icon | Class name of the clear icon element |

