# Angular Organization Chart Component

OrganizationChart visualizes hierarchical organization data.

## Accessibility

Screen Reader Component currently uses a table based implementation and does not provide high level of screen reader support, a nested list implementation replacement is planned with aria roles and attributes aligned to a tree widget for high level of reader support in the upcoming versions. Keyboard Support Key Function tab Moves focus through the focusable elements within the chart. enter Toggles the expanded state of a node. space Toggles the expanded state of a node.

## Basic

OrganizationChart requires a collection of TreeNode instances as a value .

## Selection

```html
<p-organization-chart [value]="data" selectionMode="multiple" [(selection)]="selectedNodes" [collapsible]="true">
    <ng-template let-node pTemplate="person">
        <div class="flex flex-col">
            <div class="flex flex-col items-center">
                <img [src]="node.data.image" class="mb-4 w-12 h-12" />
                <div class="font-bold mb-2">{{ node.data.name }}</div>
                <div>{{ node.data.title }}</div>
            </div>
        </div>
    </ng-template>
</p-organization-chart>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    template: `
        <app-docsectiontext>
            <p>
            Nodes can be selected by defining <i>selectionMode</i> along with a value binding with <i>selection</i> properties. By default only one node can be selected, set <i>selectionMode</i> as <i>multiple</i> to select more than one.
        </p></app-docsectiontext
        >
        <div class="card flex justify-center overflow-x-auto">
            <p-organization-chart [value]="data" selectionMode="multiple" [(selection)]="selectedNodes" [collapsible]="true">
                <ng-template let-node pTemplate="person">
                    <div class="flex flex-col">
                        <div class="flex flex-col items-center">
                            <img [src]="node.data.image" class="mb-4 w-12 h-12" />
                            <div class="font-bold mb-2">{{ node.data.name }}</div>
                            <div>{{ node.data.title }}</div>
                        </div>
                    </div>
                </ng-template>
            </p-organization-chart>
        </div>
    `,
    standalone: true,
    imports: []
})
export class OrganizationChartSelectionDemo {
    selectedNodes!: TreeNode[];
    data: TreeNode[];
}
```
</details>

## Template

Custom content instead of a node label is defined using the pTemplate property.

