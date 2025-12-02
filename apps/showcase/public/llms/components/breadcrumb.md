# Angular Breadcrumb Component

Breadcrumb provides contextual information about page hierarchy.

## Accessibility

Screen Reader Breadcrumb uses the nav element and since any attribute is passed to the root implicitly aria-labelledby or aria-label can be used to describe the component. Inside an ordered list is used where the list item separators have aria-hidden to be able to ignored by the screen readers. If the last link represents the current route, aria-current is added with "page" as the value. Keyboard Support No special keyboard interaction is needed, all menuitems are focusable based on the page tab sequence.

## Basic

Breadcrumb provides contextual information about page hierarchy.

```html
<p-breadcrumb [model]="items" [home]="home" />
```

## Router

Menu items support navigation via routerLink, programmatic routing using commands, or external URLs.

```html
<p-breadcrumb [home]="home" [model]="items" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'breadcrumb-router-demo',
    templateUrl: './breadcrumb-router-demo.html',
    standalone: true,
    imports: [Breadcrumb, RouterModule]
})
export class BreadcrumbRouterDemo {
    items: MenuItem[] = [{ label: 'Components' }, { label: 'Form' }, { label: 'InputText', routerLink: '/inputtext' }];

    home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Custom content can be placed inside the items using the item template. The divider between the items has its own separator template.

```html
<p-breadcrumb [model]="items" [home]="home">
    <ng-template #item let-item>
        <a class="cursor-pointer" [routerLink]="item.url">
            <i [class]="item.icon"></i>
        </a>
    </ng-template>
    <ng-template #separator> / </ng-template>
</p-breadcrumb>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'breadcrumb-template-demo',
    templateUrl: './breadcrumb-template-demo.html',
    standalone: true,
    imports: [Breadcrumb, RouterModule]
})
export class BreadcrumbTemplateDemo implements OnInit {
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [{ icon: 'pi pi-sitemap' }, { icon: 'pi pi-book' }, { icon: 'pi pi-wallet' }, { icon: 'pi pi-shopping-bag' }, { icon: 'pi pi-calculator' }];

        this.home = { icon: 'pi pi-home' };
    }
}
```
</details>

## Breadcrumb

Breadcrumb provides contextual information about page hierarchy.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<BreadcrumbPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| model | MenuItem[] | - | An array of menuitems. |
| style | { [klass: string]: any } | - | Inline style of the component. |
| styleClass | string | - | Style class of the component. |
| home | MenuItem | - | MenuItem configuration for the home icon. |
| homeAriaLabel | string | - | Defines a string that labels the home icon for accessibility. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onItemClick | event: BreadcrumbItemClickEvent | Fired when an item is selected. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| item | TemplateRef<BreadcrumbItemTemplateContext> | Custom item template. |
| separator | TemplateRef<void> | Custom separator template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| list | PassThroughOption<HTMLOListElement, I> | Used to pass attributes to the list's DOM element. |
| homeItem | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the home item's DOM element. |
| item | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the item's DOM element. |
| itemLink | PassThroughOption<HTMLAnchorElement, I> | Used to pass attributes to the item link's DOM element. |
| itemIcon | PassThroughOption<HTMLSpanElement \| SVGElement, I> | Used to pass attributes to the item icon's DOM element. |
| itemLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item label's DOM element. |
| separator | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the separator's DOM element. |
| separatorIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the separator icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-breadcrumb | Class name of the root element |
| p-breadcrumb-list | Class name of the list element |
| p-breadcrumb-home-item | Class name of the home item element |
| p-breadcrumb-separator | Class name of the separator element |
| p-breadcrumb-item | Class name of the item element |
| p-breadcrumb-item-link | Class name of the item link element |
| p-breadcrumb-item-icon | Class name of the item icon element |
| p-breadcrumb-item-label | Class name of the item label element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| breadcrumb.padding | --p-breadcrumb-padding | Padding of root |
| breadcrumb.background | --p-breadcrumb-background | Background of root |
| breadcrumb.gap | --p-breadcrumb-gap | Gap of root |
| breadcrumb.transition.duration | --p-breadcrumb-transition-duration | Transition duration of root |
| breadcrumb.item.color | --p-breadcrumb-item-color | Color of item |
| breadcrumb.item.hover.color | --p-breadcrumb-item-hover-color | Hover color of item |
| breadcrumb.item.border.radius | --p-breadcrumb-item-border-radius | Border radius of item |
| breadcrumb.item.gap | --p-breadcrumb-item-gap | Gap of item |
| breadcrumb.item.icon.color | --p-breadcrumb-item-icon-color | Icon color of item |
| breadcrumb.item.icon.hover.color | --p-breadcrumb-item-icon-hover-color | Icon hover color of item |
| breadcrumb.item.focus.ring.width | --p-breadcrumb-item-focus-ring-width | Focus ring width of item |
| breadcrumb.item.focus.ring.style | --p-breadcrumb-item-focus-ring-style | Focus ring style of item |
| breadcrumb.item.focus.ring.color | --p-breadcrumb-item-focus-ring-color | Focus ring color of item |
| breadcrumb.item.focus.ring.offset | --p-breadcrumb-item-focus-ring-offset | Focus ring offset of item |
| breadcrumb.item.focus.ring.shadow | --p-breadcrumb-item-focus-ring-shadow | Focus ring shadow of item |
| breadcrumb.separator.color | --p-breadcrumb-separator-color | Color of separator |

