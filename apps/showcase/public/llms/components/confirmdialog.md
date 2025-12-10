# Angular ConfirmDialog Component

ConfirmDialog is backed by a service utilizing Observables to display confirmation windows easily that can be shared by multiple actions on the same component.

## Accessibility

Screen Reader ConfirmDialog component uses alertdialog role along with aria-labelledby referring to the header element however any attribute is passed to the root element so you may use aria-labelledby to override this default behavior. In addition aria-modal is added since focus is kept within the popup. It is recommended to use a trigger component that can be accessed with keyboard such as a button, if not adding tabIndex would be necessary. When confirm function is used and a trigger is passed as a parameter, ConfirmDialog adds aria-expanded state attribute and aria-controls to the trigger so that the relation between the trigger and the popup is defined. If the dialog is controlled with the visible property aria-expanded and aria-controls need to be handled explicitly. Overlay Keyboard Support Key Function tab Moves focus to the next the focusable element within the popup. shift + tab Moves focus to the previous the focusable element within the popup. escape Closes the popup and moves focus to the trigger. Buttons Keyboard Support Key Function enter Triggers the action, closes the popup and moves focus to the trigger. space Triggers the action, closes the popup and moves focus to the trigger.

## Basic

ConfirmDialog is defined using p-confirmdialog tag and an instance of ConfirmationService is required to display it bycalling confirm method.

```html
<p-toast />
<p-confirmdialog />
<p-button (click)="confirm1($event)" label="Save" [outlined]="true" />
<p-button (click)="confirm2($event)" label="Delete" severity="danger" [outlined]="true" />
```

## Headless

Headless mode allows you to customize the entire user interface instead of the default elements.

```html
<p-toast />
<p-confirmdialog #cd>
    <ng-template #headless let-message let-onAccept="onAccept" let-onReject="onReject">
        @if (message) {
            <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
                <div class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                    <i class="pi pi-question !text-5xl"></i>
                </div>
                <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
                <p class="mb-0">{{ message.message }}</p>
                <div class="flex items-center gap-2 mt-6">
                    <p-button label="Save" (onClick)="onAccept()" styleClass="w-32"></p-button>
                    <p-button label="Cancel" [outlined]="true" (onClick)="onReject()" styleClass="w-32"></p-button>
                </div>
            </div>
        }
    </ng-template>
</p-confirmdialog>
<p-button (click)="confirm()" label="Save" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'confirm-dialog-headless-demo',
    templateUrl: './confirm-dialog-headless-demo.html',
    standalone: true,
    imports: [ConfirmDialog, ButtonModule, ToastModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmDialogHeadlessDemo {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm() {
        this.confirmationService.confirm({
            header: 'Are you sure?',
            message: 'Please confirm to proceed.',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
            },
        });
    }
}
```
</details>

## Position

The position property of the confirm options is used to display a Dialog at all edges and corners of the screen.

```html
<p-toast />
<p-confirmdialog key="positionDialog" [position]="position" />
<div class="flex flex-wrap justify-center gap-2 mb-4">
    <p-button (click)="confirmPosition('left')" icon="pi pi-arrow-right" label="Left" severity="secondary" styleClass="min-w-40" />
    <p-button (click)="confirmPosition('right')" icon="pi pi-arrow-left" label="Right" severity="secondary" styleClass="min-w-40" />
</div>
<div class="flex flex-wrap justify-center gap-2 mb-4">
    <p-button (click)="confirmPosition('topleft')" icon="pi pi-arrow-down" label="TopLeft" severity="secondary" styleClass="min-w-40" />
    <p-button (click)="confirmPosition('top')" icon="pi pi-arrow-down" label="Top" severity="secondary" styleClass="min-w-40" />
    <p-button (click)="confirmPosition('topright')" icon="pi pi-arrow-down" label="TopRight" severity="secondary" styleClass="min-w-40" />
</div>
<div class="flex flex-wrap justify-center gap-2">
    <p-button (click)="confirmPosition('bottomleft')" icon="pi pi-arrow-up" label="BottomLeft" severity="secondary" styleClass="min-w-40" />
    <p-button (click)="confirmPosition('bottom')" icon="pi pi-arrow-up" label="Bottom" severity="secondary" styleClass="min-w-40" />
    <p-button (click)="confirmPosition('bottomright')" icon="pi pi-arrow-up" label="BottomRight" severity="secondary" styleClass="min-w-40" />
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'confirm-dialog-position-demo',
    templateUrl: './confirm-dialog-position-demo.html',
    standalone: true,
    imports: [ConfirmDialog, ButtonModule, ToastModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmDialogPositionDemo {
    position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'center';

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirmPosition(position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright') {
        this.position = position;

        this.confirmationService.confirm({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            rejectButtonStyleClass: 'p-button-text',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                text: true,
            },
            acceptButtonProps: {
                label: 'Save',
                text: true,
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Request submitted' });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'Process incomplete',
                    life: 3000,
                });
            },
            key: 'positionDialog',
        });
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Properties of the dialog are defined in two ways, message , icon , header properties can either be defined using confirm method or declaratively on p-confirmDialog ng-template by header , message , icon and footer templates. If these values are unlikely to change then declarative approach would be useful, still properties defined in a ng-template can be overridden with confirm method call. In addition, buttons at footer section can be customized by passing your own UI, important note to make confirmation work with a custom UI is defining a local ng-template variable for the dialog and assign accept()-reject() methods to your own buttons.

```html
<p-toast />
<p-confirmdialog>
    <ng-template #message let-message>
        @if (message) {
            <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
                <i [ngClass]="message.icon" class="!text-6xl text-primary-500"></i>
                <p>{{ message.message }}</p>
            </div>
        }
    </ng-template>
