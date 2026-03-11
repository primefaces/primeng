# Angular Checkbox Component

Checkbox is an extension to standard checkbox element with theming.

## Accessibility

Screen Reader Checkbox component uses a hidden native checkbox element internally that is only visible to screen readers. Value to describe the component can either be provided via label tag combined with inputId prop or using ariaLabelledBy , ariaLabel props.

## Basic

Binary checkbox is used as a controlled input with ngModel and binary properties.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    template: `
        <div class="card flex justify-center gap-4">
            <p-checkbox [(ngModel)]="checked" [binary]="true" />
        </div>
    `,
    standalone: true,
    imports: [CheckboxModule, FormsModule]
})
export class CheckboxBasicDemo {
    checked: any = null;
}
```

## Disabled

When disabled is present, the element cannot be edited and focused.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    template: `
        <div class="card flex justify-center gap-2">
            <p-checkbox [(ngModel)]="checked1" [binary]="true" [disabled]="true" />
            <p-checkbox [(ngModel)]="checked2" [binary]="true" [disabled]="true" />
        </div>
    `,
    standalone: true,
    imports: [CheckboxModule, FormsModule]
})
export class CheckboxDisabledDemo {
    checked1: boolean = false;
    checked2: boolean = true;
}
```

## Dynamic

Checkboxes can be generated using a list of values.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    template: `
        <div class="card flex justify-center">
            <div class="flex flex-col gap-4">
                <div *ngFor="let category of categories" class="flex items-center">
                    <p-checkbox [inputId]="category.key" name="group" [value]="category" [(ngModel)]="selectedCategories" />
                    <label [for]="category.key" class="ml-2"> {{ category.name }} </label>
                </div>
            </div>
        </div>
    `,
    standalone: true,
    imports: [CheckboxModule, FormsModule]
})
export class CheckboxDynamicDemo implements OnInit {
    selectedCategories: any[] = [];
    categories: any[];

    ngOnInit() {
        this.selectedCategories = [this.categories[1]];
    }
}
```

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-checkbox [(ngModel)]="checked" [binary]="true" variant="filled" />
        </div>
    `,
    standalone: true,
    imports: [CheckboxModule, FormsModule]
})
export class CheckboxFilledDemo {
    checked: boolean = false;
}
```

## Indeterminate

The indeterminate state indicates that a checkbox is neither "on" or "off".

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    template: `
        <div class="card flex justify-center gap-4">
            <p-checkbox [(ngModel)]="checked" [binary]="true" [indeterminate]="true" />
        </div>
    `,
    standalone: true,
    imports: [CheckboxModule, FormsModule]
})
export class CheckboxIndeterminateDemo {
    checked: any = null;
}
```

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-checkbox [(ngModel)]="checked" [binary]="true" [invalid]="!checked" />
        </div>
    `,
    standalone: true,
    imports: [CheckboxModule, FormsModule]
})
export class CheckboxInvalidDemo {
    checked: boolean = false;
}
```

## label-doc

