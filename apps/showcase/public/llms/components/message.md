# Angular Message Component

Message component is used to display inline messages.

## Accessibility

Screen Reader Message component uses alert role that implicitly defines aria-live as "assertive" and aria-atomic as "true". Since any attribute is passed to the root element, attributes like aria-labelledby and aria-label can optionally be used as well. Close element is a button with an aria-label that refers to the aria.close property of the locale API by default. Close Button Keyboard Support Key Function enter Closes the message. space Closes the message.

## Basic

Message component requires a content to display.

```html
<p-message>Message Content</p-message>
```

## Closable

Enable closable option to display an icon to remove a message.

```html
<p-message closable>Closable Message</p-message>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
    selector: 'message-closable-demo',
    templateUrl: './message-closable-demo.html',
    standalone: true,
    imports: [Message]
})
export class MessageClosableDemo {}
```
</details>

## Dynamic

Multiple messages can be displayed using the standard for block.

```html
<div class="flex gap-2">
    <p-button label="Show" (onClick)="addMessages()" />
    <p-button label="Clear" severity="secondary" (onClick)="clearMessages()" />
</div>
<div class="flex flex-col">
    @for (message of messages(); track message.severity; let first = $first) {
        <p-message [severity]="message.severity" [text]="message.content" [ngClass]="{ 'mt-4': !first }" />
    }
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, signal } from '@angular/core';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'message-dynamic-demo',
    templateUrl: './message-dynamic-demo.html',
    standalone: true,
    imports: [Message, ButtonModule]
})
export class MessageDynamicDemo {
    messages = signal<any[]>([]);

    addMessages() {
        this.messages.set([
            { severity: 'info', content: 'Dynamic Info Message' },
            { severity: 'success', content: 'Dynamic Success Message' },
            { severity: 'warn', content: 'Dynamic Warn Message' },
        ]);
    }

    clearMessages() {
        this.messages.set([]);
    }
}
```
</details>

## formdoc

Validation errors in a form are displayed with the error severity.

```html
<div class="flex flex-col gap-4">
    <p-message severity="error" icon="pi pi-times-circle" styleClass="mb-2">Validation Failed</p-message>
    <div class="flex flex-col gap-1">
        <input pInputText placeholder="Username" [(ngModel)]="username" aria-label="username" [invalid]="!username" />
        @if (!username) {
            <p-message severity="error" variant="simple" size="small">Username is required</p-message>
        }
    </div>
    <div class="flex flex-col gap-1">
        <p-inputmask mask="(999) 999-9999" [(ngModel)]="phone" placeholder="Phone" [invalid]="!phone" />
        @if (!phone) {
            <p-message severity="error" variant="simple" size="small">Phone number is required</p-message>
        }
    </div>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    selector: 'message-form-demo',
    templateUrl: './message-form-demo.html',
    standalone: true,
    imports: [Message, InputTextModule,InputMaskModule]
})
export class MessageFormDemo {
    username: string | undefined;

    phone: string | undefined;
}
```
</details>

## Icon

The icon of a message is specified with the icon property.

```html
<p-message severity="info" icon="pi pi-send" text="Info Message" styleClass="h-full" />
<p-message severity="success">
    <ng-template #icon>
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
    </ng-template>
    <span class="ms-2">How may I help you?</span>
</p-message>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'message-icon-demo',
    templateUrl: './message-icon-demo.html',
    standalone: true,
    imports: [MessageModule, AvatarModule]
})
export class MessageIconDemo {}
```
</details>

## Life

Messages can disappear automatically by defined the life in milliseconds.

```html
<p-message [life]="3000" severity="success">Auto disappear message</p-message>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, signal } from '@angular/core';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'message-life-demo',
    templateUrl: './message-life-demo.html',
    standalone: true,
    imports: [Message, ButtonModule]
})
export class MessageLifeDemo {
    visible = signal(false);

    showMessage() {
        this.visible.set(true);

        setTimeout(() => {
            this.visible.set(false);
        }, 3000);
    }
}
```
</details>

