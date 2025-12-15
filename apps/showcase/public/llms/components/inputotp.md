# Angular Otp Input Component

Input Otp is used to enter one time passwords.

## Accessibility

Screen Reader Input OTP uses a set of InputText components, refer to the InputText component for more information about the screen reader support.

## Basic

Two-way value binding is defined using ngModel . The number of characters is defined with the length property, which is set to 4 by default.

```html
<p-inputotp [(ngModel)]="value" />
```

## Integer Only

When integerOnly is present, only integers can be accepted as input.

```html
<p-inputotp [(ngModel)]="value" [integerOnly]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputOtp } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-otp-integer-only-demo',
    templateUrl: './input-otp-integer-only-demo.html',
    standalone: true,
    imports: [FormsModule, InputOtp]
})
export class InputOtpIntegerOnlyDemo {
    value : any
}
```
</details>

## Mask

Enable the mask option to hide the values in the input fields.

```html
<p-inputotp [(ngModel)]="value" [mask]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputOtp } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-otp-mask-demo',
    templateUrl: './input-otp-mask-demo.html',
    standalone: true,
    imports: [FormsModule, InputOtp]
})
export class InputOtpMaskDemo {
    value: any;
}
```
</details>

## reactiveformsdoc

InputOtp can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <p-inputotp formControlName="value" [invalid]="isInvalid('value')" />
        @if (isInvalid('value')) {
            <p-message severity="error" size="small" variant="simple">Passcode is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'input-otp-reactive-forms-demo',
    templateUrl: './input-otp-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, InputOtpModule, MessageModule, ToastModule, ButtonModule],
    providers: [CountryService]
})
export class InputOtpReactiveFormsDemo implements OnInit {
    messageService = inject(MessageService);

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            value: ['', [Validators.required, Validators.minLength(4)]]
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

## Sample

A sample UI implementation with templating and additional elements.

```html
<div class="flex flex-col items-center">
    <div class="font-bold text-xl mb-2">Authenticate Your Account</div>
    <p class="text-muted-color block mb-8">Please enter the code sent to your phone.</p>
    <p-inputotp [(ngModel)]="value" [length]="6">
        <ng-template #input let-token let-events="events" let-index="index">
            <input type="text" [maxLength]="1" (input)="events.input($event)" (keydown)="events.keydown($event)" [attr.value]="token" class="custom-otp-input" />
            <div *ngIf="index === 3" class="px-4">
                <i class="pi pi-minus"></i>
            </div>
        </ng-template>
    </p-inputotp>
    <div class="flex justify-between mt-8 self-stretch">
        <p-button label="Resend Code" [link]="true" class="p-0"/>
        <p-button label="Submit Code"/>
    </div>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'input-otp-sample-demo',
    templateUrl: './input-otp-sample-demo.html',
    standalone: true,
    imports: [FormsModule, InputOtpModule, ButtonModule],
    styles: [
        \`
            .p-inputotp {
                gap: 0;
            }

            .custom-otp-input {
                width: 48px;
                height: 48px;
                font-size: 24px;
                appearance: none;
                text-align: center;
                transition: all 0.2s;
                border-radius: 0;
                border: 1px solid var(--p-inputtext-border-color);
                background: transparent;
                outline-offset: -2px;
                outline-color: transparent;
                border-right: 0 none;
                transition: outline-color 0.3s;
                color: var(--p-inputtext-color);
            }

            .custom-otp-input:focus {
                outline: 2px solid var(--p-focus-ring-color);
            }

            .custom-otp-input:first-child,
            .custom-otp-input:nth-child(5) {
                border-top-left-radius: 12px;
                border-bottom-left-radius: 12px;
            }

            .custom-otp-input:nth-child(3),
            .custom-otp-input:last-child {
                border-top-right-radius: 12px;
                border-bottom-right-radius: 12px;
                border-right-width: 1px;
                border-right-style: solid;
                border-color: var(--p-inputtext-border-color);
            }
        \`
    ],
})
export class InputOtpSampleDemo {
    value: any;
}
```
</details>

## Sizes

InputOtp provides small and large sizes as alternatives to the base.

```html
<p-inputotp [(ngModel)]="value1" size="small" />
<p-inputotp [(ngModel)]="value2" />
<p-inputotp [(ngModel)]="value3" size="large" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputOtp } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-otp-sizes-demo',
    templateUrl: './input-otp-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, InputOtp]
})
export class InputOtpSizesDemo {
    value : any
}
```
</details>

## Template

Define a template with your own UI elements with bindings to the provided events and attributes to replace the default design.

```html
<p-inputotp [(ngModel)]="value">
    <ng-template #input let-token let-events="events">
        <input class="custom-otp-input" (input)="events.input($event)" (keydown)="events.keydown($event)" type="text" [attr.value]="token" [maxLength]="1" />
    </ng-template>
</p-inputotp>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-otp-template-demo',
    templateUrl: './input-otp-template-demo.html',
    standalone: true,
    imports: [FormsModule, InputOtpModule],
    styles: [
        \`
        .custom-otp-input {
                width: 40px;
                font-size: 36px;
                border: 0 none;
                appearance: none;
                text-align: center;
                transition: all 0.2s;
                background: transparent;
                border-bottom: 2px solid var(--p-inputtext-border-color);
                border-radius: 0px;
            }

        .custom-otp-input:focus {
                outline: 0 none;
                border-bottom-color: var(--p-primary-color);
        }
        \`
    ],
})

export class InputOtpTemplateDemo {
    value: any;
}
```
</details>

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <p-inputotp #otpModel="ngModel" [(ngModel)]="value" [invalid]="otpModel.invalid && (otpModel.touched || exampleForm.submitted)" name="value" required [minlength]="4" />

        @if (otpModel.invalid && (otpModel.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">Passcode is required.</p-message>
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
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
    selector: 'input-otp-template-driven-forms-demo',
    templateUrl: './input-otp-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, InputOtpModule, MessageModule, ToastModule, ButtonModule]
})
export class TemplateDrivenFormsDemo implements OnInit {
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

## Input Otp

Input Otp is used to enter one time passwords.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<InputOtpPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| readonly | boolean | false | When present, it specifies that an input field is read-only. |
| tabindex | number | null | Index of the element in tabbing order. |
| length | number | 4 | Number of characters to initiate. |
| styleClass | string | - | Style class of the input element. |
| mask | boolean | false | Mask pattern. |
| integerOnly | boolean | false | When present, it specifies that an input field is integer-only. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| variant | InputSignal<"outlined" \| "filled"> | undefined | Specifies the input variant of the component. |
| size | InputSignal<"small" \| "large"> | undefined | Specifies the size of the component. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | event: InputOtpChangeEvent | Callback to invoke on value change. |
| onFocus | event: Event | Callback to invoke when the component receives focus. |
| onBlur | event: Event | Callback to invoke when the component loses focus. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| input | TemplateRef<InputOtpInputTemplateContext> | Custom input template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| pcInputText | InputTextPassThrough | Used to pass attributes to the InputText component. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-inputotp | Class name of the root element |
| p-inputotp-input | Class name of the input element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| inputotp.gap | --p-inputotp-gap | Gap of root |
| inputotp.input.width | --p-inputotp-input-width | Width of input |
| inputotp.input.sm.width | --p-inputotp-input-sm-width | Width of input in small screens |
| inputotp.input.lg.width | --p-inputotp-input-lg-width | Width of input in large screens |

