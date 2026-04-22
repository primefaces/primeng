# Angular ToggleButton Component

ToggleButton is used to select a boolean value using a button.

## Accessibility

Screen Reader ToggleButton component uses an element with button role and updates aria-pressed state for screen readers. Value to describe the component can be defined with ariaLabelledBy or ariaLabel props, it is highly suggested to use either of these props as the component changes the label displayed which will result in screen readers to read different labels when the component receives focus. To prevent this, always provide an aria label that does not change related to state.

<details>
<summary>TypeScript Example</summary>

```typescript
<span id="rememberme">Remember Me</span>
<p-togglebutton ariaLabelledBy="rememberme" />

<p-togglebutton ariaLabel="Remember Me" />
```
</details>

## Basic

Two-way binding to a boolean property is defined using the standard ngModel directive.

## Customized

Icons and Labels can be customized using onLabel , offLabel , onIcon and offIcon properties.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-togglebutton [(ngModel)]="checked" onLabel="Locked" offLabel="Unlocked" onIcon="pi pi-check" offIcon="pi pi-times" onIcon="pi pi-lock" offIcon="pi pi-lock-open" class="w-36" ariaLabel="Do you confirm" />
        </div>
    `,
    standalone: true,
    imports: [ToggleButtonModule, FormsModule]
})
export class TogglebuttonCustomizedDemo {
    checked: boolean = false;
}
```
</details>

## Disabled

When disabled is present, the element cannot be edited and focused.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-togglebutton disabled="true" onIcon="pi pi-check" offIcon="pi pi-times" [(ngModel)]="checked" onLabel="Yes" offLabel="No" class="w-full sm:w-40" ariaLabel="Confirmation" />
        </div>
    `,
    standalone: true,
    imports: [ToggleButtonModule, FormsModule]
})
export class TogglebuttonDisabledDemo {
    checked: boolean = false;
}
```
</details>

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-togglebutton [(ngModel)]="checked" onLabel="On" offLabel="Off" fluid />
        </div>
    `,
    standalone: true,
    imports: [ToggleButtonModule, FormsModule]
})
export class TogglebuttonFluidDemo {
    checked: boolean = false;
}
```
</details>

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-togglebutton [(ngModel)]="checked" onIcon="pi pi-check" offIcon="pi pi-times" [invalid]="!checked" class="w-full sm:w-40" aria-label="Confirmation" />
        </div>
    `,
    standalone: true,
    imports: [ToggleButtonModule, FormsModule]
})
export class TogglebuttonInvalidDemo {
    checked: boolean = false;
}
```
</details>

## reactiveforms-doc

ToggleButton can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col items-center gap-4">
                <div class="flex flex-col items-center gap-1">
                    <p-togglebutton name="consent" formControlName="checked" [invalid]="isInvalid('checked')" onLabel="Accept All" offLabel="Reject All" class="min-w-40" />
                    @if (isInvalid('checked')) {
                        <p-message severity="error" size="small" variant="simple">Consent is mandatory.</p-message>
                    }
                </div>
                <button pButton type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [MessageModule, ToastModule, ToggleButtonModule, ButtonModule, ReactiveFormsModule]
})
export class TogglebuttonReactiveformsDemo {
    messageService = inject(MessageService);
    exampleForm: FormGroup | undefined;
    formSubmitted: boolean = false;

