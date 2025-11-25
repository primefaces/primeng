# Angular RadioButton Component

RadioButton is an extension to standard radio button element with theming.

## Accessibility

Screen Reader RadioButton component uses a hidden native radio button element internally that is only visible to screen readers. Value to describe the component can either be provided via label tag combined with inputId prop or using ariaLabelledBy , ariaLabel props.

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-radiobutton [(ngModel)]="value" [value]="1" [disabled]="true" />
<p-radiobutton [(ngModel)]="value" [value]="2" [disabled]="true" />
```

## Dynamic

RadioButtons can be generated using a list of values.

```html
<div class="flex flex-col gap-4">
    <div *ngFor="let category of categories" class="field-checkbox">
        <p-radiobutton [inputId]="category.key" name="category" [value]="category" [(ngModel)]="selectedCategory" />
        <label [for]="category.key" class="ml-2">{{ category.name }}</label>
    </div>
</div>
```

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```html
<p-radiobutton [(ngModel)]="checked" variant="filled" />
```

## Group

RadioButton is used as a controlled input with value and ngModel properties.

```html
<div class="flex flex-wrap gap-4">
    <div class="flex items-center">
        <p-radiobutton name="pizza" value="Cheese" [(ngModel)]="ingredient" inputId="ingredient1" />
        <label for="ingredient1" class="ml-2">Cheese</label>
    </div>

    <div class="flex items-center">
        <p-radiobutton name="pizza" value="Mushroom" [(ngModel)]="ingredient" inputId="ingredient2" />
        <label for="ingredient2" class="ml-2">Mushroom</label>
    </div>

    <div class="flex items-center">
        <p-radiobutton name="pizza" value="Pepper" [(ngModel)]="ingredient" inputId="ingredient3" />
        <label for="ingredient3" class="ml-2">Pepper</label>
    </div>

    <div class="flex items-center">
        <p-radiobutton name="pizza" value="Onion" [(ngModel)]="ingredient" inputId="ingredient4" />
        <label for="ingredient4" class="ml-2">Onion</label>
    </div>
</div>
```

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<p-radiobutton [(ngModel)]="value" [invalid]="!value"  />
```

## reactiveformsdoc

RadioButton can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-4">
        @for (category of categories; track category) {
            <div class="flex items-center gap-2">
                <p-radiobutton formControlName="selectedCategory" name="selectedCategory" [inputId]="category.key" [value]="category" [invalid]="isInvalid('selectedCategory')" />
                <label [for]="category.key"> {{ category.name }} </label>
            </div>
        }
    </div>
    @if (isInvalid('selectedCategory')) {
        <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
    }
    <button pButton severity="secondary" type="submit">
        <span pButtonLabel>Submit</span>
    </button>
</form>
```

## Sizes

RadioButton provides small and large sizes as alternatives to the base.

```html
<div class="flex flex-wrap gap-4">
    <div class="flex items-center gap-2">
        <p-radiobutton [(ngModel)]="size" inputId="size_small" name="size" value="Small" size="small" />
        <label for="size_small" class="text-sm">Small</label>
    </div>
    <div class="flex items-center gap-2">
        <p-radiobutton [(ngModel)]="size" inputId="size_normal" name="size" value="Normal" />
        <label for="size_normal">Normal</label>
    </div>
    <div class="flex items-center gap-2">
        <p-radiobutton [(ngModel)]="size" inputId="size_large" name="size" value="Large" size="large" />
        <label for="size_large" class="text-lg">Large</label>
    </div>
</div>
```

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-4">
        @for (category of categories; track category.name) {
            <div class="flex items-center gap-2">
                <p-radiobutton [(ngModel)]="ingredient" [inputId]="category.key" [value]="category" [invalid]="isInvalid(exampleForm)" name="ingredient" />
                <label [for]="category.key"> {{ category.name }} </label>
            </div>
        }
    </div>
    @if (isInvalid(exampleForm)) {
        <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
    }

    <button pButton severity="secondary" type="submit">
        <span pButtonLabel>Submit</span>
    </button>
</form>
```

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| input | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the input's DOM element. |
| box | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the box's DOM element. |
| icon | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-radiobutton | Class name of the root element |
| p-radiobutton-box | Class name of the box element |
| p-radiobutton-input | Class name of the input element |
| p-radiobutton-icon | Class name of the icon element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| radiobutton.width | --p-radiobutton-width | Width of root |
| radiobutton.height | --p-radiobutton-height | Height of root |
| radiobutton.background | --p-radiobutton-background | Background of root |
| radiobutton.checked.background | --p-radiobutton-checked-background | Checked background of root |
| radiobutton.checked.hover.background | --p-radiobutton-checked-hover-background | Checked hover background of root |
| radiobutton.disabled.background | --p-radiobutton-disabled-background | Disabled background of root |
| radiobutton.filled.background | --p-radiobutton-filled-background | Filled background of root |
| radiobutton.border.color | --p-radiobutton-border-color | Border color of root |
| radiobutton.hover.border.color | --p-radiobutton-hover-border-color | Hover border color of root |
| radiobutton.focus.border.color | --p-radiobutton-focus-border-color | Focus border color of root |
| radiobutton.checked.border.color | --p-radiobutton-checked-border-color | Checked border color of root |
| radiobutton.checked.hover.border.color | --p-radiobutton-checked-hover-border-color | Checked hover border color of root |
| radiobutton.checked.focus.border.color | --p-radiobutton-checked-focus-border-color | Checked focus border color of root |
| radiobutton.checked.disabled.border.color | --p-radiobutton-checked-disabled-border-color | Checked disabled border color of root |
| radiobutton.invalid.border.color | --p-radiobutton-invalid-border-color | Invalid border color of root |
| radiobutton.shadow | --p-radiobutton-shadow | Shadow of root |
| radiobutton.focus.ring.width | --p-radiobutton-focus-ring-width | Focus ring width of root |
| radiobutton.focus.ring.style | --p-radiobutton-focus-ring-style | Focus ring style of root |
| radiobutton.focus.ring.color | --p-radiobutton-focus-ring-color | Focus ring color of root |
| radiobutton.focus.ring.offset | --p-radiobutton-focus-ring-offset | Focus ring offset of root |
| radiobutton.focus.ring.shadow | --p-radiobutton-focus-ring-shadow | Focus ring shadow of root |
| radiobutton.transition.duration | --p-radiobutton-transition-duration | Transition duration of root |
| radiobutton.sm.width | --p-radiobutton-sm-width | Sm width of root |
| radiobutton.sm.height | --p-radiobutton-sm-height | Sm height of root |
| radiobutton.lg.width | --p-radiobutton-lg-width | Lg width of root |
| radiobutton.lg.height | --p-radiobutton-lg-height | Lg height of root |
| radiobutton.icon.size | --p-radiobutton-icon-size | Size of icon |
| radiobutton.icon.checked.color | --p-radiobutton-icon-checked-color | Checked color of icon |
| radiobutton.icon.checked.hover.color | --p-radiobutton-icon-checked-hover-color | Checked hover color of icon |
| radiobutton.icon.disabled.color | --p-radiobutton-icon-disabled-color | Disabled color of icon |
| radiobutton.icon.sm.size | --p-radiobutton-icon-sm-size | Sm size of icon |
| radiobutton.icon.lg.size | --p-radiobutton-icon-lg-size | Lg size of icon |