## Outlined

Configure the variant value as outlined for messages with borders and no background.

```html
<p-message severity="success" variant="outlined">Success Message</p-message>
<p-message severity="info" variant="outlined">Info Message</p-message>
<p-message severity="warn" variant="outlined">Warn Message</p-message>
<p-message severity="error" variant="outlined">Error Message</p-message>
<p-message severity="secondary" variant="outlined">Secondary Message</p-message>
<p-message severity="contrast" variant="outlined">Contrast Message</p-message>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
    selector: 'message-outlined-demo',
    templateUrl: './message-outlined-demo.html',
    standalone: true,
    imports: [Message]
})
export class MessageOutlinedDemo {}
```
</details>

## Severity

The severity option specifies the type of the message.

```html
<p-message severity="success">Success Message</p-message>
<p-message severity="info">Info Message</p-message>
<p-message severity="warn">Warn Message</p-message>
<p-message severity="error">Error Message</p-message>
<p-message severity="secondary">Secondary Message</p-message>
<p-message severity="contrast">Contrast Message</p-message>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
    selector: 'message-severity-demo',
    templateUrl: './message-severity-demo.html',
    standalone: true,
    imports: [Message]
})
export class MessageSeverityDemo {}
```
</details>

## Simple

Configure the variant value as simple for messages without borders and backgrounds.

```html
<p-message severity="success" variant="simple">Success Message</p-message>
<p-message severity="info" variant="simple">Info Message</p-message>
<p-message severity="warn" variant="simple">Warn Message</p-message>
<p-message severity="error" variant="simple">Error Message</p-message>
<p-message severity="secondary" variant="simple">Secondary Message</p-message>
<p-message severity="contrast" variant="simple">Contrast Message</p-message>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
    selector: 'message-simple-demo',
    templateUrl: './message-simple-demo.html',
    standalone: true,
    imports: [Message]
})
export class MessageSimpleDemo {}
```
</details>

## Sizes

Message provides small and large sizes as alternatives to the base.

```html
<p-message size="small" icon="pi pi-send">Small Message</p-message>
<p-message icon="pi pi-user">Normal Message</p-message>
<p-message size="large" icon="pi pi-check">Large Message</p-message>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
    selector: 'message-sizes-demo',
    templateUrl: './message-sizes-demo.html',
    standalone: true,
    imports: [Message]
})
export class MessageSizesDemo {}
```
</details>

## Message

