# Angular Tabs Component

Tabs is a container component to group content with tabs.

## accessibility-doc

Screen Reader Tabs container is defined with the tablist role, as any attribute is passed to the container element aria-labelledby can be optionally used to specify an element to describe the Tabs. Each tab header has a tab role along with aria-selected state attribute and aria-controls to refer to the corresponding tab content element. The content element of each tab has tabpanel role, an id to match the aria-controls of the header and aria-labelledby reference to the header as the accessible name. Tab Header Keyboard Support Key Function tab Moves focus through the header. enter Activates the focused tab header. space Activates the focused tab header. right arrow Moves focus to the next header. left arrow Moves focus to the previous header. home Moves focus to the last header. end Moves focus to the first header.

## basic-doc

Tabs is defined using TabList , Tab , TabPanels and TabPanel components. Tab and TabPanel components are associated with their value properties

## controlled-doc

Tabs can be controlled programmatically using value property as a model.

## customtemplate-doc

Custom content for a tab is defined with the default ng-content.

## disabled-doc

Enabling disabled property of a Tab prevents user interaction.

## dynamic-doc

Tabs can be generated dynamically using the standard &#64;for block.

## lazy-doc

By default, inactive tab's content is rendered (but hidden). You can use the lazy input (either globally on Tabs or individually on a TabPanel ) to change this behavior so that content is only rendered when the tab becomes active. If a lazy tab contains complex components that should only be initialized when the tab is activated, you should wrap the content inside: &lt;ng-template #content&gt;your content&lt;/ng-template&gt; .

## scrollable-doc

Adding scrollable property displays navigational buttons at each side to scroll between tabs.

## tabmenu-doc

A navigation menu is implemented using tabs without the panels where the content of a tab is provided by a route component like router-outlet . For the purpose of this demo, router-outlet is not included.

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

