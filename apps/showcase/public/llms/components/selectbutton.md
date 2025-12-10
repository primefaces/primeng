# Angular SelectButton Component

SelectButton is used to choose single or multiple items from a list using buttons.

## Accessibility

Screen Reader The container element that wraps the buttons has a group role whereas each button element uses button role and aria-pressed is updated depending on selection state. Value to describe an option is automatically set using the ariaLabel property that refers to the label of an option so it is still suggested to define a label even the option display consists of presentational content like icons only.

## Basic

SelectButton requires a value to bind and a collection of options.

```html
<p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" aria-labelledby="basic" />
```

## Disabled

When disabled is present, the element cannot be edited and focused entirely. Certain options can also be disabled using the optionDisabled property.

```html
<p-selectbutton [options]="stateOptions" [(ngModel)]="value1" optionLabel="label" optionValue="value" [disabled]="true" />

<p-selectbutton [options]="stateOptions2" [(ngModel)]="value2" optionLabel="label" optionValue="value" optionDisabled="constant" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-disabled-demo',
    templateUrl: './select-button-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButton]
})
export class SelectButtonDisabledDemo {
    stateOptions: any[] = [
        { label: 'Off', value: 'off' },
        { label: 'On', value: 'on' }
    ];

    stateOptions2: any[] = [
        { label: 'Option 1', value: 'Option 1' },
        { label: 'Option 2', value: 'Option 2', constant: true }
    ];

    value1: string = 'off';

    value2: string = 'Option 1';
}
```
</details>

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```html
<p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" fluid />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-fluid-demo',
    templateUrl: './select-button-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButton]
})
export class SelectButtonFluidDemo {
    stateOptions: any[] = [{ label: 'One-Way', value: 'one-way' },{ label: 'Return', value: 'return' }];

    value: string = 'off';
}
```
</details>

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" [invalid]="value === null" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-invalid-demo',
    templateUrl: './select-button-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButton]
})
export class SelectButtonInvalidDemo {
    stateOptions: any[] = [
        { label: 'One-Way', value: 'one-way' },
        { label: 'Return', value: 'return' }
    ];

    value: string | undefined;
}
```
</details>

## Multiple

SelectButton allows selecting only one item by default and setting multiple option enables choosing more than one item. In multiple case, model property should be an array.

```html
<p-selectbutton [options]="paymentOptions" [(ngModel)]="value" [multiple]="true" optionLabel="name" optionValue="value" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-multiple-demo',
    templateUrl: './select-button-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButton]
})
export class SelectButtonMultipleDemo {
    value!: number;

    paymentOptions: any[] = [
        { name: 'Option 1', value: 1 },
        { name: 'Option 2', value: 2 },
        { name: 'Option 3', value: 3 }
    ];

}
```
</details>

## reactiveformsdoc

SelectButton can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <p-selectbutton [options]="stateOptions" formControlName="value" [invalid]="isInvalid('value')" optionLabel="label" optionValue="value" />
        @if (isInvalid('value')) {
            <p-message severity="error" size="small" variant="simple">Selection is required</p-message>
        }
    </div>
    <button pButton type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'select-button-reactive-forms-demo',
    templateUrl: './select-button-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, SelectButtonModule, ButtonModule, ToastModule, MessageModule]
})
export class SelectButtonReactiveFormsDemo implements OnInit {
    messageService = inject(MessageService);

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    stateOptions: any[] = [
        { label: 'One-Way', value: 'one-way' },
        { label: 'Return', value: 'return' }
    ];

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

SelectButton provides small and large sizes as alternatives to the base.

```html
<p-selectbutton [(ngModel)]="value1" [options]="options" size="small" />
<p-selectbutton [(ngModel)]="value2" [options]="options" />
<p-selectbutton [(ngModel)]="value3" [options]="options" size="large" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-sizes-demo',
    templateUrl: './select-button-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButton]
})
export class SelectButtonSizesDemo {
    value1! : string;

    value2 : string = 'Beginner';

    value3 : string = 'Expert';

    options: any[] = [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Expert', value: 'Expert' },
    ];
}
```
</details>

## Template

For custom content support define a template named item where the default local template variable refers to an option.

```html
<p-selectbutton [options]="justifyOptions" [(ngModel)]="value" optionLabel="justify">
    <ng-template #item let-item>
        <i [class]="item.icon"></i>
    </ng-template>
</p-selectbutton>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-template-demo',
    templateUrl: './select-button-template-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButtonModule]
})
export class SelectButtonTemplateDemo {
    value: any;

    justifyOptions: any[] = [
        { icon: 'pi pi-align-left', justify: 'Left' },
        { icon: 'pi pi-align-right', justify: 'Right' },
        { icon: 'pi pi-align-center', justify: 'Center' },
        { icon: 'pi pi-align-justify', justify: 'Justify' }
    ];

}
```
</details>

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4">
    <div class="flex flex-col gap-1">
        <p-selectbutton #model="ngModel" [(ngModel)]="value" [options]="stateOptions" optionLabel="label" optionValue="value" [invalid]="model.invalid && (model.touched || exampleForm.submitted)" required name="value" />
        @if (model.invalid && (model.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">Selection is required.</p-message>
        }
    </div>
    <button pButton type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'selectbutton-template-driven-forms-demo',
    templateUrl: './selectbutton-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButtonModule, MessageModule, ToastModule, ButtonModule]
})
export class TemplateDrivenFormsDemo implements OnInit {
    messageService = inject(MessageService);

    value: any;

    stateOptions: any[] = [
        { label: 'One-Way', value: 'one-way' },
        { label: 'Return', value: 'return' }
    ];

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}
```
</details>

## Select Button

SelectButton is used to choose single or multiple items from a list using buttons.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<SelectButtonPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| options | any[] | - | An array of selectitems to display as the available options. |
| optionLabel | string | - | Name of the label field of an option. |
| optionValue | string | - | Name of the value field of an option. |
| optionDisabled | string | - | Name of the disabled field of an option. |
| unselectable | boolean | - | Whether selection can be cleared. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| multiple | boolean | false | When specified, allows selecting multiple values. |
| allowEmpty | boolean | true | Whether selection can not be cleared. |
| styleClass | string | - | Style class of the component. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| dataKey | string | - | A property to uniquely identify a value in options. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| size | InputSignal<"small" \| "large"> | undefined | Specifies the size of the component. |
| fluid | InputSignalWithTransform<boolean, unknown> | undefined | Spans 100% width of the container when enabled. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onOptionClick | event: SelectButtonOptionClickEvent | Callback to invoke on input click. |
| onChange | event: SelectButtonChangeEvent | Callback to invoke on selection change. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| item | TemplateRef<SelectButtonItemTemplateContext> | Custom item template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| pcToggleButton | ToggleButtonPassThrough | Used to pass attributes to the ToggleButton component. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-selectbutton | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| selectbutton.border.radius | --p-selectbutton-border-radius | Border radius of root |
| selectbutton.invalid.border.color | --p-selectbutton-invalid-border-color | Invalid border color of root |

