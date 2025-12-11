# Angular Password Component

Password displays strength indicator for password fields.

## Accessibility

Screen Reader Value to describe the component can either be provided via label tag combined with id prop or using ariaLabelledBy , ariaLabel props. Screen reader is notified about the changes to the strength of the password using a section that has aria-live while typing.

```html
<label for="pwd1">Password</label>
<p-password inputId="pwd1" />

<span id="pwd2">Password</span>
<p-password ariaLabelledBy="pwd2" />

<p-password ariaLabel="Password" />
```

## Basic

Two-way value binding is defined using ngModel .

```html
<p-password [(ngModel)]="value" [feedback]="false" />
```

## Clear Icon

When showClear is enabled, a clear icon is displayed to clear the value.

```html
<p-password [(ngModel)]="value" [feedback]="false" autocomplete="off" [showClear]="true" inputStyleClass="w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-clear-icon-demo',
    templateUrl: './password-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordClearIconDemo {
    value!: string;
}
```
</details>

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-password [(ngModel)]="value" [disabled]="true" placeholder="Disabled" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-disabled-demo',
    templateUrl: './password-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordDisabledDemo {
    value!: string;
}
```
</details>

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```html
<p-password [(ngModel)]="value" [feedback]="false" variant="filled" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-filled-demo',
    templateUrl: './password-filled-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordFilledDemo {
    value!: string;
}
```
</details>

## Float Label

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

```html
<p-floatlabel>
    <p-password [(ngModel)]="value1" inputId="over_label" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel variant="in">
    <p-password [(ngModel)]="value2" inputId="in_label" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <p-password [(ngModel)]="value3" inputId="on_label" />
    <label for="on_label">On Label</label>
</p-floatlabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'password-floatlabel-demo',
    templateUrl: './password-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule, FloatLabelModule]
})
export class PasswordFloatlabelDemo {
    value1!: string;

    value2!: string;

    value3!: string;
}
```
</details>

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```html
<p-password [(ngModel)]="value" [feedback]="false" fluid />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-fluid-demo',
    templateUrl: './password-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordFluidDemo {
    value!: string;
}
```
</details>

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```html
<p-iftalabel>
    <p-password [(ngModel)]="value" inputId="password" />
    <label for="password">Password</label>
</p-iftalabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'password-iftalabel-demo',
    templateUrl: './password-iftalabel-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule, IftaLabelModule]
})
export class PasswordIftaLabelDemo {
    value!: string;
}
```
</details>

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<p-password [(ngModel)]="value1" [invalid]="!value1" placeholder="Password" />
<p-password [(ngModel)]="value2" [invalid]="!value2" variant="filled" placeholder="Password" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-invalid-demo',
    templateUrl: './password-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordInvalidDemo {
    value1!: string;

    value2!: string;
}
```
</details>

## Locale

Labels are translated at component level by promptLabel , weakLabel , mediumLabel and strongLabel properties. In order to apply global translations for all Password components in the application, refer to the locale

```html
<p-password [(ngModel)]="value" promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity" strongLabel="Complex password" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-locale-demo',
    templateUrl: './password-locale-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordLocaleDemo {
    value!: string;
}
```
</details>

## Meter

Strength meter is displayed as a popup while a value is being entered.

```html
<p-password [(ngModel)]="value" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-meter-demo',
    templateUrl: './password-meter-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordMeterDemo {
    value!: string;
}
```
</details>

## reactiveformsdoc

