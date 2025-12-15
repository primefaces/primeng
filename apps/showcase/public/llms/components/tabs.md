# Angular Tabs Component

Tabs is a container component to group content with tabs.

## Accessibility

Screen Reader Tabs container is defined with the tablist role, as any attribute is passed to the container element aria-labelledby can be optionally used to specify an element to describe the Tabs. Each tab header has a tab role along with aria-selected state attribute and aria-controls to refer to the corresponding tab content element. The content element of each tab has tabpanel role, an id to match the aria-controls of the header and aria-labelledby reference to the header as the accessible name. Tab Header Keyboard Support Key Function tab Moves focus through the header. enter Activates the focused tab header. space Activates the focused tab header. right arrow Moves focus to the next header. left arrow Moves focus to the previous header. home Moves focus to the last header. end Moves focus to the first header.

## Basic

Tabs is defined using TabList , Tab , TabPanels and TabPanel components. Tab and TabPanel components are associated with their value properties

```html
<p-tabs value="0">
    <p-tablist>
        <p-tab value="0">Header I</p-tab>
        <p-tab value="1">Header II</p-tab>
        <p-tab value="2">Header III</p-tab>
    </p-tablist>
    <p-tabpanels>
        <p-tabpanel value="0">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
            </p>
        </p-tabpanel>
        <p-tabpanel value="1">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
            </p>
        </p-tabpanel>
        <p-tabpanel value="2">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
                sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                impedit quo minus.
            </p>
        </p-tabpanel>
    </p-tabpanels>
</p-tabs>
```

## Controlled

Tabs can be controlled programmatically using value property as a model.

```html
<div class="flex mb-2 gap-2 justify-end">
    <p-button (onClick)="value = 0" rounded="true" styleClass="w-8 h-8 p-0" [outlined]="value !== 0" label="1" />
    <p-button (onClick)="value = 1" rounded="true" styleClass="w-8 h-8 p-0" [outlined]="value !== 1" label="2" />
    <p-button (onClick)="value = 2" rounded="true" styleClass="w-8 h-8 p-0" [outlined]="value !== 2" label="3" />
</div>
<p-tabs [value]="value">
    <p-tablist>
        <p-tab [value]="0">Header I</p-tab>
        <p-tab [value]="1">Header II</p-tab>
        <p-tab [value]="2">Header III</p-tab>
    </p-tablist>
    <p-tabpanels>
        <p-tabpanel [value]="0">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
            </p>
        </p-tabpanel>
        <p-tabpanel [value]="1">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </p-tabpanel>
        <p-tabpanel [value]="2">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
                corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
                expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </p-tabpanel>
    </p-tabpanels>
</p-tabs>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'tabs-controlled-demo',
    templateUrl: './tabs-controlled-demo.html',
    standalone: true,
    imports: [ButtonModule, TabsModule, FormsModule]
})
export class TabsControlledDemo {
    value: number = 0;
}
```
</details>

## customtemplatedoc

Custom content for a tab is defined with the default ng-content.

```html
<p-tabs value="0" scrollable>
    <p-tablist>
        <ng-template #previcon>
            <i class="pi pi-minus"></i>
        </ng-template>
        <p-tab value="0" class="flex items-center !gap-2">
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle"/>
            <span class="font-bold whitespace-nowrap">Amy Elsner</span>
        </p-tab>
        <p-tab value="1" class="flex items-center !gap-2">
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" shape="circle" />
            <span class="font-bold whitespace-nowrap">Onyama Limba</span>
        </p-tab>
        <p-tab value="2" class="flex items-center !gap-2">
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png" shape="circle" />
            <span class="font-bold whitespace-nowrap">Ioni Bowcher</span>
            <p-badge value="2" />
        </p-tab>
        <ng-template #nexticon>
            <i class="pi pi-plus"></i>
        </ng-template>
    </p-tablist>
    <p-tabpanels>
        <p-tabpanel value="0">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
            </p>
        </p-tabpanel>
        <p-tabpanel value="1">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
            </p>
        </p-tabpanel>
        <p-tabpanel value="2">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
                sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                impedit quo minus.
            </p>
        </p-tabpanel>
    </p-tabpanels>
</p-tabs>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'tabs-template-demo',
    templateUrl: './tabs-template-demo.html',
    standalone: true,
    imports: [CommonModule, TabsModule, BadgeModule, AvatarModule]
})
export class TabsTemplateDemo {}
```
</details>

