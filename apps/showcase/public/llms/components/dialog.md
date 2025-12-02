# Angular Dialog Component

Dialog is a container to display content in an overlay window.

## Accessibility

Screen Reader Dialog component uses dialog role along with aria-labelledby referring to the header element however any attribute is passed to the root element so you may use aria-labelledby to override this default behavior. In addition aria-modal is added since focus is kept within the popup. It is recommended to use a trigger component that can be accessed with keyboard such as a button, if not adding tabIndex would be necessary. Trigger element also requires aria-expanded and aria-controls to be handled explicitly. Close element is a button with an aria-label that refers to the aria.close property of the locale API by default, you may use closeButtonProps to customize the element and override the default aria-label . Maximize element is a button with an aria-label that refers to the aria.maximizeLabel and aria.minimizeLabel property of the locale API. It cannot be customized using the maximizeButtonProps . Overlay Keyboard Support Key Function tab Moves focus to the next the focusable element within the dialog. shift + tab Moves focus to the previous the focusable element within the dialog. escape Closes the dialog if closeOnEscape is true. Close Button Keyboard Support Key Function enter Closes the dialog. space Closes the dialog.

## Basic

```html
<p-button (click)="showDialog()" label="Show" />
<p-dialog header="Edit Profile" [modal]="true" [(visible)]="visible" [style]="{ width: '25rem' }">
    <span class="p-text-secondary block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Username</label>
        <input pInputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Email</label>
        <input pInputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
        <p-button label="Cancel" severity="secondary" (click)="visible = false" />
        <p-button label="Save" (click)="visible = false" />
    </div>
</p-dialog>
```

## Headless

Headless mode allows you to customize the entire user interface instead of the default elements.

```html
<p-button (click)="showDialog()" icon="pi pi-user" label="Login" />
<p-dialog maskStyleClass="backdrop-blur-sm" [(visible)]="visible" styleClass="!border-0 !bg-transparent">
    <ng-template #headless>
        <div
            class="flex flex-col px-8 py-8 gap-6 rounded-2xl"
            style="border-radius: 12px; background-image: radial-gradient(circle at left top, var(--p-primary-400), var(--p-primary-700))"
        >
            <svg
                width="31"
                height="33"
                viewBox="0 0 31 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="block mx-auto"
            >
                <path
                    d="..."
                    fill="var(--p-primary-color)"
                />
            </svg>
            <div class="inline-flex flex-col gap-2">
                <label for="username" class="text-primary-50 font-semibold">Username</label>
                <input pInputText id="username" class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80" />
            </div>
            <div class="inline-flex flex-col gap-2">
                <label for="password" class="text-primary-50 font-semibold">Password</label>
                <input
                    pInputText
                    id="password"
                    class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80"
                    type="password"
                />
            </div>
            <div class="flex items-center gap-4">
                <p-button
                    label="Cancel"
                    (click)="closeDialog()"
                    [text]="true"
                    styleClass="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10"
                    class="w-full"
                />
                <p-button
                    label="Sign-In"
                    (click)="closeDialog()"
                    [text]="true"
                    styleClass="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10"
                    class="w-full"
                />
            </div>
        </div>
    </ng-template>
</p-dialog>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'dialog-headless-demo',
    templateUrl: './dialog-headless-demo.html',
    standalone: true,
    imports: [Dialog, ButtonModule, InputTextModule]
})
export class DialogHeadlessDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    closeDialog() {
        this.visible = false;
    }
}
```
</details>

## Long Content

Dialog automatically displays a scroller when content exceeds viewport.

```html
<p-button (click)="showDialog()" label="Show" />
<p-dialog header="Header" [modal]="true" [(visible)]="visible" [style]="{ width: '50rem' }" [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }">
    <p class="mb-8">
        Lorem ipsum dolor sit amet...
    </p>
    <p class="mb-8">
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
    </p>
    <p class="mb-8">
        At vero eos et accusamus et iusto odio dignissimos...
    </p>
    <p class="mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
    </p>
    <p class="mb-8">
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
    </p>
    <p>
        At vero eos et accusamus et iusto odio dignissimos...
    </p>
</p-dialog>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'dialog-long-content-demo',
    templateUrl: './dialog-long-content-demo.html',
    standalone: true,
    imports: [Dialog, ButtonModule]
})
export class DialogLongContentDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
```
</details>

