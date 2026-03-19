# Angular Image Component

Displays an image with preview and tranformation options.

## Accessibility

Screen Reader The preview button is a native button element with an aria-label that refers to the aria.zoomImage property of the locale API by default. When preview is active, dialog role with aria-modal is applied to the overlay image container. Button controls use aria.rotateRight , aria.rotateLeft , aria.zoomIn , aria.zoomOut and aria.close from the locale API as aria-label . ButtonBar Keyboard Support When preview is activated, close button receives the initial focus. Key Function tab Moves focus through button bar. enter Activates the button. space Activates the button. esc Closes the image preview.

## Basic

Image is used as the native img element and supports all properties that the native element has. For multiple image, see Galleria.

```typescript
import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
    template: `
        <div class="flex justify-center">
            <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg" alt="Image" width="250" />
        </div>
    `,
    standalone: true,
    imports: [ImageModule]
})
export class ImageBasicDemo {}
```

## Preview

Preview mode displays a modal layer when the image is clicked that provides transformation options such as rotating and zooming.

```typescript
import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
    template: `
        <div class="flex justify-center">
            <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg" alt="Image" width="250" [preview]="true" />
        </div>
    `,
    standalone: true,
    imports: [ImageModule]
})
export class ImagePreviewDemo {}
```

## previewimagesource-doc

In case that you want to show different image on preview, you can set previewImageSrc attribute. It could come handy when wanted to use smaller image version at first and bigger one on preview.

```typescript
import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
    template: `
        <div class="flex justify-center">
            <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" previewImageSrc="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" alt="Image" width="250" [preview]="true" />
        </div>
    `,
    standalone: true,
    imports: [ImageModule]
})
export class ImagePreviewImageSourceDemo {}
```

## Template

An eye icon is displayed by default when the image is hovered in preview mode. Use the indicator template for custom content.

```typescript
import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
    template: `
        <div class="flex justify-center">
            <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" [preview]="true" alt="Image" width="250">
                <ng-template #indicator>
                    <i class="pi pi-search"></i>
                </ng-template>
                <ng-template #image>
                    <img src="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" alt="image" width="250" />
                </ng-template>
                <ng-template #preview let-style="style" let-previewCallback="previewCallback">
                    <img src="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" alt="image" [style]="style" (click)="previewCallback()" />
                </ng-template>
            </p-image>
        </div>
    `,
    standalone: true,
    imports: [ImageModule]
})
export class ImageTemplateDemo {}
```

## Image

