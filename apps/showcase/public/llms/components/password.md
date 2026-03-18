# Angular Password Component

Password displays strength indicator for password fields.

## Accessibility

Screen Reader Value to describe the component can either be provided via label tag combined with id prop or using ariaLabelledBy , ariaLabel props. Screen reader is notified about the changes to the strength of the password using a section that has aria-live while typing.

## Basic

Two-way value binding is defined using ngModel .

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <div class="flex justify-center">
            <p-password [(ngModel)]="value" [feedback]="false" autocomplete="off" />
        </div>
    `,
    standalone: true,
    imports: [PasswordModule, FormsModule]
})
export class PasswordBasicDemo {
    value!: string;
}
```

## Clear Icon

When showClear is enabled, a clear icon is displayed to clear the value.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <div class="flex justify-center">
            <p-password [(ngModel)]="value" [feedback]="false" autocomplete="off" [showClear]="true" inputStyleClass="w-56" />
        </div>
    `,
    standalone: true,
    imports: [PasswordModule, FormsModule]
})
export class PasswordClearIconDemo {
    value!: string;
}
```

## Disabled

When disabled is present, the element cannot be edited and focused.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <div class="flex justify-center">
            <p-password [(ngModel)]="value" [disabled]="true" placeholder="Disabled" autocomplete="off" />
        </div>
    `,
    standalone: true,
    imports: [PasswordModule, FormsModule]
})
export class PasswordDisabledDemo {
    value!: string;
}
```

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <div class="flex justify-center">
            <p-password [(ngModel)]="value" [feedback]="false" variant="filled" autocomplete="off" />
        </div>
    `,
    standalone: true,
    imports: [PasswordModule, FormsModule]
})
export class PasswordFilledDemo {
    value!: string;
}
```

## Float Label

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <div class="flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel>
                <p-password [(ngModel)]="value1" inputId="over_label" autocomplete="off" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>
            <p-floatlabel variant="in">
                <p-password [(ngModel)]="value2" inputId="in_label" autocomplete="off" />
                <label for="in_label">In Label</label>
            </p-floatlabel>
            <p-floatlabel variant="on">
                <p-password [(ngModel)]="value3" inputId="on_label" autocomplete="off" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
    `,
    standalone: true,
    imports: [FloatLabelModule, PasswordModule, FormsModule]
})
export class PasswordFloatLabelDemo {
    value1!: string;
    value2!: string;
    value3!: string;
}
```

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <p-password [(ngModel)]="value" [feedback]="false" autocomplete="off" fluid />
    `,
    standalone: true,
    imports: [PasswordModule, FormsModule]
})
export class PasswordFluidDemo {
    value!: string;
}
```

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <div class="flex justify-center">
            <p-iftalabel>
                <p-password [(ngModel)]="value" inputId="password" autocomplete="off" />
                <label for="password">Password</label>
            </p-iftalabel>
        </div>
    `,
    standalone: true,
    imports: [IftaLabelModule, PasswordModule, FormsModule]
})
export class PasswordIftaLabelDemo {
    value!: string;
}
```

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <div class="flex flex-wrap justify-center gap-4">
            <p-password [(ngModel)]="value1" [invalid]="!value1" placeholder="Password" />
            <p-password [(ngModel)]="value2" [invalid]="!value2" variant="filled" placeholder="Password" />
        </div>
    `,
    standalone: true,
    imports: [PasswordModule, FormsModule]
})
export class PasswordInvalidDemo {
    value1!: string;
    value2!: string;
}
```

## Locale

Labels are translated at component level by promptLabel , weakLabel , mediumLabel and strongLabel properties. In order to apply global translations for all Password components in the application, refer to the locale

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <div class="flex justify-center">
            <p-password [(ngModel)]="value" promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity" strongLabel="Complex password" autocomplete="off" />
        </div>
    `,
    standalone: true,
    imports: [PasswordModule, FormsModule]
})
export class PasswordLocaleDemo {
    value!: string;
}
```

