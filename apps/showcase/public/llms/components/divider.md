# Angular Divider Component

Divider is used to separate contents.

## Accessibility

Screen Reader Divider uses a separator role with aria-orientation set to either "horizontal" or "vertical". Keyboard Support Component does not include any interactive elements.

## Basic

Divider is basically placed between the items to separate.

```html
<p>
    Lorem ipsum dolor sit amet...
</p>
<p-divider />
<p>
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
</p>
<p-divider />
<p>
    At vero eos et accusamus et iusto odio dignissimos...
</p>
<p-divider />
<p>
    Temporibus autem quibusdam et aut officiis...
</p>
```

## Content

Children are rendered within the boundaries of the divider where location of the content is configured with the align property. In horizontal layout, alignment options are left , center and right whereas vertical mode supports top , center and bottom .

```html
<p class="m-0">
    Lorem ipsum dolor sit amet...
    </p>

    <p-divider align="left" type="solid">
    <b>Left</b>
    </p-divider>

    <p class="m-0">
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
    </p>

    <p-divider align="center" type="dotted">
    <b>Center</b>
    </p-divider>

    <p class="m-0">
    At vero eos et accusamus et iusto odio dignissimos...
    </p>

    <p-divider align="right" type="dashed">
    <b>Right</b>
    </p-divider>

    <p class="m-0">
    Temporibus autem quibusdam et aut officiis...
</p>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'divider-content-demo',
    templateUrl: './divider-content-demo.html',
    standalone: true,
    imports: [DividerModule]
})
export class DividerContentDemo {}
```
</details>

## Login

Sample implementation of a login form using a divider with content.

```html
<div class="flex flex-col md:flex-row">
    <div class="w-full md:w-5/12 flex flex-col items-center justify-center gap-3 py-5">
        <div class="flex flex-col gap-2">
            <label for="username">Username</label>
            <input pInputText id="username" type="text" />
        </div>
        <div class="flex flex-col gap-2">
            <label for="password">Password</label>
            <input pInputText id="password" type="password" />
        </div>
        <div class="flex">
            <p-button label="Login" icon="pi pi-user" class="w-full max-w-[17.35rem]" styleClass="w-full mx-auto" />
        </div>
    </div>
    <div class="w-full md:w-2/12">
        <p-divider layout="vertical" class="!hidden md:!flex"><b>OR</b></p-divider>
        <p-divider layout="horizontal" class="!flex md:!hidden" align="center"><b>OR</b></p-divider>
    </div>
    <div class="w-full md:w-5/12 flex items-center justify-center py-5">
        <p-button label="Sign Up" icon="pi pi-user-plus" severity="success" class="w-full max-w-[17.35rem]" styleClass="w-full mx-auto" />
    </div>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'divider-login-demo',
    templateUrl: './divider-login-demo.html',
    standalone: true,
    imports: [DividerModule, ButtonModule, InputTextModule]
})
export class DividerLoginDemo {}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Type

Style of the border is configured with the type property that can either be solid , dotted or dashed .

```html
<p>
    Lorem ipsum dolor sit amet...
</p>
<p-divider type="solid" />
<p>
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
</p>
<p-divider type="dotted" />
<p>
    At vero eos et accusamus et iusto odio dignissimos...
</p>
<p-divider type="dashed" />
<p>
    Temporibus autem quibusdam et aut officiis...
</p>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'divider-type-demo',
    templateUrl: './divider-type-demo.html',
    standalone: true,
    imports: [DividerModule]
})
export class DividerTypeDemo {}
```
</details>

## Vertical

Vertical divider is enabled by setting the layout property as vertical .

```html
<p>
    Lorem ipsum dolor sit amet...
</p>
<p-divider layout="vertical" />
<p>
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
</p>
<p-divider layout="vertical" />
<p>
    At vero eos et accusamus et iusto odio dignissimos...
</p>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'divider-vertical-demo',
    templateUrl: './divider-vertical-demo.html',
    standalone: true,
    imports: [DividerModule]
})
export class DividerVerticalDemo {}
```
</details>

## Divider

Divider is used to separate contents.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<DividerPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| layout | "vertical" \| "horizontal" | horizontal | Specifies the orientation. |
| type | "solid" \| "dashed" \| "dotted" | solid | Border style type. |
| align | "right" \| "left" \| "top" \| "bottom" \| "center" | - | Alignment of the content. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-divider | Class name of the root element |
| p-divider-content | Class name of the content element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| divider.border.color | --p-divider-border-color | Border color of root |
| divider.content.background | --p-divider-content-background | Background of content |
| divider.content.color | --p-divider-content-color | Color of content |
| divider.horizontal.margin | --p-divider-horizontal-margin | Margin of horizontal |
| divider.horizontal.padding | --p-divider-horizontal-padding | Padding of horizontal |
| divider.horizontal.content.padding | --p-divider-horizontal-content-padding | Content padding of horizontal |
| divider.vertical.margin | --p-divider-vertical-margin | Margin of vertical |
| divider.vertical.padding | --p-divider-vertical-padding | Padding of vertical |
| divider.vertical.content.padding | --p-divider-vertical-content-padding | Content padding of vertical |

