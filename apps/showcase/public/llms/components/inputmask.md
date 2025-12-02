# Angular InputMask Component

InputMask component is used to enter input in a certain format such as numeric, date, currency and phone.

## Accessibility

Screen Reader InputMask component renders a native input element that implicitly includes any passed prop. Value to describe the component can either be provided via label tag combined with id prop or using ariaLabelledBy , ariaLabel props.

```html
<label for="date">Date</label>
<p-inputmask inputId="date"/>

<span id="phone">Phone</span>
<p-inputmask ariaLabelledBy="phone"/>

<p-inputmask ariaLabel="Age"/>
```

## Basic

InputMask is used as a controlled input with ngModel properties.

```html
<p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" />
```

## Clear Icon

When showClear is enabled, a clear icon is displayed to clear the value.

```html
<p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" [showClear]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-clear-icon-demo',
    templateUrl: './input-mask-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
})
export class InputMaskClearIconDemo {
    value: string | undefined;
}
```
</details>

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-inputmask mask="999-99-9999" [(ngModel)]="value" [disabled]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-disabled-demo',
    templateUrl: './input-mask-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
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
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-filled-demo',
    templateUrl: './input-mask-filled-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
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
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from "primeng/floatlabel"

@Component({
    selector: 'input-mask-floatlabel-demo',
    templateUrl: './input-mask-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask, FloatLabel]
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
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-fluid-demo',
    templateUrl: './input-mask-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
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
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'input-mask-iftalabel-demo',
    templateUrl: './input-mask-iftalabel-demo.html',
    standalone: true,
    imports: [FormsModule, InputMaskModule, IftaLabelModule]
})
export class InputMaskIftaLabelDemo {
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
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-invalid-demo',
    templateUrl: './input-mask-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
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
<span class="font-bold block mb-2">Phone</span>
<p-inputmask mask="(999) 999-9999" [(ngModel)]="value2" placeholder="(999) 999-9999" />
<span class="font-bold block mb-2">Serial Number</span>
<p-inputmask mask="a*-999-a999" [(ngModel)]="value3" placeholder="a*-999-a999" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'input-mask-mask-demo',
    templateUrl: './input-mask-mask-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask, Fluid]
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
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-optional-demo',
    templateUrl: './input-mask-optional-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
})
export class InputMaskOptionalDemo {
    value: string | undefined;
}
```
</details>

## reactiveformsdoc

InputMask can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 sm:w-56">
    <div class="flex flex-col gap-1">
        <p-inputmask mask="99-999999" formControlName="value" placeholder="99-999999" [invalid]="isInvalid('value')" fluid />
        @if (isInvalid('value')) {
            <p-message severity="error" size="small" variant="simple">Serial number is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'input-mask-reactive-forms-demo',
    templateUrl: './input-mask-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, InputMaskModule, MessageModule, ToastModule, ButtonModule]
})
export class InputMaskReactiveFormsDemo {
    messageService = inject(MessageService);

    items: any[] | undefined;

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            value: ['', Validators.required]
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
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-sizes-demo',
    templateUrl: './input-mask-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
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

```html
<p-inputmask [(ngModel)]="value" mask="99/99/9999" placeholder="99/99/9999" slotChar="mm/dd/yyyy" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-slot-char-demo',
    templateUrl: './input-mask-slot-char-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
})
export class InputMaskSlotCharDemo {
    value: string | undefined;
}
```
</details>

## styledoc

Styling is same as inputtext component , for theming classes visit theming page .

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 md:w-56">
    <div class="flex flex-col gap-1">
        <p-inputmask name="serial" mask="99-999999" #serialNumber="ngModel" [(ngModel)]="value" placeholder="99-999999" [invalid]="serialNumber.invalid && (serialNumber.touched || exampleForm.submitted)" required fluid />
        @if (serialNumber.invalid && (serialNumber.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">Serial number is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject} from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-template-driven-forms-demo',
    templateUrl: './input-mask-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, InputMaskModule, MessageModule, ToastModule, ButtonModule]
})
export class InputMaskTemplateDrivenFormsDoc {
    messageService = inject(MessageService);

    items: any[] = [];

    value: any;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}
```
</details>

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
| clearicon | TemplateRef<any> | Template of the clear icon. |

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

