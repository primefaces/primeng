# Angular TreeTable Component

TreeTable is used to display hierarchical data in tabular format.

## Accessibility

Screen Reader Default role of the table is table . Header, body and footer elements use rowgroup , rows use row role, header cells have columnheader and body cells use cell roles. Sortable headers utilizer aria-sort attribute either set to "ascending" or "descending". Row elements manage aria-expanded for state and aria-level attribute to define the hierachy by ttRow directive. Table rows and table cells should be specified by users using the aria-posinset , aria-setsize , aria-label , and aria-describedby attributes, as they are determined through templating. When selection is enabled, ttSelectableRow directive sets aria-selected to true on a row. In checkbox mode, the built-in checkbox component use checkbox role with aria-checked state attribute. Editable cells use custom templating so you need to manage aria roles and attributes manually if required. Paginator is a standalone component used inside the TreeTable, refer to the paginator for more information about the accessibility features. Sortable Headers Keyboard Support Key Function tab Moves through the headers. enter Sorts the column. space Sorts the column. Keyboard Support Key Function tab Moves focus to the first selected node when focus enters the component, if there is none then first element receives the focus. If focus is already inside the component, moves focus to the next focusable element in the page tab sequence. shift + tab Moves focus to the last selected node when focus enters the component, if there is none then first element receives the focus. If focus is already inside the component, moves focus to the previous focusable element in the page tab sequence. enter Selects the focused treenode. space Selects the focused treenode. down arrow Moves focus to the next treenode. up arrow Moves focus to the previous treenode. right arrow If node is closed, opens the node otherwise moves focus to the first child node. left arrow If node is open, closes the node otherwise moves focus to the parent node.

## Basic

TreeTable requires a collection of TreeNode instances as a value components as children for the representation.

```html
<p-treetable [value]="files" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template #header>
        <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData">
        <tr [ttRow]="rowNode">
            <td>
                <p-treetable-toggler [rowNode]="rowNode" />
                {{ rowData.name }}
            </td>
            <td>{{ rowData.size }}</td>
            <td>{{ rowData.type }}</td>
        </tr>
    </ng-template>
</p-treetable>
```

## Column Group

```html
<p-treetable [value]="sales" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template #header>
        <tr>
            <th rowspan="3">Brand</th>
            <th colspan="4">Sale Rate</th>
        </tr>
        <tr>
            <th colspan="2">Sales</th>
            <th colspan="2">Profits</th>
        </tr>
        <tr>
            <th>Last Year</th>
            <th>This Year</th>
            <th>Last Year</th>
            <th>This Year</th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData">
        <tr>
            <td>
                <p-treetable-toggler [rowNode]="rowNode" />
                {{ rowData.brand }}
            </td>
            <td>{{ rowData.lastYearSale }}</td>
            <td>{{ rowData.thisYearSale }}</td>
            <td>{{ rowData.lastYearProfit }}</td>
            <td>{{ rowData.thisYearProfit }}</td>
        </tr>
    </ng-template>
    <ng-template #footer>
        <tr>
            <td colspan="3">Totals</td>
            <td>$3,283,772</td>
            <td>$2,126,925</td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

@Component({
    selector: 'tree-table-column-group-demo',
    templateUrl: './tree-table-column-group-demo.html',
    standalone: true,
    imports: [TreeTableModule]
})
export class TreeTableColumnGroupDemo implements OnInit {
    sales!: TreeNode[];

    ngOnInit() {
        this.sales = [
            {
                data: { brand: 'Bliss', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' },
                children: [
                    {
                        data: { brand: 'Product A', lastYearSale: '25%', thisYearSale: '20%', lastYearProfit: '$34,406.00', thisYearProfit: '$23,342' },
                        children: [
                            {
                                data: { brand: 'Product A-1', lastYearSale: '20%', thisYearSale: '10%', lastYearProfit: '$24,406.00', thisYearProfit: '$13,342' }
                            },
                            {
                                data: { brand: 'Product A-2', lastYearSale: '5%', thisYearSale: '10%', lastYearProfit: '$10,000.00', thisYearProfit: '$10,000' }
                            }
                        ]
                    },
                    {
                        data: { brand: 'Product B', lastYearSale: '26%', thisYearSale: '20%', lastYearProfit: '$24,000.00', thisYearProfit: '$23,000' }
                    }
                ]
            },
            {
                data: { brand: 'Fate', lastYearSale: '83%', thisYearSale: '96%', lastYearProfit: '$423,132', thisYearProfit: '$312,122' },
                children: [
                    {
                        data: { brand: 'Product X', lastYearSale: '50%', thisYearSale: '40%', lastYearProfit: '$223,132', thisYearProfit: '$156,061' }
                    },
                    {
                        data: { brand: 'Product Y', lastYearSale: '33%', thisYearSale: '56%', lastYearProfit: '$200,000', thisYearProfit: '$156,061' }
                    }
                ]
            },
            {
                data: { brand: 'Ruby', lastYearSale: '38%', thisYearSale: '5%', lastYearProfit: '$12,321', thisYearProfit: '$8,500' },
                children: [
                    {
                        data: { brand: 'Product M', lastYearSale: '18%', thisYearSale: '2%', lastYearProfit: '$10,300', thisYearProfit: '$5,500' }
                    },
                    {
                        data: { brand: 'Product N', lastYearSale: '20%', thisYearSale: '3%', lastYearProfit: '$2,021', thisYearProfit: '$3,000' }
                    }
                ]
            },
            {
                data: { brand: 'Sky', lastYearSale: '49%', thisYearSale: '22%', lastYearProfit: '$745,232', thisYearProfit: '$650,323' },
                children: [
                    {
                        data: { brand: 'Product P', lastYearSale: '20%', thisYearSale: '16%', lastYearProfit: '$345,232', thisYearProfit: '$350,000' }
                    },
                    {
                        data: { brand: 'Product R', lastYearSale: '29%', thisYearSale: '6%', lastYearProfit: '$400,009', thisYearProfit: '$300,323' }
                    }
                ]
            },
            {
                data: { brand: 'Comfort', lastYearSale: '17%', thisYearSale: '79%', lastYearProfit: '$643,242', thisYearProfit: '500,332' },
                children: [
                    {
                        data: { brand: 'Product S', lastYearSale: '10%', thisYearSale: '40%', lastYearProfit: '$243,242', thisYearProfit: '$100,000' }
                    },
                    {
                        data: { brand: 'Product T', lastYearSale: '7%', thisYearSale: '39%', lastYearProfit: '$400,00', thisYearProfit: '$400,332' }
                    }
                ]
            },
            {
                data: { brand: 'Merit', lastYearSale: '52%', thisYearSale: ' 65%', lastYearProfit: '$421,132', thisYearProfit: '$150,005' },
                children: [
                    {
                        data: { brand: 'Product L', lastYearSale: '20%', thisYearSale: '40%', lastYearProfit: '$121,132', thisYearProfit: '$100,000' }
                    },
                    {
                        data: { brand: 'Product G', lastYearSale: '32%', thisYearSale: '25%', lastYearProfit: '$300,000', thisYearProfit: '$50,005' }
                    }
                ]
            },
            {
                data: { brand: 'Violet', lastYearSale: '82%', thisYearSale: '12%', lastYearProfit: '$131,211', thisYearProfit: '$100,214' },
                children: [
                    {
                        data: { brand: 'Product SH1', lastYearSale: '30%', thisYearSale: '6%', lastYearProfit: '$101,211', thisYearProfit: '$30,214' }
                    },
                    {
                        data: { brand: 'Product SH2', lastYearSale: '52%', thisYearSale: '6%', lastYearProfit: '$30,000', thisYearProfit: '$70,000' }
                    }
                ]
            },
            {
                data: { brand: 'Dulce', lastYearSale: '44%', thisYearSale: '45%', lastYearProfit: '$66,442', thisYearProfit: '$53,322' },
                children: [
                    {
                        data: { brand: 'Product PN1', lastYearSale: '22%', thisYearSale: '25%', lastYearProfit: '$33,221', thisYearProfit: '$20,000' }
                    },
                    {
                        data: { brand: 'Product PN2', lastYearSale: '22%', thisYearSale: '25%', lastYearProfit: '$33,221', thisYearProfit: '$33,322' }
                    }
                ]
            },
            {
                data: { brand: 'Solace', lastYearSale: '90%', thisYearSale: '56%', lastYearProfit: '$765,442', thisYearProfit: '$296,232' },
                children: [
                    {
                        data: { brand: 'Product HT1', lastYearSale: '60%', thisYearSale: '36%', lastYearProfit: '$465,000', thisYearProfit: '$150,653' }
                    },
                    {
                        data: { brand: 'Product HT2', lastYearSale: '30%', thisYearSale: '20%', lastYearProfit: '$300,442', thisYearProfit: '$145,579' }
                    }
                ]
            },
            {
                data: { brand: 'Essence', lastYearSale: '75%', thisYearSale: '54%', lastYearProfit: '$21,212', thisYearProfit: '$12,533' },
                children: [
                    {
                        data: { brand: 'Product TS1', lastYearSale: '50%', thisYearSale: '34%', lastYearProfit: '$11,000', thisYearProfit: '$8,562' }
                    },
                    {
                        data: { brand: 'Product TS2', lastYearSale: '25%', thisYearSale: '20%', lastYearProfit: '$11,212', thisYearProfit: '$3,971' }
                    }
                ]
            }
        ];
    }
}
```
</details>

