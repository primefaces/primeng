# Angular Button Component

Button is an extension to standard button element with icons and theming.

## Accessibility

Screen Reader Button component renders a native button element that implicitly includes any passed prop. Text to describe the button is defined with the aria-label prop, if not present label prop is used as the value. If the button is icon only or custom templating is used, it is recommended to use aria-label so that screen readers would be able to read the element properly.

```html
<p-button icon="pi pi-check" aria-label="Submit" />
<p-button icon="pi pi-check" label="Submit" />

<p-button class="youtube p-0" aria-label="Youtube">
    <i class="pi pi-youtube px-2"></i>
    <span class="px-4">Youtube</span>
</p-button>
```

## Badge

Buttons have built-in badge support with badge and badgeClass properties.

```html
<p-button label="Emails" badge="2" styleClass="m-0" />
<p-button label="Messages" icon="pi pi-users" badge="2" badgeSeverity="contrast" styleClass="m-0" [outlined]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-badge-demo',
    templateUrl: './button-badge-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonBadgeDemo { }
```
</details>

## Basic

Text to display on a button is defined with the label property.

```html
<p-button label="Submit" />
```

## Button Group

Multiple buttons are grouped when wrapped inside an element with ButtonGroup component.

```html
<p-buttongroup>
    <p-button label="Save" icon="pi pi-check" />
    <p-button label="Delete" icon="pi pi-trash" />
    <p-button label="Cancel" icon="pi pi-times" />
</p-buttongroup>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonGroupModule } from 'primeng/buttongroup';

@Component({
    selector: 'button-group-demo',
    templateUrl: './button-group-demo.html',
    standalone: true,
    imports: [ButtonGroupModule]
})
export class ButtonGroupDemo { }
```
</details>

## buttonsetdoc

Multiple buttons are grouped when wrapped inside an element with p-buttonset class.

```html
<span class="p-buttonset">
    <button pButton pRipple label="Save" icon="pi pi-check"></button>
    <button pButton pRipple label="Delete" icon="pi pi-trash"></button>
    <button pButton pRipple label="Cancel" icon="pi pi-times"></button>
</span>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'button-set-demo',
    templateUrl: './button-set-demo.html'
})
export class ButtonSetDemo { }
```
</details>

## Directive

Button can also be used as directive using pButton along with pButtonLabel and pButtonIcon helper directives.

```html
<button pButton>
    <i class="pi pi-check" pButtonIcon></i>
    <span pButtonLabel>Save</span>
</button>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-directive-demo',
    templateUrl: './button-directive-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonDirectiveDemo { }
```
</details>

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-button label="Submit" [disabled]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-disabled-demo',
    templateUrl: './button-disabled-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonDisabledDemo { }
```
</details>

## Icons

Icon of a button is specified with icon property and position is configured using iconPos attribute.

```html
<p-button icon="pi pi-home" aria-label="Save" />
<p-button label="Profile" icon="pi pi-user" />
<p-button label="Save" icon="pi pi-check" iconPos="right" />
<p-button label="Search" icon="pi pi-search" iconPos="top" />
<p-button label="Update" icon="pi pi-refresh" iconPos="bottom" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-icons-demo',
    templateUrl: './button-icons-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonIconsDemo { }
```
</details>

## iconsonlydoc

Buttons can have icons without labels.

```html
<p-button icon="pi pi-check" />
<p-button icon="pi pi-bookmark" severity="secondary" />
<p-button icon="pi pi-search" severity="success" />
<p-button icon="pi pi-user" severity="info" />
<p-button icon="pi pi-bell" severity="warn" />
<p-button icon="pi pi-heart" severity="help" />
<p-button icon="pi pi-times" severity="danger" />

<p-button icon="pi pi-check" [rounded]="true" />
<p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary" />
<p-button icon="pi pi-search" [rounded]="true" severity="success" />
<p-button icon="pi pi-user" [rounded]="true" severity="info" />
<p-button icon="pi pi-bell" [rounded]="true" severity="warn" />
<p-button icon="pi pi-heart" [rounded]="true" severity="help" />
<p-button icon="pi pi-times" [rounded]="true" severity="danger" />

