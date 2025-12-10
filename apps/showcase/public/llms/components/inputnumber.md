# Angular InputNumber Component

InputNumber is an input component to provide numerical input.

## Accessibility

Screen Reader Value to describe the component can either be provided via label tag combined with inputId prop or using ariaLabelledBy , ariaLabel , ariaDescribedBy props. The input element uses spinbutton role in addition to the aria-valuemin , aria-valuemax and aria-valuenow attributes.

```html
<label for="price">Price</label>
<p-inputnumber inputId="price" />

<span id="label_number">Number</span>
<p-inputnumber ariaLabelledBy="label_number" />

<p-inputnumber ariaLabel="Number" />

<p-inputnumber ariaDescribedBy="describe" />
<small id="describe">Information</small>
```

## Buttons

Spinner buttons are enabled using the showButtons options and layout is defined with the buttonLayout . Default value is "stacked" whereas "horizontal" and "stacked" are alternatives. Note that even there are no buttons, up and down arrow keys can be used to spin the values with keyboard.

```html
<p-inputnumber [(ngModel)]="value1" [showButtons]="true" inputId="stacked" mode="currency" currency="USD" />
<p-inputnumber [(ngModel)]="value2" mode="decimal" [showButtons]="true" inputId="minmax-buttons" [min]="0" [max]="100" />
<p-inputnumber [(ngModel)]="value3" [showButtons]="true" buttonLayout="horizontal" inputId="horizontal" spinnerMode="horizontal" [step]="0.25" mode="currency" currency="EUR">
    <ng-template #incrementbuttonicon>
        <span class="pi pi-plus"></span>
    </ng-template>
    <ng-template #decrementbuttonicon>
        <span class="pi pi-minus"></span>
    </ng-template>
</p-inputnumber>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'input-number-buttons-demo',
    templateUrl: './input-number-buttons-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber, Fluid]
})
export class InputNumberButtonsDemo {
    value1: number = 20;

    value2: number = 10.5;

    value3: number = 25;
}
```
</details>

## Clear Icon

When showClear is enabled, a clear icon is displayed to clear the value.

```html
<p-inputnumber [(ngModel)]="value" inputId="price_input" mode="currency" currency="USD" locale="en-US" [showClear]="true" inputStyleClass="w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-clear-icon-demo',
    templateUrl: './input-number-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumberModule]
})
export class InputNumberClearIconDemo {
    value: number | undefined;
}
```
</details>

## Currency

Currency formatting is specified by setting the mode option to currency and currency property. In addition currencyDisplay option allows how the currency is displayed, valid values are "symbol" (default) or "code".

```html
<p-inputnumber [(ngModel)]="value1" inputId="currency-us" mode="currency" currency="USD" locale="en-US" />
<p-inputnumber [(ngModel)]="value2" mode="currency"inputId="currency-germany"currency="EUR" locale="de-DE" />
<p-inputnumber [(ngModel)]="value3" mode="currency" inputId="currency-india" currency="INR" currencyDisplay="code" locale="en-IN" />
<p-inputnumber [(ngModel)]="value4" mode="currency" inputId="currency-japan" currency="JPY" locale="jp-JP" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'input-number-currency-demo',
    templateUrl: './input-number-currency-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber, Fluid]
})
export class InputNumberCurrencyDemo {
    value1: number = 1500;

    value2: number = 2500;

    value3: number = 4250;

    value4: number = 5002;
}
```
</details>

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-inputnumber inputId="integeronly" [disabled]="true" prefix="%" [(ngModel)]="value1" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-disabled-demo',
    templateUrl: './input-number-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber]
})
export class InputNumberDisabledDemo {
    value1: number = 50;
}
```
</details>

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```html
<p-inputnumber variant="filled" [(ngModel)]="value1" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-filled-demo',
    templateUrl: './input-number-filled-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber]
})
export class InputNumberFilledDemo {
    value1!: number;
}
```
</details>

## Float Label

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

```html
<p-floatlabel>
    <p-inputnumber [(ngModel)]="value1" inputId="over_label" mode="currency" currency="USD" locale="en-US" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel variant="in">
    <p-inputnumber [(ngModel)]="value2" inputId="in_label" mode="currency" currency="USD" locale="en-US" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <p-inputnumber [(ngModel)]="value3" inputId="on_label" mode="currency" currency="USD" locale="en-US" />
    <label for="on_label">On Label</label>
