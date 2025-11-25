# Angular InputText Component

InputText is an extension to standard input element with theming and keyfiltering.

## Accessibility

Screen Reader InputText component renders a native input element that implicitly includes any passed prop. Value to describe the component can either be provided via label tag combined with id prop or using aria-labelledby , aria-label props.

## Basic

InputText is used as a controlled input with ngModel property.

```html
<input type="text" pInputText [(ngModel)]="value" />
```

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<input pInputText [disabled]="true" [(ngModel)]="value" />
```

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```html
<input type="text" pInputText [(ngModel)]="value" variant="filled" />
```

## Float Label

FloatLabel visually integrates a label with its form element. Visit FloatLabel documentation for more information.

```html
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
```

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```html
<input type="text" pInputText [(ngModel)]="value" fluid />
```

## Help Text

An advisory text can be defined with the semantic small tag.

```html
<div class="flex flex-col gap-2">
    <label for="username">Username</label>
    <input pInputText id="username" aria-describedby="username-help" [(ngModel)]="value" />
    <small id="username-help">Enter your username to reset your password.</small>
</div>
```

## iconsdoc

Icons can be placed inside an input element by wrapping both the input and the icon with an element that has either .p-input-icon-left or p-input-icon-right class.

```html
<span class="p-input-icon-left">
    <i class="pi pi-search"></i>
    <input type="text" pInputText [(ngModel)]="value" />
</span>
```

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```html
<p-iftalabel>
    <input pInputText id="username" [(ngModel)]="value" autocomplete="off" />
    <label for="username">Username</label>
</p-iftalabel>
```

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<input pInputText [(ngModel)]="value1" [invalid]="!value1" placeholder="Name" />
<input pInputText [(ngModel)]="value2" [invalid]="!value2" variant="filled" placeholder="Name" />
```

## keyfilterdoc

InputText has built-in key filtering support to block certain keys, refer to keyfilter page for more information.

```html
<input pInputText pKeyFilter="int" placeholder="Integers" [(ngModel)]="value" />
```

## reactiveformsdoc

```html
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
```

## Sizes

InputText provides small and large sizes as alternatives to the standard.

```html
<input pInputText [(ngModel)]="value1" type="text" pSize="small" placeholder="Small" />
<input pInputText [(ngModel)]="value2" type="text" placeholder="Normal" />
<input pInputText [(ngModel)]="value3" type="text" pSize="large" placeholder="Large" />
```

## templatedrivenformsdoc

```html
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
```

## Input Text

InputText directive is an extension to standard input element with theming.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| pt | InputSignal<InputTextPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
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