<p-button icon="pi pi-check" [rounded]="true" [outlined]="true" />
<p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary" [outlined]="true" />
<p-button icon="pi pi-search" [rounded]="true" severity="success" [outlined]="true" />
<p-button icon="pi pi-user" [rounded]="true" severity="info" [outlined]="true" />
<p-button icon="pi pi-bell" [rounded]="true" severity="warn" [outlined]="true" />
<p-button icon="pi pi-heart" [rounded]="true" severity="help" [outlined]="true" />
<p-button icon="pi pi-times" [rounded]="true" severity="danger" [outlined]="true" />

<p-button icon="pi pi-check" [rounded]="true" [text]="true" [raised]="true" />
<p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" [raised]="true" severity="secondary" />
<p-button icon="pi pi-search" [rounded]="true" [text]="true" [raised]="true" severity="success" />
<p-button icon="pi pi-user" [rounded]="true" [text]="true" [raised]="true" severity="info" />
<p-button icon="pi pi-bell" [rounded]="true" [text]="true" [raised]="true" severity="warn" />
<p-button icon="pi pi-heart" [rounded]="true" [text]="true" [raised]="true" severity="help" />
<p-button icon="pi pi-times" [rounded]="true" [text]="true" [raised]="true" severity="danger" />

<p-button icon="pi pi-check" [rounded]="true" [text]="true" />
<p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" severity="secondary" />
<p-button icon="pi pi-search" [rounded]="true" [text]="true" severity="success" />
<p-button icon="pi pi-user" [rounded]="true" [text]="true" severity="info" />
<p-button icon="pi pi-bell" [rounded]="true" [text]="true" severity="warn" />
<p-button icon="pi pi-heart" [rounded]="true" [text]="true" severity="help" />
<p-button icon="pi pi-times" [rounded]="true" [text]="true" severity="danger" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-icon-only-demo',
    templateUrl: './button-icon-only-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonIconOnlyDemo { }
```
</details>

## Link

A button can be rendered as a link when link property is present, while the pButton directive can be applied on an anchor element to style the link as a button.

```html
<p-button label="Link" link />
<a href="https://angular.dev/" pButton target="_blank" rel="noopener noreferrer">
    <span pButtonLabel>Angular Website</span>
</a>
<a routerLink="/" pButton>
    <span pButtonLabel>Router Link</span>
</a>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'button-link-demo',
    templateUrl: './button-link-demo.html',
    standalone: true,
    imports: [ButtonModule, RouterModule]
})
export class ButtonLinkDemo { }
```
</details>

## Loading

Busy state is controlled with the loading property.

```html
<p-button label="Search" icon="pi pi-check" [loading]="loading" (onClick)="load()" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-loading-demo',
    templateUrl: './button-loading-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonLoadingDemo {
    loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }
}
```
</details>

## Outlined

Outlined buttons display a border without a background initially.

```html
<p-button label="Primary" variant="outlined" />
<p-button label="Secondary" variant="outlined" severity="secondary" />
<p-button label="Success" variant="outlined" severity="success" />
<p-button label="Info" variant="outlined" severity="info" />
<p-button label="Warn" variant="outlined" severity="warn" />
<p-button label="Help" variant="outlined" severity="help" />
<p-button label="Danger" variant="outlined" severity="danger" />
<p-button label="Contrast" variant="outlined" severity="contrast" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-outlined-demo',
    templateUrl: './button-outlined-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonOutlinedDemo { }
```
</details>

## Raised

Raised buttons display a shadow to indicate elevation.

```html
<p-button label="Primary" [raised]="true" />
<p-button label="Secondary" [raised]="true" severity="secondary" />
<p-button label="Success" [raised]="true" severity="success" />
<p-button label="Info" [raised]="true" severity="info" />
<p-button label="Warn" [raised]="true" severity="warn" />
<p-button label="Help" [raised]="true" severity="help" />
<p-button label="Danger" [raised]="true" severity="danger" />
<p-button label="Contrast" [raised]="true" severity="contrast" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-raised-demo',
    templateUrl: './button-raised-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonRaisedDemo { }
