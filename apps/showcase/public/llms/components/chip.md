# Angular Chip Component

Chip represents entities using icons, labels and images.

## Accessibility

Screen Reader Chip uses the label property as the default aria-label , since any attribute is passed to the root element aria-labelledby or aria-label can be used to override the default behavior. Removable chips have a tabindex and focusable with the tab key. Keyboard Support Key Function backspace Hides removable. enter Hides removable.

## Basic

A basic chip with a text is created with the label property. In addition when removable is added, a delete icon is displayed to remove a chip, the optional onRemove event is available to get notified when a chip is hidden.

```html
<p-chip label="Action" />
<p-chip label="Comedy" />
<p-chip label="Mystery" />
<p-chip label="Thriller" [removable]="true" />
```

## Icon

A font icon next to the label can be displayed with the icon property.

```html
<p-chip label="Apple" icon="pi pi-apple" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Chip } from 'primeng/chip';

@Component({
    selector: 'chip-icon-demo',
    templateUrl: './chip-icon-demo.html',
    standalone: true,
    imports: [Chip]
})
export class ChipIconDemo {}
```
</details>

## Image

The image property is used to display an image like an avatar.

```html
<p-chip label="Amy Elsner" image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" alt="Avatar image" />
<p-chip label="Asiya Javayant" image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" alt="Avatar image" />
<p-chip label="Onyama Limba" image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" alt="Avatar image" />
<p-chip label="Xuxue Feng" image="https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png" alt="Avatar image" [removable]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Chip } from 'primeng/chip';

@Component({
    selector: 'chip-image-demo',
    templateUrl: './chip-image-demo.html',
    standalone: true,
    imports: [Chip]
})
export class ChipImageDemo {}
```
</details>

## Template

Content can easily be customized with the dynamic content instead of using the built-in modes.

```html
<p-chip class="!py-0 !pl-0 !pr-4">
    <span class="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center">
        P
    </span>
    <span class="ml-2 font-medium">
        PRIME
    </span>
</p-chip>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Chip } from 'primeng/chip';

@Component({
    selector: 'chip-template-demo',
    templateUrl: './chip-template-demo.html',
    standalone: true,
    imports: [Chip]
})
export class ChipTemplateDemo {}
```
</details>

## Chip

Chip represents people using icons, labels and images.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ChipPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| label | string | - | Defines the text to display. |
| icon | string | - | Defines the icon to display. |
| image | string | - | Defines the image to display. |
| alt | string | - | Alt attribute of the image. |
| styleClass | string | - | Class of the element. **(Deprecated)** |
| disabled | boolean | false | When present, it specifies that the element should be disabled. |
| removable | boolean | false | Whether to display a remove icon. |
| removeIcon | string | - | Icon of the remove element. |
| chipProps | ChipProps | - | Used to pass all properties of the chipProps to the Chip component. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onRemove | event: MouseEvent | Callback to invoke when a chip is removed. |
| onImageError | event: Event | This event is triggered if an error occurs while loading an image file. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| removeicon | TemplateRef<void> | Custom remove icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| image | PassThroughOption<HTMLImageElement, I> | Used to pass attributes to the image's DOM element. |
| icon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the icon's DOM element. |
| label | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the label's DOM element. |
| removeIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the remove icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-chip | Class name of the root element |
| p-chip-image | Class name of the image element |
| p-chip-icon | Class name of the icon element |
| p-chip-label | Class name of the label element |
| p-chip-remove-icon | Class name of the remove icon element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| chip.border.radius | --p-chip-border-radius | Border radius of root |
| chip.padding.x | --p-chip-padding-x | Padding x of root |
| chip.padding.y | --p-chip-padding-y | Padding y of root |
| chip.gap | --p-chip-gap | Gap of root |
| chip.transition.duration | --p-chip-transition-duration | Transition duration of root |
| chip.background | --p-chip-background | Background of root |
| chip.color | --p-chip-color | Color of root |
| chip.image.width | --p-chip-image-width | Width of image |
| chip.image.height | --p-chip-image-height | Height of image |
| chip.icon.size | --p-chip-icon-size | Size of icon |
| chip.icon.color | --p-chip-icon-color | Color of icon |
| chip.remove.icon.size | --p-chip-remove-icon-size | Size of remove icon |
| chip.remove.icon.focus.ring.width | --p-chip-remove-icon-focus-ring-width | Focus ring width of remove icon |
| chip.remove.icon.focus.ring.style | --p-chip-remove-icon-focus-ring-style | Focus ring style of remove icon |
| chip.remove.icon.focus.ring.color | --p-chip-remove-icon-focus-ring-color | Focus ring color of remove icon |
| chip.remove.icon.focus.ring.offset | --p-chip-remove-icon-focus-ring-offset | Focus ring offset of remove icon |
| chip.remove.icon.focus.ring.shadow | --p-chip-remove-icon-focus-ring-shadow | Focus ring shadow of remove icon |
| chip.remove.icon.color | --p-chip-remove-icon-color | Color of remove icon |

