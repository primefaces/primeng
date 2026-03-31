# Angular Organization Chart Component

OrganizationChart visualizes hierarchical organization data.

## Accessibility

Screen Reader Component uses ARIA roles and attributes for screen reader accessibility. The root element has role="tree" with aria-multiselectable for multiple selection support. Each tree item uses role="treeitem" with aria-level for hierarchy, aria-expanded for collapse state, and aria-selected for selection state. Child nodes are grouped with role="group" . Keyboard Support Node Key Function tab Moves focus through the focusable nodes within the chart. enter Toggles the selection state of a node. space Toggles the selection state of a node. Collapse Button Key Function tab Moves focus through the focusable elements within the chart. enter Toggles the expanded state of a node. space Toggles the expanded state of a node.

## Basic

OrganizationChart requires a collection of TreeNode instances as a value .

```typescript
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="flex justify-center overflow-x-auto">
            <p-organization-chart [value]="data" />
        </div>
    `,
    standalone: true,
    imports: []
})
export class OrganizationChartBasicDemo {
    data: TreeNode[] = [
        {
            label: 'Founder',
            expanded: true,
            children: [
                {
                    label: 'Product Lead',
                    expanded: true,
                    children: [
                        {
                            label: 'UX/UI Designer'
                        },
                        {
                            label: 'Product Manager'
                        }
                    ]
                },
                {
                    label: 'Engineering Lead',
                    expanded: true,
                    children: [
                        {
                            label: 'Frontend Developer'
                        },
                        {
                            label: 'Backend Developer'
                        }
                    ]
                }
            ]
        }
    ];
}
```

## Collapsible

Nodes can be expanded and collapsed when collapsible is enabled.

```typescript
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="flex justify-center overflow-x-auto">
            <p-organization-chart [value]="data" [collapsible]="true" />
        </div>
    `,
    standalone: true,
    imports: []
})
export class OrganizationChartCollapsibleDemo {
    data: TreeNode[] = [
        {
            label: 'Founder',
            expanded: true,
            children: [
                {
                    label: 'Product Lead',
                    expanded: true,
                    children: [
                        {
                            label: 'UX/UI Designer'
                        },
                        {
                            label: 'Product Manager'
                        }
                    ]
                },
                {
                    label: 'Engineering Lead',
                    expanded: true,
                    children: [
                        {
                            label: 'Frontend Developer'
                        },
                        {
                            label: 'Backend Developer'
                        }
                    ]
                }
            ]
        }
    ];
}
```

## Colored

Styling a specific node is configured with styleClass option of a TreeNode and custom templates.

```typescript
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    template: `
        <div class="overflow-x-auto">
            <p-organization-chart [value]="data" [collapsible]="true">
                <ng-template #node let-node>
                    @if (node.type === 'person') {
                        <div class="flex items-center gap-3">
                            <img [src]="node.data.image" [alt]="node.data.name" class="w-12 h-12" />
                            <div class="flex flex-col items-start gap-1">
                                <span class="font-bold">{{ node.data.name }}</span>
                                <span class="text-sm">{{ node.data.title }}</span>
                            </div>
                        </div>
                    } @else {
                        <div>{{ node.label }}</div>
                    }
                </ng-template>
            </p-organization-chart>
        </div>
    `,
    standalone: true,
    imports: []
})
export class OrganizationChartColoredDemo {
    data: TreeNode[] = [
        {
            expanded: true,
            type: 'person',
            styleClass: 'bg-rose-500/5! border-rose-500! text-rose-900! dark:text-rose-50! rounded-xl',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-emerald-500/5! border-emerald-500! text-emerald-900! dark:text-emerald-50! rounded-xl',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            label: 'Sales'
                        },
                        {
                            label: 'Marketing'
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-blue-500/5! border-blue-500! text-blue-900! dark:text-blue-50! rounded-xl',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development'
                        },
                        {
                            label: 'UI/UX Design'
                        }
                    ]
                }
            ]
        }
    ];
}
```

## Default Collapsed & Selected

Nodes can define collapsedByDefault and selectedByDefault properties to configure the initial state.