The label attribute provides a label text for the checkbox. This label is also clickable and toggles the checked state.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    template: `
        <div class="card flex justify-center gap-4">
            <p-checkbox name="groupname" value="val1" label="Value 1" [(ngModel)]="selectedValues"></p-checkbox>
            <p-checkbox name="groupname" value="val2" label="Value 2" [(ngModel)]="selectedValues"></p-checkbox>
        </div>
    `,
    standalone: true,
    imports: [CheckboxModule, FormsModule]
})
export class CheckboxLabelDemo {
    selectedValues: string[] = [];
}
```

## multiple-doc

Multiple checkboxes can be grouped together.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center gap-4">
            <div class="flex items-center">
                <p-checkbox inputId="ingredient1" name="pizza" value="Cheese" [(ngModel)]="pizza" />
                <label for="ingredient1" class="ml-2"> Cheese </label>
            </div>
            <div class="flex items-center">
                <p-checkbox inputId="ingredient2" name="pizza" value="Mushroom" [(ngModel)]="pizza" />
                <label for="ingredient2" class="ml-2"> Mushroom </label>
            </div>
            <div class="flex items-center">
                <p-checkbox inputId="ingredient3" name="pizza" value="Pepper" [(ngModel)]="pizza" />
                <label for="ingredient3" class="ml-2"> Pepper </label>
            </div>
            <div class="flex items-center">
                <p-checkbox inputId="ingredient4" name="pizza" value="Onion" [(ngModel)]="pizza" />
                <label for="ingredient4" class="ml-2"> Onion </label>
            </div>
        </div>
    `,
    standalone: true,
    imports: [CheckboxModule, FormsModule]
})
export class CheckboxMultipleDemo {
    pizza: string[] = [];
}
```

## reactiveforms-doc

Checkbox can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
                <div class="flex flex-wrap gap-4">
                    @for (item of formKeys; track item) {
                        <div class="flex items-center gap-2">
                            <p-checkbox [formControlName]="item" [binary]="true" [inputId]="item" [invalid]="isInvalid(item)" />
                            <label [for]="item"> {{ item | titlecase }} </label>
                        </div>
                    }
                </div>
                @if (hasAnyInvalid()) {
                    <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
                }
                <button pButton severity="secondary" type="submit">
                    <span pButtonLabel>Submit</span>
                </button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [CheckboxModule, MessageModule, ToastModule, ButtonModule, ReactiveFormsModule]
})
export class CheckboxReactiveformsDemo {
    messageService = inject(MessageService);
    formSubmitted: boolean = false;
    exampleForm: FormGroup;

    constructor() {
        this.exampleForm = this.fb.group(
                    {
                        cheese: [false],
                        mushroom: [false],
                        pepper: [false],
                        onion: [false]
                    },
                    { validators: this.atLeastOneSelectedValidator }
                );
    }

    atLeastOneSelectedValidator(group: FormGroup) {
        [key: string]: any } | null {
        const anySelected = Object.values(group.controls).some((control) => control.value === true);
        return anySelected ? null : { atLeastOneRequired: true };
    }

    hasAnyInvalid(): boolean {
        return this.formSubmitted && this.exampleForm.hasError('atLeastOneRequired');
    }

    isInvalid(controlName: string): boolean {
        const control = this.exampleForm.get(controlName);
        return this.formSubmitted && this.exampleForm.hasError('atLeastOneRequired') && control?.value === false;
    }

    onSubmit() {
        this.formSubmitted = true;
        
        if (this.exampleForm.valid) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Form is submitted',
                life: 3000
            });
        
            this.exampleForm.reset({
                cheese: false,
                mushroom: false,
                pepper: false,
                onion: false
            });
        
            this.formSubmitted = false;
        }
    }
}
```

## Sizes

Checkbox provides small and large sizes as alternatives to the base.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center gap-4">
            <div class="flex items-center gap-2">
                <p-checkbox [(ngModel)]="size" inputId="size_small" name="size" value="Small" size="small" />
                <label for="size_small" class="text-sm">Small</label>
            </div>
            <div class="flex items-center gap-2">
                <p-checkbox [(ngModel)]="size" inputId="size_normal" name="size" value="Normal" />
                <label for="size_normal">Normal</label>
            </div>
            <div class="flex items-center gap-2">
                <p-checkbox [(ngModel)]="size" inputId="size_large" name="size" value="Large" size="large" />
                <label for="size_large" class="text-lg">Large</label>
            </div>
        </div>
    `,
    standalone: true,
    imports: [CheckboxModule, FormsModule]
})
export class CheckboxSizesDemo {
    size: any = null;
}
```

## templatedrivenforms-doc

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form #form="ngForm" (ngSubmit)="onSubmit(form)" class="flex flex-col gap-4">
                <div class="flex flex-wrap gap-4">
                    @for (item of formKeys; track item) {
                        <div class="flex items-center gap-2">
                            <p-checkbox [inputId]="item" [name]="item" [(ngModel)]="formModel[item]" [binary]="true" [invalid]="isInvalid()"></p-checkbox>
                            <label [for]="item">{{ item | titlecase }}</label>
                        </div>
                    }
                </div>
                @if (isInvalid()) {
                    <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
                }
                <button pButton severity="secondary" type="submit">
                    <span pButtonLabel>Submit</span>
                </button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [CheckboxModule, MessageModule, ToastModule, ButtonModule, FormsModule]
})
export class CheckboxTemplatedrivenformsDemo {
    messageService = inject(MessageService);
    formSubmitted: boolean = false;
    formModel: any;

    isInvalid(): boolean {
        return this.formSubmitted && !this.isAtLeastOneSelected();
    }

    isAtLeastOneSelected(): boolean {
        return Object.values(this.formModel).some((value) => value === true);
    }