## columnresizeexpanddoc

Setting columnResizeMode as expand changes the table width as well.

```html
<p-treetable [value]="files" [columns]="cols" [resizableColumns]="true" columnResizeMode="expand" showGridlines>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns" ttResizableColumn>
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-resize-expand-demo',
    templateUrl: './tree-table-resize-expand-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableResizeExpandDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## columnresizefitdoc

Columns can be resized with drag and drop when resizableColumns is enabled. Default resize mode is fit that does not change the overall table width.

```html
<p-treetable [value]="files" [columns]="cols" [resizableColumns]="true" [tableStyle]="{'min-width': '50rem'}" showGridlines>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns" ttResizableColumn>
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-resize-fit-demo',
    templateUrl: './tree-table-resize-fit-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableResizeFitDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## columnresizescrollabledoc

To utilize the column resize modes with a scrollable TreeTable, a colgroup template must be defined. The default value of scrollHeight is "flex," it can also be set as a string value.

```html
<p-treetable [value]="files" [columns]="cols" [resizableColumns]="true" [scrollable]="true" scrollHeight="200px" showGridlines>
    <ng-template #colgroup let-columns>
        <colgroup>
            <col *ngFor="let col of columns">
        </colgroup>
    </ng-template>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns" ttResizableColumn>
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-resize-scrollable-demo',
    templateUrl: './tree-table-resize-scrollable-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableResizeScrollableDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## Column Toggle

Column visibility based on a condition can be implemented with dynamic columns, in this sample a MultiSelect is used to manage the visible columns.

```html
<p-treetable [value]="files" [columns]="selectedColumns" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #caption>
        <div style="text-align:left">
            <p-multiselect [options]="cols" [(ngModel)]="selectedColumns" optionLabel="header" selectedItemsLabel="{0} columns selected" [style]="{ width: '20em' }" placeholder="Choose Columns" display="chip" />
        </div>
    </ng-template>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-column-toggle-demo',
    templateUrl: './tree-table-column-toggle-demo.html',
    standalone: true,
    imports: [TreeTableModule, MultiSelectModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableColumnToggleDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    selectedColumns!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.selectedColumns = this.cols;
    }
}
```
</details>

## Conditional Style

Particular rows and cells can be styled based on conditions. The ngClass receives a row data as a parameter to return a style class for a row whereas cells are customized using the body template.

```html
<p-treetable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode" [ngClass]="{ 'p-highlight': rowData.size.endsWith('kb') }">
            <td *ngFor="let col of columns; let i = index" [ngClass]="{ 'font-bold': col.field === 'size' && rowData.size.endsWith('kb') }">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-conditional-style-demo',
    templateUrl: './tree-table-conditional-style-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableConditionalStyleDemo implements OnInit{
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## Context Menu

TreeTable has exclusive integration with ContextMenu using the contextMenu event to open a menu on right click alont with contextMenuSelection properties to control the selection via the menu.

```html
<p-toast [style]="{ marginTop: '80px' }" />

<p-treetable [value]="files" [columns]="cols" dataKey="name" [(contextMenuSelection)]="selectedNode" [contextMenu]="cm" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode" [ttContextMenuRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>

<p-contextmenu #cm [model]="items" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-context-menu-demo',
    templateUrl: './tree-table-context-menu-demo.html',
    standalone: true,
    imports: [TreeTableModule, ToastModule, ContextMenuModule, CommonModule],
    providers: [MessageService, NodeService]
})
export class TreeTableContextMenuDemo implements OnInit{
    files!: TreeNode[];

    selectedNode!: TreeNode;

    cols!: Column[];

    items!: MenuItem[];

    constructor(private nodeService: NodeService, private messageService: MessageService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedNode) },
            { label: 'Toggle', icon: 'pi pi-sort', command: (event) => this.toggleFile(this.selectedNode) }
        ];
    }

    viewFile(node: any) {
        this.messageService.add({ severity: 'info', summary: 'File Selected', detail: node.data.name + ' - ' + node.data.size });
    }

    toggleFile(node: any) {
        node.expanded = !node.expanded;
        this.files = [...this.files];
    }
}
```
</details>

