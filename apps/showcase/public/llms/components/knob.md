# Angular Knob Component

Knob is a form component to define number inputs with a dial.

## Accessibility

Screen Reader Knob element component uses slider role in addition to the aria-valuemin , aria-valuemax and aria-valuenow attributes. Value to describe the component can be defined using ariaLabelledBy and ariaLabel props.

```html
<span id="label_number">Number</span>
<p-knob ariaLabelledBy="label_number"/>

<p-knob ariaLabel="Number"/>
```

## Basic

Knob is an input component and used with the standard ngModel directive.

```html
<p-knob [(ngModel)]="value" />
```

## Color

Colors are customized with the textColor , rangeColor and valueColor properties.

```html
<p-knob [(ngModel)]="value" valueColor="SlateGray" rangeColor="MediumTurquoise" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';

@Component({
    selector: 'knob-color-demo',
    templateUrl: './knob-color-demo.html',
    standalone: true,
    imports: [FormsModule, Knob]
})
export class KnobColorDemo {
    value: number = 50;
}
```
</details>

## Disabled

When disabled is present, a visual hint is applied to indicate that the Knob cannot be interacted with.

```html
<p-knob [(ngModel)]="value" [disabled]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';

@Component({
    selector: 'knob-disabled-demo',
    templateUrl: './knob-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, Knob]
})
export class KnobDisabledDemo {
    value: number = 75;
}
```
</details>

## Min/Max

Boundaries are configured with the min and max properties whose defaults are 0 and 100 respectively.

```html
<p-knob [(ngModel)]="value" [min]="-50" [max]="50" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';

@Component({
    selector: 'knob-min-max-demo',
    templateUrl: './knob-min-max-demo.html',
    standalone: true,
    imports: [FormsModule, Knob]
})
export class KnobMinMaxDemo {
    value: number = 10;
}
```
</details>

## Reactive

Knob can be controlled with custom controls as well.

```html
<p-knob [(ngModel)]="value" size="150" readonly="true"/>
<div class="flex gap-2">
    <p-button icon="pi pi-plus" (click)="value = value+1" [disabled]="value >= 100" />
    <p-button icon="pi pi-minus" (click)="value = value-1" [disabled]="value <= 0" />
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'knob-reactive-demo',
    templateUrl: './knob-reactive-demo.html',
    standalone: true,
    imports: [FormsModule, Knob, ButtonModule]
})
export class KnobReactiveDemo {
    value: number = 0;
}
```
</details>

## Reactive Forms

Knob can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-col items-center gap-1">
        <p-knob formControlName="value" [invalid]="isInvalid('value')" />
        @if (isInvalid('value')) {
            <p-message severity="error" size="small" variant="simple">{{ getErrorMessage('value') }}</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'knob-reactive-forms-demo',
    templateUrl: './knob-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, KnobModule, MessageModule, ToastModule, ButtonModule]
})
export class KnobReactiveFormsDemo {
    messageService = inject(MessageService);

    items: any[] | undefined;

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            value: [15, [Validators.min(25), Validators.max(75)]]
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            this.exampleForm.reset({
                value: 15
            });
            this.formSubmitted = false;
        }
    }

    getControl(controlName: string): AbstractControl | null {
        return this.exampleForm?.get(controlName) ?? null;
    }

    getErrorMessage(controlName: string): string | null {
        const control = this.getControl(controlName);
        if (!control || !control.errors) return null;

        if (control.errors['min']) {
            return 'Value must be greater than 15.';
        }

        if (control.errors['max']) {
            return 'Must be less than 75.';
        }
    }

    isInvalid(controlName: string) {
        const control = this.getControl(controlName);
        return control?.invalid && (control.dirty || this.formSubmitted);
    }
}
```
</details>

## ReadOnly

When readonly present, value cannot be edited.

```html
<p-knob [(ngModel)]="value" [readonly]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';

@Component({
    selector: 'knob-readonly-demo',
    templateUrl: './knob-readonly-demo.html',
    standalone: true,
    imports: [FormsModule, Knob]
})
export class KnobReadonlyDemo {
    value: number = 50;
}
```
</details>

## Size

Diameter of the knob is defined in pixels using the size property.

```html
<p-knob [(ngModel)]="value" [size]="200" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';

@Component({
    selector: 'knob-size-demo',
    templateUrl: './knob-size-demo.html',
    standalone: true,
    imports: [FormsModule, Knob]
})
export class KnobSizeDemo {
    value: number = 60;
}
```
</details>

## Step

Size of each movement is defined with the step property.

```html
<p-knob [(ngModel)]="value" [step]="10" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';

