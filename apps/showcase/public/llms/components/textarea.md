# Angular Textarea Component

Textarea adds styling and autoResize functionality to standard textarea element.

## Accessibility

Screen Reader Textarea component renders a native textarea element that implicitly includes any passed prop. Value to describe the component can either be provided via label tag combined with id prop or using aria-labelledby , aria-label props.

## AutoResize

When autoResize is enabled, textarea grows instead of displaying a scrollbar.

```html
<textarea rows="5" cols="30" pTextarea [autoResize]="true"></textarea>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';

@Component({
    template: `
        <div class="card flex justify-center">
            <textarea rows="5" cols="30" pTextarea [autoResize]="true"></textarea>
        </div>
    `,
    standalone: true,
    imports: []
})
export class TextareaAutoresizeDemo {}
```
</details>

## Basic

Textarea is applied to an input field with pTextarea directive.

```html
<textarea rows="5" cols="30" pTextarea [(ngModel)]="value"></textarea>
```

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<textarea rows="5" cols="30" pTextarea [disabled]="true"></textarea>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';

@Component({
    template: `
        <div class="card flex justify-center">
            <textarea rows="5" cols="30" pTextarea [disabled]="true"></textarea>
        </div>
    `,
    standalone: true,
    imports: []
})
export class TextareaDisabledDemo {}
```
</details>

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```html
<textarea [(ngModel)]="value" [variant]="'filled'" rows="5" cols="30" pTextarea></textarea>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    template: `
        <div class="card flex justify-center">
            <textarea [(ngModel)]="value" [variant]="'filled'" rows="5" cols="30" pTextarea></textarea>
        </div>
    `,
    standalone: true,
    imports: [FormsModule]
})
export class TextareaFilledDemo {
    value!: string;
}
```
</details>

## Float Label

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

```html
<p-floatlabel>
    <textarea pTextarea id="over_label" [(ngModel)]="value1" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
    <label for="over_label">Over Label</label>
</p-floatlabel>
<p-floatlabel variant="in">
    <textarea pTextarea id="in_label" [(ngModel)]="value2" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
    <label for="in_label">In Label</label>
</p-floatlabel>
<p-floatlabel variant="on">
    <textarea pTextarea id="on_label" [(ngModel)]="value3" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
    <label for="on_label">On Label</label>
</p-floatlabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center items-stretch gap-4">
            <p-floatlabel>
                <textarea pTextarea id="over_label" [(ngModel)]="value1" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
                <label for="over_label">Over Label</label>
            </p-floatlabel>
            <p-floatlabel variant="in">
                <textarea pTextarea id="in_label" [(ngModel)]="value2" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
                <label for="in_label">In Label</label>
            </p-floatlabel>
            <p-floatlabel variant="on">
                <textarea pTextarea id="on_label" [(ngModel)]="value3" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
    `,
    standalone: true,
    imports: [FloatLabelModule, FormsModule]
})
export class TextareaFloatlabelDemo {
    value1: string = '';
    value2: string = '';
    value3: string = '';
}
```
</details>

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```html
<textarea rows="5" cols="30" pTextarea [(ngModel)]="value" fluid></textarea>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    template: `
        <div class="card">
            <textarea rows="5" cols="30" pTextarea [(ngModel)]="value" fluid></textarea>
        </div>
    `,
    standalone: true,
    imports: [FormsModule]
})
export class TextareaFluidDemo {
    value!: string;
}
```
</details>

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```html
<p-iftalabel>
    <textarea pTextarea id="description" [(ngModel)]="value" rows="5" cols="30" style="resize: none"></textarea>
    <label for="description">Description</label>
</p-iftalabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-iftalabel>
                <textarea pTextarea id="description" [(ngModel)]="value" rows="5" cols="30" style="resize: none"></textarea>
                <label for="description">Description</label>
            </p-iftalabel>
        </div>
    `,
    standalone: true,
    imports: [IftaLabelModule, FormsModule]
})
export class TextareaIftalabelDemo {
    value: string = '';
}
```
</details>

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<textarea rows="5" cols="30" pTextarea [(ngModel)]="value" [invalid]="!value" placeholder="Address"></textarea>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    template: `
        <div class="card flex justify-center">
            <textarea rows="5" cols="30" pTextarea [(ngModel)]="value" [invalid]="!value" placeholder="Address"></textarea>
        </div>
    `,
    standalone: true,
    imports: [FormsModule]
})
export class TextareaInvalidDemo {
    value!: string;
}
```
</details>

## keyfilter-doc

InputText has built-in key filtering support to block certain keys, refer to keyfilter page for more information.

```html
<textarea pKeyFilter="int" rows="5" cols="30" pTextarea></textarea>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';

@Component({
    template: `
        <div class="card flex justify-center">
            <textarea pKeyFilter="int" rows="5" cols="30" pTextarea></textarea>
        </div>
    `,
    standalone: true,
    imports: []
})
export class TextareaKeyfilterDemo {}
```
</details>

## reactiveforms-doc