## Controlled

Expansion state is controlled with expandedKeys property.

```html
<p-button (click)="toggleApplications()" label="Toggle Applications" />
<p-treetable [value]="files" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }" class="mt-6">
    <ng-template #header>
        <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData">
        <tr [ttRow]="rowNode">
            <td>
                <p-treetable-toggler [rowNode]="rowNode" />
                {{ rowData.name }}
            </td>
            <td>{{ rowData.size }}</td>
            <td>{{ rowData.type }}</td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'tree-table-controlled-demo',
    templateUrl: './tree-table-controlled-demo.html',
    standalone: true,
    imports: [TreeTableModule, ButtonModule],
    providers: [NodeService]
})
export class TreeTableControlledDemo implements OnInit {
    files!: TreeNode[];

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => {
            this.files = files.slice(0, 5);
            this.cd.markForCheck();
        });
    }

    toggleApplications() {
        if (this.files && this.files.length > 0) {
            const newFiles = [...this.files];
            newFiles[0] = { ...newFiles[0], expanded: !newFiles[0].expanded };
            this.files = newFiles;
        }
    }
}
```
</details>

## Dynamic Columns

Columns can be created programmatically.

```html
<p-treetable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-dynamic-columns-demo',
    templateUrl: './tree-table-dynamic-columns-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableDynamicColumnsDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## editdoc

Incell editing is enabled by defining input elements with treeTableCellEditor .

```html
<p-treetable
    [value]="files"
    [columns]="cols"
    [scrollable]="true"
    [tableStyle]="{'min-width':'50rem'}">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode">
                <td *ngFor="let col of columns; let i = index" ttEditableColumn [ttEditableColumnDisabled]="i == 0" [ngClass]="{ 'p-toggler-column': i === 0 }">
                    <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                    <p-treetableCellEditor>
                        <ng-template pTemplate="input">
                            <input pInputText type="text" [(ngModel)]="rowData[col.field]" />
                        </ng-template>
                        <ng-template pTemplate="output">
                            {{ rowData[col.field] }}
                        </ng-template>
                    </p-treetableCellEditor>
                </td>
            </tr>
        </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-edit-demo',
    templateUrl: './tree-table-edit-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableEditDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## Filter

The filterMode specifies the filtering strategy, in lenient mode when the query matches a node, children of the node are not searched further as all descendants of the node are included. On the other hand, in strict mode when the query matches a node, filtering continues on all descendants. A general filled called filterGlobal is also provided to search all columns that support filtering.

```html
<p-selectbutton [options]="filterModes" [(ngModel)]="filterMode" optionLabel="label" optionValue="value" />

<p-treetable #tt [value]="files" [columns]="cols" [filterMode]="filterMode" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #caption>
        <div class="flex justify-end items-center">
            <p-iconfield>
                <p-inputicon class="pi pi-search" />
                <input type="text" pInputText placeholder="Global Search" (input)="tt.filterGlobal($event.target.value, 'contains')" />
            </p-iconfield>
        </div>
    </ng-template>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of cols">
                {{ col.header }}
            </th>
        </tr>
        <tr>
            <th *ngFor="let col of cols">
                <input pInputText [placeholder]="'Filter by ' + col.field" type="text" (input)="tt.filter($event.target.value, col.field, col.filterMatchMode)" />
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of cols; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
    <ng-template #emptymessage>
        <tr>
            <td [attr.colspan]="cols?.length">No data found.</td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-filter-demo',
    templateUrl: './tree-table-filter-demo.html',
    standalone: true,
    imports: [TreeTableModule, SelectButton, FormsModule, InputTextModule, CommonModule, IconFieldModule, InputIconModule],
    providers: [NodeService]
})
export class TreeTableFilterDemo implements OnInit{
    filterMode = 'lenient';

    filterModes = [
        { label: 'Lenient', value: 'lenient' },
        { label: 'Strict', value: 'strict' }
    ];

    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## flexiblescrolldoc

Flex scroll feature makes the scrollable viewport section dynamic instead of a fixed value so that it can grow or shrink relative to the parent size of the table. Click the button below to display a maximizable Dialog where data viewport adjusts itself according to the size changes.

```html
<p-button label="Show" icon="pi pi-external-link" (onClick)="dialogVisible = true" />
<p-dialog [(visible)]="dialogVisible" header="Flex Scroll" [style]="{ width: '75vw' }" maximizable modal [contentStyle]="{ height: '300px' }">
    <ng-template #content>
        <p-treetable [value]="files" [scrollable]="true" scrollHeight="flex" [tableStyle]="{ 'min-width': '50rem' }">
            <ng-template #header>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Type</th>
                </tr>
            </ng-template>
            <ng-template #body let-rowNode let-rowData="rowData">
                <tr [ttRow]="rowNode">
                    <td>
                        <p-treetable-toggler [rowNode]="rowNode" />
                        {{ rowData.name }}
                    </td>
                    <td>{{ rowData.size }}</td>
                    <td>{{ rowData.type }}</td>
                </tr>
            </ng-template>
        </p-treetable>
    </ng-template>
    <ng-template #footer>
        <p-button label="Ok" icon="pi pi-check" (onClick)="dialogVisible = false" />
    </ng-template>
</p-dialog>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
    selector: 'tree-table-flexible-scroll-demo',
    templateUrl: './tree-table-flexible-scroll-demo.html',
    standalone: true,
    imports: [TreeTableModule, ButtonModule, Dialog],
    providers: [NodeService]
})
export class TreeTableFlexibleScrollDemo implements OnInit {
    files!: TreeNode[];

    dialogVisible: boolean = false;

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => {
            this.files = files;
        });
    }
}
```
</details>

## Grid Lines

Enabling showGridlines displays grid lines.

```html
<p-treetable [value]="files" [scrollable]="true" showGridlines [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData">
        <tr [ttRow]="rowNode">
            <td>
                <p-treetable-toggler [rowNode]="rowNode" />
                {{ rowData.name }}
            </td>
            <td>{{ rowData.size }}</td>
            <td>{{ rowData.type }}</td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';

@Component({
    selector: 'tree-table-gridlines-demo',
    templateUrl: './tree-table-gridlines-demo.html',
    standalone: true,
    imports: [TreeTableModule],
    providers: [NodeService]
})
export class TreeTableGridlinesDemo implements OnInit {
    files!: TreeNode[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
    }
}
```
</details>

## Lazy Load

Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded by invoking corresponding callbacks everytime paging , sorting and filtering occurs. Sample below imitates lazy loading data from a remote datasource using an in-memory list and timeouts to mimic network connection. Enabling the lazy property and assigning the logical number of rows to totalRecords by doing a projection query are the key elements of the implementation so that paginator displays the UI assuming there are actually records of totalRecords size although in reality they are not present on page, only the records that are displayed on the current page exist. In addition, only the root elements should be loaded, children can be loaded on demand using onNodeExpand callback.

```html
<p-treetable
    [value]="files"
    [columns]="cols"
    [paginator]="true"
    [rows]="10"
    [lazy]="true"
    (onLazyLoad)="loadNodes($event)"
    [totalRecords]="1000"
    [loading]="loading"
    (onNodeExpand)="onNodeExpand($event)"
    [scrollable]="true"
    [tableStyle]="{ 'min-width': '50rem' }"
>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-lazy-load-demo',
    templateUrl: './tree-table-lazy-load-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule]
})
export class TreeTableLazyLoadDemo implements OnInit{
    files!: TreeNode[];

