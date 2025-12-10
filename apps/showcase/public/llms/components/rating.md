# Angular Rating Component

Rating component is a star based selection input.

## Accessibility

Screen Reader Rating component internally uses radio buttons that are only visible to screen readers. The value to read for item is retrieved from the locale API via star and stars of the aria property.

## Basic

Two-way value binding is defined using ngModel .

```html
<p-rating [(ngModel)]="value" />
```

## Disabled

When disabled is present, a visual hint is applied to indicate that the Knob cannot be interacted with.

```html
<p-rating [(ngModel)]="value" [disabled]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';

@Component({
    selector: 'rating-disabled-demo',
    templateUrl: './rating-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, Rating]
})
export class RatingDisabledDemo {
    value: number = 5;
}
```
</details>

## Number of Stars

Number of stars to display is defined with stars property.

```html
<p-rating [(ngModel)]="value" [stars]="10" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';

@Component({
    selector: 'rating-number-of-stars-demo',
    templateUrl: './rating-number-of-stars-demo.html',
    standalone: true,
    imports: [FormsModule, Rating]
})
export class RatingNumberOfStarsDemo {
    value: number = 5;
}
```
</details>

## reactiveformsdoc

Rating can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-40">
    <div class="flex flex-col items-center gap-2">
        <p-rating formControlName="ratingValue" [invalid]="isInvalid('ratingValue')"/>
        @if (isInvalid('ratingValue')) {
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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
import { Message } from 'primeng/message';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'rating-reactive-forms-demo',
    templateUrl: './rating-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, Rating, Toast, Message, Button]
})
export class RatingReactiveFormsDemo {
    messageService = inject(MessageService);

    exampleForm: FormGroup | undefined;

    formSubmitted = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            ratingValue: [undefined, Validators.required]
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

## Readonly

When readonly present, value cannot be edited.

```html
<p-rating [(ngModel)]="value" [readonly]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';

@Component({
    selector: 'rating-readonly-demo',
    templateUrl: './rating-readonly-demo.html',
    standalone: true,
    imports: [FormsModule, Rating]
})
export class RatingReadonlyDemo {
    value: number = 3;
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Templating allows customizing the content where the icon instance is available as the implicit variable.

```html
<p-rating [(ngModel)]="value">
    <ng-template #onicon>
        <img src="https://primefaces.org/cdn/primeng/images/demo/rating/custom-icon-active.png" height="24" width="24" />
    </ng-template>
    <ng-template #officon>
        <img src="https://primefaces.org/cdn/primeng/images/demo/rating/custom-icon.png" height="24" width="24" />
    </ng-template>
</p-rating>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';

@Component({
    selector: 'rating-template-demo',
    templateUrl: './rating-template-demo.html',
    standalone: true,
    imports: [FormsModule, Rating]
})
export class RatingTemplateDemo {
    value!: number;
}
```
</details>

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4 w-40">
    <div class="flex flex-col items-center gap-2">
        <p-rating #ratingValue="ngModel" [(ngModel)]="value" required name="ratingValue" [invalid]="ratingValue.invalid && (ratingValue.touched || exampleForm.submitted)"/>
        @if (ratingValue.invalid && (ratingValue.touched || exampleForm.submitted)) {
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
import { FormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { Message } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';

@Component({
    selector: 'rating-template-driven-forms-demo',
    templateUrl: './rating-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelect, Message, Toast, Button]
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

## withoutcanceldoc

A cancel icon is displayed to reset the value by default, set cancel as false to remove this option.

```html
<p-rating [(ngModel)]="value" [cancel]="false" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';

@Component({
    selector: 'rating-without-cancel-demo',
    templateUrl: './rating-without-cancel-demo.html',
    standalone: true,
    imports: [FormsModule, Rating]
})
export class RatingWithoutCancelDemo {
    value!: number;
}
```
</details>

## Rating

Rating is an extension to standard radio button element with theming.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<RatingPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| readonly | boolean | false | When present, changing the value is not possible. |
| stars | number | 5 | Number of stars. |
| iconOnClass | string | - | Style class of the on icon. |
| iconOnStyle | { [klass: string]: any } | - | Inline style of the on icon. |
| iconOffClass | string | - | Style class of the off icon. |
| iconOffStyle | { [klass: string]: any } | - | Inline style of the off icon. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onRate | event: RatingRateEvent | Emitted on value change. |
| onFocus | event: FocusEvent | Emitted when the rating receives focus. |
| onBlur | event: FocusEvent | Emitted when the rating loses focus. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| onicon | TemplateRef<RatingIconTemplateContext> | Custom on icon template. |
| officon | TemplateRef<RatingIconTemplateContext> | Custom off icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| option | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the option's DOM element. |
| onIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the on icon's DOM element. |
| offIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the off icon's DOM element. |
| hiddenOptionInputContainer | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hidden option input container's DOM element. |
| hiddenOptionInput | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the hidden option input's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-rating | Class name of the root element |
| p-rating-option | Class name of the option element |
| p-rating-on-icon | Class name of the on icon element |
| p-rating-off-icon | Class name of the off icon element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| rating.gap | --p-rating-gap | Gap of root |
| rating.transition.duration | --p-rating-transition-duration | Transition duration of root |
| rating.focus.ring.width | --p-rating-focus-ring-width | Focus ring width of root |
| rating.focus.ring.style | --p-rating-focus-ring-style | Focus ring style of root |
| rating.focus.ring.color | --p-rating-focus-ring-color | Focus ring color of root |
| rating.focus.ring.offset | --p-rating-focus-ring-offset | Focus ring offset of root |
| rating.focus.ring.shadow | --p-rating-focus-ring-shadow | Focus ring shadow of root |
| rating.icon.size | --p-rating-icon-size | Size of icon |
| rating.icon.color | --p-rating-icon-color | Color of icon |
| rating.icon.hover.color | --p-rating-icon-hover-color | Hover color of icon |
| rating.icon.active.color | --p-rating-icon-active-color | Active color of icon |