## Maximizable

Setting maximizable property to true enables the full screen mode.

```html
<p-button (click)="showDialog()" label="Show" />
<p-dialog header="Header" [modal]="true" [(visible)]="visible" [style]="{ width: '50rem' }" [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }" [maximizable]="true">
    <p>
        Lorem ipsum dolor sit amet...
    </p>
</p-dialog>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
    selector: 'dialog-maximizable-demo',
    templateUrl: './dialog-maximizable-demo.html',
    standalone: true,
    imports: [Dialog, ButtonModule]
})
export class DialogMaximizableDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
```
</details>

## modaldoc

Mask layer behind the Dialog can be turned on by setting the modal property to true .

```html
<p-button (click)="showDialog()" icon="pi pi-external-link" label="Show"></p-button>
<p-dialog header="Header" [(visible)]="visible" [modal]="true" [style]="{ width: '50vw' }" [draggable]="false" [resizable]="false">
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</p-dialog>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'dialog-modal-demo',
    templateUrl: './dialog-modal-demo.html'
})
export class DialogModalDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
```
</details>

## overlaysinsidedoc

When dialog includes other components with overlays such as dropdown, the overlay part cannot exceed dialog boundaries due to overflow. In order to solve this, you can either append the overlay to the body by using appendTo property or allow overflow in dialog.

```html
<p-button (click)="showDialog()" icon="pi pi-external-link" label="Show"></p-button>
<p-dialog header="Header" [(visible)]="visible" [style]="{ width: '50vw' }">
    <div class="flex py-2 justify-center">
        <p-select appendTo="body" [options]="cities" [(ngModel)]="selectedCity" placeholder="Select a City" optionLabel="name"></p-select>
    </div>
</p-dialog>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dialog-overlays-inside-demo',
    templateUrl: './dialog-overlays-inside-demo.html'
})
export class DialogOverlaysInsideDemo implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

    visible: boolean = false;

    ngOnInit() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }

    showDialog() {
        this.visible = true;
    }
}
```
</details>

## Position

The position property is used to display a Dialog at all edges and corners of the screen.

```html
<div class="flex flex-wrap justify-center gap-2 mb-2">
    <p-button (click)="showDialog('left')" icon="pi pi-arrow-right" label="Left" severity="secondary" styleClass="min-w-40" />
    <p-button (click)="showDialog('right')" icon="pi pi-arrow-left" label="Right" severity="secondary" styleClass="min-w-40" />
</div>
<div class="flex flex-wrap justify-center gap-2 mb-2">
    <p-button (click)="showDialog('topleft')" icon="pi pi-arrow-down-right" label="TopLeft" severity="secondary" styleClass="min-w-40" />
    <p-button (click)="showDialog('top')" icon="pi pi-arrow-down" label="Top" severity="secondary" styleClass="min-w-40" />
    <p-button (click)="showDialog('topright')" icon="pi pi-arrow-down-left" label="TopRight" severity="secondary" styleClass="min-w-40" />
</div>
<div class="flex flex-wrap justify-center gap-2">
    <p-button (click)="showDialog('bottomleft')" icon="pi pi-arrow-up-right" label="BottomLeft" severity="secondary" styleClass="min-w-40" />
    <p-button (click)="showDialog('bottom')" icon="pi pi-arrow-up" label="Bottom" severity="secondary" styleClass="min-w-40" />
    <p-button (click)="showDialog('bottomright')" icon="pi pi-arrow-up-left" label="BottomRight" severity="secondary" styleClass="min-w-40" />
</div>
<p-dialog header="Edit Profile" [modal]="true" [(visible)]="visible" [position]="position" [style]="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Username</label>
        <input pInputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Email</label>
        <input pInputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
        <p-button label="Cancel" severity="secondary" (click)="visible = false" />
        <p-button label="Save" (click)="visible = false" />
    </div>
</p-dialog>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'dialog-position-demo',
    templateUrl: './dialog-position-demo.html',
    standalone: true,
    imports: [Dialog, ButtonModule, InputTextModule]
})
export class DialogPositionDemo {
    visible: boolean = false;

    position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'center';

    showDialog(position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright') {
        this.position = position;
        this.visible = true;
    }
}
```
</details>