Message groups a collection of contents in tabs.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<MessagePassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| severity | "success" \| "info" \| "warn" \| "secondary" \| "contrast" \| "error" | 'info' | Severity level of the message. |
| text | string | - | Text content. **(Deprecated)** |
| escape | boolean | true | Whether displaying messages would be escaped or not. **(Deprecated)** |
| style | { [klass: string]: any } | - | Inline style of the component. |
| styleClass | string | - | Style class of the component. |
| closable | boolean | false | Whether the message can be closed manually using the close icon. |
| icon | string | undefined | Icon to display in the message. |
| closeIcon | string | undefined | Icon to display in the message close button. |
| showTransitionOptions | string | '300ms ease-out' | Transition options of the show animation. **(Deprecated)** |
| hideTransitionOptions | string | '200ms cubic-bezier(0.86, 0, 0.07, 1)' | Transition options of the hide animation. **(Deprecated)** |
| size | "small" \| "large" | - | Defines the size of the component. |
| variant | "text" \| "outlined" \| "simple" | - | Specifies the input variant of the component. |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onClose | event: { originalEvent: Event } | Emits when the message is closed. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| container | TemplateRef<MessageContainerTemplateContext> | Custom template of the message container. |
| icon | TemplateRef<void> | Custom template of the message icon. |
| closeicon | TemplateRef<void> | Custom template of the close icon. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| close | event: Event | void | Closes the message. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| icon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the icon's DOM element. |
| text | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the text's DOM element. |
| closeButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the close button's DOM element. |
| closeIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the close icon's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-message | Class name of the root element |
| p-message-content | Class name of the content element |
| p-message-icon | Class name of the icon element |
| p-message-text | Class name of the text element |
| p-message-close-button | Class name of the close button element |
| p-message-close-icon | Class name of the close icon element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| message.border.radius | --p-message-border-radius | Border radius of root |
| message.border.width | --p-message-border-width | Border width of root |
| message.transition.duration | --p-message-transition-duration | Transition duration of root |
| message.content.padding | --p-message-content-padding | Padding of content |
| message.content.gap | --p-message-content-gap | Gap of content |
| message.content.sm.padding | --p-message-content-sm-padding | Sm padding of content |
| message.content.lg.padding | --p-message-content-lg-padding | Lg padding of content |
| message.text.font.size | --p-message-text-font-size | Font size of text |
| message.text.font.weight | --p-message-text-font-weight | Font weight of text |
| message.text.sm.font.size | --p-message-text-sm-font-size | Sm font size of text |
| message.text.lg.font.size | --p-message-text-lg-font-size | Lg font size of text |
| message.icon.size | --p-message-icon-size | Size of icon |
| message.icon.sm.size | --p-message-icon-sm-size | Sm size of icon |
| message.icon.lg.size | --p-message-icon-lg-size | Lg size of icon |
| message.close.button.width | --p-message-close-button-width | Width of close button |
| message.close.button.height | --p-message-close-button-height | Height of close button |
| message.close.button.border.radius | --p-message-close-button-border-radius | Border radius of close button |
| message.close.button.focus.ring.width | --p-message-close-button-focus-ring-width | Focus ring width of close button |
| message.close.button.focus.ring.style | --p-message-close-button-focus-ring-style | Focus ring style of close button |
| message.close.button.focus.ring.offset | --p-message-close-button-focus-ring-offset | Focus ring offset of close button |
| message.close.icon.size | --p-message-close-icon-size | Size of close icon |
| message.close.icon.sm.size | --p-message-close-icon-sm-size | Sm size of close icon |
| message.close.icon.lg.size | --p-message-close-icon-lg-size | Lg size of close icon |
| message.outlined.border.width | --p-message-outlined-border-width | Root border width of outlined |
| message.simple.content.padding | --p-message-simple-content-padding | Content padding of simple |
| message.info.background | --p-message-info-background | Background of info |
| message.info.border.color | --p-message-info-border-color | Border color of info |
| message.info.color | --p-message-info-color | Color of info |
| message.info.shadow | --p-message-info-shadow | Shadow of info |
| message.info.close.button.hover.background | --p-message-info-close-button-hover-background | Close button hover background of info |
| message.info.close.button.focus.ring.color | --p-message-info-close-button-focus-ring-color | Close button focus ring color of info |
| message.info.close.button.focus.ring.shadow | --p-message-info-close-button-focus-ring-shadow | Close button focus ring shadow of info |
| message.info.outlined.color | --p-message-info-outlined-color | Outlined color of info |
| message.info.outlined.border.color | --p-message-info-outlined-border-color | Outlined border color of info |
| message.info.simple.color | --p-message-info-simple-color | Simple color of info |
| message.success.background | --p-message-success-background | Background of success |
| message.success.border.color | --p-message-success-border-color | Border color of success |
| message.success.color | --p-message-success-color | Color of success |
| message.success.shadow | --p-message-success-shadow | Shadow of success |
| message.success.close.button.hover.background | --p-message-success-close-button-hover-background | Close button hover background of success |
| message.success.close.button.focus.ring.color | --p-message-success-close-button-focus-ring-color | Close button focus ring color of success |
| message.success.close.button.focus.ring.shadow | --p-message-success-close-button-focus-ring-shadow | Close button focus ring shadow of success |
| message.success.outlined.color | --p-message-success-outlined-color | Outlined color of success |
| message.success.outlined.border.color | --p-message-success-outlined-border-color | Outlined border color of success |
| message.success.simple.color | --p-message-success-simple-color | Simple color of success |
| message.warn.background | --p-message-warn-background | Background of warn |
| message.warn.border.color | --p-message-warn-border-color | Border color of warn |
| message.warn.color | --p-message-warn-color | Color of warn |
| message.warn.shadow | --p-message-warn-shadow | Shadow of warn |
| message.warn.close.button.hover.background | --p-message-warn-close-button-hover-background | Close button hover background of warn |
| message.warn.close.button.focus.ring.color | --p-message-warn-close-button-focus-ring-color | Close button focus ring color of warn |
| message.warn.close.button.focus.ring.shadow | --p-message-warn-close-button-focus-ring-shadow | Close button focus ring shadow of warn |
| message.warn.outlined.color | --p-message-warn-outlined-color | Outlined color of warn |
| message.warn.outlined.border.color | --p-message-warn-outlined-border-color | Outlined border color of warn |
| message.warn.simple.color | --p-message-warn-simple-color | Simple color of warn |
| message.error.background | --p-message-error-background | Background of error |
| message.error.border.color | --p-message-error-border-color | Border color of error |
| message.error.color | --p-message-error-color | Color of error |
| message.error.shadow | --p-message-error-shadow | Shadow of error |
| message.error.close.button.hover.background | --p-message-error-close-button-hover-background | Close button hover background of error |
| message.error.close.button.focus.ring.color | --p-message-error-close-button-focus-ring-color | Close button focus ring color of error |
| message.error.close.button.focus.ring.shadow | --p-message-error-close-button-focus-ring-shadow | Close button focus ring shadow of error |
| message.error.outlined.color | --p-message-error-outlined-color | Outlined color of error |
| message.error.outlined.border.color | --p-message-error-outlined-border-color | Outlined border color of error |
| message.error.simple.color | --p-message-error-simple-color | Simple color of error |
| message.secondary.background | --p-message-secondary-background | Background of secondary |
| message.secondary.border.color | --p-message-secondary-border-color | Border color of secondary |
| message.secondary.color | --p-message-secondary-color | Color of secondary |
| message.secondary.shadow | --p-message-secondary-shadow | Shadow of secondary |
| message.secondary.close.button.hover.background | --p-message-secondary-close-button-hover-background | Close button hover background of secondary |
| message.secondary.close.button.focus.ring.color | --p-message-secondary-close-button-focus-ring-color | Close button focus ring color of secondary |
| message.secondary.close.button.focus.ring.shadow | --p-message-secondary-close-button-focus-ring-shadow | Close button focus ring shadow of secondary |
| message.secondary.outlined.color | --p-message-secondary-outlined-color | Outlined color of secondary |
| message.secondary.outlined.border.color | --p-message-secondary-outlined-border-color | Outlined border color of secondary |
| message.secondary.simple.color | --p-message-secondary-simple-color | Simple color of secondary |
| message.contrast.background | --p-message-contrast-background | Background of contrast |
| message.contrast.border.color | --p-message-contrast-border-color | Border color of contrast |
| message.contrast.color | --p-message-contrast-color | Color of contrast |
| message.contrast.shadow | --p-message-contrast-shadow | Shadow of contrast |
| message.contrast.close.button.hover.background | --p-message-contrast-close-button-hover-background | Close button hover background of contrast |
| message.contrast.close.button.focus.ring.color | --p-message-contrast-close-button-focus-ring-color | Close button focus ring color of contrast |
| message.contrast.close.button.focus.ring.shadow | --p-message-contrast-close-button-focus-ring-shadow | Close button focus ring shadow of contrast |
| message.contrast.outlined.color | --p-message-contrast-outlined-color | Outlined color of contrast |
| message.contrast.outlined.border.color | --p-message-contrast-outlined-border-color | Outlined border color of contrast |
| message.contrast.simple.color | --p-message-contrast-simple-color | Simple color of contrast |