</p-confirmdialog>
<p-button (click)="confirm()" label="Save" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'confirm-dialog-template-demo',
    templateUrl: './confirm-dialog-template-demo.html',
    standalone: true,
    imports: [ConfirmDialog, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmDialogTemplateDemo {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm() {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Please confirm to proceed moving forward.',
            icon: 'pi pi-exclamation-circle',
            rejectButtonProps: {
                label: 'Cancel',
                icon: 'pi pi-times',
                variant: 'outlined',
                size: 'small'
            },
            acceptButtonProps: {
                label: 'Save',
                icon: 'pi pi-check',
                size: 'small'
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

}
```
</details>

## Confirm Dialog

ConfirmDialog uses a Dialog UI that is integrated with the Confirmation API.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ConfirmDialogPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| header | string | - | Title text of the dialog. |
| icon | string | - | Icon to display next to message. |
| message | string | - | Message of the confirmation. |
| style | { [klass: string]: any } | - | Inline style of the element. |
| styleClass | string | - | Class of the element. |
| maskStyleClass | string | - | Specify the CSS class(es) for styling the mask element |
| acceptIcon | string | - | Icon of the accept button. |
| acceptLabel | string | - | Label of the accept button. |
| closeAriaLabel | string | - | Defines a string that labels the close button for accessibility. |
| acceptAriaLabel | string | - | Defines a string that labels the accept button for accessibility. |
| acceptVisible | boolean | true | Visibility of the accept button. |
| rejectIcon | string | - | Icon of the reject button. |
| rejectLabel | string | - | Label of the reject button. |
| rejectAriaLabel | string | - | Defines a string that labels the reject button for accessibility. |
| rejectVisible | boolean | true | Visibility of the reject button. |
| acceptButtonStyleClass | string | - | Style class of the accept button. |
| rejectButtonStyleClass | string | - | Style class of the reject button. |
| closeOnEscape | boolean | true | Specifies if pressing escape key should hide the dialog. |
| dismissableMask | boolean | false | Specifies if clicking the modal background should hide the dialog. |
| blockScroll | boolean | true | Determines whether scrolling behavior should be blocked within the component. |
| rtl | boolean | false | When enabled dialog is displayed in RTL direction. |
| closable | boolean | true | Adds a close icon to the header to hide the dialog. |
| appendTo | InputSignal<any> | 'body' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| key | string | - | Optional key to match the key of confirm object, necessary to use when component tree has multiple confirm dialogs. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| transitionOptions | string | 150ms cubic-bezier(0, 0, 0.2, 1) | Transition options of the animation. |
| focusTrap | boolean | true | When enabled, can only focus on elements inside the confirm dialog. |
| defaultFocus | "accept" \| "reject" \| "none" \| "close" | accept | Element to receive the focus when the dialog gets visible. |
| breakpoints | any | - | Object literal to define widths per screen size. |
| modal | boolean | true | Defines if background should be blocked when dialog is displayed. |
| visible | any | - | Current visible state as a boolean. |
| position | "right" \| "left" \| "top" \| "bottom" \| "center" \| "topleft" \| "bottomleft" \| "topright" \| "bottomright" | center | Allows getting the position of the component. |
| draggable | boolean | true | Enables dragging to change the position using header. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onHide | event: ConfirmEventType | Callback to invoke when dialog is hidden. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| header | TemplateRef<void> | Custom header template. |
| footer | TemplateRef<void> | Custom footer template. |
| rejecticon | TemplateRef<void> | Custom reject icon template. |
| accepticon | TemplateRef<void> | Custom accept icon template. |
| message | TemplateRef<ConfirmDialogMessageTemplateContext> | Custom message template. |
| icon | TemplateRef<void> | Custom icon template. |
| headless | TemplateRef<ConfirmDialogHeadlessTemplateContext> | Custom headless template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | DialogPassThrough | Used to pass attributes to the root's DOM element. |
| mask | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the mask's DOM element. |
| icon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the icon's DOM element. |
| message | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the message's DOM element. |
| resizeHandle | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the resize handle's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| title | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the title's DOM element. |
| headerActions | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header actions' DOM element. |
| pcCloseButton | ButtonPassThrough | Used to pass attributes to the close Button component. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |
| pcAcceptButton | ButtonPassThrough | Used to pass attributes to the accept Button component. |
| pcRejectButton | ButtonPassThrough | Used to pass attributes to the reject Button component. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-confirmdialog | Class name of the root element |
| p-confirmdialog-icon | Class name of the icon element |
| p-confirmdialog-message | Class name of the message element |
| p-confirmdialog-reject-button | Class name of the reject button element |
| p-confirmdialog-accept-button | Class name of the accept button element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| confirmdialog.icon.size | --p-confirmdialog-icon-size | Size of icon |
| confirmdialog.icon.color | --p-confirmdialog-icon-color | Color of icon |
| confirmdialog.content.gap | --p-confirmdialog-content-gap | Gap of content |