Password can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 sm:w-56">
    <div class="flex flex-col gap-1">
        <p-password formControlName="value" [invalid]="isInvalid('value')" [feedback]="false" autocomplete="off" fluid />

        @if (isInvalid('value')) {
            <p-message severity="error" size="small" variant="simple">Password is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'password-reactive-forms-demo',
    templateUrl: './password-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, PasswordModule, MessageModule, ToastModule, ButtonModule]
})
export class PasswordReactiveFormsDemo {
    messageService = inject(MessageService);

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

Password provides small and large sizes as alternatives to the base.

```html
<p-password [(ngModel)]="value1" type="text" size="small" placeholder="Small" />
<p-password [(ngModel)]="value2" type="text" placeholder="Normal" />
<p-password [(ngModel)]="value3" type="text" size="large" placeholder="Large" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-sizes-demo',
    templateUrl: './password-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordSizesDemo {
    value1: string;

    value2: string;

    value3: string;
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

3 templates are included to customize the overlay. These are header , content and footer . Note that content overrides the default meter.

```html
<p-password [(ngModel)]="value" autocomplete="off">
    <ng-template #header>
        <div class="font-semibold text-xm mb-4">Reset Password</div>
    </ng-template>
    <ng-template #footer>
        <p-divider />
        <ul class="pl-2 my-0 leading-normal">
            <li>At least one lowercase</li>
            <li>At least one uppercase</li>
            <li>At least one numeric</li>
            <li>Minimum 8 characters</li>
        </ul>
    </ng-template>
</p-password>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'password-template-demo',
    templateUrl: './password-template-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule, DividerModule]
})
export class PasswordTemplateDemo {
    value!: string;
}
```
</details>

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 md:w-56">
    <div class="flex flex-col gap-1">
        <p-password #model="ngModel" [(ngModel)]="value" [invalid]="model.invalid && (model.touched || exampleForm.submitted)" name="password" [feedback]="false" autocomplete="off" required fluid />

        @if (model.invalid && (model.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">Password is required.</p-message>
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
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'password-template-driven-forms-demo',
    templateUrl: './password-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule, MessageModule, ToastModule, ButtonModule]
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

## Toggle Mask

When toggleMask is present, an icon is displayed to show the value as plain text.

```html
<p-password [(ngModel)]="value" [toggleMask]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-toggle-mask-demo',
    templateUrl: './password-toggle-mask-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordToggleMaskDemo {
    value!: string;
}
```
</details>

## Password

Password displays strength indicator for password fields.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<PasswordPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
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
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| ariaLabelledBy | string | - | Specifies one or more IDs in the DOM that labels the input field. |
| label | string | - | Label of the input for accessibility. |
| promptLabel | string | - | Text to prompt password entry. Defaults to PrimeNG I18N API configuration. |
| mediumRegex | string | ^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,}) | Regex value for medium regex. |
| strongRegex | string | ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}) | Regex value for strong regex. |
| weakLabel | string | - | Text for a weak password. Defaults to PrimeNG I18N API configuration. |
| mediumLabel | string | - | Text for a medium password. Defaults to PrimeNG I18N API configuration. |
| maxLength | number | - | specifies the maximum number of characters allowed in the input element. **(Deprecated)** |
| strongLabel | string | - | Text for a strong password. Defaults to PrimeNG I18N API configuration. |
| inputId | string | - | Identifier of the accessible input element. |
| feedback | boolean | true | Whether to show the strength indicator or not. |
| toggleMask | boolean | false | Whether to show an icon to display the password as plain text. |
| inputStyleClass | string | - | Style class of the input field. |
| styleClass | string | - | Style class of the element. **(Deprecated)** |
| inputStyle | { [klass: string]: any } | - | Inline style of the input field. |
| showTransitionOptions | string | .12s cubic-bezier(0, 0, 0.2, 1) | Transition options of the show animation. **(Deprecated)** |
| hideTransitionOptions | string | .1s linear | Transition options of the hide animation. **(Deprecated)** |
| autocomplete | string | - | Specify automated assistance in filling out password by browser. |
| placeholder | string | - | Advisory information to display on input. |
| showClear | boolean | false | When enabled, a clear icon is displayed to clear the value. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| tabindex | number | - | Index of the element in tabbing order. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| overlayOptions | OverlayOptions | - | Whether to use overlay API feature. The properties of overlay API can be used like an object in it. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onFocus | event: Event | Callback to invoke when the component receives focus. |
| onBlur | event: Event | Callback to invoke when the component loses focus. |
| onClear | value: any | Callback to invoke when clear button is clicked. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | TemplateRef<void> | Custom template of content. |
| footer | TemplateRef<void> | Custom template of footer. |
| header | TemplateRef<void> | Custom template of header. |
| clearicon | TemplateRef<void> | Custom template of clear icon. |
| hideicon | TemplateRef<PasswordIconTemplateContext> | Custom template of hide icon. |
| showicon | TemplateRef<PasswordIconTemplateContext> | Custom template of show icon. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the host element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| pcInputText | InputTextPassThrough | Used to pass attributes to the InputText component. |
| clearIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the clear icon's DOM element. |
| maskIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the mask icon's DOM element. |
| unmaskIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the unmask icon's DOM element. |
| pcOverlay | OverlayPassThrough | Used to pass attributes to the Overlay component. |
| overlay | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the overlay's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| meter | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the meter's DOM element. |
| meterLabel | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the meter label's DOM element. |
| meterText | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the meter text's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-password | Class name of the root element |
| p-password-input | Class name of the pt input element |
| p-password-mask-icon | Class name of the mask icon element |
| p-password-unmask-icon | Class name of the unmask icon element |
| p-password-overlay | Class name of the overlay element |
| p-password-meter | Class name of the meter element |
| p-password-meter-label | Class name of the meter label element |
| p-password-meter-text | Class name of the meter text element |
| p-password-clear-icon | Class name of the clear icon |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| password.meter.background | --p-password-meter-background | Background of meter |
| password.meter.border.radius | --p-password-meter-border-radius | Border radius of meter |
| password.meter.height | --p-password-meter-height | Height of meter |
| password.icon.color | --p-password-icon-color | Color of icon |
| password.overlay.background | --p-password-overlay-background | Background of overlay |
| password.overlay.border.color | --p-password-overlay-border-color | Border color of overlay |
| password.overlay.border.radius | --p-password-overlay-border-radius | Border radius of overlay |
| password.overlay.color | --p-password-overlay-color | Color of overlay |
| password.overlay.padding | --p-password-overlay-padding | Padding of overlay |
| password.overlay.shadow | --p-password-overlay-shadow | Shadow of overlay |
| password.content.gap | --p-password-content-gap | Gap of content |
| password.strength.weak.background | --p-password-strength-weak-background | Weak background of strength |
| password.strength.medium.background | --p-password-strength-medium-background | Medium background of strength |
| password.strength.strong.background | --p-password-strength-strong-background | Strong background of strength |

