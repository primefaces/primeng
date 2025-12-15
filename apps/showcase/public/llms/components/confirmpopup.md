# Angular ConfirmPopup Component

ConfirmPopup displays a confirmation overlay displayed relatively to its target.

## Accessibility

Screen Reader ConfirmPopup component uses alertdialog role and since any attribute is passed to the root element you may define attributes like aria-label or aria-labelledby to describe the popup contents. In addition aria-modal is added since focus is kept within the popup. It is recommended to use a trigger component that can be accessed with keyboard such as a button, if not adding tabIndex would be necessary. ConfirmPopup adds aria-expanded state attribute and aria-controls to the trigger so that the relation between the trigger and the popup is defined. Overlay Keyboard Support When the popup gets opened, the first focusable element receives the focus and this can be customized by adding autofocus to an element within the popup. Key Function tab Moves focus to the next the focusable element within the popup. shift + tab Moves focus to the previous the focusable element within the popup. escape Closes the popup and moves focus to the trigger. Buttons Keyboard Support Key Function enter Triggers the action, closes the popup and moves focus to the trigger. space Triggers the action, closes the popup and moves focus to the trigger.

## Basic

ConfirmPopup is defined using p-confirmPopup tag and an instance of ConfirmationService is required to display it bycalling confirm method.

```html
<p-toast />
<p-confirmpopup />
<p-button (onClick)="confirm1($event)" label="Save" [outlined]="true" />
<p-button (onClick)="confirm2($event)" label="Delete" severity="danger" [outlined]="true" />
```

## Headless

Headless mode allows you to customize the entire user interface instead of the default elements.

```html
<p-toast />
<p-confirmpopup #cp>
    <ng-template #headless let-message>
        <div class="rounded p-4">
            <span>{{ message.message }}</span>
            <div class="flex items-center gap-2 mt-4">
                <p-button (onClick)="cp.onAccept()" label="Save" size="small" [autofocus]="true" />
                <p-button (onClick)="cp.onReject()" label="Cancel" [text]="true" size="small" severity="secondary" />
            </div>
        </div>
    </ng-template>
</p-confirmpopup>
<p-button (onClick)="confirm($event)" label="Save" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'confirm-popup-headless-demo',
    templateUrl: './confirm-popup-headless-demo.html',
    standalone: true,
    imports: [ConfirmPopupModule, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmPopupHeadlessDemo {
   constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Save your current process?',
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

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Content section can be customized using content template.

```html
<p-toast />
<p-confirmpopup>
    <ng-template #content let-message>
        <div
            class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0"
        >
            <i [class]="message.icon" class="!text-6xl text-primary-500"></i>
            <p>{{ message.message }}</p>
        </div>
    </ng-template>
</p-confirmpopup>
<p-button (click)="confirm($event)" label="Save" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'confirm-popup-template-demo',
    templateUrl: './confirm-popup-template-demo.html',
    standalone: true,
    imports: [ConfirmPopupModule, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmPopupTemplateDemo {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}


    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Please confirm to proceed moving forward.',
            icon: 'pi pi-exclamation-circle',
            rejectButtonProps: {
                icon: 'pi pi-times',
                label: 'Cancel',
                outlined: true,
            },
            acceptButtonProps: {
                icon: 'pi pi-check',
                label: 'Confirm',
            },
            accept: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'You have accepted',
                    life: 3000,
                });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                    life: 3000,
                });
            },
        });
    }
}
```
</details>

## Confirm Popup

ConfirmPopup displays a confirmation overlay displayed relatively to its target.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ConfirmPopupPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| key | string | - | Optional key to match the key of confirm object, necessary to use when component tree has multiple confirm dialogs. |
| defaultFocus | string | accept | Element to receive the focus when the popup gets visible, valid values are "accept", "reject", and "none". |
| showTransitionOptions | string | .12s cubic-bezier(0, 0, 0.2, 1) | Transition options of the show animation. **(Deprecated)** |
| hideTransitionOptions | string | .1s linear | Transition options of the hide animation. **(Deprecated)** |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| style | { [klass: string]: any } | - | Inline style of the component. |
| styleClass | string | - | Style class of the component. |
| visible | InputSignal<boolean> | ... | Defines if the component is visible. |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| appendTo | InputSignal<any> | 'body' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | TemplateRef<ConfirmPopupContentTemplateContext> | Custom content template. |
| accepticon | TemplateRef<void> | Custom accept icon template. |
| rejecticon | TemplateRef<void> | Custom reject icon template. |
| headless | TemplateRef<ConfirmPopupHeadlessTemplateContext> | Custom headless template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| icon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the icon's DOM element. |
| message | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the message's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |
| pcRejectButton | ButtonPassThrough | Used to pass attributes to the reject Button component. |
| pcAcceptButton | ButtonPassThrough | Used to pass attributes to the accept Button component. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-confirmpopup | Class name of the root element |
| p-confirmpopup-content | Class name of the content element |
| p-confirmpopup-icon | Class name of the icon element |
| p-confirmpopup-message | Class name of the message element |
| p-confirmpopup-footer | Class name of the footer element |
| p-confirmpopup-reject-button | Class name of the reject button element |
| p-confirmpopup-accept-button | Class name of the accept button element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| confirmpopup.background | --p-confirmpopup-background | Background of root |
| confirmpopup.border.color | --p-confirmpopup-border-color | Border color of root |
| confirmpopup.color | --p-confirmpopup-color | Color of root |
| confirmpopup.border.radius | --p-confirmpopup-border-radius | Border radius of root |
| confirmpopup.shadow | --p-confirmpopup-shadow | Shadow of root |
| confirmpopup.gutter | --p-confirmpopup-gutter | Gutter of root |
| confirmpopup.arrow.offset | --p-confirmpopup-arrow-offset | Arrow offset of root |
| confirmpopup.content.padding | --p-confirmpopup-content-padding | Padding of content |
| confirmpopup.content.gap | --p-confirmpopup-content-gap | Gap of content |
| confirmpopup.icon.size | --p-confirmpopup-icon-size | Size of icon |
| confirmpopup.icon.color | --p-confirmpopup-icon-color | Color of icon |
| confirmpopup.footer.gap | --p-confirmpopup-footer-gap | Gap of footer |
| confirmpopup.footer.padding | --p-confirmpopup-footer-padding | Padding of footer |