```html
<p-organization-chart [value]="data" [collapsible]="true">
    <ng-template let-node pTemplate="default">
        <div class="flex flex-col items-center">
            <img src="https://primefaces.org/cdn/primeng/images/flag/flag_placeholder.png" [alt]="node.label" [class]="'flag' + ' flag-' + node.data" width="32" />
            <div class="mt-4 font-medium text-lg">{{ node.label }}</div>
        </div>
    </ng-template>
</p-organization-chart>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    template: `
        <div class="card overflow-x-auto">
            <p-organization-chart [value]="data" [collapsible]="true">
                <ng-template let-node pTemplate="default">
                    <div class="flex flex-col items-center">
                        <img src="https://primefaces.org/cdn/primeng/images/flag/flag_placeholder.png" [alt]="node.label" [class]="'flag' + ' flag-' + node.data" width="32" />
                        <div class="mt-4 font-medium text-lg">{{ node.label }}</div>
                    </div>
                </ng-template>
            </p-organization-chart>
        </div>
    `,
    standalone: true,
    imports: []
})
export class OrganizationChartTemplateDemo {
    data: TreeNode[];
}
```
</details>

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| table | PassThroughOption<HTMLTableElement, I> | Used to pass attributes to the table's DOM element. |
| body | PassThroughOption<HTMLTableSectionElement, I> | Used to pass attributes to the body's DOM element. |
| row | PassThroughOption<HTMLTableRowElement, I> | Used to pass attributes to the row's DOM element. |
| cell | PassThroughOption<HTMLTableCellElement, I> | Used to pass attributes to the cell's DOM element. |
| node | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the node's DOM element. |
| nodeToggleButton | PassThroughOption<HTMLAnchorElement, I> | Used to pass attributes to the node toggle button's DOM element. |
| nodeToggleButtonIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the node toggle button icon's DOM element. |
| connectors | PassThroughOption<HTMLTableRowElement, I> | Used to pass attributes to the connectors' DOM element. |
| lineCell | PassThroughOption<HTMLTableCellElement, I> | Used to pass attributes to the line cell's DOM element. |
| connectorDown | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the connector down's DOM element. |
| connectorLeft | PassThroughOption<HTMLTableCellElement, I> | Used to pass attributes to the connector left's DOM element. |
| connectorRight | PassThroughOption<HTMLTableCellElement, I> | Used to pass attributes to the connector right's DOM element. |
| nodeChildren | PassThroughOption<HTMLTableRowElement, I> | Used to pass attributes to the node children's DOM element. |
| nodeCell | PassThroughOption<HTMLTableCellElement, I> | Used to pass attributes to the node cell's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-organizationchart | Class name of the root element |
| p-organizationchart-table | Class name of the table element |
| p-organizationchart-node | Class name of the node element |
| p-organizationchart-node-toggle-button | Class name of the node toggle button element |
| p-organizationchart-node-toggle-button-icon | Class name of the node toggle button icon element |
| p-organizationchart-connectors | Class name of the connectors element |
| p-organizationchart-connector-down | Class name of the connector down element |
| p-organizationchart-connector-left | Class name of the connector left element |
| p-organizationchart-connector-right | Class name of the connector right element |
| p-organizationchart-node-children | Class name of the node children element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| organizationchart.gutter | --p-organizationchart-gutter | Gutter of root |
| organizationchart.transition.duration | --p-organizationchart-transition-duration | Transition duration of root |
| organizationchart.node.background | --p-organizationchart-node-background | Background of node |
| organizationchart.node.hover.background | --p-organizationchart-node-hover-background | Hover background of node |
| organizationchart.node.selected.background | --p-organizationchart-node-selected-background | Selected background of node |
| organizationchart.node.border.color | --p-organizationchart-node-border-color | Border color of node |
| organizationchart.node.color | --p-organizationchart-node-color | Color of node |
| organizationchart.node.selected.color | --p-organizationchart-node-selected-color | Selected color of node |
| organizationchart.node.hover.color | --p-organizationchart-node-hover-color | Hover color of node |
| organizationchart.node.padding | --p-organizationchart-node-padding | Padding of node |
| organizationchart.node.toggleable.padding | --p-organizationchart-node-toggleable-padding | Toggleable padding of node |
| organizationchart.node.border.radius | --p-organizationchart-node-border-radius | Border radius of node |
| organizationchart.node.toggle.button.background | --p-organizationchart-node-toggle-button-background | Background of node toggle button |
| organizationchart.node.toggle.button.hover.background | --p-organizationchart-node-toggle-button-hover-background | Hover background of node toggle button |
| organizationchart.node.toggle.button.border.color | --p-organizationchart-node-toggle-button-border-color | Border color of node toggle button |
| organizationchart.node.toggle.button.color | --p-organizationchart-node-toggle-button-color | Color of node toggle button |
| organizationchart.node.toggle.button.hover.color | --p-organizationchart-node-toggle-button-hover-color | Hover color of node toggle button |
| organizationchart.node.toggle.button.size | --p-organizationchart-node-toggle-button-size | Size of node toggle button |
| organizationchart.node.toggle.button.border.radius | --p-organizationchart-node-toggle-button-border-radius | Border radius of node toggle button |
| organizationchart.node.toggle.button.focus.ring.width | --p-organizationchart-node-toggle-button-focus-ring-width | Focus ring width of node toggle button |
| organizationchart.node.toggle.button.focus.ring.style | --p-organizationchart-node-toggle-button-focus-ring-style | Focus ring style of node toggle button |
| organizationchart.node.toggle.button.focus.ring.color | --p-organizationchart-node-toggle-button-focus-ring-color | Focus ring color of node toggle button |
| organizationchart.node.toggle.button.focus.ring.offset | --p-organizationchart-node-toggle-button-focus-ring-offset | Focus ring offset of node toggle button |
| organizationchart.node.toggle.button.focus.ring.shadow | --p-organizationchart-node-toggle-button-focus-ring-shadow | Focus ring shadow of node toggle button |
| organizationchart.connector.color | --p-organizationchart-connector-color | Color of connector |
| organizationchart.connector.border.radius | --p-organizationchart-connector-border-radius | Border radius of connector |
| organizationchart.connector.height | --p-organizationchart-connector-height | Height of connector |