## Responsive

Dialog width can be adjusted per screen size with the breakpoints option where a key defines the max-width for the breakpoint and value for the corresponding width. When no breakpoint matches width defined in style property is used.

```html
<p-button (click)="showDialog()" label="Show" />
<p-dialog header="Header" [(visible)]="visible" [modal]="true" [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }" [style]="{ width: '50vw' }" [draggable]="false" [resizable]="false">
    <p>
        Lorem ipsum dolor sit amet...
    </p>
</p-dialog>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'dialog-responsive-demo',
    templateUrl: './dialog-responsive-demo.html',
    standalone: true,
    imports: [Dialog, ButtonModule]
})
export class DialogResponsiveDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Dialog can be customized using header and footer templates.

```html
<p-button (click)="showDialog()" label="Show" />
<p-dialog [(visible)]="visible" [modal]="true" [style]="{ width: '25rem' }">
    <ng-template #header>
        <div class="inline-flex items-center justify-center gap-2">
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
            <span class="font-bold whitespace-nowrap">Amy Elsner</span>
        </div>
    </ng-template>
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Username</label>
        <input pInputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-2">
        <label for="email" class="font-semibold w-24">Email</label>
        <input pInputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <ng-template #footer>
        <p-button label="Cancel" [text]="true" severity="secondary" (click)="visible = false" />
        <p-button label="Save" [outlined]="true" severity="secondary" (click)="visible = false" />
    </ng-template>
</p-dialog>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'dialog-template-demo',
    templateUrl: './dialog-template-demo.html',
    standalone: true,
    imports: [Dialog, ButtonModule, InputTextModule, AvatarModule]
})
export class DialogTemplateDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
```
</details>

## Without Modal

Mask layer behind the Dialog is configured with the modal property. By default, no modal layer is added.

```html
<p-button (click)="showDialog()" label="Show" />
<p-dialog header="Edit Profile" [(visible)]="visible" [style]="{ width: '25rem' }">
    <span class="p-text-secondary block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Username</label>
        <input pInputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Email</label>
        <input pInputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
        <p-button label="Cancel" severity="secondary" (click)="visible = false" />
        <p-button label="Save" (click)="visible = false" />
    </div>
