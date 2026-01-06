# Angular Avatar Component

Avatar represents people using icons, labels and images.

## accessibility-doc

Screen Reader Avatar does not include any roles and attributes by default. Any attribute is passed to the root element so you may add a role like img along with aria-labelledby or aria-label to describe the component. In case avatars need to be tabbable, tabIndex can be added as well to implement custom key handlers. Keyboard Support Component does not include any interactive elements.

## avatargroup-doc

Grouping is available by wrapping multiple Avatar components inside an AvatarGroup .

## avatarstyle-doc

Following is the list of structural style classes, for theming classes visit theming page.

## badge-doc

A badge can be added to an Avatar with the Badge directive.

## icon-doc

A font icon is displayed as an Avatar with the icon property.

## image-doc

Use the image property to display an image as an Avatar.

## label-doc

A letter Avatar is defined with the label property.

## shape-doc

Avatar comes in two different styles specified with the shape property, square is the default and circle is the alternative.

## size-doc

size property defines the size of the Avatar with large and xlarge as possible values.

## template-doc

Content can easily be customized with the dynamic content instead of using the built-in modes.

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

