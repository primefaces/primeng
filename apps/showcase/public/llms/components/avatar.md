# Angular Avatar Component

Avatar represents people using icons, labels and images.

## Accessibility

Screen Reader Avatar does not include any roles and attributes by default. Any attribute is passed to the root element so you may add a role like img along with aria-labelledby or aria-label to describe the component. In case avatars need to be tabbable, tabIndex can be added as well to implement custom key handlers. Keyboard Support Component does not include any interactive elements.

## AvatarGroup

Grouping is available by wrapping multiple Avatar components inside an AvatarGroup .

```html
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" size="large" shape="circle" />
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" size="large" shape="circle" />
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" size="large" shape="circle" />
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png" size="large" shape="circle" />
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png" size="large" shape="circle" />
<p-avatar label="+2" shape="circle" size="large" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';

@Component({
    selector: 'avatar-group-demo',
    templateUrl: './avatar-group-demo.html',
    standalone: true,
    imports: [Avatar, AvatarGroup]
})
export class AvatarGroupDemo {}
```
</details>

## avatarstyledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Badge

A badge can be added to an Avatar with the Badge directive.

```html
<p-avatar
    image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
    pBadge
    value="4"
    severity="danger" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'avatar-badge-demo',
    templateUrl: './avatar-badge-demo.html',
    standalone: true,
    imports: [Avatar, BadgeModule]
})
export class AvatarBadgeDemo {}
```
</details>

## Icon

A font icon is displayed as an Avatar with the icon property.

```html
<p-avatar icon="pi pi-user" class="mr-2" size="xlarge" />
<p-avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" />
<p-avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" />
<p-avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
<p-avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
<p-avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" shape="circle" />

<p-overlay-badge value="4" severity="danger" class="inline-flex">
    <p-avatar icon="pi pi-user" size="xlarge" />
</p-overlay-badge>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
    selector: 'avatar-icon-demo',
    templateUrl: './avatar-icon-demo.html',
    standalone: true,
    imports: [AvatarModule, OverlayBadgeModule]
})
export class AvatarIconDemo {}
```
</details>

## Image

Use the image property to display an image as an Avatar.

```html
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" class="mr-2" size="xlarge" shape="circle" />
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" class="mr-2" size="large" shape="circle" />
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" shape="circle" />

<p-overlay-badge value="4" severity="danger" class="inline-flex">
    <p-avatar class="p-overlay-badge" image="https://primefaces.org/cdn/primeng/images/demo/avatar/walter.jpg" size="xlarge" />
</p-overlay-badge>

<p-avatar image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" class="flex items-center justify-center mr-2" size="xlarge" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
    selector: 'avatar-image-demo',
    templateUrl: './avatar-image-demo.html',
    standalone: true,
    imports: [AvatarModule, OverlayBadgeModule]
})
export class AvatarImageDemo {}
```
</details>

## Label

A letter Avatar is defined with the label property.

```html
<p-avatar label="P" class="mr-2" size="xlarge" />
<p-avatar label="V" class="mr-2" size="large" [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" />
<p-avatar label="U" class="mr-2" [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" />
<p-avatar label="P" class="mr-2" size="xlarge" shape="circle" />
<p-avatar label="V" class="mr-2" size="large" [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" shape="circle" />
<p-avatar label="U" class="mr-2" [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" shape="circle" />

<p-overlay-badge value="4" severity="danger" class="inline-flex">
    <p-avatar label="U" size="xlarge" />
</p-overlay-badge>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
    selector: 'avatar-label-demo',
    templateUrl: './avatar-label-demo.html',
    standalone: true,
    imports: [AvatarModule, OverlayBadgeModule]
})
export class AvatarLabelDemo {}
```
</details>

## Shape

Avatar comes in two different styles specified with the shape property, square is the default and circle is the alternative.

```html
<p-avatar label="P" shape="circle" />
<p-avatar label="T" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';

@Component({
    selector: 'avatar-shape-demo',
    templateUrl: './avatar-shape-demo.html',
    standalone: true,
    imports: [Avatar]
})
export class AvatarShapeDemo {}
```
</details>

## Size

size property defines the size of the Avatar with large and xlarge as possible values.

```html
<p-avatar label="P" size="large" />
<p-avatar label="T" size="xlarge" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';

@Component({
    selector: 'avatar-size-demo',
    templateUrl: './avatar-size-demo.html',
    standalone: true,
    imports: [Avatar]
})
export class AvatarSizeDemo {}
```
</details>

## Template

Content can easily be customized with the dynamic content instead of using the built-in modes.

```html
<p-avatar size="xlarge">
    <svg width="35" height="40" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="block mx-auto">
        <path d="..." fill="var(--primary-color)" />
    </svg>
</p-avatar>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';

@Component({
    selector: 'avatar-template-demo',
    templateUrl: './avatar-template-demo.html',
    standalone: true,
    imports: [Avatar]
})
export class AvatarTemplateDemo {}
```
</details>

## Avatar

Avatar represents people using icons, labels and images.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Defines the text to display. |
| icon | string | - | Defines the icon to display. |
| image | string | - | Defines the image to display. |
| size | "large" \| "xlarge" \| "normal" | normal | Size of the element. |
| shape | "circle" \| "square" | square | Shape of the element. |
| styleClass | string | - | Class of the element. **(Deprecated)** |
| ariaLabel | string | - | Establishes a string value that labels the component. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<AvatarPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onImageError | event: Event | This event is triggered if an error occurs while loading an image file. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| label | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the label's DOM element. |
| icon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the icon's DOM element. |
| image | PassThroughOption<HTMLImageElement, I> | Used to pass attributes to the image's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-avatar | Class name of the root element |
| p-avatar-label | Class name of the label element |
| p-avatar-icon | Class name of the icon element |
| p-avatar-image | Container element in image mode |
| p-avatar-circle | Container element with a circle shape |
| p-avatar-lg | Container element with a large size |
| p-avatar-xl | Container element with an xlarge size |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| avatar.width | --p-avatar-width | Width of root |
| avatar.height | --p-avatar-height | Height of root |
| avatar.font.size | --p-avatar-font-size | Font size of root |
| avatar.background | --p-avatar-background | Background of root |
| avatar.color | --p-avatar-color | Color of root |
| avatar.border.radius | --p-avatar-border-radius | Border radius of root |
| avatar.icon.size | --p-avatar-icon-size | Size of icon |
| avatar.group.border.color | --p-avatar-group-border-color | Border color of group |
| avatar.group.offset | --p-avatar-group-offset | Offset of group |
| avatar.lg.width | --p-avatar-lg-width | Width of lg |
| avatar.lg.height | --p-avatar-lg-height | Height of lg |
| avatar.lg.font.size | --p-avatar-lg-font-size | Font size of lg |
| avatar.lg.icon.size | --p-avatar-lg-icon-size | Icon size of lg |
| avatar.lg.group.offset | --p-avatar-lg-group-offset | Group offset of lg |
| avatar.xl.width | --p-avatar-xl-width | Width of xl |
| avatar.xl.height | --p-avatar-xl-height | Height of xl |
| avatar.xl.font.size | --p-avatar-xl-font-size | Font size of xl |
| avatar.xl.icon.size | --p-avatar-xl-icon-size | Icon size of xl |
| avatar.xl.group.offset | --p-avatar-xl-group-offset | Group offset of xl |

