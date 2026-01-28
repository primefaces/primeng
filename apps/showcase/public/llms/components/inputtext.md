# Angular InputText Component

InputText is an extension to standard input element with theming and keyfiltering.

## Accessibility

Screen Reader InputText component renders a native input element that implicitly includes any passed prop. Value to describe the component can either be provided via label tag combined with id prop or using aria-labelledby , aria-label props.

```typescript
<label for="firstname">Firstname</label>
<input pInputText id="firstname" />

<span id="lastname">Lastname</span>
<input pInputText aria-labelledby="lastname" />

<input pInputText aria-label="Age" />
```

## Basic

InputText is used as a controlled input with ngModel property.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex justify-center">
            <input type="text" pInputText [(ngModel)]="value" />
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, FormsModule]
})
export class InputtextBasicDemo {
    value: string;
}
```

## Disabled

When disabled is present, the element cannot be edited and focused.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex justify-center">
            <input pInputText [disabled]="true" [(ngModel)]="value" />
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, FormsModule]
})
export class InputtextDisabledDemo {
    value: string | undefined = 'Disabled';
}
```

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex justify-center">
            <input type="text" pInputText [(ngModel)]="value" variant="filled" />
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, FormsModule]
})
export class InputtextFilledDemo {
    value: string;
}
```

## Float Label

FloatLabel visually integrates a label with its form element. Visit FloatLabel documentation for more information.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel>
                <input pInputText id="over_label" [(ngModel)]="value1" autocomplete="off" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>
            <p-floatlabel variant="in">
                <input pInputText id="in_label" [(ngModel)]="value2" autocomplete="off" />
                <label for="in_label">In Label</label>
            </p-floatlabel>
            <p-floatlabel variant="on">
                <input pInputText id="on_label" [(ngModel)]="value3" autocomplete="off" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
    `,
    standalone: true,
    imports: [FloatLabelModule, InputTextModule, FormsModule]
})
export class InputtextFloatlabelDemo {
    value1: string | undefined;
    value2: string | undefined;
    value3: string | undefined;
}
```

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex justify-center">
            <input type="text" pInputText [(ngModel)]="value" fluid />
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, FormsModule]
})
export class InputtextFluidDemo {
    value: string;
}
```

## Help Text

An advisory text can be defined with the semantic small tag.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex justify-center">
            <div class="flex flex-col gap-2">
                <label for="username">Username</label>
                <input pInputText id="username" aria-describedby="username-help" [(ngModel)]="value" />
                <small id="username-help">Enter your username to reset your password.</small>
            </div>
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, FormsModule]
})
export class InputtextHelptextDemo {
    value: string | undefined;
}
```

## icons-doc

Icons can be placed inside an input element by wrapping both the input and the icon with an element that has either .p-input-icon-left or p-input-icon-right class.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center gap-4">
            <span class="p-input-icon-left">
                <i class="pi pi-search"></i>
                <input type="text" pInputText [(ngModel)]="value" />
            </span>
            <span class="p-input-icon-right">
                <i class="pi pi-spin pi-spinner"></i>
                <input type="text" pInputText [(ngModel)]="value2" />
            </span>
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, FormsModule]
})
export class InputtextIconsDemo {
    value: string | undefined;
    value2: string | undefined;
}
```

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-iftalabel>
                <input pInputText id="username" [(ngModel)]="value" autocomplete="off" />
                <label for="username">Username</label>
            </p-iftalabel>
        </div>
    `,
    standalone: true,
    imports: [IftaLabelModule, InputTextModule, FormsModule]
})
export class InputtextIftalabelDemo {
    value: string | undefined;
}
```

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center gap-4">
            <input pInputText [(ngModel)]="value1" [invalid]="!value1" placeholder="Name" />
            <input pInputText [(ngModel)]="value2" [invalid]="!value2" variant="filled" placeholder="Name" />
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, FormsModule]
})
export class InputtextInvalidDemo {
    value1: string | undefined;
    value2: string | undefined;
}
```

## keyfilter-doc

InputText has built-in key filtering support to block certain keys, refer to keyfilter page for more information.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex justify-center">
            <input pInputText pKeyFilter="int" placeholder="Integers" [(ngModel)]="value" />
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, FormsModule]
})
export class InputtextKeyfilterDemo {
    value: number | undefined;
}
```

## reactiveforms-doc

