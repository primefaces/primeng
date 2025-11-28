# Angular ColorPicker Component

ColorPicker is an input component to select a color.

## Accessibility

Screen Reader Specification does not cover a color picker yet and using a semantic native color picker is not consistent across browsers so currently component is not compatible with screen readers. In the upcoming versions, text fields will be introduced below the slider section to be able to pick a color using accessible text boxes in hsl, rgba and hex formats.

## Basic

ColorPicker is used as a controlled input with ngModel property.

```html
<p-colorpicker [(ngModel)]="color" />
```

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-colorpicker [(ngModel)]="color" [disabled]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'primeng/colorpicker';

@Component({
    selector: 'color-picker-format-demo',
    templateUrl: './color-picker-format-demo.html',
    standalone: true,
    imports: [FormsModule, ColorPicker]
})
export class ColorPickerDisabledDemo {
    color: string | undefined;
}
```
</details>

## Format

Default color format to use in value binding is hex and other possible values can be rgb and hsb using the format property.

```html
<p-colorpicker [(ngModel)]="color" inputId="cp-hex" />

<p-colorpicker [(ngModel)]="colorRGB" format="rgb" inputId="cp-rgb" />

<p-colorpicker [(ngModel)]="colorHSB" format="hsb" inputId="cp-hsb" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'primeng/colorpicker';

@Component({
    selector: 'color-picker-format-demo',
    templateUrl: './color-picker-format-demo.html',
    standalone: true,
    imports: [FormsModule, ColorPicker]
})
export class ColorPickerFormatDemo {
    color: string = '#6466f1';

    colorRGB: any = { r: 100, g: 102, b: 241 };

    colorHSB: any = { h: 239, s: 59, b: 95 };
}
```
</details>

## Inline

ColorPicker is displayed as a popup by default, add inline property to customize this behavior.

```html
<p-colorpicker [(ngModel)]="color" [inline]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'primeng/colorpicker';

@Component({
    selector: 'color-picker-inline-demo',
    templateUrl: './color-picker-inline-demo.html',
    standalone: true,
    imports: [FormsModule, ColorPicker]
})
export class ColorPickerInlineDemo {
    color: string | undefined;
}
```
</details>

## reactiveformsdoc

ColorPicker can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-col items-center gap-2">
        <p-colorpicker formControlName="color" defaultColor="989898" />
        @if (isInvalid('color')) {
            <p-message severity="error" size="small" variant="simple">Color is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'color-picker-reactive-forms-demo',
    templateUrl: './color-picker-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, ColorPickerModule, ButtonModule, MessageModule, ToastModule]
})
export class ColorPickerReactiveFormsDemo {
    messageService = inject(MessageService);

    exampleForm: FormGroup;

    formSubmitted = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            color: ['', Validators.required]
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
        return control?.invalid && this.formSubmitted;
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
    <div class="flex flex-col items-center gap-2">
        <p-colorpicker name="color" [(ngModel)]="color" #colorModel="ngModel" required defaultColor="989898" />
        @if (colorModel.invalid && (colorModel.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">Color is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'color-picker-template-driven-forms-demo',
    templateUrl: './color-picker-template-driven-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, ColorPickerModule, ButtonModule, MessageModule, ToastModule]
})
export class ColorPickerReactiveFormsDemo {
    messageService = inject(MessageService);

    color: string | undefined;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            form.resetForm();
        }
    }
}
```
</details>

## Color Picker

ColorPicker groups a collection of contents in tabs.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| pt | InputSignal<ColorPickerPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| enterAnimation | string | p-overlay-enter | Enter animation class name. |
| leaveAnimation | string | p-overlay-leave | Leave animation class name. |
| inline | boolean | false | Whether to display as an overlay or not. |
| format | "rgb" \| "hex" \| "hsb" | hex | Format to use in value binding. |
| tabindex | string | - | Index of the element in tabbing order. |
| inputId | string | - | Identifier of the focus input to match a label defined for the dropdown. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| defaultColor | string | ff0000 | Default color to display initially when model value is not present. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | event: ColorPickerChangeEvent | Callback to invoke on value change. |
| onShow | value: any | Callback to invoke on panel is shown. |
| onHide | value: any | Callback to invoke on panel is hidden. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| preview | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the preview input's DOM element. |
| panel | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the panel's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| colorSelector | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the color selector's DOM element. |
| colorBackground | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the color background's DOM element. |
| colorHandle | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the color handle's DOM element. |
| hue | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the hue's DOM element. |
| hueHandle | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the hue handle's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-colorpicker | Class name of the root element |
| p-colorpicker-preview | Class name of the preview element |
| p-colorpicker-panel | Class name of the panel element |
| p-colorpicker-color-selector | Class name of the color selector element |
| p-colorpicker-color-background | Class name of the color background element |
| p-colorpicker-color-handle | Class name of the color handle element |
| p-colorpicker-hue | Class name of the hue element |
| p-colorpicker-hue-handle | Class name of the hue handle element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| colorpicker.transition.duration | --p-colorpicker-transition-duration | Transition duration of root |
| colorpicker.preview.width | --p-colorpicker-preview-width | Width of preview |
| colorpicker.preview.height | --p-colorpicker-preview-height | Height of preview |
| colorpicker.preview.border.radius | --p-colorpicker-preview-border-radius | Border radius of preview |
| colorpicker.preview.focus.ring.width | --p-colorpicker-preview-focus-ring-width | Focus ring width of preview |
| colorpicker.preview.focus.ring.style | --p-colorpicker-preview-focus-ring-style | Focus ring style of preview |
| colorpicker.preview.focus.ring.color | --p-colorpicker-preview-focus-ring-color | Focus ring color of preview |
| colorpicker.preview.focus.ring.offset | --p-colorpicker-preview-focus-ring-offset | Focus ring offset of preview |
| colorpicker.preview.focus.ring.shadow | --p-colorpicker-preview-focus-ring-shadow | Focus ring shadow of preview |
| colorpicker.panel.shadow | --p-colorpicker-panel-shadow | Shadow of panel |
| colorpicker.panel.border.radius | --p-colorpicker-panel-border-radius | Border radius of panel |
| colorpicker.panel.background | --p-colorpicker-panel-background | Background of panel |
| colorpicker.panel.border.color | --p-colorpicker-panel-border-color | Border color of panel |
| colorpicker.handle.color | --p-colorpicker-handle-color | Color of handle |