## Disabled

Enabling disabled property of a Tab prevents user interaction.

```html
<p-tabs value="0">
    <p-tablist>
        <p-tab value="0">Header I</p-tab>
        <p-tab value="1">Header II</p-tab>
        <p-tab value="2">Header III</p-tab>
        <p-tab disabled>Header IV</p-tab>
    </p-tablist>
    <p-tabpanels>
        <p-tabpanel value="0">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
            </p>
        </p-tabpanel>
        <p-tabpanel value="1">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
            </p>
        </p-tabpanel>
        <p-tabpanel value="2">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
                sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                impedit quo minus.
            </p>
        </p-tabpanel>
    </p-tabpanels>
</p-tabs>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'tabs-disabled-demo',
    templateUrl: './tabs-disabled-demo.html',
    standalone: true,
    imports: [CommonModule, TabsModule]
})
export class TabsDisabledDemo {}
```
</details>

## Dynamic

Tabs can be generated dynamically using the standard &#64;for block.

```html
<p-tabs value="0">
    <p-tablist>
        @for (tab of tabs; track tab.value) {
            <p-tab [value]="tab.value">{{ tab.title }}</p-tab>
        }
    </p-tablist>
    <p-tabpanels>
        @for (tab of tabs; track tab.value) {
            <p-tabpanel [value]="tab.value">
                <p class="m-0">{{ tab.content }}</p>
            </p-tabpanel>
        }
    </p-tabpanels>
</p-tabs>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tabs-dynamic-demo',
    templateUrl: './tabs-dynamic-demo.html',
    standalone: true,
    imports: [TabsModule, CommonModule]
})
export class TabsDynamicDemo implements OnInit {
    tabs: { title: string; value: number; content: string }[] = [];

    ngOnInit() {
        this.tabs = [
            { title: 'Tab 1', value: 0, content: 'Tab 1 Content' },
            { title: 'Tab 2', value: 1, content: 'Tab 2 Content' },
            { title: 'Tab 3', value: 2, content: 'Tab 3 Content' },
        ];
    }
}
```
</details>

## Lazy

By default, inactive tab's content is rendered (but hidden). You can use the lazy input (either globally on Tabs or individually on a TabPanel ) to change this behavior so that content is only rendered when the tab becomes active. If a lazy tab contains complex components that should only be initialized when the tab is activated, you should wrap the content inside: &lt;ng-template #content&gt;your content&lt;/ng-template&gt; .

```html
<p-tabs lazy value="0">
    <p-tablist>
        <p-tab value="0">Header I</p-tab>
        <p-tab value="1">Header II</p-tab>
        <p-tab value="2">Header III</p-tab>
    </p-tablist>
    <p-tabpanels>
        <p-tabpanel value="0">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
            </p>
        </p-tabpanel>
        <p-tabpanel value="1">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
            </p>
        </p-tabpanel>
        <p-tabpanel value="2">
            <ng-template #content>Complex components that should only be initialized when the tab becomes active</ng-template>
        </p-tabpanel>
    </p-tabpanels>
</p-tabs>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'tabs-lazy-demo',
    templateUrl: './tabs-lazy-demo.html',
    standalone: true,
    imports: [CommonModule, TabsModule]
})
export class TabsLazyDemo {}
```
</details>

## Scrollable

Adding scrollable property displays navigational buttons at each side to scroll between tabs.

