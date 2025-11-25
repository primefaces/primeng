# Angular Textarea Component

Textarea adds styling and autoResize functionality to standard textarea element.

## Accessibility

Screen Reader Textarea component renders a native textarea element that implicitly includes any passed prop. Value to describe the component can either be provided via label tag combined with id prop or using aria-labelledby , aria-label props.

## AutoResize

When autoResize is enabled, textarea grows instead of displaying a scrollbar.

```html
<textarea rows="5"cols="30" pTextarea [autoResize]="true"></textarea>
```

## Basic

Textarea is applied to an input field with pTextarea directive.

```html
<textarea rows="5" cols="30" pTextarea [(ngModel)]="value"></textarea>
```

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<textarea rows="5"cols="30" pTextarea [disabled]="true"></textarea>
```

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```html
<textarea [(ngModel)]="value" variant="filled" rows="5" cols="30" pTextarea></textarea>
```

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

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```html
<textarea rows="5" cols="30" pTextarea [(ngModel)]="value" fluid></textarea>
```

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```html
<p-iftalabel>
    <textarea pTextarea id="description" [(ngModel)]="value" rows="5" cols="30" style="resize: none"></textarea>
    <label for="description">Description</label>
</p-iftalabel>
```

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<textarea rows="5" cols="30" pTextarea [(ngModel)]="value" [invalid]="!value" placeholder="Address"></textarea>
```

## keyfilterdoc

InputText has built-in key filtering support to block certain keys, refer to keyfilter page for more information.

```html
<textarea
    pKeyFilter="int"
    rows="5"
    cols="30"
    pTextarea>
</textarea>
```

## reactiveformsdoc

Textarea can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <textarea rows="5" cols="30" pTextarea formControlName="adress" [invalid]="isInvalid('address')"></textarea>
        @if (isInvalid('address')) {
            <p-message severity="error" size="small" variant="simple">Address is required..</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

## Sizes

Textarea provides small and large sizes as alternatives to the base.

```html
<textarea pTextarea [(ngModel)]="value1" pSize="small" placeholder="Small" rows="3"></textarea>
<textarea pTextarea [(ngModel)]="value2" placeholder="Normal" rows="3"></textarea>
<textarea pTextarea [(ngModel)]="value3" pSize="large" placeholder="Large" rows="3"></textarea>
```

## templatedrivenformsdoc

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <textarea rows="5" cols="30" pTextarea formControlName="adress" [invalid]="isInvalid('adress')"></textarea>
        @if (isInvalid('adress')) {
            <p-message severity="error" size="small" variant="simple">Address is required..</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

## Textarea

Textarea adds styling and autoResize functionality to standard textarea element.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| pt | InputSignal<TextareaPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
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