## Meter

Strength meter is displayed as a popup while a value is being entered.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <div class="flex justify-center">
            <p-password [(ngModel)]="value" autocomplete="off" />
        </div>
    `,
    standalone: true,
    imports: [PasswordModule, FormsModule]
})
export class PasswordMeterDemo {
    value!: string;
}
```

## reactiveforms-doc

Password can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 sm:w-56">
                <div class="flex flex-col gap-1">
                    <p-password formControlName="value" [invalid]="isInvalid('value')" [feedback]="false" autocomplete="off" fluid />
                    @if (isInvalid('value')) {
                        <p-message severity="error" size="small" variant="simple">Password is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [MessageModule, PasswordModule, ButtonModule, ReactiveFormsModule],
    providers: [MessageService]
})
export class PasswordReactiveFormsDemo {
    private messageService = inject(MessageService);
    messageService = inject(MessageService);
    exampleForm: FormGroup | undefined;
    formSubmitted: boolean = false;

    constructor() {
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

## Sizes

Password provides small and large sizes as alternatives to the base.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <div class="flex flex-col items-center gap-4">
            <p-password [(ngModel)]="value1" type="text" size="small" placeholder="Small" />
            <p-password [(ngModel)]="value2" type="text" placeholder="Normal" />
            <p-password [(ngModel)]="value3" type="text" size="large" placeholder="Large" />
        </div>
    `,
    standalone: true,
    imports: [PasswordModule, FormsModule]
})
export class PasswordSizesDemo {
    value1: string;
    value2: string;
    value3: string;
}
```

## Template

3 templates are included to customize the overlay. These are header , content and footer . Note that content overrides the default meter.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <div class="flex justify-center">
            <p-password [(ngModel)]="value" autocomplete="off">
                <ng-template #header>
                    <div class="font-semibold text-xm mb-4">Reset Password</div>
                </ng-template>
                <ng-template #footer>
                    <p-divider />
                    <ul class="pl-2 my-0 leading-normal text-sm">
                        <li>At least one lowercase</li>
                        <li>At least one uppercase</li>
                        <li>At least one numeric</li>
                        <li>Minimum 8 characters</li>
                    </ul>
                </ng-template>
            </p-password>
        </div>
    `,
    standalone: true,
    imports: [DividerModule, PasswordModule, FormsModule]
})
export class PasswordTemplateDemo {
    value!: string;
}
```

## templatedrivenforms-doc

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="flex justify-center">
            <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4 md:w-56">
                <div class="flex flex-col gap-1">
                    <p-password #model="ngModel" [(ngModel)]="value" [invalid]="model.invalid && (model.touched || exampleForm.submitted)" name="password" [feedback]="false" autocomplete="off" required fluid />
                    @if (model.invalid && (model.touched || exampleForm.submitted)) {
                        <p-message severity="error" size="small" variant="simple">Password is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [MessageModule, PasswordModule, ButtonModule, FormsModule],
    providers: [MessageService]
})
export class PasswordTemplateDrivenFormsDemo {
    private messageService = inject(MessageService);
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

## Toggle Mask

When toggleMask is present, an icon is displayed to show the value as plain text.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    template: `
        <div class="flex justify-center">
            <p-password [(ngModel)]="value" [toggleMask]="true" autocomplete="off" />
        </div>
    `,
    standalone: true,
    imports: [PasswordModule, FormsModule]
})
export class PasswordToggleMaskDemo {
    value!: string;
}
```

## Password

Password displays strength indicator for password fields.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | Object | undefined | Defines scoped design tokens of the component. |
| unstyled | boolean | undefined | Indicates whether the component should be rendered without styles. |
| pt | PassThrough<I, PasswordPassThroughOptions<I>> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | PassThroughOptions | undefined | Used to configure passthrough(pt) options of the component. |
| required | boolean | false | There must be a value (if set). |
| invalid | boolean | false | When present, it specifies that the component should have invalid state style. |
| disabled | boolean | false | When present, it specifies that the component should have disabled state style. |
| name | string | undefined | When present, it specifies that the name of the input. |
| fluid | boolean | false | Spans 100% width of the container when enabled. |
| variant | "filled" \| "outlined" | 'outlined' | Specifies the input variant of the component. |
| size | "small" \| "large" | undefined | Specifies the size of the component. |
| inputSize | number | undefined | Specifies the visible width of the input element in characters. |
| pattern | string | undefined | Specifies the value must match the pattern. |
| min | number | undefined | The value must be greater than or equal to the value. |
| max | number | undefined | The value must be less than or equal to the value. |
| step | number | undefined | Unless the step is set to the any literal, the value must be min + an integral multiple of the step. |
| minlength | number | undefined | The number of characters (code points) must not be less than the value of the attribute, if non-empty. |
| maxlength | number | undefined | The number of characters (code points) must not exceed the value of the attribute. |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| ariaLabelledBy | string | - | Specifies one or more IDs in the DOM that labels the input field. |
| label | string | - | Label of the input for accessibility. |
| promptLabel | string | - | Text to prompt password entry. Defaults to PrimeNG I18N API configuration. |
| mediumRegex | string | - | Regex value for medium regex. |
| strongRegex | string | - | Regex value for strong regex. |
| weakLabel | string | - | Text for a weak password. Defaults to PrimeNG I18N API configuration. |
| mediumLabel | string | - | Text for a medium password. Defaults to PrimeNG I18N API configuration. |
| strongLabel | string | - | Text for a strong password. Defaults to PrimeNG I18N API configuration. |
| inputId | string | - | Identifier of the accessible input element. |
| feedback | boolean | - | Whether to show the strength indicator or not. |
| toggleMask | boolean | - | Whether to show an icon to display the password as plain text. |
| inputStyleClass | string | - | Style class of the input field. |
| inputStyle | Partial<CSSStyleDeclaration> | - | Inline style of the input field. |
| autocomplete | string | - | Specify automated assistance in filling out password by browser. |
| placeholder | string | - | Advisory information to display on input. |
| showClear | boolean | - | When enabled, a clear icon is displayed to clear the value. |
| autofocus | boolean | - | When present, it specifies that the component should automatically get focus on load. |
| tabindex | number | - | Index of the element in tabbing order. |
| appendTo | HTMLElement \| ElementRef \| TemplateRef<any> \| "self" \| "body" \| null \| undefined | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| motionOptions | MotionOptions | - | The motion options. |
| overlayOptions | OverlayOptions | - | Whether to use overlay API feature. The properties of overlay API can be used like an object in it. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onFocus | event: Event | Callback to invoke when the component receives focus. |
| onBlur | event: Event | Callback to invoke when the component loses focus. |
| onClear | value: void | Callback to invoke when clear button is clicked. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | Signal<TemplateRef<void>> | Custom template of content. |
| footer | Signal<TemplateRef<void>> | Custom template of footer. |
| header | Signal<TemplateRef<void>> | Custom template of header. |
| clearicon | Signal<TemplateRef<void>> | Custom template of clear icon. |
| hideicon | Signal<TemplateRef<PasswordIconTemplateContext>> | Custom template of hide icon. |
| showicon | Signal<TemplateRef<PasswordIconTemplateContext>> | Custom template of show icon. |

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
| password.meter.text.font.weight | --p-password-meter-text-font-weight | Font weight of meter text |
| password.meter.text.font.size | --p-password-meter-text-font-size | Font size of meter text |
| password.strength.weak.background | --p-password-strength-weak-background | Weak background of strength |
| password.strength.medium.background | --p-password-strength-medium-background | Medium background of strength |
| password.strength.strong.background | --p-password-strength-strong-background | Strong background of strength |