    onSubmit(form: NgForm) {
        this.formSubmitted = true;
        
        if (this.isAtLeastOneSelected()) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Form is submitted',
                life: 3000
            });
        
            this.formModel = {
                cheese: false,
                mushroom: false,
                pepper: false,
                onion: false
            };
            form.resetForm(this.formModel);
        
            this.formSubmitted = false;
        }
    }
}
```

## Checkbox

Checkbox is an extension to standard checkbox element with theming.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<CheckboxPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| value | any | - | Value of the checkbox. |
| binary | boolean | false | Allows to select a boolean value instead of multiple values. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| ariaLabel | string | - | Used to define a string that labels the input element. |
| tabindex | number | - | Index of the element in tabbing order. |
| inputId | string | - | Identifier of the focus input to match a label defined for the component. |
| inputStyle | { [klass: string]: any } | - | Inline style of the input element. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| inputClass | string | - | Style class of the input element. |
| indeterminate | boolean | false | When present, it specifies input state as indeterminate. |
| formControl | FormControl<any> | - | Form control value. |
| checkboxIcon | string | - | Icon class of the checkbox icon. |
| readonly | boolean | false | When present, it specifies that the component cannot be edited. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| trueValue | any | true | Value in checked state. |
| falseValue | any | false | Value in unchecked state. |
| variant | InputSignal<"outlined" \| "filled"> | undefined | Specifies the input variant of the component. |
| size | InputSignal<"small" \| "large"> | undefined | Specifies the size of the component. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | event: CheckboxChangeEvent | Callback to invoke on value change. |
| onFocus | event: Event | Callback to invoke when the receives focus. |
| onBlur | event: Event | Callback to invoke when the loses focus. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| checkboxicon | TemplateRef<CheckboxIconTemplateContext> | Custom checkbox icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| input | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the input's DOM element. |
| box | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the box's DOM element. |
| icon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-checkbox | Class name of the root element |
| p-checkbox-box | Class name of the box element |
| p-checkbox-input | Class name of the input element |
| p-checkbox-icon | Class name of the icon element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| checkbox.border.radius | --p-checkbox-border-radius | Border radius of root |
| checkbox.width | --p-checkbox-width | Width of root |
| checkbox.height | --p-checkbox-height | Height of root |
| checkbox.background | --p-checkbox-background | Background of root |
| checkbox.checked.background | --p-checkbox-checked-background | Checked background of root |
| checkbox.checked.hover.background | --p-checkbox-checked-hover-background | Checked hover background of root |
| checkbox.disabled.background | --p-checkbox-disabled-background | Disabled background of root |
| checkbox.filled.background | --p-checkbox-filled-background | Filled background of root |
| checkbox.border.color | --p-checkbox-border-color | Border color of root |
| checkbox.hover.border.color | --p-checkbox-hover-border-color | Hover border color of root |
| checkbox.focus.border.color | --p-checkbox-focus-border-color | Focus border color of root |
| checkbox.checked.border.color | --p-checkbox-checked-border-color | Checked border color of root |
| checkbox.checked.hover.border.color | --p-checkbox-checked-hover-border-color | Checked hover border color of root |
| checkbox.checked.focus.border.color | --p-checkbox-checked-focus-border-color | Checked focus border color of root |
| checkbox.checked.disabled.border.color | --p-checkbox-checked-disabled-border-color | Checked disabled border color of root |
| checkbox.invalid.border.color | --p-checkbox-invalid-border-color | Invalid border color of root |
| checkbox.shadow | --p-checkbox-shadow | Shadow of root |
| checkbox.focus.ring.width | --p-checkbox-focus-ring-width | Focus ring width of root |
| checkbox.focus.ring.style | --p-checkbox-focus-ring-style | Focus ring style of root |
| checkbox.focus.ring.color | --p-checkbox-focus-ring-color | Focus ring color of root |
| checkbox.focus.ring.offset | --p-checkbox-focus-ring-offset | Focus ring offset of root |
| checkbox.focus.ring.shadow | --p-checkbox-focus-ring-shadow | Focus ring shadow of root |
| checkbox.transition.duration | --p-checkbox-transition-duration | Transition duration of root |
| checkbox.sm.width | --p-checkbox-sm-width | Sm width of root |
| checkbox.sm.height | --p-checkbox-sm-height | Sm height of root |
| checkbox.lg.width | --p-checkbox-lg-width | Lg width of root |
| checkbox.lg.height | --p-checkbox-lg-height | Lg height of root |
| checkbox.icon.size | --p-checkbox-icon-size | Size of icon |
| checkbox.icon.color | --p-checkbox-icon-color | Color of icon |
| checkbox.icon.checked.color | --p-checkbox-icon-checked-color | Checked color of icon |
| checkbox.icon.checked.hover.color | --p-checkbox-icon-checked-hover-color | Checked hover color of icon |
| checkbox.icon.disabled.color | --p-checkbox-icon-disabled-color | Disabled color of icon |
| checkbox.icon.sm.size | --p-checkbox-icon-sm-size | Sm size of icon |
| checkbox.icon.lg.size | --p-checkbox-icon-lg-size | Lg size of icon |

