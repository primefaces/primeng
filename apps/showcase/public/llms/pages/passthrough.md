# Pass Through

Pass Through Props allow direct access to the underlying elements for complete customization.

## Basic

Each component has a special pt property to define an object with keys corresponding to the available DOM elements. Each value can either be a string, an object or a function that returns a string or an object to define the arbitrary properties to apply to the element such as styling, aria, data-* or custom attributes. If the value is a string or a function that returns a string, it is considered as a class definition and added to the class attribute of the element. Every component documentation has a dedicated section to document the available section names exposed via PT.

```html
<p-panel header="Header" toggleable [pt]="pt">
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</p-panel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'panel-pt-demo',
    templateUrl: './panel-pt-demo.html',
    standalone: true,
    imports: [PanelModule]
})
export class PanelPtDemo {
    pt = {
        root: '!border !border-primary !rounded-xl p-4',
        header: (options) => ({
            id: 'myPanelHeader',
            style: {
                'user-select': 'none'
            },
            class: ['!text-primary font-bold !p-0']
        }),
        content: { class: 'text-primary-700 dark:text-primary-200 !p-0 mt-2' },
        title: 'text-xl',
        pcToggleButton: {
            icon: {
                class: 'text-primary'
            }
        }
    };
}
```
</details>

## Global

PassThrough object can also be defined at a global level to apply all components in an application using the providePrimeNG provider. For example, with the configuration here all panel headers have the bg-primary style class and all autocomplete components have a fixed width. These settings can be overridden by a particular component as components pt property has higher precedence over global pt by default.

<details>
<summary>TypeScript Example</summary>

```typescript
import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
    providers: [
        providePrimeNG({
            pt: {
                panel: {
                    header: {
                        class: 'bg-primary text-primary-contrast'
                    }
                },
                autocomplete: {
                    pcInputText: {
                        root: 'w-64' // OR { class: 'w-64' }
                    }
                }
            }
        })
    ]
};
```
</details>

## Instance

In cases where you need to access the UI Component instance, define a component passthrough type that exposes the component instance or a function that receives a PassThroughContext as parameter.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PassThroughContext } from 'primeng/api';
import { Panel, PanelModule, PanelPassThrough } from 'primeng/panel';

@Component({
    selector: 'panel-pt-demo',
    template: \`
        <p-panel header="Header" [pt]="pt">
            Content
        </p-panel>
    \`,
    standalone: true,
    imports: [PanelModule]
})
export class PanelPtDemo {
   pt: PanelPassThrough<Panel> = {
        header: (context: PassThroughContext<Panel>) => {
            const instance = context.instance;
            const element = instance.el;

            return {
                id: 'myPanelHeader',
                'data-custom': 'prime',
                style: {
                    userSelect: 'none'
                },
                class: [{ 'overflow-hidden': instance.toggleable }, '!text-white font-bold !p-0 !bg-transparent !border-none']
            };
        }
    };
}
```
</details>

## Introduction

In traditional 3rd party UI libraries, users are limited to the API provided by component author. This API commonly consists of inputs, outputs, and content projection. Whenever a requirement emerges for a new customization option in the API, the component author needs to develop and publish it with a new release. Vision of PrimeTek is "Your Components, Not Ours" . The pass through feature is a key element to implement this vision by exposing the component internals in order to apply arbitrary attributes and listeners to the DOM elements. The primary advantage of this approach is that it frees you from being restricted by the main component API. We recommend considering the pass-through feature whenever you need to tailor a component that lacks a built-in feature for your specific requirement. Each component has a special pt property to define an object with keys corresponding to the available DOM elements. A value of a key can either be a string, an object or a function to define the arbitrary properties such as styling, aria, data-* or custom attributes for the element. If the value is a string or a function that returns a string, it serves as a shorthand for a style class definition. Every component documentation has a dedicated segment to document the available section names in the interactive PT Viewer. Panel Example In this example, a Panel is customized with various options through pt . The styling is overriden with Tailwind CSS and header receives custom attributes along with a click event. The attributes passed to the header are not available in the component API, thanks to PassThrough feature, this is no longer an issue as you are not limited to the component api. Note that, you may avoid the ! based overrides in Tailwind classes if you setup CSS Layers with PrimeNG. Visit the Override section at Tailwind integration for examples.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Panel, PanelModule, PanelPassThrough } from 'primeng/panel';

@Component({
    selector: 'panel-pt-demo',
    templateUrl: \`
        <p-panel header="Header" [pt]="pt">
            ...
        </p-panel>
    \`,
    standalone: true,
    imports: [PanelModule]
})
export class PanelPtDemo {
     pt: PanelPassThrough<Panel> = {
        root: '!border !border-transparent !rounded-2xl !p-4 !bg-gradient-to-br !from-indigo-600 !to-indigo-400',
        header: {
            id: 'myPanelHeader',
            'data-custom': 'prime',
            style: {
                userSelect: 'none'
            },
            class: ['!text-white font-bold !p-0 !bg-transparent !border-none'],
            onclick: () => {
                console.log('Header Clicked');
            }
        },
        content: { class: '!text-white dark:text-primary-200 !p-0 mt-2 !font-medium' },
        title: 'text-xl'
    };
}
```
</details>

## Lifecycle

Lifecycle hooks of components are exposed as pass through using the hooks property so that callback functions can be registered. Available callbacks are onBeforeInit , onInit , onChanges , onDoCheck , onAfterContentInit , onAfterContentChecked , onAfterViewInit , onAfterViewChecked and onDestroy . Refer to the Angular documentation for detailed information about lifecycle hooks.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Panel, PanelModule, PanelPassThrough } from 'primeng/panel';

@Component({
    template: \`
        <p-panel header="Header" [pt]="pt">
            Content
        </p-panel>
    \`,
    standalone: true,
    imports: [PanelModule]
})
export class PanelPtDemo {
   pt: PanelPassThrough<Panel> = {
        hooks: {
            onInit: () => {
                //panel ngOnInit
            },
            onDestroy: () => {
                //panel ngOnDestroy
            }
        }
    };
}
```
</details>

## Pcprefix

A UI component may also use other UI components, in this case section names are prefixed with pc (Prime Component) to denote the PrimeNG component begin used. This distinguishes components from standard DOM elements and indicating the necessity for a nested structure. For example, the badge section is identified as pcBadge because the button component incorporates the badge component internally.

```html
<p-button
    type="button"
    label="Messages"
    icon="pi pi-inbox"
    badge="2"
    variant="outlined"
    severity="secondary"
    [pt]="{
        root: '!px-4 !py-3',
        icon: '!text-xl !text-violet-500 dark:!text-violet-400',
        label: '!text-lg !text-violet-500 dark:!text-violet-400',
        pcBadge: {
            root: '!bg-violet-500 dark:!bg-violet-400 !text-white dark:!text-black'
        }
    }"
/>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'pc-prefix-demo',
    templateUrl: './pc-prefix-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class PcPrefixDemo {}
```
</details>

## Ptoptions

The ⁠ptOptions property determines how a component's local PassThrough configuration merges with the global PT configuration, as demonstrated in the following examples using both global and component-level settings. The mergeSections defines whether the sections from the main configuration gets added and the mergeProps controls whether to override or merge the defined props. Defaults are true for mergeSections and false for mergeProps . Global Configuration mergeSections: true, mergeProps: false (default) mergeSections: true, mergeProps: true mergeSections: false, mergeProps: true mergeSections: false, mergeProps: false

