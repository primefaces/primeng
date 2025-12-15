# Angular Badge Component

Badge is a small status indicator for another element.

## Accessibility

Screen Reader Badge does not include any roles and attributes by default, any attribute is passed to the root element so aria roles and attributes can be added if required. If the badges are dynamic, aria-live may be utilized as well. In case badges need to be tabbable, tabIndex can be added to implement custom key handlers. Keyboard Support Component does not include any interactive elements.

## Basic

Content of the badge is specified using the value property.

```html
<p-badge value="2" />
```

## Button

Buttons have built-in support for badges to display a badge inline.

```html
<p-button label="Emails" icon="pi pi-bell" label="Notifications" badge="2" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'badge-button-demo',
    templateUrl: './badge-button-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class BadgeButtonDemo {}
```
</details>

## directivedoc

Content of the badge is specified using the value property.

```html
<i class="pi pi-bell text-3xl" pBadge value="2"></i>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'badge-directive-demo',
    templateUrl: './badge-directive-demo.html',
    standalone: true,
    imports: [BadgeModule]
})
export class BadgeDirectiveDemo {}
```
</details>

## Overlay

A badge can be added to any element by encapsulating the content with the OverlayBadge component.

```html
<p-overlaybadge value="2">
    <i class="pi pi-bell" style="font-size: 2rem"></i>
</p-overlaybadge>
<p-overlaybadge value="4" severity="danger">
    <i class="pi pi-calendar" style="font-size: 2rem"></i>
</p-overlaybadge>
<p-overlaybadge severity="danger">
    <i class="pi pi-envelope" style="font-size: 2rem"></i>
</p-overlaybadge>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
    selector: 'badge-overlay-demo',
    templateUrl: './badge-overlay-demo.html',
    standalone: true,
    imports: [OverlayBadgeModule]
})
export class BadgeOverlayDemo {}
```
</details>

## positiondoc

A Badge can be positioned at the top right corner of an element by adding p-overlay-badge style class to the element and embedding the badge inside.

```html
<i class="pi pi-bell mr-6 p-text-secondary" pBadge style="font-size: 2rem" value="2"></i>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'badge-position-demo',
    templateUrl: './badge-position-demo.html',
    standalone: true,
    imports: [BadgeModule]
})
export class BadgePositionDemo {}
```
</details>

## Severity

Severity defines the color of the badge, possible values are success , info , warn and danger

```html
<p-badge [value]="2" severity="success" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'badge-severity-demo',
    templateUrl: './badge-severity-demo.html',
    standalone: true,
    imports: [BadgeModule]
})
export class BadgeSeverityDemo {}
```
</details>

## Size

Badge sizes are adjusted with the badgeSize property that accepts small , large and xlarge as the possible alternatives to the default size. Currently sizes only apply to component mode.

```html
<p-badge value="8" badgeSize="xlarge" severity="success" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'badge-size-demo',
    templateUrl: './badge-size-demo.html',
    standalone: true,
    imports: [BadgeModule]
})
export class BadgeSizeDemo {}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Badge

Badge is a small status indicator for another element.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| styleClass | InputSignal<string> | ... | Class of the element. **(Deprecated)** |
| badgeSize | InputSignal<"small" \| "large" \| "xlarge"> | ... | Size of the badge, valid options are "large" and "xlarge". |
| size | InputSignal<"small" \| "large" \| "xlarge"> | ... | Size of the badge, valid options are "large" and "xlarge". |
| severity | InputSignal<"success" \| "info" \| "warn" \| "danger" \| "secondary" \| "contrast"> | ... | Severity type of the badge. |
| value | InputSignal<string \| number> | ... | Value to display inside the badge. |
| badgeDisabled | InputSignalWithTransform<boolean, boolean> | ... | When specified, disables the component. |
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<BadgePassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-badge | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| badge.border.radius | --p-badge-border-radius | Border radius of root |
| badge.padding | --p-badge-padding | Padding of root |
| badge.font.size | --p-badge-font-size | Font size of root |
| badge.font.weight | --p-badge-font-weight | Font weight of root |
| badge.min.width | --p-badge-min-width | Min width of root |
| badge.height | --p-badge-height | Height of root |
| badge.dot.size | --p-badge-dot-size | Size of dot |
| badge.sm.font.size | --p-badge-sm-font-size | Font size of sm |
| badge.sm.min.width | --p-badge-sm-min-width | Min width of sm |
| badge.sm.height | --p-badge-sm-height | Height of sm |
| badge.lg.font.size | --p-badge-lg-font-size | Font size of lg |
| badge.lg.min.width | --p-badge-lg-min-width | Min width of lg |
| badge.lg.height | --p-badge-lg-height | Height of lg |
| badge.xl.font.size | --p-badge-xl-font-size | Font size of xl |
| badge.xl.min.width | --p-badge-xl-min-width | Min width of xl |
| badge.xl.height | --p-badge-xl-height | Height of xl |
| badge.primary.background | --p-badge-primary-background | Background of primary |
| badge.primary.color | --p-badge-primary-color | Color of primary |
| badge.secondary.background | --p-badge-secondary-background | Background of secondary |
| badge.secondary.color | --p-badge-secondary-color | Color of secondary |
| badge.success.background | --p-badge-success-background | Background of success |
| badge.success.color | --p-badge-success-color | Color of success |
| badge.info.background | --p-badge-info-background | Background of info |
| badge.info.color | --p-badge-info-color | Color of info |
| badge.warn.background | --p-badge-warn-background | Background of warn |
| badge.warn.color | --p-badge-warn-color | Color of warn |
| badge.danger.background | --p-badge-danger-background | Background of danger |
| badge.danger.color | --p-badge-danger-color | Color of danger |
| badge.contrast.background | --p-badge-contrast-background | Background of contrast |
| badge.contrast.color | --p-badge-contrast-color | Color of contrast |