</p-floatlabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
    selector: 'input-number-float-label-demo',
    templateUrl: './input-number-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber, FloatLabel]
})
export class InputNumberFloatLabelDemo {
    value1: number | undefined;

    value2: number | undefined;

    value3: number | undefined;
}
```
</details>

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```html
<p-inputnumber [(ngModel)]="value" inputId="price_input" mode="currency" currency="USD" locale="en-US" fluid />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-fluid-demo',
    templateUrl: './input-number-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumberModule]
})
export class InputNumberFluidDemo {
    value: number | undefined;
}
```
</details>

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```html
<p-iftalabel>
    <p-inputnumber [(ngModel)]="value" inputId="price_input" mode="currency" currency="USD" locale="en-US" />
    <label for="price_input">Price</label>
</p-iftalabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'input-number-ifta-label-demo',
    templateUrl: './input-number-ifta-label-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumberModule, IftaLabelModule]
})
export class InputNumberIftaLabelDemo {
    value: number | undefined;
}
```
</details>

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<p-inputnumber [(ngModel)]="value1" [invalid]="value1 === undefined" mode="decimal" [minFractionDigits]="2" placeholder="Amount" />
<p-inputnumber [(ngModel)]="value2" [invalid]="value2 === undefined" mode="decimal" [minFractionDigits]="2" variant="filled" placeholder="Amount" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-invalid-demo',
    templateUrl: './input-number-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber]
})
export class InputNumberInvalidDemo {
    value1!: number;

    value2!: number;
}
```
</details>

## Locale

Localization information such as grouping and decimal symbols are defined with the locale property which defaults to the user locale.

```html
<p-inputnumber [(ngModel)]="value1" inputId="locale-user" [minFractionDigits]="2" />
<p-inputnumber [(ngModel)]="value2" inputId="locale-us" mode="decimal" locale="en-US" [minFractionDigits]="2" />
<p-inputnumber [(ngModel)]="value3" inputId="locale-german" mode="decimal" locale="de-DE" [minFractionDigits]="2" />
<p-inputnumber [(ngModel)]="value4" inputId="locale-indian" mode="decimal" locale="en-IN" [minFractionDigits]="2" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'input-number-locale-demo',
    templateUrl: './input-number-locale-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber, Fluid]
})
export class InputNumberLocaleDemo {
    value1: number = 151351;

    value2: number = 115744;

    value3: number = 635524;

    value4: number = 732762;
}
```
</details>

## Numerals

InputNumber is used as a controlled input with ngModel property.

```html
<p-inputnumber inputId="integeronly" [(ngModel)]="value1" />
<p-inputnumber [(ngModel)]="value2" mode="decimal" inputId="withoutgrouping" [useGrouping]="false" />
<p-inputnumber [(ngModel)]="value3" inputId="minmaxfraction" mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="5" />
<p-inputnumber [(ngModel)]="value4" inputId="minmax" mode="decimal" [min]="0" [max]="100" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'input-number-numerals-demo',
    templateUrl: './input-number-numerals-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber, Fluid]
})
export class InputNumberNumeralsDemo {
    value1: number = 42723;

    value2: number = 58151;

    value3: number = 2351.35;

    value4: number = 50;
}
```
</details>

## Prefix & Suffix

Custom texts e.g. units can be placed before or after the input section with the prefix and suffix properties.