```typescript
import { Component } from '@angular/core';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="flex justify-center overflow-x-auto">
            <p-organization-chart [value]="data" [collapsible]="true" selectionMode="single" />
        </div>
    `,
    standalone: true,
    imports: []
})
export class OrganizationChartDefaultDemo {
    data: OrgChartNode[] = [
        {
            label: 'Founder',
            expanded: true,
            children: [
                {
                    label: 'Product Lead',
                    collapsedByDefault: true,
                    expanded: true,
                    children: [
                        {
                            label: 'UX/UI Designer'
                        },
                        {
                            label: 'Product Manager'
                        }
                    ]
                },
                {
                    label: 'Engineering Lead',
                    expanded: true,
                    children: [
                        {
                            label: 'Frontend Developer',
                            selectedByDefault: true
                        },
                        {
                            label: 'Backend Developer'
                        }
                    ]
                }
            ]
        }
    ];
}
```

## Partial Collapsible & Selectable

Collapsible and selectable behaviors can be controlled at the node level using the collapsible and selectable properties of a TreeNode.

```typescript
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="flex justify-center overflow-x-auto">
            <p-organization-chart [value]="data" selectionMode="single" [(selection)]="selectedNode" />
        </div>
    `,
    standalone: true,
    imports: []
})
export class OrganizationChartPartialDemo {
    selectedNode: any;
    data: OrgChartNode[] = [
        {
            label: 'Founder',
            expanded: true,
            collapsible: true,
            selectable: false,
            children: [
                {
                    label: 'Product Lead',
                    expanded: true,
                    children: [
                        {
                            label: 'UX/UI Designer',
                            selectable: false
                        },
                        {
                            label: 'Product Manager'
                        }
                    ]
                },
                {
                    label: 'Engineering Lead',
                    expanded: true,
                    selectable: false,
                    collapsible: true,
                    children: [
                        {
                            label: 'Frontend Developer'
                        },
                        {
                            label: 'Backend Developer'
                        }
                    ]
                }
            ]
        }
    ];
}
```

## selection-doc

Nodes can be selected by defining selectionMode along with a value binding with selection properties. By default only one node can be selected, set selectionMode as multiple to select more than one.

```typescript
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="flex justify-center overflow-x-auto">
            <p-organization-chart [value]="data" selectionMode="multiple" [(selection)]="selectedNodes" />
        </div>
    `,
    standalone: true,
    imports: []
})
export class OrganizationChartSelectionDemo {
    selectedNodes!: TreeNode[];
    data: TreeNode[] = [
        {
            label: 'Founder',
            expanded: true,
            children: [
                {
                    label: 'Product Lead',
                    expanded: true,
                    children: [
                        {
                            label: 'UX/UI Designer'
                        },
                        {
                            label: 'Product Manager'
                        }
                    ]
                },
                {
                    label: 'Engineering Lead',
                    expanded: true,
                    children: [
                        {
                            label: 'Frontend Developer'
                        },
                        {
                            label: 'Backend Developer'
                        }
                    ]
                }
            ]
        }
    ];
}
```

## Template

Custom content instead of a node label is defined using the #node template reference.

```typescript
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    template: `
        <div class="overflow-x-auto">
            <p-organization-chart [value]="data" [collapsible]="true">
                <ng-template #node let-node>
                    <div class="flex items-start gap-2">
                        <img src="https://primefaces.org/cdn/primeng/images/flag/flag_placeholder.png" [alt]="node.label" [class]="'h-full !w-10 flag flag-' + node.data.flag" />
                        <div class="flex flex-col items-start gap-0.5">
                            <div class="font-semibold leading-none">{{ node.label }}</div>
                            <div class="text-xs leading-none opacity-75">{{ node.data.description }}</div>
                        </div>
                    </div>
                </ng-template>
            </p-organization-chart>
        </div>
    `,
    standalone: true,
    imports: []
})
export class OrganizationChartTemplateDemo {
    data: TreeNode[] = [
        {
            label: 'USD',
            expanded: true,
            data: { flag: 'us', description: 'United States Dollar' },
            children: [
                {
                    label: 'CAD',
                    expanded: true,
                    data: { flag: 'ca', description: 'Canadian Dollar' },
                    children: [
                        {
                            label: 'AUD',
                            data: { flag: 'au', description: 'Australian Dollar' }
                        },
                        {
                            label: 'NZD',
                            data: { flag: 'nz', description: 'New Zealand Dollar' }
                        }
                    ]
                },
                {
                    label: 'MXN',
                    expanded: true,
                    data: { flag: 'mx', description: 'Mexican Peso' },
                    children: [
                        {
                            label: 'COP',
                            data: { flag: 'ar', description: 'Argentine Peso' }
                        },
                        {
                            label: 'BRL',
                            data: { flag: 'br', description: 'Brazilian Real' }
                        }
                    ]
                }
            ]
        }
    ];
}
```

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| subtree | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the subtree's DOM element. |
| tree | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the tree's DOM element. |
| node | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the node's DOM element. |
| nodeContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the node content's DOM element. |
| collapseButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the collapse button's DOM element. |
| collapseButtonDownIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the collapse button down icon's DOM element. |
| collapseButtonUpIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the collapse button up icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-organizationchart | Class name of the root element |
| p-organizationchart-subtree | Class name of the subtree element |
| p-organizationchart-tree | Class name of the tree element |
| p-organizationchart-node | Class name of the node element |
| p-organizationchart-node-content | Class name of the node content element |
| p-organizationchart-collapse-button | Class name of the collapse button element |
| p-organizationchart-collapse-button-down-icon | Class name of the collapse button down icon element |
| p-organizationchart-collapse-button-up-icon | Class name of the collapse button up icon element |

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