```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full sm:w-56">
                <div class="flex flex-col gap-1">
                    <input pInputText type="text" id="username" placeholder="Username" formControlName="username" [invalid]="isInvalid('username')" />
                    @if (isInvalid('username')) {
                        <p-message severity="error" size="small" variant="simple">Username is required.</p-message>
                    }
                </div>
                <div class="flex flex-col gap-1">
                    <input pInputText type="email" id="email" placeholder="Email" formControlName="email" [invalid]="isInvalid('email')" />
                    @if (isInvalid('email')) {
                        @if (exampleForm.get('email')?.errors?.['required']) {
                            <p-message severity="error" size="small" variant="simple">Email is required.</p-message>
                        }
                        @if (exampleForm.get('email')?.errors?.['email']) {
                            <p-message severity="error" size="small" variant="simple">Please enter a valid email.</p-message>
                        }
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [MessageModule, ToastModule, ButtonModule, InputTextModule, ReactiveFormsModule]
})
export class InputtextReactiveformsDemo {
    messageService = inject(MessageService);
    exampleForm: FormGroup;
    formSubmitted: boolean = false;

    constructor() {
        this.exampleForm = this.fb.group({
                    username: ['', Validators.required],
                    email: ['', [Validators.required, Validators.email]]
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

## Sizes

InputText provides small and large sizes as alternatives to the standard.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex flex-col items-center gap-4 ">
            <input pInputText [(ngModel)]="value1" type="text" pSize="small" placeholder="Small" />
            <input pInputText [(ngModel)]="value2" type="text" placeholder="Normal" />
            <input pInputText [(ngModel)]="value3" type="text" pSize="large" placeholder="Large" />
        </div>
    `,
    standalone: true,
    imports: [InputTextModule, FormsModule]
})
export class InputtextSizesDemo {
    value1: string | undefined;
    value2: string | undefined;
    value3: string | undefined;
}
```

## templatedrivenforms-doc

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4 w-full sm:w-56">
                <div class="flex flex-col gap-1">
                    <input pInputText type="text" id="username" placeholder="Username" name="username" [(ngModel)]="user.username" #username="ngModel" [invalid]="username.invalid && (username.touched || exampleForm.submitted)" required />
                    @if (username.invalid && (username.touched || exampleForm.submitted)) {
                        <p-message severity="error" size="small" variant="simple">Username is required.</p-message>
                    }
                </div>
                <div class="flex flex-col gap-1">
                    <input pInputText type="email" id="email" name="email" placeholder="Email" [(ngModel)]="user.email" #email="ngModel" required email [invalid]="email.invalid && (email.touched || exampleForm.submitted)" />
                    @if (email.invalid && (email.touched || exampleForm.submitted)) {
                        <p-message severity="error" size="small" variant="simple">
                            @if (email.hasError('required')) {
                                Email is Required.
                            }
                            @if (email.hasError('email')) {
                                Please enter a valid email.
                            }
                        </p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [MessageModule, ToastModule, ButtonModule, InputTextModule, FormsModule]
})
export class InputtextTemplatedrivenformsDemo {
    messageService = inject(MessageService);
    user: any;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}
```

## Input Text

InputText directive is an extension to standard input element with theming.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<InputTextPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| ptInputText | InputSignal<InputTextPassThrough> | undefined | Used to pass attributes to DOM elements inside the InputText component. **(Deprecated)** |
| pInputTextPT | InputSignal<InputTextPassThrough> | undefined | Used to pass attributes to DOM elements inside the InputText component. |
| pInputTextUnstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pSize | "small" \| "large" | - | Defines the size of the component. |
| variant | InputSignal<"outlined" \| "filled"> | undefined | Specifies the input variant of the component. |
| fluid | InputSignalWithTransform<boolean, unknown> | undefined | Spans 100% width of the container when enabled. |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-inputtext | The class of root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| inputtext.background | --p-inputtext-background | Background of root |
| inputtext.disabled.background | --p-inputtext-disabled-background | Disabled background of root |
| inputtext.filled.background | --p-inputtext-filled-background | Filled background of root |
| inputtext.filled.hover.background | --p-inputtext-filled-hover-background | Filled hover background of root |
| inputtext.filled.focus.background | --p-inputtext-filled-focus-background | Filled focus background of root |
| inputtext.border.color | --p-inputtext-border-color | Border color of root |
| inputtext.hover.border.color | --p-inputtext-hover-border-color | Hover border color of root |
| inputtext.focus.border.color | --p-inputtext-focus-border-color | Focus border color of root |
| inputtext.invalid.border.color | --p-inputtext-invalid-border-color | Invalid border color of root |
| inputtext.color | --p-inputtext-color | Color of root |
| inputtext.disabled.color | --p-inputtext-disabled-color | Disabled color of root |
| inputtext.placeholder.color | --p-inputtext-placeholder-color | Placeholder color of root |
| inputtext.invalid.placeholder.color | --p-inputtext-invalid-placeholder-color | Invalid placeholder color of root |
| inputtext.shadow | --p-inputtext-shadow | Shadow of root |
| inputtext.padding.x | --p-inputtext-padding-x | Padding x of root |
| inputtext.padding.y | --p-inputtext-padding-y | Padding y of root |
| inputtext.border.radius | --p-inputtext-border-radius | Border radius of root |
| inputtext.focus.ring.width | --p-inputtext-focus-ring-width | Focus ring width of root |
| inputtext.focus.ring.style | --p-inputtext-focus-ring-style | Focus ring style of root |
| inputtext.focus.ring.color | --p-inputtext-focus-ring-color | Focus ring color of root |
| inputtext.focus.ring.offset | --p-inputtext-focus-ring-offset | Focus ring offset of root |
| inputtext.focus.ring.shadow | --p-inputtext-focus-ring-shadow | Focus ring shadow of root |
| inputtext.transition.duration | --p-inputtext-transition-duration | Transition duration of root |
| inputtext.sm.font.size | --p-inputtext-sm-font-size | Sm font size of root |
| inputtext.sm.padding.x | --p-inputtext-sm-padding-x | Sm padding x of root |
| inputtext.sm.padding.y | --p-inputtext-sm-padding-y | Sm padding y of root |
| inputtext.lg.font.size | --p-inputtext-lg-font-size | Lg font size of root |
| inputtext.lg.padding.x | --p-inputtext-lg-padding-x | Lg padding x of root |
| inputtext.lg.padding.y | --p-inputtext-lg-padding-y | Lg padding y of root |