    constructor() {
        this.exampleForm = this.fb.group({
                    checked: [false, Validators.requiredTrue]
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

ToggleButton provides small and large sizes as alternatives to the base.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    template: `
        <div class="card flex flex-col items-center gap-4">
            <p-togglebutton [(ngModel)]="value1" onLabel="On" offLabel="Off" size="small" class="min-w-16" />
            <p-togglebutton [(ngModel)]="value2" onLabel="On" offLabel="Off" class="min-w-20" />
            <p-togglebutton [(ngModel)]="value3" onLabel="On" offLabel="Off" size="large" class="min-w-24" />
        </div>
    `,
    standalone: true,
    imports: [ToggleButtonModule, FormsModule]
})
export class TogglebuttonSizesDemo {
    value1: boolean = false;
    value2: boolean = false;
    value3: boolean = false;
}
```
</details>

## templatedrivenforms-doc

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col items-center gap-4">
                <div class="flex flex-col items-center gap-1">
                    <p-togglebutton #model="ngModel" [(ngModel)]="checked" [invalid]="model.invalid && (model.touched || exampleForm.submitted)" name="country" onLabel="Accept All" offLabel="Reject All" required class="min-w-40" />
                    @if (model.invalid && (model.touched || exampleForm.submitted)) {
                        <p-message severity="error" size="small" variant="simple">Consent is mandatory.</p-message>
                    }
                </div>
                <button pButton type="submit">
                    <span pButtonLabel>Submit</span>
                </button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [MessageModule, ToastModule, ToggleButtonModule, ButtonModule, FormsModule]
})
export class TogglebuttonTemplatedrivenformsDemo {
    messageService = inject(MessageService);
    checked: boolean;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}
```
</details>

## Toggle Button

ToggleButton is used to select a boolean value using a button.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ToggleButtonPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| onLabel | string | Yes | Label for the on state. |
| offLabel | string | No | Label for the off state. |
| onIcon | string | - | Icon for the on state. |
| offIcon | string | - | Icon for the off state. |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| styleClass | string | - | Style class of the element. **(Deprecated)** |
| inputId | string | - | Identifier of the focus input to match a label defined for the component. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| iconPos | "right" \| "left" | left | Position of the icon. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| size | "small" \| "large" | - | Defines the size of the component. |
| allowEmpty | boolean | false | Whether selection can not be cleared. |
| fluid | InputSignalWithTransform<boolean, unknown> | undefined | Spans 100% width of the container when enabled. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | event: ToggleButtonChangeEvent | Callback to invoke on value change. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| icon | TemplateRef<ToggleButtonIconTemplateContext> | Custom icon template. |
| content | TemplateRef<ToggleButtonContentTemplateContext> | Custom content template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| content | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the content's DOM element. |
| icon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the icon's DOM element. |
| label | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the label's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-togglebutton | Class name of the root element |
| p-togglebutton-icon | Class name of the icon element |
| p-togglebutton-icon-left | Class name of the left icon |
| p-togglebutton-icon-right | Class name of the right icon |
| p-togglebutton-label | Class name of the label element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| togglebutton.padding | --p-togglebutton-padding | Padding of root |
| togglebutton.border.radius | --p-togglebutton-border-radius | Border radius of root |
| togglebutton.gap | --p-togglebutton-gap | Gap of root |
| togglebutton.font.weight | --p-togglebutton-font-weight | Font weight of root |
| togglebutton.disabled.background | --p-togglebutton-disabled-background | Disabled background of root |
| togglebutton.disabled.border.color | --p-togglebutton-disabled-border-color | Disabled border color of root |
| togglebutton.disabled.color | --p-togglebutton-disabled-color | Disabled color of root |
| togglebutton.invalid.border.color | --p-togglebutton-invalid-border-color | Invalid border color of root |
| togglebutton.focus.ring.width | --p-togglebutton-focus-ring-width | Focus ring width of root |
| togglebutton.focus.ring.style | --p-togglebutton-focus-ring-style | Focus ring style of root |
| togglebutton.focus.ring.color | --p-togglebutton-focus-ring-color | Focus ring color of root |
| togglebutton.focus.ring.offset | --p-togglebutton-focus-ring-offset | Focus ring offset of root |
| togglebutton.focus.ring.shadow | --p-togglebutton-focus-ring-shadow | Focus ring shadow of root |
| togglebutton.transition.duration | --p-togglebutton-transition-duration | Transition duration of root |
| togglebutton.sm.font.size | --p-togglebutton-sm-font-size | Sm font size of root |
| togglebutton.sm.padding | --p-togglebutton-sm-padding | Sm padding of root |
| togglebutton.lg.font.size | --p-togglebutton-lg-font-size | Lg font size of root |
| togglebutton.lg.padding | --p-togglebutton-lg-padding | Lg padding of root |
| togglebutton.background | --p-togglebutton-background | Background of root |
| togglebutton.checked.background | --p-togglebutton-checked-background | Checked background of root |
| togglebutton.hover.background | --p-togglebutton-hover-background | Hover background of root |
| togglebutton.border.color | --p-togglebutton-border-color | Border color of root |
| togglebutton.color | --p-togglebutton-color | Color of root |
| togglebutton.hover.color | --p-togglebutton-hover-color | Hover color of root |
| togglebutton.checked.color | --p-togglebutton-checked-color | Checked color of root |
| togglebutton.checked.border.color | --p-togglebutton-checked-border-color | Checked border color of root |
| togglebutton.icon.disabled.color | --p-togglebutton-icon-disabled-color | Disabled color of icon |
| togglebutton.icon.color | --p-togglebutton-icon-color | Color of icon |
| togglebutton.icon.hover.color | --p-togglebutton-icon-hover-color | Hover color of icon |
| togglebutton.icon.checked.color | --p-togglebutton-icon-checked-color | Checked color of icon |
| togglebutton.content.padding | --p-togglebutton-content-padding | Padding of content |
| togglebutton.content.border.radius | --p-togglebutton-content-border-radius | Border radius of content |
| togglebutton.content.checked.shadow | --p-togglebutton-content-checked-shadow | Checked shadow of content |
| togglebutton.content.sm.padding | --p-togglebutton-content-sm-padding | Sm padding of content |
| togglebutton.content.lg.padding | --p-togglebutton-content-lg-padding | Lg padding of content |
| togglebutton.content.checked.background | --p-togglebutton-content-checked-background | Checked background of content |