Textarea can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <textarea rows="5" cols="30" pTextarea formControlName="address" [invalid]="isInvalid('address')"></textarea>
        @if (isInvalid('address')) {
            <p-message severity="error" size="small" variant="simple">Address is required..</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <textarea rows="5" cols="30" pTextarea formControlName="address" [invalid]="isInvalid('address')"></textarea>
                    @if (isInvalid('address')) {
                        <p-message severity="error" size="small" variant="simple">Address is required..</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [MessageModule, ToastModule, ButtonModule, ReactiveFormsModule]
})
export class TextareaReactiveformsDemo {
    messageService = inject(MessageService);
    items: any[] | undefined;
    exampleForm: FormGroup | undefined;
    formSubmitted: boolean = false;

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

Textarea provides small and large sizes as alternatives to the base.

```html
<textarea pTextarea [(ngModel)]="value1" pSize="small" placeholder="Small" rows="3"></textarea>
<textarea pTextarea [(ngModel)]="value2" placeholder="Normal" rows="3"></textarea>
<textarea pTextarea [(ngModel)]="value3" pSize="large" placeholder="Large" rows="3"></textarea>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    template: `
        <div class="card flex flex-col items-center gap-4">
            <textarea pTextarea [(ngModel)]="value1" pSize="small" placeholder="Small" rows="3"></textarea>
            <textarea pTextarea [(ngModel)]="value2" placeholder="Normal" rows="3"></textarea>
            <textarea pTextarea [(ngModel)]="value3" pSize="large" placeholder="Large" rows="3"></textarea>
        </div>
    `,
    standalone: true,
    imports: [FormsModule]
})
export class TextareaSizesDemo {
    value1!: string;
    value2!: string;
    value3!: string;
}
```
</details>

## templatedrivenforms-doc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <textarea name="address" #address="ngModel" rows="5" cols="30" [(ngModel)]="value" pTextarea [invalid]="address.invalid && (address.touched || exampleForm.submitted)" required></textarea>
        @if (address.invalid && (address.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">Address is required.</p-message>
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
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <textarea name="address" #address="ngModel" rows="5" cols="30" [(ngModel)]="value" pTextarea [invalid]="address.invalid && (address.touched || exampleForm.submitted)" required></textarea>
                    @if (address.invalid && (address.touched || exampleForm.submitted)) {
                        <p-message severity="error" size="small" variant="simple">Address is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [MessageModule, ToastModule, ButtonModule, FormsModule]
})
export class TextareaTemplatedrivenformsDemo {
    messageService = inject(MessageService);
    items: any[] = [];
    value: any;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            form.resetForm();
        }
    }
}
```
</details>

## Textarea

Textarea adds styling and autoResize functionality to standard textarea element.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<TextareaPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| pTextareaPT | InputSignal<TextareaPassThrough> | undefined | Used to pass attributes to DOM elements inside the Textarea component. |
| pTextareaUnstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| autoResize | boolean | false | When present, textarea size changes as being typed. |
| pSize | "small" \| "large" | - | Defines the size of the component. |
| variant | InputSignal<"outlined" \| "filled"> | undefined | Specifies the input variant of the component. |
| fluid | InputSignalWithTransform<boolean, unknown> | undefined | Spans 100% width of the container when enabled. |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onResize | event: {} \| Event | Callback to invoke on textarea resize. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLTextAreaElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLTextAreaElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-textarea | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| textarea.background | --p-textarea-background | Background of root |
| textarea.disabled.background | --p-textarea-disabled-background | Disabled background of root |
| textarea.filled.background | --p-textarea-filled-background | Filled background of root |
| textarea.filled.hover.background | --p-textarea-filled-hover-background | Filled hover background of root |
| textarea.filled.focus.background | --p-textarea-filled-focus-background | Filled focus background of root |
| textarea.border.color | --p-textarea-border-color | Border color of root |
| textarea.hover.border.color | --p-textarea-hover-border-color | Hover border color of root |
| textarea.focus.border.color | --p-textarea-focus-border-color | Focus border color of root |
| textarea.invalid.border.color | --p-textarea-invalid-border-color | Invalid border color of root |
| textarea.color | --p-textarea-color | Color of root |
| textarea.disabled.color | --p-textarea-disabled-color | Disabled color of root |
| textarea.placeholder.color | --p-textarea-placeholder-color | Placeholder color of root |
| textarea.invalid.placeholder.color | --p-textarea-invalid-placeholder-color | Invalid placeholder color of root |
| textarea.shadow | --p-textarea-shadow | Shadow of root |
| textarea.padding.x | --p-textarea-padding-x | Padding x of root |
| textarea.padding.y | --p-textarea-padding-y | Padding y of root |
| textarea.border.radius | --p-textarea-border-radius | Border radius of root |
| textarea.focus.ring.width | --p-textarea-focus-ring-width | Focus ring width of root |
| textarea.focus.ring.style | --p-textarea-focus-ring-style | Focus ring style of root |
| textarea.focus.ring.color | --p-textarea-focus-ring-color | Focus ring color of root |
| textarea.focus.ring.offset | --p-textarea-focus-ring-offset | Focus ring offset of root |
| textarea.focus.ring.shadow | --p-textarea-focus-ring-shadow | Focus ring shadow of root |
| textarea.transition.duration | --p-textarea-transition-duration | Transition duration of root |
| textarea.sm.font.size | --p-textarea-sm-font-size | Sm font size of root |
| textarea.sm.padding.x | --p-textarea-sm-padding-x | Sm padding x of root |
| textarea.sm.padding.y | --p-textarea-sm-padding-y | Sm padding y of root |
| textarea.lg.font.size | --p-textarea-lg-font-size | Lg font size of root |
| textarea.lg.padding.x | --p-textarea-lg-padding-x | Lg padding x of root |
| textarea.lg.padding.y | --p-textarea-lg-padding-y | Lg padding y of root |