    cols!: Column[];

    totalRecords!: number;

    loading: boolean = false;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.totalRecords = 1000;

        this.loading = true;
    }

    loadNodes(event: any) {
        this.loading = true;

        setTimeout(() => {
            this.files = [];

            for (let i = 0; i < event.rows; i++) {
                let node = {
                    data: {
                        name: 'Item ' + (event.first + i),
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'Type ' + (event.first + i)
                    },
                    leaf: false
                };

                this.files.push(node);
            }
            this.loading = false;
            this.cd.markForCheck();
        }, 1000);
    }

    onNodeExpand(event: any) {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            const node = event.node;

            node.children = [
                {
                    data: {
                        name: node.data.name + ' - 0',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    }
                },
                {
                    data: {
                        name: node.data.name + ' - 1',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    }
                }
            ];

            this.files = [...this.files];
            this.cd.markForCheck();
        }, 250);
    }
}
```
</details>

## Basic

Pagination is enabled by adding paginator property and defining rows per page.

```html
<p-treetable [value]="files" [columns]="cols" [paginator]="true" [rows]="5" [rowsPerPageOptions]="[5, 10, 25]" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-paginator-basic-demo',
    templateUrl: './tree-table-paginator-basic-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule]
})
export class TreeTablePaginatorBasicDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    ngOnInit() {
        this.files = [];
        for(let i = 0; i < 50; i++) {
            let node = {
                data:{
                    name: 'Item ' + i,
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + i
                },
                children: [
                    {
                        data: {
                            name: 'Item ' + i + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'Type ' + i
                        }
                    }
                ]
            };

            this.files.push(node);
        }

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## Template

Paginator UI is customized using the paginatorleft and paginatorright property. Each element can also be customized further with your own UI to replace the default one, refer to the Paginator component for more information about the advanced customization options.

```html
<p-treetable [value]="files" [columns]="cols" [paginator]="true" [rows]="10" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
    <ng-template #paginatorleft>
        <p-button icon="pi pi-refresh" text />
    </ng-template>
    <ng-template #paginatorright>
        <p-button icon="pi pi-download" text />
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-paginator-template-demo',
    templateUrl: './tree-table-paginator-template-demo.html',
    standalone: true,
    imports: [TreeTableModule, ButtonModule, CommonModule]
})
export class TreeTablePaginatorTemplateDemo implements OnInit {
    files!: TreeNode[];

    cols: Column[];

    ngOnInit() {
        this.files = [];
        for (let i = 0; i < 50; i++) {
            let node = {
                data: {
                    name: 'Item ' + i,
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + i
                },
                children: [
                    {
                        data: {
                            name: 'Item ' + i + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'Type ' + i
                        }
                    }
                ]
            };

            this.files.push(node);
        }

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## Reorder

Order of the columns can be changed using drag and drop when reorderableColumns is present.

```html
<p-treetable [value]="files" [columns]="cols" [reorderableColumns]="true" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns" ttReorderableColumn>
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0"></p-treetable-toggler>
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-reorder-demo',
    templateUrl: './tree-table-reorder-demo.html'
})
export class TreeTableReorderDemo implements OnInit{
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## scrollfrozencolumnsdoc

A column can be fixed during horizontal scrolling by enabling the frozenColumns property.

```html
<p-treetable [value]="files" [columns]="scrollableCols" [frozenColumns]="frozenCols" [scrollable]="true" scrollHeight="250px" frozenWidth="200px" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #colgroup let-columns>
        <colgroup>
            <col *ngFor="let col of columns" style="width:250px" />
        </colgroup>
    </ng-template>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode" style="height: 57px">
            <td *ngFor="let col of columns; let i = index">
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
    <ng-template #frozenbody let-rowNode let-rowData="rowData">
        <tr [ttRow]="rowNode" style="height: 57px">
            <td>
                <p-treetable-toggler [rowNode]="rowNode" />
                {{ rowData.name }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-scroll-frozen-columns-demo',
    templateUrl: './tree-table-scroll-frozen-columns-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableScrollFrozenColumnsDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    frozenCols!: Column[];

    scrollableCols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.scrollableCols = [
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.frozenCols = [{ field: 'name', header: 'Name' }];
    }
}
```
</details>

## scrollhorizontaldoc

Horizontal scrolling is enabled when the total width of columns exceeds table width.

```html
<p-treetable [value]="files" [columns]="cols" [scrollable]="true" scrollHeight="250px" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template #colgroup let-columns>
        <colgroup>
            <col *ngFor="let col of columns" style="width:500px" />
        </colgroup>
    </ng-template>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0"></p-treetable-toggler>
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-scroll-horizontal-demo',
    templateUrl: './tree-table-scroll-horizontal-demo.html'
})
export class TreeTableScrollHorizontalDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## scrollverticaldoc

Adding scrollable property along with a scrollHeight for the data viewport enables vertical scrolling with fixed headers.

```html
<p-treetable [value]="files" [columns]="cols" [scrollable]="true" scrollHeight="200px" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-scroll-vertical-demo',
    templateUrl: './tree-table-scroll-vertical-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableScrollVerticalDemo implements OnInit{
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## selectioncheckboxdoc

Selection of multiple nodes via checkboxes is enabled by configuring selectionMode as checkbox . In checkbox selection mode, value binding should be a key-value pair where key (or the dataKey) is the node key and value is an object that has checked and partialChecked properties to represent the checked state of a node.

```html
<p-treetable [value]="files" [columns]="cols" selectionMode="checkbox" [(selectionKeys)]="selectionKeys" dataKey="key" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                <p-treetable-checkbox [value]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-selection-checkbox-demo',
    templateUrl: './tree-table-selection-checkbox-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableSelectionCheckboxDemo implements OnInit {
    files!: TreeNode[];

    selectionKeys = {};

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getTreeTableNodes().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.selectionKeys = {
            '0': {
                partialChecked: true
            },
            '0-0': {
                partialChecked: false,
                checked: true
            },
            '0-0-0': {
                checked: true
            },
            '0-0-1': {
                checked: true
            },
            '0-0-2': {
                checked: true
            }
        };
    }
}
```
</details>

## selectioneventscdoc

TreeTable provides onNodeSelect and onNodeUnselect events to listen selection events.

```html
<p-treetable
    [value]="files"
    [columns]="cols"
    selectionMode="single"
    [(selection)]="selectedNode"
    dataKey="name"
    (onNodeSelect)="nodeSelect($event)"
    (onNodeUnselect)="nodeUnselect($event)"
    [scrollable]="true"
    [tableStyle]="{ 'min-width': '50rem' }"
>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

interface NodeEvent {
    originalEvent: Event;
    node: TreeNode;
}

@Component({
    selector: 'tree-table-selection-events-demo',
    templateUrl: './tree-table-selection-events-demo.html',
    standalone: true,
    imports: [TreeTableModule, ToastModule, CommonModule],
    providers: [MessageService, NodeService]
})
export class TreeTableSelectionEventsDemo implements OnInit {
    files!: TreeNode[];

    selectedNode!: TreeNode;

    cols!: Column[];

    constructor(private nodeService: NodeService, private messageService: MessageService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    nodeSelect(event: NodeEvent) {
        this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
    }

    nodeUnselect(event: NodeEvent) {
        this.messageService.add({ severity: 'warn', summary: 'Node Unselected', detail: event.node.data.name });
    }
}
```
</details>

## Multiple

More than one node is selectable by setting selectionMode to multiple . By default in multiple selection mode, metaKey press (e.g. ⌘ ) is necessary to add to existing selections however this can be configured with disabling the metaKeySelection property. Note that in touch enabled devices, TreeTable always ignores metaKey.

```html
<p-toggleswitch [(ngModel)]="metaKeySelection" />
<p-treetable [value]="files" [columns]="cols" selectionMode="multiple" [(selection)]="selectedNodes" dataKey="name" [metaKeySelection]="metaKeySelection" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-selection-multiple-demo',
    templateUrl: './tree-table-selection-multiple-demo.html',
    standalone: true,
    imports: [TreeTableModule, ToggleSwitchModule, FormsModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableSelectionMultipleDemo implements OnInit {
    metaKeySelection: boolean = true;

    files!: TreeNode[];

    selectedNodes!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## Single

Single node selection is configured by setting selectionMode as single along with selection properties to manage the selection value binding. By default, metaKey press (e.g. ⌘ ) is necessary to unselect a node however this can be configured with disabling the metaKeySelection property. In touch enabled devices this option has no effect and behavior is same as setting it to false

```html
<p-treetable [value]="files" [columns]="cols" selectionMode="single" [(selection)]="selectedNode" dataKey="name" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-selection-single-demo',
    templateUrl: './tree-table-selection-single-demo.html',
    standalone: true,
    imports: [TreeTableModule, ToggleSwitchModule, FormsModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableSelectionSingleDemo implements OnInit {
    metaKeySelection: boolean = true;

    files!: TreeNode[];

    selectedNode!: TreeNode;

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## Size

In addition to a regular treetable, alternatives with alternative sizes are available. Add p-treetable-sm class to reduce the size of treetable or p-treetable-lg to enlarge it.

```html
<div class="flex justify-center mb-4">
    <p-selectbutton [options]="sizes" [(ngModel)]="selectedSize" [multiple]="false" optionLabel="name" optionValue="class" />
</div>
<p-treetable [value]="files" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}" [class]="selectedSize">
    <ng-template #header>
        <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData">
        <tr [ttRow]="rowNode">
            <td>
                <p-treetable-toggler [rowNode]="rowNode" />
                {{ rowData.name }}
            </td>
            <td>{{ rowData.size }}</td>
            <td>{{ rowData.type }}</td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'tree-table-size-demo',
    templateUrl: './tree-table-size-demo.html',
    standalone: true,
    imports: [TreeTableModule, SelectButton, FormsModule],
    providers: [NodeService]
})
export class TreeTableSizeDemo implements OnInit {
    files!: TreeNode[];

    sizes!: any[];

    selectedSize: any = '';

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.sizes = [
            { name: 'Small', class: 'p-treetable-sm' },
            { name: 'Normal', class: '' },
            { name: 'Large', class: 'p-treetable-lg' }
        ];
    }
}
```
</details>

## Multiple Columns

Multiple columns can be sorted by defining sortMode as multiple . This mode requires metaKey (e.g. ⌘ ) to be pressed when clicking a header.

```html
<p-treetable [value]="files" [columns]="cols" sortMode="multiple" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns" [ttSortableColumn]="col.field">
                <div class="flex items-center gap-2">
                    {{ col.header }}
                    <p-treetable-sort-icon [field]="col.field" />
                </div>
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-sort-multiple-columns-demo',
    templateUrl: './tree-table-sort-multiple-columns-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableSortMultipleColumnsDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## sortremovabledoc

The removable sort can be implemented using the customSort property.

```html
<p-treetable
    #tt
    [value]="files"
    (sortFunction)="customSort($event)"
    [customSort]="true"
    [columns]="cols"
    selectionMode="single"
    [metaKeySelection]="metaKeySelection"
    [(selection)]="selectedNode"
    dataKey="name"
    [scrollable]="true"
    [tableStyle]="{ 'min-width': '50rem' }"
>
    <ng-template pTemplate="header" let-columns>
        <tr>
            <th *ngFor="let col of columns" [ttSortableColumn]="col.field">
                {{ col.header }}
                <p-treetableSortIcon [field]="col.field" />
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-sort-removable-demo',
    templateUrl: './tree-table-sort-removable-demo.html',
    standalone: true,
    imports: [TreeTableModule, FormsModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableSortRemovableDemo implements OnInit {
    metaKeySelection: boolean = true;

    files!: TreeNode[];

    selectedNode!: TreeNode;

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## Single Column

Sorting on a column is enabled by adding the ttSortableColumn property.

```html
<p-treetable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns" [ttSortableColumn]="col.field">
                <div class="flex items-center gap-2">
                    {{ col.header }}
                    <p-treetable-sort-icon [field]="col.field" />
                </div>
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-sort-single-column-demo',
    templateUrl: './tree-table-sort-single-column-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableSortSingleColumnDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Custom content at caption , header , body and summary sections are supported via templating.

```html
<p-treetable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #caption><div class="text-xl font-bold">File Viewer</div> </ng-template>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index; let last = last">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                    {{ rowData[col.field] }}
                <ng-container *ngIf="last">
                    <p-button icon="pi pi-search" rounded="true" [style]="{ 'margin-right': '.5em' }" />
                    <p-button icon="pi pi-pencil" rounded="true" severity="success" />
                </ng-container>
            </td>
        </tr>
    </ng-template>
    <ng-template #summary>
        <div style="text-align:left">
            <p-button icon="pi pi-refresh" label="Reload" severity="warn" />
        </div>
    </ng-template>
</p-treetable>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-template-demo',
    templateUrl: './tree-table-template-demo.html',
    standalone: true,
    imports: [TreeTableModule, ButtonModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableTemplateDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: '', header: '' }
        ];
    }
}
```
</details>

## Tree Table

TreeTable is used to display hierarchical data in tabular format.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| pt | InputSignal<TreeTablePassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| columns | any[] | - | An array of objects to represent dynamic columns. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| tableStyle | { [klass: string]: any } | - | Inline style of the table. |
| tableStyleClass | string | - | Style class of the table. |
| autoLayout | boolean | false | Whether the cell widths scale according to their content or not. |
| lazy | boolean | false | Defines if data is loaded and interacted with in lazy manner. |
| lazyLoadOnInit | boolean | true | Whether to call lazy loading on initialization. |
| paginator | boolean | false | When specified as true, enables the pagination. |
| rows | number | - | Number of rows to display per page. |
| first | number | 0 | Index of the first row to be displayed. |
| pageLinks | number | 5 | Number of page links to display in paginator. |
| rowsPerPageOptions | any[] | - | Array of integer/object values to display inside rows per page dropdown of paginator |
| alwaysShowPaginator | boolean | true | Whether to show it even there is only one page. |
| paginatorPosition | "top" \| "bottom" \| "both" | bottom | Position of the paginator. |
| paginatorStyleClass | string | - | Custom style class for paginator |
| paginatorDropdownAppendTo | any | - | Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| currentPageReportTemplate | string | {currentPage} of {totalPages} | Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords} |
| showCurrentPageReport | boolean | false | Whether to display current page report. |
| showJumpToPageDropdown | boolean | false | Whether to display a dropdown to navigate to any page. |
| showFirstLastIcon | boolean | true | When enabled, icons are displayed on paginator to go first and last page. |
| showPageLinks | boolean | true | Whether to show page links. |
| defaultSortOrder | number | 1 | Sort order to use when an unsorted column gets sorted by user interaction. |
| sortMode | "multiple" \| "single" | single | Defines whether sorting works on single column or on multiple columns. |
| resetPageOnSort | boolean | true | When true, resets paginator to first page after sorting. |
| customSort | boolean | false | Whether to use the default sorting or a custom one using sortFunction. |
| selectionMode | string | - | Specifies the selection mode, valid values are "single" and "multiple". |
| contextMenuSelection | any | - | Selected row with a context menu. |
| contextMenuSelectionMode | string | separate | Mode of the contet menu selection. |
| dataKey | string | - | A property to uniquely identify a record in data. |
| metaKeySelection | boolean | false | Defines whether metaKey is should be considered for the selection. On touch enabled devices, metaKeySelection is turned off automatically. |
| compareSelectionBy | string | deepEquals | Algorithm to define if a row is selected, valid values are "equals" that compares by reference and "deepEquals" that compares all fields. |
| rowHover | boolean | false | Adds hover effect to rows without the need for selectionMode. |
| loading | boolean | false | Displays a loader to indicate data load is in progress. |
| loadingIcon | string | - | The icon to show while indicating data load is in progress. |
| showLoader | boolean | true | Whether to show the loading mask when loading property is true. |
| scrollable | boolean | false | When specified, enables horizontal and/or vertical scrolling. |
| scrollHeight | string | - | Height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size. |
| virtualScroll | boolean | false | Whether the data should be loaded on demand during scroll. |
| virtualScrollItemSize | number | - | Height of a row to use in calculations of virtual scrolling. |
| virtualScrollOptions | ScrollerOptions | - | Whether to use the scroller feature. The properties of scroller component can be used like an object in it. |
| virtualScrollDelay | number | 150 | The delay (in milliseconds) before triggering the virtual scroll. This determines the time gap between the user's scroll action and the actual rendering of the next set of items in the virtual scroll. |
| frozenWidth | string | - | Width of the frozen columns container. |
| frozenColumns | { [klass: string]: any } | - | An array of objects to represent dynamic columns that are frozen. |
| resizableColumns | boolean | false | When enabled, columns can be resized using drag and drop. |
| columnResizeMode | string | fit | Defines whether the overall table width should change on column resize, valid values are "fit" and "expand". |
| reorderableColumns | boolean | false | When enabled, columns can be reordered using drag and drop. |
| contextMenu | any | - | Local ng-template varilable of a ContextMenu. |
| rowTrackBy | Function | ... | Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. |
| filters | { [s: string]: FilterMetadata } | {} | An array of FilterMetadata objects to provide external filters. |
| globalFilterFields | string[] | - | An array of fields as string to use in global filtering. |
| filterDelay | number | 300 | Delay in milliseconds before filtering the data. |
| filterMode | string | lenient | Mode for filtering valid values are "lenient" and "strict". Default is lenient. |
| filterLocale | string | - | Locale to use in filtering. The default locale is the host environment's current locale. |
| paginatorLocale | string | - | Locale to be used in paginator formatting. |
| totalRecords | number | - | Number of total records, defaults to length of value when not defined. |
| sortField | string | - | Name of the field to sort data by default. |
| sortOrder | number | - | Order to sort when default sorting is enabled. |
| multiSortMeta | SortMeta[] | - | An array of SortMeta objects to sort the data by default in multiple sort mode. |
| selection | any | - | Selected row in single mode or an array of values in multiple mode. |
| value | TreeNode<any>[] | - | An array of objects to display. |
| virtualRowHeight | number | - | Indicates the height of rows to be scrolled. **(Deprecated)** |
| selectionKeys | any | - | A map of keys to control the selection state. |
| showGridlines | boolean | false | Whether to show grid lines between cells. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| selectionChange | value: TreeTableNode<any | Callback to invoke on selected node change. |
| contextMenuSelectionChange | value: TreeTableNode<any | Callback to invoke on context menu selection change. |
| onFilter | event: TreeTableFilterEvent | Callback to invoke when data is filtered. |
| onNodeExpand | event: TreeTableNodeExpandEvent<any | Callback to invoke when a node is expanded. |
| onNodeCollapse | event: TreeTableNodeCollapseEvent<any | Callback to invoke when a node is collapsed. |
| onPage | value: TreeTablePaginatorState | Callback to invoke when pagination occurs. |
| onSort | value: any | Callback to invoke when a column gets sorted. |
| onLazyLoad | event: TreeTableLazyLoadEvent | Callback to invoke when paging, sorting or filtering happens in lazy mode. |
| sortFunction | event: TreeTableSortEvent | An event emitter to invoke on custom sorting, refer to sorting section for details. |
| onColResize | event: TreeTableColResizeEvent | Callback to invoke when a column is resized. |
| onColReorder | event: TreeTableColumnReorderEvent | Callback to invoke when a column is reordered. |
| onNodeSelect | value: TreeTableNode<any | Callback to invoke when a node is selected. |
| onNodeUnselect | event: TreeTableNodeUnSelectEvent | Callback to invoke when a node is unselected. |
| onContextMenuSelect | event: TreeTableContextMenuSelectEvent | Callback to invoke when a node is selected with right click. |
| onHeaderCheckboxToggle | event: TreeTableHeaderCheckboxToggleEvent | Callback to invoke when state of header checkbox changes. |
| onEditInit | event: TreeTableEditEvent | Callback to invoke when a cell switches to edit mode. |
| onEditComplete | event: TreeTableEditEvent | Callback to invoke when cell edit is completed. |
| onEditCancel | event: TreeTableEditEvent | Callback to invoke when cell edit is cancelled with escape key. |
| selectionKeysChange | value: any | Callback to invoke when selectionKeys are changed. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| resetScrollTop |  | void | Resets scroll to top. |
| scrollToVirtualIndex | index: number | void | Scrolls to given index when using virtual scroll. |
| scrollTo | options: ScrollToOptions | void | Scrolls to given index. |
| reset |  | void | Clears the sort and paginator state. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| loading | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the loading's DOM element. |
| mask | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the mask's DOM element. |
| loadingIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the loading icon's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| pcPaginator | PaginatorPassThrough | Used to pass attributes to the Paginator component. |
| wrapper | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the wrapper's DOM element. |
| table | PassThroughOption<HTMLTableElement, I> | Used to pass attributes to the table's DOM element. |
| thead | PassThroughOption<HTMLTableSectionElement, I> | Used to pass attributes to the thead's DOM element. |
| tbody | PassThroughOption<HTMLTableSectionElement, I> | Used to pass attributes to the tbody's DOM element. |
| tfoot | PassThroughOption<HTMLTableSectionElement, I> | Used to pass attributes to the tfoot's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |
| scrollableWrapper | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable wrapper's DOM element. |
| scrollableView | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable container's DOM element. |
| scrollableHeader | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable header's DOM element. |
| scrollableHeaderBox | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable header box's DOM element. |
| scrollableHeaderTable | PassThroughOption<HTMLTableElement, I> | Used to pass attributes to the scrollable header table's DOM element. |
| virtualScroller | VirtualScrollerPassThrough | Used to pass attributes to the Scroller component. |
| scrollableBody | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable body's DOM element. |
| scrollableFooter | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable footer's DOM element. |
| scrollableFooterBox | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable footer box's DOM element. |
| scrollableFooterTable | PassThroughOption<HTMLTableElement, I> | Used to pass attributes to the scrollable footer table's DOM element. |
| columnResizerHelper | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the column resizer helper's DOM element. |
| reorderIndicatorUp | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the reorder indicator up's DOM element. |
| reorderIndicatorDown | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the reorder indicator down's DOM element. |
| sortableColumn | PassThroughOption<HTMLTableCellElement, I> | Used to pass attributes to the sortable column's DOM element. |
| sortableColumnIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the sortable column icon's DOM element. |
| pcSortableColumnBadge | BadgePassThrough | Used to pass attributes to the Badge component for sortable column. |
| row | PassThroughOption<HTMLTableRowElement, I> | Used to pass attributes to the row's DOM element. |
| pcRowCheckbox | CheckboxPassThrough | Used to pass attributes to the Checkbox component for row. |
| pcHeaderCheckbox | CheckboxPassThrough | Used to pass attributes to the Checkbox component for header. |
| cellEditor | PassThroughOption<HTMLElement, I> | Used to pass attributes to the cell editor's DOM element. |
| rowToggleButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the row toggle button's DOM element. |
| toggler | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the toggler's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-treetable | Class name of the root element |
| p-treetable-loading | Class name of the loading element |
| p-treetable-mask | Class name of the mask element |
| p-treetable-loading-icon | Class name of the loading icon element |
| p-treetable-header | Class name of the header element |
| p-treetable-paginator-[position] | Class name of the paginator element |
| p-treetable-table-container | Class name of the table container element |
| p-treetable-table | Class name of the table element |
| p-treetable-thead | Class name of the thead element |
| p-treetable-column-resizer | Class name of the column resizer element |
| p-treetable-column-title | Class name of the column title element |
| p-treetable-sort-icon | Class name of the sort icon element |
| p-treetable-sort-badge | Class name of the sort badge element |
| p-treetable-tbody | Class name of the tbody element |
| p-treetable-node-toggle-button | Class name of the node toggle button element |
| p-treetable-node-toggle-icon | Class name of the node toggle icon element |
| p-treetable-node-checkbox | Class name of the node checkbox element |
| p-treetable-empty-message | Class name of the empty message element |
| p-treetable-tfoot | Class name of the tfoot element |
| p-treetable-footer | Class name of the footer element |
| p-treetable-column-resize-indicator | Class name of the column resize indicator element |
| p-treetable-wrapper | Class name of the wrapper element |
| p-treetable-scrollable-wrapper | Class name of the scrollable wrapper element |
| p-treetable-scrollable-view | Class name of the scrollable view element |
| p-treetable-frozen-view | Class name of the frozen view element |
| p-treetable-column-resizer-helper | Class name of the column resizer helper element |
| p-treetable-reorder-indicator-up | Class name of the reorder indicator up element |
| p-treetable-reorder-indicator-down | Class name of the reorder indicator down element |
| p-treetable-scrollable-header | Class name of the scrollable header element |
| p-treetable-scrollable-header-box | Class name of the scrollable header box element |
| p-treetable-scrollable-header-table | Class name of the scrollable header table element |
| p-treetable-scrollable-body | Class name of the scrollable body element |
| p-treetable-scrollable-footer | Class name of the scrollable footer element |
| p-treetable-scrollable-footer-box | Class name of the scrollable footer box element |
| p-treetable-scrollable-footer-table | Class name of the scrollable footer table element |
| p-sortable-column-icon | Class name of the sortable column icon element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| treetable.transition.duration | --p-treetable-transition-duration | Transition duration of root |
| treetable.border.color | --p-treetable-border-color | Border color of root |
| treetable.header.background | --p-treetable-header-background | Background of header |
| treetable.header.border.color | --p-treetable-header-border-color | Border color of header |
| treetable.header.color | --p-treetable-header-color | Color of header |
| treetable.header.border.width | --p-treetable-header-border-width | Border width of header |
| treetable.header.padding | --p-treetable-header-padding | Padding of header |
| treetable.header.cell.background | --p-treetable-header-cell-background | Background of header cell |
| treetable.header.cell.hover.background | --p-treetable-header-cell-hover-background | Hover background of header cell |
| treetable.header.cell.selected.background | --p-treetable-header-cell-selected-background | Selected background of header cell |
| treetable.header.cell.border.color | --p-treetable-header-cell-border-color | Border color of header cell |
| treetable.header.cell.color | --p-treetable-header-cell-color | Color of header cell |
| treetable.header.cell.hover.color | --p-treetable-header-cell-hover-color | Hover color of header cell |
| treetable.header.cell.selected.color | --p-treetable-header-cell-selected-color | Selected color of header cell |
| treetable.header.cell.gap | --p-treetable-header-cell-gap | Gap of header cell |
| treetable.header.cell.padding | --p-treetable-header-cell-padding | Padding of header cell |
| treetable.header.cell.focus.ring.width | --p-treetable-header-cell-focus-ring-width | Focus ring width of header cell |
| treetable.header.cell.focus.ring.style | --p-treetable-header-cell-focus-ring-style | Focus ring style of header cell |
| treetable.header.cell.focus.ring.color | --p-treetable-header-cell-focus-ring-color | Focus ring color of header cell |
| treetable.header.cell.focus.ring.offset | --p-treetable-header-cell-focus-ring-offset | Focus ring offset of header cell |
| treetable.header.cell.focus.ring.shadow | --p-treetable-header-cell-focus-ring-shadow | Focus ring shadow of header cell |
| treetable.column.title.font.weight | --p-treetable-column-title-font-weight | Font weight of column title |
| treetable.row.background | --p-treetable-row-background | Background of row |
| treetable.row.hover.background | --p-treetable-row-hover-background | Hover background of row |
| treetable.row.selected.background | --p-treetable-row-selected-background | Selected background of row |
| treetable.row.color | --p-treetable-row-color | Color of row |
| treetable.row.hover.color | --p-treetable-row-hover-color | Hover color of row |
| treetable.row.selected.color | --p-treetable-row-selected-color | Selected color of row |
| treetable.row.focus.ring.width | --p-treetable-row-focus-ring-width | Focus ring width of row |
| treetable.row.focus.ring.style | --p-treetable-row-focus-ring-style | Focus ring style of row |
| treetable.row.focus.ring.color | --p-treetable-row-focus-ring-color | Focus ring color of row |
| treetable.row.focus.ring.offset | --p-treetable-row-focus-ring-offset | Focus ring offset of row |
| treetable.row.focus.ring.shadow | --p-treetable-row-focus-ring-shadow | Focus ring shadow of row |
| treetable.body.cell.border.color | --p-treetable-body-cell-border-color | Border color of body cell |
| treetable.body.cell.padding | --p-treetable-body-cell-padding | Padding of body cell |
| treetable.body.cell.gap | --p-treetable-body-cell-gap | Gap of body cell |
| treetable.body.cell.selected.border.color | --p-treetable-body-cell-selected-border-color | Selected border color of body cell |
| treetable.footer.cell.background | --p-treetable-footer-cell-background | Background of footer cell |
| treetable.footer.cell.border.color | --p-treetable-footer-cell-border-color | Border color of footer cell |
| treetable.footer.cell.color | --p-treetable-footer-cell-color | Color of footer cell |
| treetable.footer.cell.padding | --p-treetable-footer-cell-padding | Padding of footer cell |
| treetable.column.footer.font.weight | --p-treetable-column-footer-font-weight | Font weight of column footer |
| treetable.footer.background | --p-treetable-footer-background | Background of footer |
| treetable.footer.border.color | --p-treetable-footer-border-color | Border color of footer |
| treetable.footer.color | --p-treetable-footer-color | Color of footer |
| treetable.footer.border.width | --p-treetable-footer-border-width | Border width of footer |
| treetable.footer.padding | --p-treetable-footer-padding | Padding of footer |
| treetable.column.resizer.width | --p-treetable-column-resizer-width | Width of column resizer |
| treetable.resize.indicator.width | --p-treetable-resize-indicator-width | Width of resize indicator |
| treetable.resize.indicator.color | --p-treetable-resize-indicator-color | Color of resize indicator |
| treetable.sort.icon.color | --p-treetable-sort-icon-color | Color of sort icon |
| treetable.sort.icon.hover.color | --p-treetable-sort-icon-hover-color | Hover color of sort icon |
| treetable.sort.icon.size | --p-treetable-sort-icon-size | Size of sort icon |
| treetable.loading.icon.size | --p-treetable-loading-icon-size | Size of loading icon |
| treetable.node.toggle.button.hover.background | --p-treetable-node-toggle-button-hover-background | Hover background of node toggle button |
| treetable.node.toggle.button.selected.hover.background | --p-treetable-node-toggle-button-selected-hover-background | Selected hover background of node toggle button |
| treetable.node.toggle.button.color | --p-treetable-node-toggle-button-color | Color of node toggle button |
| treetable.node.toggle.button.hover.color | --p-treetable-node-toggle-button-hover-color | Hover color of node toggle button |
| treetable.node.toggle.button.selected.hover.color | --p-treetable-node-toggle-button-selected-hover-color | Selected hover color of node toggle button |
| treetable.node.toggle.button.size | --p-treetable-node-toggle-button-size | Size of node toggle button |
| treetable.node.toggle.button.border.radius | --p-treetable-node-toggle-button-border-radius | Border radius of node toggle button |
| treetable.node.toggle.button.focus.ring.width | --p-treetable-node-toggle-button-focus-ring-width | Focus ring width of node toggle button |
| treetable.node.toggle.button.focus.ring.style | --p-treetable-node-toggle-button-focus-ring-style | Focus ring style of node toggle button |
| treetable.node.toggle.button.focus.ring.color | --p-treetable-node-toggle-button-focus-ring-color | Focus ring color of node toggle button |
| treetable.node.toggle.button.focus.ring.offset | --p-treetable-node-toggle-button-focus-ring-offset | Focus ring offset of node toggle button |
| treetable.node.toggle.button.focus.ring.shadow | --p-treetable-node-toggle-button-focus-ring-shadow | Focus ring shadow of node toggle button |
| treetable.paginator.top.border.color | --p-treetable-paginator-top-border-color | Border color of paginator top |
| treetable.paginator.top.border.width | --p-treetable-paginator-top-border-width | Border width of paginator top |
| treetable.paginator.bottom.border.color | --p-treetable-paginator-bottom-border-color | Border color of paginator bottom |
| treetable.paginator.bottom.border.width | --p-treetable-paginator-bottom-border-width | Border width of paginator bottom |