Displays an image with preview and tranformation options. For multiple image, see Galleria.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | Object | undefined | Defines scoped design tokens of the component. |
| unstyled | boolean | undefined | Indicates whether the component should be rendered without styles. |
| pt | PassThrough<I, ImagePassThroughOptions<I>> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | PassThroughOptions | undefined | Used to configure passthrough(pt) options of the component. |
| imageClass | string | - | Style class of the image element. |
| imageStyle | Partial<CSSStyleDeclaration> | - | Inline style of the image element. |
| src | string \| SafeUrl | - | The source path for the main image. |
| srcSet | string \| SafeUrl | - | The srcset definition for the main image. |
| sizes | string | - | The sizes definition for the main image. |
| previewImageSrc | string \| SafeUrl | - | The source path for the preview image. |
| previewImageSrcSet | string \| SafeUrl | - | The srcset definition for the preview image. |
| previewImageSizes | string | - | The sizes definition for the preview image. |
| alt | string | - | Attribute of the preview image element. |
| width | string | - | Attribute of the image element. |
| height | string | - | Attribute of the image element. |
| loading | "lazy" \| "eager" | - | Attribute of the image element. |
| preview | boolean | - | Controls the preview functionality. |
| modalEnterAnimation | string | 'p-modal-enter' | Enter animation class name of modal. |
| modalLeaveAnimation | string | 'p-modal-leave' | Leave animation class name of modal. |
| appendTo | HTMLElement \| ElementRef \| TemplateRef<any> \| "self" \| "body" \| null \| undefined | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| maskMotionOptions | MotionOptions | - | The motion options for the mask. |
| motionOptions | MotionOptions | - | The motion options. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onShow | value: any | Triggered when the preview overlay is shown. |
| onHide | value: any | Triggered when the preview overlay is hidden. |
| onImageError | event: Event | This event is triggered if an error occurs while loading an image file. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| indicator | TemplateRef<void> | Custom indicator template. |
| rotaterighticon | TemplateRef<void> | Custom rotate right icon template. |
| rotatelefticon | TemplateRef<void> | Custom rotate left icon template. |
| zoomouticon | TemplateRef<void> | Custom zoom out icon template. |
| zoominicon | TemplateRef<void> | Custom zoom in icon template. |
| closeicon | TemplateRef<void> | Custom close icon template. |
| preview | TemplateRef<ImagePreviewTemplateContext> | Custom preview template. |
| image | TemplateRef<ImageImageTemplateContext> | Custom image template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the root's DOM element. |
| image | PassThroughOption<HTMLImageElement, I> | Used to pass attributes to the image's DOM element. |
| previewMask | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the preview mask button's DOM element. |
| previewIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the preview icon's DOM element. |
| mask | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the mask's DOM element. |
| toolbar | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the toolbar's DOM element. |
| rotateRightButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the rotate right button's DOM element. |
| rotateLeftButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the rotate left button's DOM element. |
| zoomOutButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the zoom out button's DOM element. |
| zoomInButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the zoom in button's DOM element. |
| closeButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the close button's DOM element. |
| original | PassThroughOption<HTMLImageElement, I> | Used to pass attributes to the original/preview image's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |
| maskMotion | MotionOptions | Used to pass motion options for the mask animation. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-image | Class name of the root element |
| p-image-preview-mask | Class name of the preview mask element |
| p-image-preview-icon | Class name of the preview icon element |
| p-image-mask | Class name of the mask element |
| p-image-toolbar | Class name of the toolbar element |
| p-image-rotate-right-button | Class name of the rotate right button element |
| p-image-rotate-left-button | Class name of the rotate left button element |
| p-image-zoom-out-button | Class name of the zoom out button element |
| p-image-zoom-in-button | Class name of the zoom in button element |
| p-image-close-button | Class name of the close button element |
| p-image-original | Class name of the original element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| image.transition.duration | --p-image-transition-duration | Transition duration of root |
| image.preview.icon.size | --p-image-preview-icon-size | Icon size of preview |
| image.preview.mask.background | --p-image-preview-mask-background | Mask background of preview |
| image.preview.mask.color | --p-image-preview-mask-color | Mask color of preview |
| image.toolbar.position.left | --p-image-toolbar-position-left | Position left of toolbar |
| image.toolbar.position.right | --p-image-toolbar-position-right | Position right of toolbar |
| image.toolbar.position.top | --p-image-toolbar-position-top | Position top of toolbar |
| image.toolbar.position.bottom | --p-image-toolbar-position-bottom | Position bottom of toolbar |
| image.toolbar.blur | --p-image-toolbar-blur | Blur of toolbar |
| image.toolbar.background | --p-image-toolbar-background | Background of toolbar |
| image.toolbar.border.color | --p-image-toolbar-border-color | Border color of toolbar |
| image.toolbar.border.width | --p-image-toolbar-border-width | Border width of toolbar |
| image.toolbar.border.radius | --p-image-toolbar-border-radius | Border radius of toolbar |
| image.toolbar.padding | --p-image-toolbar-padding | Padding of toolbar |
| image.toolbar.gap | --p-image-toolbar-gap | Gap of toolbar |
| image.action.hover.background | --p-image-action-hover-background | Hover background of action |
| image.action.color | --p-image-action-color | Color of action |
| image.action.hover.color | --p-image-action-hover-color | Hover color of action |
| image.action.size | --p-image-action-size | Size of action |
| image.action.icon.size | --p-image-action-icon-size | Icon size of action |
| image.action.border.radius | --p-image-action-border-radius | Border radius of action |
| image.action.focus.ring.width | --p-image-action-focus-ring-width | Focus ring width of action |
| image.action.focus.ring.style | --p-image-action-focus-ring-style | Focus ring style of action |
| image.action.focus.ring.color | --p-image-action-focus-ring-color | Focus ring color of action |
| image.action.focus.ring.offset | --p-image-action-focus-ring-offset | Focus ring offset of action |
| image.action.focus.ring.shadow | --p-image-action-focus-ring-shadow | Focus ring shadow of action |

