# Angular Slider Component

Slider is a component to provide input with a drag handle.

## Accessibility

Screen Reader Slider element component uses slider role on the handle in addition to the aria-orientation , aria-valuemin , aria-valuemax and aria-valuenow attributes. Value to describe the component can be defined using ariaLabelledBy and ariaLabel props.

```html
<span id="label_number">Number</span>
<p-slider ariaLabelledBy="label_number" />

<p-slider ariaLabel="Number" />
```

## Basic

Two-way binding is defined using the standard ngModel directive.

```html
<p-slider [(ngModel)]="value" class="w-56" />
```

## Filter

Image filter implementation using multiple sliders.

```html
<img alt="user header" class="w-full md:w-80 rounded mb-6" src="https://primefaces.org/cdn/primevue/images/card-vue.jpg" [style]="filterStyle" />
<p-selectbutton [(ngModel)]="filter" [options]="filterOptions" optionLabel="label" optionValue="value" class="mb-4" />
<p-slider [(ngModel)]="filterValues[filter]" class="w-56" [min]="0" [max]="200" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
    selector: 'slider-filter-demo',
    templateUrl: './slider-filter-demo.html',
    standalone: true,
    imports: [FormsModule, SliderModule, SelectButtonModule]
})
export class SliderFilterDemo {
    filter: number = 0;

    filterValues: number[] = [100, 100, 0];

    filterOptions: any = [
        { label: 'Contrast', value: 0 },
        { label: 'Brightness', value: 1 },
        { label: 'Sepia', value: 2 },
    ];

    get filterStyle() {
        return {
            filter: \`contrast(\${this.filterValues[0]}%) brightness(\${this.filterValues[1]}%) sepia(\${this.filterValues[2]}%)\`,
        };
    }
}
```
</details>

## Input

Slider is connected to an input field using two-way binding.

```html
<input type="text" pInputText [(ngModel)]="value" class="w-full mb-4"/>
<p-slider [(ngModel)]="value" class="w-full" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'slider-input-demo',
    templateUrl: './slider-input-demo.html',
    standalone: true,
    imports: [FormsModule, Slider, InputTextModule]
})
export class SliderInputDemo {
    value: number = 50;
}
```
</details>

## Range

When range property is present, slider provides two handles to define two values. In range mode, value should be an array instead of a single value.

```html
<p-slider [(ngModel)]="rangeValues" [range]="true" class="w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';

@Component({
    selector: 'slider-range-demo',
    templateUrl: './slider-range-demo.html',
    standalone: true,
    imports: [FormsModule, Slider]
})
export class SliderRangeDemo {
    rangeValues: number[] = [20, 80];
}
```
</details>

## reactiveformsdoc

Slider can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-col gap-4">
        <p-slider formControlName="value" class="w-56" />
        @if (isInvalid('value')) {
            <p-message severity="error" size="small" variant="simple">Must be greater than 25.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'slider-reactive-forms-demo',
    templateUrl: './slider-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, SliderModule, ToastModule, MessageModule, ButtonModule]
})
export class SliderReactiveFormsDemo {
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

## Step

Size of each movement is defined with the step property.

```html
<p-slider [(ngModel)]="value" [step]="20" class="w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';

@Component({
    selector: 'slider-step-demo',
    templateUrl: './slider-step-demo.html',
    standalone: true,
    imports: [FormsModule, Slider]
})
export class SliderStepDemo {
    value: number = 20;
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4">
    <div class="flex flex-col gap-4">
        <p-slider #model="ngModel" [(ngModel)]="value" class="w-56" required [invalid]="model.invalid && (model.touched || exampleForm.submitted)" name="slider" />
        @if (model.invalid && (model.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">Must be greater than 25.</p-message>
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
import { SliderModule } from 'primeng/slider';

@Component({
    selector: 'slider-template-driven-forms-demo',
    templateUrl: './slider-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, MessageModule, ToastModule, ButtonModule, SliderModule]
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

Default layout of slider is horizontal , use orientation property for the alternative vertical mode.

```html
<p-slider [(ngModel)]="value" orientation="vertical" class="h-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';

@Component({
    selector: 'slider-vertical-demo',
    templateUrl: './slider-vertical-demo.html',
    standalone: true,
    imports: [FormsModule, Slider]
})
export class SliderVerticalDemo {
    value: number = 50
}
```
</details>

## Slider

Slider is a component to provide input with a drag handle.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<SliderPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| animate | boolean | false | When enabled, displays an animation on click of the slider bar. |
| min | number | 0 | Mininum boundary value. |
| max | number | 100 | Maximum boundary value. |
| orientation | "vertical" \| "horizontal" | horizontal | Orientation of the slider. |
| step | number | - | Step factor to increment/decrement the value. |
| range | boolean | false | When specified, allows two boundary values to be picked. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | event: SliderChangeEvent | Callback to invoke on value change. |
| onSlideEnd | event: SliderSlideEndEvent | Callback to invoke when slide ended. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| range | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the range's DOM element. |
| handle | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the handle's DOM element. |
| startHandler | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the start handler's DOM element. |
| endHandler | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the end handler's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-slider | Class name of the root element |
| p-slider-range | Class name of the range element |
| p-slider-handle | Class name of the handle element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| slider.transition.duration | --p-slider-transition-duration | Transition duration of root |
| slider.track.background | --p-slider-track-background | Background of track |
| slider.track.border.radius | --p-slider-track-border-radius | Border radius of track |
| slider.track.size | --p-slider-track-size | Size of track |
| slider.range.background | --p-slider-range-background | Background of range |
| slider.handle.width | --p-slider-handle-width | Width of handle |
| slider.handle.height | --p-slider-handle-height | Height of handle |
| slider.handle.border.radius | --p-slider-handle-border-radius | Border radius of handle |
| slider.handle.background | --p-slider-handle-background | Background of handle |
| slider.handle.hover.background | --p-slider-handle-hover-background | Hover background of handle |
| slider.handle.content.border.radius | --p-slider-handle-content-border-radius | Content border radius of handle |
| slider.handle.content.background | --p-slider-handle-content-background | Background of handle |
| slider.handle.content.hover.background | --p-slider-handle-content-hover-background | Content hover background of handle |
| slider.handle.content.width | --p-slider-handle-content-width | Content width of handle |
| slider.handle.content.height | --p-slider-handle-content-height | Content height of handle |
| slider.handle.content.shadow | --p-slider-handle-content-shadow | Content shadow of handle |
| slider.handle.focus.ring.width | --p-slider-handle-focus-ring-width | Focus ring width of handle |
| slider.handle.focus.ring.style | --p-slider-handle-focus-ring-style | Focus ring style of handle |
| slider.handle.focus.ring.color | --p-slider-handle-focus-ring-color | Focus ring color of handle |
| slider.handle.focus.ring.offset | --p-slider-handle-focus-ring-offset | Focus ring offset of handle |
| slider.handle.focus.ring.shadow | --p-slider-handle-focus-ring-shadow | Focus ring shadow of handle |