```
</details>

## Raised Text

Text buttons can be displayed as raised for elevation.

```html
<p-button label="Primary" variant="text" [raised]="true" />
<p-button label="Secondary" variant="text" [raised]="true" severity="secondary" />
<p-button label="Success" variant="text" [raised]="true" severity="success" />
<p-button label="Info" variant="text" [raised]="true" severity="info" />
<p-button label="Warn" variant="text" [raised]="true" severity="warn" />
<p-button label="Help" variant="text" [raised]="true" severity="help" />
<p-button label="Danger" variant="text" [raised]="true" severity="danger" />
<p-button label="Plain" variant="text" [raised]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-raisedtext-demo',
    templateUrl: './button-raisedtext-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonRaisedtextDemo { }
```
</details>

## Rounded

Rounded buttons have a circular border radius.

```html
<p-button label="Primary" [rounded]="true" />
<p-button label="Secondary" [rounded]="true" severity="secondary" />
<p-button label="Success" [rounded]="true" severity="success" />
<p-button label="Info" [rounded]="true" severity="info" />
<p-button label="Warn" [rounded]="true" severity="warn" />
<p-button label="Help" [rounded]="true" severity="help" />
<p-button label="Danger" [rounded]="true" severity="danger" />
<p-button label="Contrast" [rounded]="true" severity="contrast" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-rounded-demo',
    templateUrl: './button-rounded-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonRoundedDemo { }
```
</details>

## Severity

Severity defines the type of button.

```html
<p-button label="Primary" />
<p-button label="Secondary" severity="secondary" />
<p-button label="Success" severity="success" />
<p-button label="Info" severity="info" />
<p-button label="Warn" severity="warn" />
<p-button label="Help" severity="help" />
<p-button label="Danger" severity="danger" />
<p-button label="Contrast" severity="contrast" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-severity-demo',
    templateUrl: './button-severity-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonSeverityDemo { }
```
</details>

## Sizes

Button provides small and large sizes as alternatives to the standard.

```html
<p-button label="Small" icon="pi pi-check" size="small" />
<p-button label="Normal" icon="pi pi-check" />
<p-button label="Large" icon="pi pi-check" size="large" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-sizes-demo',
    templateUrl: './button-sizes-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonSizesDemo { }
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Custom content inside a button is defined as children.

```html
<p-button [outlined]="true">
    <svg width="35" height="40" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="block mx-auto">
        <path d="..." fill="var(--primary-color)" />
    </svg>
</p-button>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-template-demo',
    templateUrl: './button-template-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonTemplateDemo { }
```
</details>

## Text

Text buttons are displayed as textual elements.

```html
<p-button label="Primary" variant="text" />
<p-button label="Secondary" variant="text" severity="secondary" />
<p-button label="Success" variant="text" severity="success" />
<p-button label="Info" variant="text" severity="info" />
<p-button label="Warn" variant="text" severity="warn" />
<p-button label="Help" variant="text" severity="help" />
<p-button label="Danger" variant="text" severity="danger" />
<p-button label="Plain" variant="text" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-text-demo',
    templateUrl: './button-text-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonTextDemo { }
```
</details>

## Button