```html
<p-tabs value="0" scrollable>
    <p-tablist>
        @for(tab of scrollableTabs; track tab.value){
            <p-tab [value]="tab.value">
                {{ tab.title }}
            </p-tab>
        }
    </p-tablist>
    <p-tabpanels>
        @for(tab of scrollableTabs; track tab.value){
            <p-tabpanel [value]="tab.value">
                <p class="m-0">{{ tab.content }}</p>
            </p-tabpanel>
        }
    </p-tabpanels>
</p-tabs>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tabs-scrollable-demo',
    templateUrl: './tabs-scrollable-demo.html',
    standalone: true,
    imports: [CommonModule, TabsModule]
})
export class TabsScrollableDemo {
    activeIndex: number = 0;

    scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({ title: "Title", content: "Content" }));
}
```
</details>

## Tab Menu

A navigation menu is implemented using tabs without the panels where the content of a tab is provided by a route component like router-outlet . For the purpose of this demo, router-outlet is not included.

```html
<p-tabs value="/dashboard">
    <p-tablist>
        @for(tab of tabs; track tab.route){
            <p-tab [value]="tab.route" [routerLink]="tab.route" class="flex items-center !gap-2 text-inherit">
                <i [class]="tab.icon"></i>
                <span>{{ tab.label }}</span>
            </p-tab>
        }
    </p-tablist>
</p-tabs>
<!--<router-outlet></router-outlet>-->
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'tabs-tabmenu-demo',
    templateUrl: './tabs-tabmenu-demo.html',
    standalone: true,
    imports: [TabsModule, RouterModule, CommonModule]
})
export class TabsTabmenuDemo {
    tabs = [
        { route: 'dashboard', label: 'Dashboard', icon: 'pi pi-home' },
        { route: 'transactions', label: 'Transactions', icon: 'pi pi-chart-line' },
        { route: 'products', label: 'Products', icon: 'pi pi-list' },
        { route: 'messages', label: 'Messages', icon: 'pi pi-inbox' }
    ];
}
```
</details>

## Tabs

