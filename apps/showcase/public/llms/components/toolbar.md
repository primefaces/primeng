# Angular Toolbar Component

Toolbar is a grouping component for buttons and other content.

## Accessibility

Screen Reader Toolbar uses toolbar role for the root element, aria-orientation is not included as it defaults to horizontal . Any valid attribute is passed to the root element so you may add additional properties like aria-labelledby and aria-labelled to define the element if required. Keyboard Support Component does not include any interactive elements. Arbitrary content can be placed with templating and elements like buttons inside should follow the page tab sequence.

## Basic

Toolbar is a grouping component for buttons and other content. Its content can be placed inside the start , center and end sections.

```html
<p-toolbar>
    <ng-template #start>
        <p-button icon="pi pi-plus" class="mr-2" text severity="secondary" />
        <p-button icon="pi pi-print" class="mr-2" text severity="secondary" />
        <p-button icon="pi pi-upload" text severity="secondary" />
    </ng-template>
    <ng-template #center>
        <p-iconfield iconPosition="left">
            <p-inputicon class="pi pi-search" />
            <input type="text" pInputText placeholder="Search" />
        </p-iconfield>
    </ng-template>
    <ng-template #end>
        <p-splitbutton label="Save" [model]="items" />
    </ng-template>
</p-toolbar>
```

## Custom

Content can also be placed using the start , center and end templates.

```html
<p-toolbar [style]="{ 'border-radius': '3rem', 'padding': '1rem 1rem 1rem 1.5rem' }">
    <ng-template #start>
        <div class="flex items-center gap-2">
            <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 2rem; margin-right: 1rem">
                <path d="..." fill="var(--p-primary-color)" />
                <mask id="mask0_1_52" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="33"></mask>
            </svg>
            <p-button label="Files" text plain />
            <p-button label="Edit" text plain />
            <p-button label="View" text plain />
        </div>
    </ng-template>

    <ng-template #end>
        <div class="flex items-center gap-2">
            <p-button label="Share" severity="contrast" size="small" />
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" [style]="{ width: '32px', height: '32px' }" />
        </div>
    </ng-template>
</p-toolbar>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'toolbar-custom-demo',
    templateUrl: './toolbar-custom-demo.html',
    standalone: true,
    imports: [Toolbar, AvatarModule, ButtonModule]
})
export class ToolbarCustomDemo {

}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Toolbar

Toolbar is a grouping component for buttons and other content.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ToolbarPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| ariaLabelledBy | string | - | Defines a string value that labels an interactive element. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| start | TemplateRef<any> | Defines template option for start. |
| end | TemplateRef<any> | Defines template option for end. |
| center | TemplateRef<any> | Defines template option for center. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| start | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the start's DOM element. |
| center | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the center's DOM element. |
| end | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the right's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-toolbar | Class name of the root element |
| p-toolbar-start | Class name of the start element |
| p-toolbar-center | Class name of the center element |
| p-toolbar-end | Class name of the end element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| toolbar.background | --p-toolbar-background | Background of root |
| toolbar.border.color | --p-toolbar-border-color | Border color of root |
| toolbar.border.radius | --p-toolbar-border-radius | Border radius of root |
| toolbar.color | --p-toolbar-color | Color of root |
| toolbar.gap | --p-toolbar-gap | Gap of root |
| toolbar.padding | --p-toolbar-padding | Padding of root |

