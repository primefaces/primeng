# Angular ConfirmDialog Component

ConfirmDialog is backed by a service utilizing Observables to display confirmation windows easily that can be shared by multiple actions on the same component.

## Accessibility

Screen Reader ConfirmDialog component uses alertdialog role along with aria-labelledby referring to the header element however any attribute is passed to the root element so you may use aria-labelledby to override this default behavior. In addition aria-modal is added since focus is kept within the popup. It is recommended to use a trigger component that can be accessed with keyboard such as a button, if not adding tabIndex would be necessary. When confirm function is used and a trigger is passed as a parameter, ConfirmDialog adds aria-expanded state attribute and aria-controls to the trigger so that the relation between the trigger and the popup is defined. If the dialog is controlled with the visible property aria-expanded and aria-controls need to be handled explicitly. Overlay Keyboard Support Key Function tab Moves focus to the next the focusable element within the popup. shift + tab Moves focus to the previous the focusable element within the popup. escape Closes the popup and moves focus to the trigger. Buttons Keyboard Support Key Function enter Triggers the action, closes the popup and moves focus to the trigger. space Triggers the action, closes the popup and moves focus to the trigger.

## Basic

ConfirmDialog is defined using p-confirmdialog tag and an instance of ConfirmationService is required to display it bycalling confirm method.

```typescript
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    template: `
        <div class="flex justify-center gap-2">
            <p-button (click)="confirm1($event)" label="Save" [outlined]="true" />
            <p-button (click)="confirm2($event)" label="Delete" severity="danger" [outlined]="true" />
        </div>
    `,
    standalone: true,
    imports: [ButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmdialogBasicDemo {
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);

    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },
        
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }
}
```

## Headless

Headless mode allows you to customize the entire user interface instead of the default elements.

```typescript
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    template: `
        <div class="flex justify-center">
            <p-button (click)="confirm()" label="Save" />
        </div>
    `,
    standalone: true,
    imports: [ButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmdialogHeadlessDemo {
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
}
```

## Position

The position property of the confirm options is used to display a Dialog at all edges and corners of the screen.

```typescript
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';

@Component({
    template: `
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
    `,
    standalone: true,
    imports: [ButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmdialogPositionDemo {
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
}
```

## Template

Properties of the dialog are defined in two ways, message , icon , header properties can either be defined using confirm method or declaratively on p-confirmDialog ng-template by header , message , icon and footer templates. If these values are unlikely to change then declarative approach would be useful, still properties defined in a ng-template can be overridden with confirm method call. In addition, buttons at footer section can be customized by passing your own UI, important note to make confirmation work with a custom UI is defining a local ng-template variable for the dialog and assign accept()-reject() methods to your own buttons.

```typescript
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    template: `
        <div class="flex justify-center">
            <p-button (click)="confirm()" label="Save" />
        </div>
    `,
    standalone: true,
    imports: [ButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmdialogTemplateDemo {
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
}
```

## Confirm Dialog

ConfirmDialog uses a Dialog UI that is integrated with the Confirmation API.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ConfirmDialogPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| header | InputSignal<string> | ... | Title text of the dialog. |
| icon | InputSignal<string> | ... | Icon to display next to message. |
| message | InputSignal<string> | ... | Message of the confirmation. |
| style | InputSignal<Partial<CSSStyleDeclaration>> | ... | Inline style of the element. |
| styleClass | InputSignal<string> | ... | Class of the element. |
| maskStyleClass | InputSignal<string> | ... | Specify the CSS class(es) for styling the mask element |
| acceptIcon | InputSignal<string> | ... | Icon of the accept button. |
| acceptLabel | InputSignal<string> | ... | Label of the accept button. |
| closeAriaLabel | InputSignal<string> | ... | Defines a string that labels the close button for accessibility. |
| acceptAriaLabel | InputSignal<string> | ... | Defines a string that labels the accept button for accessibility. |
| acceptVisible | InputSignalWithTransform<boolean, unknown> | ... | Visibility of the accept button. |
| rejectIcon | InputSignal<string> | ... | Icon of the reject button. |
| rejectLabel | InputSignal<string> | ... | Label of the reject button. |
| rejectAriaLabel | InputSignal<string> | ... | Defines a string that labels the reject button for accessibility. |
| rejectVisible | InputSignalWithTransform<boolean, unknown> | ... | Visibility of the reject button. |
| acceptButtonStyleClass | InputSignal<string> | ... | Style class of the accept button. |
| rejectButtonStyleClass | InputSignal<string> | ... | Style class of the reject button. |
| closeOnEscape | InputSignalWithTransform<boolean, unknown> | ... | Specifies if pressing escape key should hide the dialog. |
| dismissableMask | InputSignalWithTransform<boolean, unknown> | ... | Specifies if clicking the modal background should hide the dialog. |
| blockScroll | InputSignalWithTransform<boolean, unknown> | ... | Determines whether scrolling behavior should be blocked within the component. |
| rtl | InputSignalWithTransform<boolean, unknown> | ... | When enabled dialog is displayed in RTL direction. |
| closable | InputSignalWithTransform<boolean, unknown> | ... | Adds a close icon to the header to hide the dialog. |
| appendTo | InputSignal<AppendTo> | 'body' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| key | InputSignal<string> | ... | Optional key to match the key of confirm object, necessary to use when component tree has multiple confirm dialogs. |
| autoZIndex | InputSignalWithTransform<boolean, unknown> | ... | Whether to automatically manage layering. |
| baseZIndex | InputSignalWithTransform<number, unknown> | ... | Base zIndex value to use in layering. |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| maskMotionOptions | InputSignal<MotionOptions> | ... | The motion options for the mask. |
| focusTrap | InputSignalWithTransform<boolean, unknown> | ... | When enabled, can only focus on elements inside the confirm dialog. |
| defaultFocus | InputSignal<ConfirmDialogDefaultFocus> | ... | Element to receive the focus when the dialog gets visible. |
| breakpoints | InputSignal<Record<string, string>> | ... | Object literal to define widths per screen size. |
| modal | InputSignalWithTransform<boolean, unknown> | ... | Defines if background should be blocked when dialog is displayed. |
| visible | ModelSignal<boolean> | ... | Current visible state as a boolean. |
| position | InputSignal<DialogPosition> | ... | Allows getting the position of the component. |
| draggable | InputSignalWithTransform<boolean, unknown> | ... | Enables dragging to change the position using header. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onHide | event: ConfirmEventType | Callback to invoke when dialog is hidden. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| header | Signal<TemplateRef<void>> | Custom header template. |
| footer | Signal<TemplateRef<void>> | Custom footer template. |
| rejecticon | Signal<TemplateRef<void>> | Custom reject icon template. |
| accepticon | Signal<TemplateRef<void>> | Custom accept icon template. |
| message | Signal<TemplateRef<ConfirmDialogMessageTemplateContext>> | Custom message template. |
| icon | Signal<TemplateRef<void>> | Custom icon template. |
| headless | Signal<TemplateRef<ConfirmDialogHeadlessTemplateContext>> | Custom headless template. |

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
| motion | MotionOptions | Used to pass options to the motion component/directive. |
| maskMotion | MotionOptions | Used to pass motion options for the mask animation. |

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
| confirmdialog.message.color | --p-confirmdialog-message-color | Color of message |
| confirmdialog.message.font.weight | --p-confirmdialog-message-font-weight | Font weight of message |
| confirmdialog.message.font.size | --p-confirmdialog-message-font-size | Font size of message |

