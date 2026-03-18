# Angular AutoFocus Directive

AutoFocus manages focus on focusable element on load.

## Basic

AutoFocus is applied to any focusable input element with the pAutoFocus directive.

```typescript
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="flex justify-center">
            <input type="text" pInputText [pAutoFocus]="true" placeholder="Automatically focused" />
        </div>
    `,
    standalone: true,
    imports: [InputTextModule]
})
export class AutoFocusBasicDemo {}
```

## Auto Focus

AutoFocus manages focus on focusable element on load.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| autofocus | boolean | - | When present, it specifies that the component should automatically get focus on load. |
| dt | Object | undefined | Defines scoped design tokens of the component. |
| unstyled | boolean | undefined | Indicates whether the component should be rendered without styles. |
| pt | any | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | PassThroughOptions | undefined | Used to configure passthrough(pt) options of the component. |