Tabs facilitates seamless switching between different views.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<TabsPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| value | ModelSignal<string \| number> | undefined | Value of the active tab. |
| scrollable | InputSignalWithTransform<boolean, unknown> | false | When specified, enables horizontal and/or vertical scrolling. |
| lazy | InputSignalWithTransform<boolean, unknown> | false | When enabled, tabs are not rendered until activation. |
| selectOnFocus | InputSignalWithTransform<boolean, unknown> | false | When enabled, the focused tab is activated. |
| showNavigators | InputSignalWithTransform<boolean, unknown> | true | Whether to display navigation buttons in container when scrollable is enabled. |
| tabindex | InputSignalWithTransform<number, unknown> | 0 | Tabindex of the tab buttons. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-tabs | Class name of the root element |
| p-tablist | Class name of the wrapper element |
| p-tablist-content | Class name of the content element |
| p-tablist-tab-list | Class name of the tab list element |
| p-tab | Class name of the tab list element |
| p-tablist-active-bar | Class name of the inkbar element |
| p-tablist-nav-button | Class name of the navigation buttons |
| p-tabpanels | Class name of the tab panels wrapper |
| p-tabs-panel | Class name of the tab panel element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| tabs.transition.duration | --p-tabs-transition-duration | Transition duration of root |
| tabs.tablist.border.width | --p-tabs-tablist-border-width | Border width of tablist |
| tabs.tablist.background | --p-tabs-tablist-background | Background of tablist |
| tabs.tablist.border.color | --p-tabs-tablist-border-color | Border color of tablist |
| tabs.tab.background | --p-tabs-tab-background | Background of tab |
| tabs.tab.hover.background | --p-tabs-tab-hover-background | Hover background of tab |
| tabs.tab.active.background | --p-tabs-tab-active-background | Active background of tab |
| tabs.tab.border.width | --p-tabs-tab-border-width | Border width of tab |
| tabs.tab.border.color | --p-tabs-tab-border-color | Border color of tab |
| tabs.tab.hover.border.color | --p-tabs-tab-hover-border-color | Hover border color of tab |
| tabs.tab.active.border.color | --p-tabs-tab-active-border-color | Active border color of tab |
| tabs.tab.color | --p-tabs-tab-color | Color of tab |
| tabs.tab.hover.color | --p-tabs-tab-hover-color | Hover color of tab |
| tabs.tab.active.color | --p-tabs-tab-active-color | Active color of tab |
| tabs.tab.padding | --p-tabs-tab-padding | Padding of tab |
| tabs.tab.font.weight | --p-tabs-tab-font-weight | Font weight of tab |
| tabs.tab.margin | --p-tabs-tab-margin | Margin of tab |
| tabs.tab.gap | --p-tabs-tab-gap | Gap of tab |
| tabs.tab.focus.ring.width | --p-tabs-tab-focus-ring-width | Focus ring width of tab |
| tabs.tab.focus.ring.style | --p-tabs-tab-focus-ring-style | Focus ring style of tab |
| tabs.tab.focus.ring.color | --p-tabs-tab-focus-ring-color | Focus ring color of tab |
| tabs.tab.focus.ring.offset | --p-tabs-tab-focus-ring-offset | Focus ring offset of tab |
| tabs.tab.focus.ring.shadow | --p-tabs-tab-focus-ring-shadow | Focus ring shadow of tab |
| tabs.tabpanel.background | --p-tabs-tabpanel-background | Background of tabpanel |
| tabs.tabpanel.color | --p-tabs-tabpanel-color | Color of tabpanel |
| tabs.tabpanel.padding | --p-tabs-tabpanel-padding | Padding of tabpanel |
| tabs.tabpanel.focus.ring.width | --p-tabs-tabpanel-focus-ring-width | Focus ring width of tabpanel |
| tabs.tabpanel.focus.ring.style | --p-tabs-tabpanel-focus-ring-style | Focus ring style of tabpanel |
| tabs.tabpanel.focus.ring.color | --p-tabs-tabpanel-focus-ring-color | Focus ring color of tabpanel |
| tabs.tabpanel.focus.ring.offset | --p-tabs-tabpanel-focus-ring-offset | Focus ring offset of tabpanel |
| tabs.tabpanel.focus.ring.shadow | --p-tabs-tabpanel-focus-ring-shadow | Focus ring shadow of tabpanel |
| tabs.nav.button.background | --p-tabs-nav-button-background | Background of nav button |
| tabs.nav.button.color | --p-tabs-nav-button-color | Color of nav button |
| tabs.nav.button.hover.color | --p-tabs-nav-button-hover-color | Hover color of nav button |
| tabs.nav.button.width | --p-tabs-nav-button-width | Width of nav button |
| tabs.nav.button.focus.ring.width | --p-tabs-nav-button-focus-ring-width | Focus ring width of nav button |
| tabs.nav.button.focus.ring.style | --p-tabs-nav-button-focus-ring-style | Focus ring style of nav button |
| tabs.nav.button.focus.ring.color | --p-tabs-nav-button-focus-ring-color | Focus ring color of nav button |
| tabs.nav.button.focus.ring.offset | --p-tabs-nav-button-focus-ring-offset | Focus ring offset of nav button |
| tabs.nav.button.focus.ring.shadow | --p-tabs-nav-button-focus-ring-shadow | Focus ring shadow of nav button |
| tabs.nav.button.shadow | --p-tabs-nav-button-shadow | Shadow of nav button |
| tabs.active.bar.height | --p-tabs-active-bar-height | Height of active bar |
| tabs.active.bar.bottom | --p-tabs-active-bar-bottom | Bottom of active bar |
| tabs.active.bar.background | --p-tabs-active-bar-background | Background of active bar |

