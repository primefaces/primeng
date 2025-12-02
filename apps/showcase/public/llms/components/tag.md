# Angular Tag Component

Tag component is used to categorize content.

## Accessibility

Screen Reader Tag does not include any roles and attributes by default, any attribute is passed to the root element so aria roles and attributes can be added if required. If the tags are dynamic, aria-live may be utilized as well. In case badges need to be tabbable, tabIndex can be added to implement custom key handlers. Keyboard Support Component does not include any interactive elements.

## Basic

Label of the tag is defined with the value property.

```html
<p-tag value="New" />
```

## Icon

A font icon next to the value can be displayed with the icon property.

```html
<p-tag icon="pi pi-user" value="Primary" />
<p-tag icon="pi pi-search" severity="secondary" value="Secondary" />
<p-tag icon="pi pi-check" severity="success" value="Success" />
<p-tag icon="pi pi-info-circle" severity="info" value="Info" />
<p-tag icon="pi pi-exclamation-triangle" severity="warn" value="Warn" />
<p-tag icon="pi pi-times" severity="danger" value="Danger" />
<p-tag icon="pi pi-cog" severity="contrast" value="Contrast" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'tag-icon-demo',
    templateUrl: './tag-icon-demo.html',
    standalone: true,
    imports: [TagModule]
})
export class TagIconDemo {}
```
</details>

## Pill

Enabling rounded , displays a tag as a pill.

```html
<p-tag value="Primary" [rounded]="true" />
<p-tag severity="secondary" value="Secondary" [rounded]="true" />
<p-tag severity="success" value="Success" [rounded]="true" />
<p-tag severity="info" value="Info" [rounded]="true" />
<p-tag severity="warn" value="Warn" [rounded]="true" />
<p-tag severity="danger" value="Danger" [rounded]="true" />
<p-tag severity="contrast" value="Contrast" [rounded]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'tag-pill-demo',
    templateUrl: './tag-pill-demo.html',
    standalone: true,
    imports: [TagModule]
})
export class TagPillDemo {}
```
</details>

## Severity

Severity defines the color of the tag, possible values are success , info , warn and danger in addition to the default theme color.

```html
<p-tag value="Primary" />
<p-tag severity="secondary" value="Secondary" />
<p-tag severity="success" value="Success" />
<p-tag severity="info" value="Info" />
<p-tag severity="warn" value="Warn" />
<p-tag severity="danger" value="Danger" />
<p-tag severity="contrast" value="Contrast" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'tag-severity-demo',
    templateUrl: './tag-severity-demo.html',
    standalone: true,
    imports: [TagModule]
})
export class TagSeverityDemo {}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Children of the component are passed as the content for templating.

```html
<p-tag [style]="{ border: '2px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)'}">
    <div class="flex items-center gap-2 px-1">
        <img alt="Country" src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" class="flag flag-it" style="width: 18px" />
        <span class="text-base">
            Italy
        </span>
    </div>
</p-tag>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'tag-template-demo',
    templateUrl: './tag-template-demo.html',
    standalone: true,
    imports: [TagModule]
})
export class TagTemplateDemo {}
```
</details>

## Tag

Tag component is used to categorize content.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<TagPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| severity | "success" \| "info" \| "warn" \| "danger" \| "secondary" \| "contrast" | - | Severity type of the tag. |
| value | string | - | Value to display inside the tag. |
| icon | string | - | Icon of the tag to display next to the value. |
| rounded | boolean | false | Whether the corners of the tag are rounded. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| icon | TemplateRef<void> | Custom icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the root's DOM element. |
| icon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the icon's DOM element. |
| label | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the label's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-tag | Class name of the root element |
| p-tag-icon | Class name of the icon element |
| p-tag-label | Class name of the label element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| tag.font.size | --p-tag-font-size | Font size of root |
| tag.font.weight | --p-tag-font-weight | Font weight of root |
| tag.padding | --p-tag-padding | Padding of root |
| tag.gap | --p-tag-gap | Gap of root |
| tag.border.radius | --p-tag-border-radius | Border radius of root |
| tag.rounded.border.radius | --p-tag-rounded-border-radius | Rounded border radius of root |
| tag.icon.size | --p-tag-icon-size | Size of icon |
| tag.primary.background | --p-tag-primary-background | Background of primary |
| tag.primary.color | --p-tag-primary-color | Color of primary |
| tag.secondary.background | --p-tag-secondary-background | Background of secondary |
| tag.secondary.color | --p-tag-secondary-color | Color of secondary |
| tag.success.background | --p-tag-success-background | Background of success |
| tag.success.color | --p-tag-success-color | Color of success |
| tag.info.background | --p-tag-info-background | Background of info |
| tag.info.color | --p-tag-info-color | Color of info |
| tag.warn.background | --p-tag-warn-background | Background of warn |
| tag.warn.color | --p-tag-warn-color | Color of warn |
| tag.danger.background | --p-tag-danger-background | Background of danger |
| tag.danger.color | --p-tag-danger-color | Color of danger |
| tag.contrast.background | --p-tag-contrast-background | Background of contrast |
| tag.contrast.color | --p-tag-contrast-color | Color of contrast |

