# Angular Skeleton Component

Skeleton is a placeholder to display instead of the actual content.

## accessibility-doc

Screen Reader Skeleton uses aria-hidden as "true" so that it gets ignored by screen readers, any valid attribute is passed to the root element so you may customize it further if required. If multiple skeletons are grouped inside a container, you may use aria-busy on the container element as well to indicate the loading process.

## card-doc

Sample Card implementation using different Skeleton components and Tailwind CSS utilities.

## datatable-doc

Sample DataTable implementation using different Skeleton components and Tailwind CSS utilities.

## list-doc

Sample List implementation using different Skeleton components and Tailwind CSS utilities.

## shapes-doc

Various shapes and sizes can be created using styling properties like shape , width , height , borderRadius and class .

## Skeleton

Skeleton is a placeholder to display instead of the actual content.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<SkeletonPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| styleClass | string | - | Class of the element. **(Deprecated)** |
| shape | string | rectangle | Shape of the element. |
| borderRadius | string | - | Border radius of the element, defaults to value from theme. |
| size | string | - | Size of the skeleton. |
| width | string | 100% | Width of the element. |
| height | string | 1rem | Height of the element. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-skeleton | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| skeleton.border.radius | --p-skeleton-border-radius | Border radius of root |
| skeleton.background | --p-skeleton-background | Background of root |
| skeleton.animation.background | --p-skeleton-animation-background | Animation background of root |

