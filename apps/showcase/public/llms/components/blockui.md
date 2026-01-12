# Angular BlockUI Component

BlockUI can either block other components or the whole page.

## Accessibility

Screen Reader BlockUI manages aria-busy state attribute when the UI gets blocked and unblocked. Any valid attribute is passed to the root element so additional attributes like role and aria-live can be used to define live regions. Keyboard Support Component does not include any interactive elements.

## Basic

The element to block should be placed as a child of BlockUI and blocked property is required to control the state.

```html
<p-button label="Block" (click)="blockedPanel = true" class="me-2" severity="secondary" />
<p-button label="Unblock" (click)="blockedPanel = false" severity="secondary" />
<p-blockui [target]="pnl" [blocked]="blockedPanel" />
<p-panel #pnl header="Header" class="mt-6">
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</p-panel>
```

## Document

If the target element is not specified, BlockUI blocks the document by default.

```html
<p-blockui [blocked]="blockedDocument" />
<p-button label="Block" (click)="blockDocument()" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';

@Component({
    template: `
        <div class="card">
            <p-blockui [blocked]="blockedDocument" />
            <p-button label="Block" (click)="blockDocument()" />
        </div>
    `,
    standalone: true,
    imports: [BlockUIModule, ButtonModule]
})
export class BlockuiDocumentDemo {
    blockedDocument: boolean = false;
}
```
</details>

## Block U I

BlockUI can either block other components or the whole page.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<BlockUIPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| target | any | - | Name of the local ng-template variable referring to another component. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| styleClass | string | - | Class of the element. **(Deprecated)** |
| blocked | boolean | - | Current blocked state as a boolean. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | TemplateRef<any> | template of the content |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-blockui | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| blockui.border.radius | --p-blockui-border-radius | Border radius of root |