@Component({
    selector: 'knob-step-demo',
    templateUrl: './knob-step-demo.html',
    standalone: true,
    imports: [FormsModule, Knob]
})
export class KnobStepDemo {
    value!: number;
}
```
</details>

## Stroke

The border size is specified with the strokeWidth property as a number in pixels.

```html
<p-knob [(ngModel)]="value" [strokeWidth]="5" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';

@Component({
    selector: 'knob-stroke-demo',
    templateUrl: './knob-stroke-demo.html',
    standalone: true,
    imports: [FormsModule, Knob]
})
export class KnobStrokeDemo {
    value: number = 40;
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Label is a string template that can be customized with the valueTemplate property having 60 as the placeholder .

```html
<p-knob [(ngModel)]="value" valueTemplate="{value}%" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';

@Component({
    selector: 'knob-template-demo',
    templateUrl: './knob-template-demo.html',
    standalone: true,
    imports: [FormsModule, Knob]
})
export class KnobTemplateDemo {
    value: number = 60;
}
```
</details>

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
    <div class="flex flex-col items-center gap-1">
        <p-knob #model="ngModel" [(ngModel)]="value" [invalid]="isInvalid(model)" name="knob" />
        @if (isInvalid(model)) {
            <p-message severity="error" size="small" variant="simple">{{ getErrorMessage(model) }}</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { KnobModule } from 'primeng/knob';

@Component({
    selector: 'knob-template-driven-forms-demo',
    templateUrl: './knob-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, KnobModule, MessageModule, ToastModule, ButtonModule]
})
export class TemplateDrivenFormsDemo {
    messageService = inject(MessageService);

    value: number = 15;

    formSubmitted: boolean = false;

    onSubmit(form: NgForm) {
        this.formSubmitted = true;

        if (!this.isInvalid(form.controls['knob'])) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Form is submitted',
                life: 3000
            });

            form.resetForm({ knob: 15 });

            this.formSubmitted = false;
        }
    }

    getErrorMessage(control: any): string | null {
        const value = control?.value;

        return value < 25 ? 'Value must be greater than 25.' : value > 75 ? 'Must be less than 75.' : null;
    }

    isInvalid(control: any): boolean {
        if (!control) return false;

        const value = control.value;

        const hasError = value < 25 || value > 75;

        return hasError && (this.formSubmitted || control.dirty);
    }
}
```
</details>

## Knob

Knob is a form component to define number inputs with a dial.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<KnobPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| ariaLabelledBy | string | - | Specifies one or more IDs in the DOM that labels the input field. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| valueColor | string | ... | Background of the value. |
| rangeColor | string | ... | Background color of the range. |
| textColor | string | ... | Color of the value text. |
| valueTemplate | string | {value} | Template string of the value. |
| size | number | 100 | Size of the component in pixels. |
| min | number | 0 | Mininum boundary value. |
| max | number | 100 | Maximum boundary value. |
| step | number | 1 | Step factor to increment/decrement the value. |
| strokeWidth | number | 14 | Width of the knob stroke. |
| showValue | boolean | true | Whether the show the value inside the knob. |
| readonly | boolean | false | When present, it specifies that the component value cannot be edited. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | value: number | Callback to invoke on value change. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| svg | PassThroughOption<SVGElement, I> | Used to pass attributes to the SVG's DOM element. |
| range | PassThroughOption<SVGPathElement, I> | Used to pass attributes to the range's DOM element. |
| value | PassThroughOption<SVGPathElement, I> | Used to pass attributes to the value's DOM element. |
| text | PassThroughOption<SVGTextElement, I> | Used to pass attributes to the text's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-knob | Class name of the root element |
| p-knob-range | Class name of the range element |
| p-knob-value | Class name of the value element |
| p-knob-text | Class name of the text element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| knob.transition.duration | --p-knob-transition-duration | Transition duration of root |
| knob.focus.ring.width | --p-knob-focus-ring-width | Focus ring width of root |
| knob.focus.ring.style | --p-knob-focus-ring-style | Focus ring style of root |
| knob.focus.ring.color | --p-knob-focus-ring-color | Focus ring color of root |
| knob.focus.ring.offset | --p-knob-focus-ring-offset | Focus ring offset of root |
| knob.focus.ring.shadow | --p-knob-focus-ring-shadow | Focus ring shadow of root |
| knob.value.background | --p-knob-value-background | Background of value |
| knob.range.background | --p-knob-range-background | Background of range |
| knob.text.color | --p-knob-text-color | Color of text |

