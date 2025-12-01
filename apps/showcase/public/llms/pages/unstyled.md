# Unstyled Mode

Theming PrimeNG with alternative styling approaches.

## Architecture

The term unstyled is used to define an alternative styling approach instead of the default theming with design tokens. In unstyled mode the css variables of the design tokens and the css rule sets that utilize them are not included. Here is an example of an Unstyled Select, the core functionality and accessibility is provided whereas styling is not included. Unstyled components still need to be styled on your end, in the next sections, we'll cover the styling solutions for both modes.

## Example

Here is a sample that styles a button component with Tailwind CSS using pass through attributes. Before beginning, head over to the the pass through section at button documentation to learn more about the components internals section. We'll be using the root , label and icon elements to add a custom style.

```html
<p-button
    label="Search"
    icon="pi pi-search"
    [unstyled]="true"
    [pt]="{ 
        root: 'bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2', 
        label: 'text-white font-bold text-lg', 
        icon: 'text-white !text-xl' 
    }"
/>
```

## Global

A global configuration can be created at application level to avoid repetition via the global pt option so that the styles can be shared from a single location. A particular component can still override a global configuration with its own pt property.

<details>
<summary>TypeScript Example</summary>

```typescript
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
    providers: [
        providePrimeNG({
            unstyled: true,
            pt: {
                button: {
                    root: 'bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2',
                    label: 'text-white font-bold text-lg',
                    icon: 'text-white !text-xl'
                }
            }
        })
    ]
};
```
</details>

## Setup

Unstyled mode is enabled for the whole suite by enabling unstyled option during PrimeNG installation. Alternatively even in the default styled mode, a particular component can still be used as unstyled by adding the unstyled prop of the component.