```html
<p-inputnumber [(ngModel)]="value1" inputId="mile" suffix=" mi" />
<p-inputnumber [(ngModel)]="value2" inputId="percent" prefix="%" />
<p-inputnumber [(ngModel)]="value3"inputId="expiry" prefix="Expires in " suffix=" days" />
<p-inputnumber [(ngModel)]="value4" prefix="↑ " inputId="temperature" suffix="℃" [min]="0" [max]="40" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'input-number-prefix-suffix-demo',
    templateUrl: './input-number-prefix-suffix-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber, Fluid]
})
export class InputNumberPrefixSuffixDemo {
    value1: number = 20;

    value2: number = 50;

    value3: number = 10;

    value4: number = 20;
}
```
</details>

## reactiveformsdoc

InputNumber can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <p-inputnumber inputId="integeronly" formControlName="value" [invalid]="isInvalid('value')"/>
        @if (isInvalid('value')) {
            <p-message severity="error" size="small" variant="simple">Value is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'input-number-reactive-forms-demo',
    templateUrl: './input-number-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, InputNumber, Message, Button, Toast],
})
export class InputNumberReactiveFormsDemo implements OnInit {
    messageService = inject(MessageService);

    exampleForm: FormGroup | undefined;

    formSubmitted = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            value: [undefined, Validators.required]
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
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

InputNumber provides small and large sizes as alternatives to the base.

```html
<p-inputnumber [(ngModel)]="value1" size="small" placeholder="Small" mode="currency" currency="USD" locale="en-US" />
<p-inputnumber [(ngModel)]="value2" placeholder="Normal" mode="currency" currency="USD" locale="en-US" />
<p-inputnumber [(ngModel)]="value3" size="large" placeholder="Large" mode="currency" currency="USD" locale="en-US" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-sizes-demo',
    templateUrl: './input-number-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber]
})
export class InputNumberSizesDemo {
    value1!: number;

    value2!: number;

    value3!: number;
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <p-inputnumber inputId="integeronly" #inputValue="ngModel" name="inputValue" [(ngModel)]="value" [invalid]="inputValue.invalid && (inputValue.touched || exampleForm.submitted)" required/>
        @if (inputValue.invalid && (inputValue.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">Number is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Message } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';

@Component({
    selector: 'rating-template-driven-forms-demo',
    templateUrl: './rating-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber, Message, Toast, Button]
})
export class TemplateDrivenFormsDemo {
    messageService = inject(MessageService);

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

## Vertical

Buttons can also placed vertically by setting buttonLayout as vertical .

```html
<p-inputnumber [(ngModel)]="value1" [showButtons]="true" buttonLayout="vertical" spinnerMode="vertical" inputId="vertical" [inputStyle]="{ width: '3rem' }">
    <ng-template #incrementbuttonicon>
        <span class="pi pi-plus"></span>
    </ng-template>
    <ng-template #decrementbuttonicon>
        <span class="pi pi-minus"></span>
    </ng-template>
</p-inputnumber>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-vertical-demo',
    templateUrl: './input-number-vertical-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber]
})
export class InputNumberVerticalDemo {
    value1: number = 50;
}
```
</details>

## Input Number

InputNumber is an input component to provide numerical input.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<InputNumberPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
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
| showButtons | boolean | false | Displays spinner buttons. |
| format | boolean | true | Whether to format the value. |
| buttonLayout | string | stacked | Layout of the buttons, valid values are "stacked" (default), "horizontal" and "vertical". |
| inputId | string | - | Identifier of the focus input to match a label defined for the component. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| placeholder | string | - | Advisory information to display on input. |
| tabindex | number | - | Specifies tab order of the element. |
| title | string | - | Title text of the input text. |
| ariaLabelledBy | string | - | Specifies one or more IDs in the DOM that labels the input field. |
| ariaDescribedBy | string | - | Specifies one or more IDs in the DOM that describes the input field. |
| ariaLabel | string | - | Used to define a string that labels the input element. |
| ariaRequired | boolean | false | Used to indicate that user input is required on an element before a form can be submitted. |
| autocomplete | string | - | Used to define a string that autocomplete attribute the current element. |
| incrementButtonClass | string | - | Style class of the increment button. |
| decrementButtonClass | string | - | Style class of the decrement button. |
| incrementButtonIcon | string | - | Style class of the increment button. |
| decrementButtonIcon | string | - | Style class of the decrement button. |
| readonly | boolean | false | When present, it specifies that an input field is read-only. |
| allowEmpty | boolean | true | Determines whether the input field is empty. |
| locale | string | - | Locale to be used in formatting. |
| localeMatcher | any | - | The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit". See Locale Negotiation for details. |
| mode | any | decimal | Defines the behavior of the component, valid values are "decimal" and "currency". |
| currency | string | - | The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB. There is no default value; if the style is "currency", the currency property must be provided. |
| currencyDisplay | any | - | How to display the currency in currency formatting. Possible values are "symbol" to use a localized currency symbol such as €, ü"code" to use the ISO currency code, "name" to use a localized currency name such as "dollar"; the default is "symbol". |
| useGrouping | boolean | true | Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. |
| minFractionDigits | number | - | The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information). |
| maxFractionDigits | number | - | The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information). |
| prefix | string | - | Text to display before the value. |
| suffix | string | - | Text to display after the value. |
| inputStyle | any | - | Inline style of the input field. |
| inputStyleClass | string | - | Style class of the input field. |
| showClear | boolean | false | When enabled, a clear icon is displayed to clear the value. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onInput | event: InputNumberInputEvent | Callback to invoke on input. |
| onFocus | event: Event | Callback to invoke when the component receives focus. |
| onBlur | event: Event | Callback to invoke when the component loses focus. |
| onKeyDown | event: KeyboardEvent | Callback to invoke on input key press. |
| onClear | value: void | Callback to invoke when clear token is clicked. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| clearicon | TemplateRef<void> | Custom clear icon template. |
| incrementbuttonicon | TemplateRef<void> | Custom increment button icon template. |
| decrementbuttonicon | TemplateRef<void> | Custom decrement button icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| pcInputText | InputTextPassThrough | Used to pass attributes to the InputText component. |
| clearIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the clear icon's DOM element. |
| buttonGroup | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the button group's DOM element. |
| incrementButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the increment button's DOM element. |
| decrementButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the decrement button's DOM element. |
| incrementButtonIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the increment button icon's DOM element. |
| decrementButtonIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the decrement button icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-inputnumber | Class name of the root element |
| p-inputnumber-input | Class name of the input element |
| p-inputnumber-button-group | Class name of the button group element |
| p-inputnumber-increment-button | Class name of the increment button element |
| p-inputnumber-decrement-button | Class name of the decrement button element |
| p-autocomplete-clear-icon | Class name of the clear icon |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| inputnumber.transition.duration | --p-inputnumber-transition-duration | Transition duration of root |
| inputnumber.button.width | --p-inputnumber-button-width | Width of button |
| inputnumber.button.border.radius | --p-inputnumber-button-border-radius | Border radius of button |
| inputnumber.button.vertical.padding | --p-inputnumber-button-vertical-padding | Vertical padding of button |
| inputnumber.button.background | --p-inputnumber-button-background | Background of button |
| inputnumber.button.hover.background | --p-inputnumber-button-hover-background | Hover background of button |
| inputnumber.button.active.background | --p-inputnumber-button-active-background | Active background of button |
| inputnumber.button.border.color | --p-inputnumber-button-border-color | Border color of button |
| inputnumber.button.hover.border.color | --p-inputnumber-button-hover-border-color | Hover border color of button |
| inputnumber.button.active.border.color | --p-inputnumber-button-active-border-color | Active border color of button |
| inputnumber.button.color | --p-inputnumber-button-color | Color of button |
| inputnumber.button.hover.color | --p-inputnumber-button-hover-color | Hover color of button |
| inputnumber.button.active.color | --p-inputnumber-button-active-color | Active color of button |