</p-dialog>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'dialog-without-modal-demo',
    templateUrl: './dialog-without-modal-demo.html',
    standalone: true,
    imports: [Dialog, ButtonModule, InputTextModule]
})
export class DialogWithoutModalDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
```
</details>

## Dialog

Dialog is a container to display content in an overlay window.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<DialogPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| header | string | - | Title text of the dialog. |
| draggable | boolean | true | Enables dragging to change the position using header. |
| resizable | boolean | true | Enables resizing of the content. |
| contentStyle | any | - | Style of the content section. |
| contentStyleClass | string | - | Style class of the content. |
| modal | boolean | false | Defines if background should be blocked when dialog is displayed. |
| closeOnEscape | boolean | true | Specifies if pressing escape key should hide the dialog. |
| dismissableMask | boolean | false | Specifies if clicking the modal background should hide the dialog. |
| rtl | boolean | false | When enabled dialog is displayed in RTL direction. |
| closable | boolean | true | Adds a close icon to the header to hide the dialog. |
| breakpoints | any | - | Object literal to define widths per screen size. |
| styleClass | string | - | Style class of the component. |
| maskStyleClass | string | - | Style class of the mask. |
| maskStyle | { [klass: string]: any } | - | Style of the mask. |
| showHeader | boolean | true | Whether to show the header or not. |
| blockScroll | boolean | false | Whether background scroll should be blocked when dialog is visible. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| minX | number | 0 | Minimum value for the left coordinate of dialog in dragging. |
| minY | number | 0 | Minimum value for the top coordinate of dialog in dragging. |
| focusOnShow | boolean | true | When enabled, first focusable element receives focus on show. |
| maximizable | boolean | false | Whether the dialog can be displayed full screen. |
| keepInViewport | boolean | true | Keeps dialog in the viewport. |
| focusTrap | boolean | true | When enabled, can only focus on elements inside the dialog. |
| transitionOptions | string | 150ms cubic-bezier(0, 0, 0.2, 1) | Transition options of the animation. **(Deprecated)** |
| maskMotionOptions | InputSignal<MotionOptions> | ... | The motion options for the mask. |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| closeIcon | string | - | Name of the close icon. |
| closeAriaLabel | string | - | Defines a string that labels the close button for accessibility. |
| closeTabindex | string | 0 | Index of the close button in tabbing order. |
| minimizeIcon | string | - | Name of the minimize icon. |
| maximizeIcon | string | - | Name of the maximize icon. |
| closeButtonProps | ButtonProps | ... | Used to pass all properties of the ButtonProps to the Button component. |
| maximizeButtonProps | ButtonProps | ... | Used to pass all properties of the ButtonProps to the Button component. |
| visible | boolean | - | Specifies the visibility of the dialog. |
| style | any | - | Inline style of the component. |
| position | "right" \| "left" \| "top" \| "bottom" \| "center" \| "topleft" \| "bottomleft" \| "topright" \| "bottomright" | - | Position of the dialog. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| role | value: undefined | Role attribute of html element. |
| onShow | value: any | Callback to invoke when dialog is shown. |
| onHide | value: any | Callback to invoke when dialog is hidden. |
| visibleChange | value: boolean | This EventEmitter is used to notify changes in the visibility state of a component. |
| onResizeInit | event: MouseEvent | Callback to invoke when dialog resizing is initiated. |
| onResizeEnd | event: MouseEvent | Callback to invoke when dialog resizing is completed. |
| onDragEnd | event: DragEvent | Callback to invoke when dialog dragging is completed. |
| onMaximize | value: any | Callback to invoke when dialog maximized or unmaximized. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| header | TemplateRef<void> | Header template. |
| content | TemplateRef<void> | Content template. |
| footer | TemplateRef<void> | Footer template. |
| closeicon | TemplateRef<void> | Close icon template. |
| maximizeicon | TemplateRef<void> | Maximize icon template. |
| minimizeicon | TemplateRef<void> | Minimize icon template. |
| headless | TemplateRef<void> | Headless template. |
| _header | TemplateRef<void> | Custom header template. |
| _content | TemplateRef<void> | Custom content template. |
| _footer | TemplateRef<void> | Custom footer template. |
| _closeicon | TemplateRef<void> | Custom close icon template. |
| _maximizeicon | TemplateRef<void> | Custom maximize icon template. |
| _minimizeicon | TemplateRef<void> | Custom minimize icon template. |
| _headless | TemplateRef<void> | Custom headless template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| mask | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the mask's DOM element. |
| resizeHandle | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the resize handle's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| title | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the title's DOM element. |
| headerActions | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header actions' DOM element. |
| pcMaximizeButton | ButtonPassThrough | Used to pass attributes to the maximize Button component. |
| pcCloseButton | ButtonPassThrough | Used to pass attributes to the close Button component. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-dialog-mask | Class name of the mask element |
| p-dialog | Class name of the root element |
| p-dialog-header | Class name of the header element |
| p-dialog-title | Class name of the title element |
| p-dialog-header-actions | Class name of the header actions element |
| p-dialog-maximize-button | Class name of the maximize button element |
| p-dialog-close-button | Class name of the close button element |
| p-dialog-content | Class name of the content element |
| p-dialog-footer | Class name of the footer element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| dialog.background | --p-dialog-background | Background of root |
| dialog.border.color | --p-dialog-border-color | Border color of root |
| dialog.color | --p-dialog-color | Color of root |
| dialog.border.radius | --p-dialog-border-radius | Border radius of root |
| dialog.shadow | --p-dialog-shadow | Shadow of root |
| dialog.header.padding | --p-dialog-header-padding | Padding of header |
| dialog.header.gap | --p-dialog-header-gap | Gap of header |
| dialog.title.font.size | --p-dialog-title-font-size | Font size of title |
| dialog.title.font.weight | --p-dialog-title-font-weight | Font weight of title |
| dialog.content.padding | --p-dialog-content-padding | Padding of content |
| dialog.footer.padding | --p-dialog-footer-padding | Padding of footer |
| dialog.footer.gap | --p-dialog-footer-gap | Gap of footer |