Button is an extension to standard button element with icons and theming.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ButtonPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| type | string | button | Type of the button. |
| badge | string | - | Value of the badge. |
| disabled | boolean | false | When present, it specifies that the component should be disabled. |
| raised | boolean | false | Add a shadow to indicate elevation. |
| rounded | boolean | false | Add a circular border radius to the button. |
| text | boolean | false | Add a textual class to the button without a background initially. |
| plain | boolean | false | Add a plain textual class to the button without a background initially. |
| outlined | boolean | false | Add a border class without a background initially. |
| link | boolean | false | Add a link style to the button. |
| tabindex | number | - | Add a tabindex to the button. |
| size | "small" \| "large" | - | Defines the size of the button. |
| variant | "text" \| "outlined" | - | Specifies the variant of the component. |
| style | { [klass: string]: any } | - | Inline style of the element. |
| styleClass | string | - | Class of the element. |
| badgeClass | string | - | Style class of the badge. **(Deprecated)** |
| badgeSeverity | "success" \| "info" \| "warn" \| "danger" \| "help" \| "primary" \| "secondary" \| "contrast" | secondary | Severity type of the badge. |
| ariaLabel | string | - | Used to define a string that autocomplete attribute the current element. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| iconPos | ButtonIconPosition | left | Position of the icon. |
| icon | string | - | Name of the icon. |
| label | string | - | Text of the button. |
| loading | boolean | false | Whether the button is in loading state. |
| loadingIcon | string | - | Icon to display in loading state. |
| severity | ButtonSeverity | - | Defines the style of the button. |
| buttonProps | ButtonProps | - | Used to pass all properties of the ButtonProps to the Button component. |
| fluid | InputSignalWithTransform<boolean, unknown> | undefined | Spans 100% width of the container when enabled. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onClick | event: MouseEvent | Callback to execute when button is clicked. This event is intended to be used with the <p-button> component. Using a regular <button> element, use (click). |
| onFocus | event: FocusEvent | Callback to execute when button is focused. This event is intended to be used with the <p-button> component. Using a regular <button> element, use (focus). |
| onBlur | event: FocusEvent | Callback to execute when button loses focus. This event is intended to be used with the <p-button> component. Using a regular <button> element, use (blur). |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | TemplateRef<void> | Custom content template. |
| loadingicon | TemplateRef<ButtonLoadingIconTemplateContext> | Custom loading icon template. |
| icon | TemplateRef<ButtonIconTemplateContext> | Custom icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host DOM element. |
| root | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the root's DOM element. |
| loadingIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the loading icon's DOM element. |
| icon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the icon's DOM element. |
| label | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the label's DOM element. |
| pcBadge | BadgePassThrough | Used to pass attributes to the Badge component. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-button | Class name of the root element |
| p-button-loading-icon | Class name of the loading icon element |
| p-button-icon | Class name of the icon element |
| p-button-label | Class name of the label element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| button.border.radius | --p-button-border-radius | Border radius of root |
| button.rounded.border.radius | --p-button-rounded-border-radius | Rounded border radius of root |
| button.gap | --p-button-gap | Gap of root |
| button.padding.x | --p-button-padding-x | Padding x of root |
| button.padding.y | --p-button-padding-y | Padding y of root |
| button.icon.only.width | --p-button-icon-only-width | Icon only width of root |
| button.sm.font.size | --p-button-sm-font-size | Sm font size of root |
| button.sm.padding.x | --p-button-sm-padding-x | Sm padding x of root |
| button.sm.padding.y | --p-button-sm-padding-y | Sm padding y of root |
| button.sm.icon.only.width | --p-button-sm-icon-only-width | Sm icon only width of root |
| button.lg.font.size | --p-button-lg-font-size | Lg font size of root |
| button.lg.padding.x | --p-button-lg-padding-x | Lg padding x of root |
| button.lg.padding.y | --p-button-lg-padding-y | Lg padding y of root |
| button.lg.icon.only.width | --p-button-lg-icon-only-width | Lg icon only width of root |
| button.label.font.weight | --p-button-label-font-weight | Label font weight of root |
| button.raised.shadow | --p-button-raised-shadow | Raised shadow of root |
| button.focus.ring.width | --p-button-focus-ring-width | Focus ring width of root |
| button.focus.ring.style | --p-button-focus-ring-style | Focus ring style of root |
| button.focus.ring.offset | --p-button-focus-ring-offset | Focus ring offset of root |
| button.badge.size | --p-button-badge-size | Badge size of root |
| button.transition.duration | --p-button-transition-duration | Transition duration of root |
| button.primary.background | --p-button-primary-background | Primary background of root |
| button.primary.hover.background | --p-button-primary-hover-background | Primary hover background of root |
| button.primary.active.background | --p-button-primary-active-background | Primary active background of root |
| button.primary.border.color | --p-button-primary-border-color | Primary border color of root |
| button.primary.hover.border.color | --p-button-primary-hover-border-color | Primary hover border color of root |
| button.primary.active.border.color | --p-button-primary-active-border-color | Primary active border color of root |
| button.primary.color | --p-button-primary-color | Primary color of root |
| button.primary.hover.color | --p-button-primary-hover-color | Primary hover color of root |
| button.primary.active.color | --p-button-primary-active-color | Primary active color of root |
| button.primary.focus.ring.color | --p-button-primary-focus-ring-color | Primary focus ring color of root |
| button.primary.focus.ring.shadow | --p-button-primary-focus-ring-shadow | Primary focus ring shadow of root |
| button.secondary.background | --p-button-secondary-background | Secondary background of root |
| button.secondary.hover.background | --p-button-secondary-hover-background | Secondary hover background of root |
| button.secondary.active.background | --p-button-secondary-active-background | Secondary active background of root |
| button.secondary.border.color | --p-button-secondary-border-color | Secondary border color of root |
| button.secondary.hover.border.color | --p-button-secondary-hover-border-color | Secondary hover border color of root |
| button.secondary.active.border.color | --p-button-secondary-active-border-color | Secondary active border color of root |
| button.secondary.color | --p-button-secondary-color | Secondary color of root |
| button.secondary.hover.color | --p-button-secondary-hover-color | Secondary hover color of root |
| button.secondary.active.color | --p-button-secondary-active-color | Secondary active color of root |
| button.secondary.focus.ring.color | --p-button-secondary-focus-ring-color | Secondary focus ring color of root |
| button.secondary.focus.ring.shadow | --p-button-secondary-focus-ring-shadow | Secondary focus ring shadow of root |
| button.info.background | --p-button-info-background | Info background of root |
| button.info.hover.background | --p-button-info-hover-background | Info hover background of root |
| button.info.active.background | --p-button-info-active-background | Info active background of root |
| button.info.border.color | --p-button-info-border-color | Info border color of root |
| button.info.hover.border.color | --p-button-info-hover-border-color | Info hover border color of root |
| button.info.active.border.color | --p-button-info-active-border-color | Info active border color of root |
| button.info.color | --p-button-info-color | Info color of root |
| button.info.hover.color | --p-button-info-hover-color | Info hover color of root |
| button.info.active.color | --p-button-info-active-color | Info active color of root |
| button.info.focus.ring.color | --p-button-info-focus-ring-color | Info focus ring color of root |
| button.info.focus.ring.shadow | --p-button-info-focus-ring-shadow | Info focus ring shadow of root |
| button.success.background | --p-button-success-background | Success background of root |
| button.success.hover.background | --p-button-success-hover-background | Success hover background of root |
| button.success.active.background | --p-button-success-active-background | Success active background of root |
| button.success.border.color | --p-button-success-border-color | Success border color of root |
| button.success.hover.border.color | --p-button-success-hover-border-color | Success hover border color of root |
| button.success.active.border.color | --p-button-success-active-border-color | Success active border color of root |
| button.success.color | --p-button-success-color | Success color of root |
| button.success.hover.color | --p-button-success-hover-color | Success hover color of root |
| button.success.active.color | --p-button-success-active-color | Success active color of root |
| button.success.focus.ring.color | --p-button-success-focus-ring-color | Success focus ring color of root |
| button.success.focus.ring.shadow | --p-button-success-focus-ring-shadow | Success focus ring shadow of root |
| button.warn.background | --p-button-warn-background | Warn background of root |
| button.warn.hover.background | --p-button-warn-hover-background | Warn hover background of root |
| button.warn.active.background | --p-button-warn-active-background | Warn active background of root |
| button.warn.border.color | --p-button-warn-border-color | Warn border color of root |
| button.warn.hover.border.color | --p-button-warn-hover-border-color | Warn hover border color of root |
| button.warn.active.border.color | --p-button-warn-active-border-color | Warn active border color of root |
| button.warn.color | --p-button-warn-color | Warn color of root |
| button.warn.hover.color | --p-button-warn-hover-color | Warn hover color of root |
| button.warn.active.color | --p-button-warn-active-color | Warn active color of root |
| button.warn.focus.ring.color | --p-button-warn-focus-ring-color | Warn focus ring color of root |
| button.warn.focus.ring.shadow | --p-button-warn-focus-ring-shadow | Warn focus ring shadow of root |
| button.help.background | --p-button-help-background | Help background of root |
| button.help.hover.background | --p-button-help-hover-background | Help hover background of root |
| button.help.active.background | --p-button-help-active-background | Help active background of root |
| button.help.border.color | --p-button-help-border-color | Help border color of root |
| button.help.hover.border.color | --p-button-help-hover-border-color | Help hover border color of root |
| button.help.active.border.color | --p-button-help-active-border-color | Help active border color of root |
| button.help.color | --p-button-help-color | Help color of root |
| button.help.hover.color | --p-button-help-hover-color | Help hover color of root |
| button.help.active.color | --p-button-help-active-color | Help active color of root |
| button.help.focus.ring.color | --p-button-help-focus-ring-color | Help focus ring color of root |
| button.help.focus.ring.shadow | --p-button-help-focus-ring-shadow | Help focus ring shadow of root |
| button.danger.background | --p-button-danger-background | Danger background of root |
| button.danger.hover.background | --p-button-danger-hover-background | Danger hover background of root |
| button.danger.active.background | --p-button-danger-active-background | Danger active background of root |
| button.danger.border.color | --p-button-danger-border-color | Danger border color of root |
| button.danger.hover.border.color | --p-button-danger-hover-border-color | Danger hover border color of root |
| button.danger.active.border.color | --p-button-danger-active-border-color | Danger active border color of root |
| button.danger.color | --p-button-danger-color | Danger color of root |
| button.danger.hover.color | --p-button-danger-hover-color | Danger hover color of root |
| button.danger.active.color | --p-button-danger-active-color | Danger active color of root |
| button.danger.focus.ring.color | --p-button-danger-focus-ring-color | Danger focus ring color of root |
| button.danger.focus.ring.shadow | --p-button-danger-focus-ring-shadow | Danger focus ring shadow of root |
| button.contrast.background | --p-button-contrast-background | Contrast background of root |
| button.contrast.hover.background | --p-button-contrast-hover-background | Contrast hover background of root |
| button.contrast.active.background | --p-button-contrast-active-background | Contrast active background of root |
| button.contrast.border.color | --p-button-contrast-border-color | Contrast border color of root |
| button.contrast.hover.border.color | --p-button-contrast-hover-border-color | Contrast hover border color of root |
| button.contrast.active.border.color | --p-button-contrast-active-border-color | Contrast active border color of root |
| button.contrast.color | --p-button-contrast-color | Contrast color of root |
| button.contrast.hover.color | --p-button-contrast-hover-color | Contrast hover color of root |
| button.contrast.active.color | --p-button-contrast-active-color | Contrast active color of root |
| button.contrast.focus.ring.color | --p-button-contrast-focus-ring-color | Contrast focus ring color of root |
| button.contrast.focus.ring.shadow | --p-button-contrast-focus-ring-shadow | Contrast focus ring shadow of root |
| button.outlined.primary.hover.background | --p-button-outlined-primary-hover-background | Primary hover background of outlined |
| button.outlined.primary.active.background | --p-button-outlined-primary-active-background | Primary active background of outlined |
| button.outlined.primary.border.color | --p-button-outlined-primary-border-color | Primary border color of outlined |
| button.outlined.primary.color | --p-button-outlined-primary-color | Primary color of outlined |
| button.outlined.secondary.hover.background | --p-button-outlined-secondary-hover-background | Secondary hover background of outlined |
| button.outlined.secondary.active.background | --p-button-outlined-secondary-active-background | Secondary active background of outlined |
| button.outlined.secondary.border.color | --p-button-outlined-secondary-border-color | Secondary border color of outlined |
| button.outlined.secondary.color | --p-button-outlined-secondary-color | Secondary color of outlined |
| button.outlined.success.hover.background | --p-button-outlined-success-hover-background | Success hover background of outlined |
| button.outlined.success.active.background | --p-button-outlined-success-active-background | Success active background of outlined |
| button.outlined.success.border.color | --p-button-outlined-success-border-color | Success border color of outlined |
| button.outlined.success.color | --p-button-outlined-success-color | Success color of outlined |
| button.outlined.info.hover.background | --p-button-outlined-info-hover-background | Info hover background of outlined |
| button.outlined.info.active.background | --p-button-outlined-info-active-background | Info active background of outlined |
| button.outlined.info.border.color | --p-button-outlined-info-border-color | Info border color of outlined |
| button.outlined.info.color | --p-button-outlined-info-color | Info color of outlined |
| button.outlined.warn.hover.background | --p-button-outlined-warn-hover-background | Warn hover background of outlined |
| button.outlined.warn.active.background | --p-button-outlined-warn-active-background | Warn active background of outlined |
| button.outlined.warn.border.color | --p-button-outlined-warn-border-color | Warn border color of outlined |
| button.outlined.warn.color | --p-button-outlined-warn-color | Warn color of outlined |
| button.outlined.help.hover.background | --p-button-outlined-help-hover-background | Help hover background of outlined |
| button.outlined.help.active.background | --p-button-outlined-help-active-background | Help active background of outlined |
| button.outlined.help.border.color | --p-button-outlined-help-border-color | Help border color of outlined |
| button.outlined.help.color | --p-button-outlined-help-color | Help color of outlined |
| button.outlined.danger.hover.background | --p-button-outlined-danger-hover-background | Danger hover background of outlined |
| button.outlined.danger.active.background | --p-button-outlined-danger-active-background | Danger active background of outlined |
| button.outlined.danger.border.color | --p-button-outlined-danger-border-color | Danger border color of outlined |
| button.outlined.danger.color | --p-button-outlined-danger-color | Danger color of outlined |
| button.outlined.contrast.hover.background | --p-button-outlined-contrast-hover-background | Contrast hover background of outlined |
| button.outlined.contrast.active.background | --p-button-outlined-contrast-active-background | Contrast active background of outlined |
| button.outlined.contrast.border.color | --p-button-outlined-contrast-border-color | Contrast border color of outlined |
| button.outlined.contrast.color | --p-button-outlined-contrast-color | Contrast color of outlined |
| button.outlined.plain.hover.background | --p-button-outlined-plain-hover-background | Plain hover background of outlined |
| button.outlined.plain.active.background | --p-button-outlined-plain-active-background | Plain active background of outlined |
| button.outlined.plain.border.color | --p-button-outlined-plain-border-color | Plain border color of outlined |
| button.outlined.plain.color | --p-button-outlined-plain-color | Plain color of outlined |
| button.text.primary.hover.background | --p-button-text-primary-hover-background | Primary hover background of text |
| button.text.primary.active.background | --p-button-text-primary-active-background | Primary active background of text |
| button.text.primary.color | --p-button-text-primary-color | Primary color of text |
| button.text.secondary.hover.background | --p-button-text-secondary-hover-background | Secondary hover background of text |
| button.text.secondary.active.background | --p-button-text-secondary-active-background | Secondary active background of text |
| button.text.secondary.color | --p-button-text-secondary-color | Secondary color of text |
| button.text.success.hover.background | --p-button-text-success-hover-background | Success hover background of text |
| button.text.success.active.background | --p-button-text-success-active-background | Success active background of text |
| button.text.success.color | --p-button-text-success-color | Success color of text |
| button.text.info.hover.background | --p-button-text-info-hover-background | Info hover background of text |
| button.text.info.active.background | --p-button-text-info-active-background | Info active background of text |
| button.text.info.color | --p-button-text-info-color | Info color of text |
| button.text.warn.hover.background | --p-button-text-warn-hover-background | Warn hover background of text |
| button.text.warn.active.background | --p-button-text-warn-active-background | Warn active background of text |
| button.text.warn.color | --p-button-text-warn-color | Warn color of text |
| button.text.help.hover.background | --p-button-text-help-hover-background | Help hover background of text |
| button.text.help.active.background | --p-button-text-help-active-background | Help active background of text |
| button.text.help.color | --p-button-text-help-color | Help color of text |
| button.text.danger.hover.background | --p-button-text-danger-hover-background | Danger hover background of text |
| button.text.danger.active.background | --p-button-text-danger-active-background | Danger active background of text |
| button.text.danger.color | --p-button-text-danger-color | Danger color of text |
| button.text.contrast.hover.background | --p-button-text-contrast-hover-background | Contrast hover background of text |
| button.text.contrast.active.background | --p-button-text-contrast-active-background | Contrast active background of text |
| button.text.contrast.color | --p-button-text-contrast-color | Contrast color of text |
| button.text.plain.hover.background | --p-button-text-plain-hover-background | Plain hover background of text |
| button.text.plain.active.background | --p-button-text-plain-active-background | Plain active background of text |
| button.text.plain.color | --p-button-text-plain-color | Plain color of text |
| button.link.color | --p-button-link-color | Color of link |
| button.link.hover.color | --p-button-link-hover-color | Hover color of link |
| button.link.active.color | --p-button-link-active-color | Active color of link |

