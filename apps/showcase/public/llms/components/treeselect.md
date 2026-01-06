# Angular TreeSelect Component

TreeSelect is a form component to choose from hierarchical data.

## Accessibility

Screen Reader Value to describe the component can either be provided with ariaLabelledby or ariaLabel props. The treeselect element has a combobox role in addition to aria-haspopup and aria-expanded attributes. The relation between the combobox and the popup is created with aria-controls that refers to the id of the popup. The popup list has an id that refers to the aria-controls attribute of the combobox element and uses tree as the role. Each list item has a treeitem role along with aria-label , aria-selected and aria-expanded attributes. In checkbox selection, aria-checked is used instead of aria-selected . Checkbox and toggle icons are hidden from screen readers as their parent element with treeitem role and attributes are used instead for readers and keyboard support. The container element of a treenode has the group role. The aria-setsize , aria-posinset and aria-level attributes are calculated implicitly and added to each treeitem. If filtering is enabled, filterInputProps can be defined to give aria-* props to the filter input element.

## Basic

TreeSelect is used as a controlled component with ng-model directive along with an options collection. Internally Tree component is used so the options model is based on TreeNode API. In single selection mode, value binding should be the key value of a node.

```html
<p-treeselect class="md:w-80 w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" />
```

## Checkbox

Selection of multiple nodes via checkboxes is enabled by configuring selectionMode as checkbox .

```html
<p-treeselect class="w-full md:w-80" [(ngModel)]="selectedNodes" [options]="nodes" display="chip" [metaKeySelection]="false" selectionMode="checkbox" placeholder="Select Item" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-treeselect class="w-full md:w-80" [(ngModel)]="selectedNodes" [options]="nodes" display="chip" [metaKeySelection]="false" selectionMode="checkbox" placeholder="Select Item" />
        </div>
    `,
    standalone: true,
    imports: [TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectCheckboxDemo implements OnInit {
    nodes!: any[];
    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## Clear Icon

When showClear is enabled, a clear icon is displayed to clear the value.

```html
<p-treeselect [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" class="md:w-80 w-full" [showClear]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-treeselect [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" class="md:w-80 w-full" [showClear]="true" />
        </div>
    `,
    standalone: true,
    imports: [TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectCleariconDemo implements OnInit {
    nodes!: any[];
    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-treeselect class="md:w-80 w-full" [(ngModel)]="selectedNodes" [options]="nodes" [disabled]="true" placeholder="TreeSelect" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-treeselect class="md:w-80 w-full" [(ngModel)]="selectedNodes" [options]="nodes" [disabled]="true" placeholder="TreeSelect" />
        </div>
    `,
    standalone: true,
    imports: [TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectDisabledDemo implements OnInit {
    nodes!: any[];
    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```html
<p-treeselect class="md:w-80 w-full" [(ngModel)]="selectedNodes" variant="filled" [options]="nodes" placeholder="Select Item" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-treeselect class="md:w-80 w-full" [(ngModel)]="selectedNodes" variant="filled" [options]="nodes" placeholder="Select Item" />
        </div>
    `,
    standalone: true,
    imports: [TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectFilledDemo implements OnInit {
    nodes!: any[];
    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## Filter

Filtering is enabled by adding the filter property, by default label property of a node is used to compare against the value in the text field, in order to customize which field(s) should be used during search define filterBy property. In addition filterMode specifies the filtering strategy. In lenient mode when the query matches a node, children of the node are not searched further as all descendants of the node are included. On the other hand, in strict mode when the query matches a node, filtering continues on all descendants.

```html
<p-treeselect class="md:w-80 w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" [filter]="true" [filterInputAutoFocus]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-treeselect class="md:w-80 w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" [filter]="true" [filterInputAutoFocus]="true" />
        </div>
    `,
    standalone: true,
    imports: [TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectFilterDemo implements OnInit {
    nodes!: any[];
    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## Float Label

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

```html
<p-floatlabel class="w-full md:w-80">
    <p-treeselect [(ngModel)]="value1" inputId="over_label" [options]="nodes" class="w-full" />
    <label for="over_label">Over Label</label>
</p-floatlabel>
<p-floatlabel class="w-full md:w-80" variant="in">
    <p-treeselect [(ngModel)]="value2" inputId="in_label" [options]="nodes" class="w-full" />
    <label for="in_label">In Label</label>
</p-floatlabel>
<p-floatlabel class="w-full md:w-80" variant="on">
    <p-treeselect [(ngModel)]="value3" inputId="on_label" [options]="nodes" class="w-full" />
    <label for="on_label">On Label</label>
</p-floatlabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel class="w-full md:w-80">
                <p-treeselect [(ngModel)]="value1" inputId="over_label" [options]="nodes" class="w-full" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>
            <p-floatlabel class="w-full md:w-80" variant="in">
                <p-treeselect [(ngModel)]="value2" inputId="in_label" [options]="nodes" class="w-full" />
                <label for="in_label">In Label</label>
            </p-floatlabel>
            <p-floatlabel class="w-full md:w-80" variant="on">
                <p-treeselect [(ngModel)]="value3" inputId="on_label" [options]="nodes" class="w-full" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
    `,
    standalone: true,
    imports: [FloatLabelModule, TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectFloatlabelDemo implements OnInit {
    nodes!: any[];
    value1: any;
    value2: any;
    value3: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```html
<p-treeselect [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" fluid />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card">
            <p-treeselect [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" fluid />
        </div>
    `,
    standalone: true,
    imports: [TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectFluidDemo implements OnInit {
    nodes!: any[];
    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```html
<p-iftalabel class="w-full md:w-80">
    <p-treeselect [(ngModel)]="selectedValue" inputId="t_file" [options]="nodes" class="w-full" />
    <label for="t_file">File</label>
</p-iftalabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-iftalabel class="w-full md:w-80">
                <p-treeselect [(ngModel)]="selectedValue" inputId="t_file" [options]="nodes" class="w-full" />
                <label for="t_file">File</label>
            </p-iftalabel>
        </div>
    `,
    standalone: true,
    imports: [IftaLabelModule, TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectIftalabelDemo implements OnInit {
    nodes!: any[];
    selectedValue: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<p-treeselect [invalid]="selectedValue1 === undefined" [(ngModel)]="selectedValue1" [options]="nodes" placeholder="TreeSelect" class="md:w-80 w-full" />
<p-treeselect [invalid]="selectedValue2 === undefined" [(ngModel)]="selectedValue2" [options]="nodes" placeholder="TreeSelect" class="md:w-80 w-full" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center gap-4">
            <p-treeselect [invalid]="selectedValue1 === undefined" [(ngModel)]="selectedValue1" [options]="nodes" placeholder="TreeSelect" class="md:w-80 w-full" />
            <p-treeselect [invalid]="selectedValue2 === undefined" [(ngModel)]="selectedValue2" [options]="nodes" placeholder="TreeSelect" class="md:w-80 w-full" />
        </div>
    `,
    standalone: true,
    imports: [TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectInvalidDemo implements OnInit {
    nodes!: any[];
    selectedValue1: any;
    selectedValue2: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## Lazy

Lazy loading is useful when dealing with huge datasets, in this example nodes are dynamically loaded on demand using loading property and onNodeExpand method.

```html
<p-treeselect
    class="w-full md:w-80"
    [(ngModel)]="selectedNodes"
    (onNodeExpand)="onNodeExpand($event)"
    [options]="nodes()"
    display="chip"
    [metaKeySelection]="false"
    selectionMode="checkbox"
    placeholder="Select Item"
    [loading]="loading"
    loadingMode="icon"
/>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-treeselect
                class="w-full md:w-80"
                [(ngModel)]="selectedNodes"
                (onNodeExpand)="onNodeExpand($event)"
                [options]="nodes()"
                display="chip"
                [metaKeySelection]="false"
                selectionMode="checkbox"
                placeholder="Select Item"
                [loading]="loading"
                loadingMode="icon"
            />
        </div>
    `,
    standalone: true,
    imports: [TreeSelectModule, FormsModule]
})
export class TreeselectLazyDemo implements OnInit {
    selectedNodes: TreeNode[] = [];
    nodes = signal<TreeNode[]>(undefined);
    loading = signal<boolean>(false);

    ngOnInit() {
        this.loading.set(true);
        this.nodes.set(this.initiateNodes());
    }

    initiateNodes(): TreeNode[] {
        return [
            {
                key: '0',
                label: 'Node 0',
                leaf: false,
                loading: false
            },
            {
                key: '1',
                label: 'Node 1',
                leaf: false,
                loading: false
            },
            {
                key: '2',
                label: 'Node 2',
                leaf: false,
                loading: false
            }
        ];
    }

    onNodeExpand(event: any) {
        if (!event.node.children) {
            event.node.loading = true;
        
            setTimeout(() => {
                const _nodes = this.nodes();
                let _node = { ...event.node };
                _node.children = [];
        
                for (let i = 0; i < 3; i++) {
                    _node.children.push({
                        key: event.node.key + '-' + i,
                        label: 'Lazy ' + event.node.label + '-' + i
                    });
                }
        
                const key = parseInt(_node.key, 10);
                _nodes[key] = { ..._node, loading: false };
                this.nodes.set([..._nodes]);
            }, 500);
        }
    }
}
```
</details>

## Multiple

More than one node is selectable by setting selectionMode to multiple . By default in multiple selection mode, metaKey press (e.g. ⌘ ) is necessary to add to existing selections however this can be configured with disabling the metaKeySelection property. Note that in touch enabled devices, TreeSelect always ignores metaKey. In multiple selection mode, value binding should be a key-value pair where key is the node key and value is a boolean to indicate selection.

```html
<p-treeselect class="w-full md:w-80" [(ngModel)]="selectedNodes" [options]="nodes" [metaKeySelection]="false" selectionMode="multiple" placeholder="Select Item" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-treeselect class="w-full md:w-80" [(ngModel)]="selectedNodes" [options]="nodes" [metaKeySelection]="false" selectionMode="multiple" placeholder="Select Item" />
        </div>
    `,
    standalone: true,
    imports: [TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectMultipleDemo implements OnInit {
    nodes!: any[];
    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## reactiveforms-doc

TreeSelect can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full md:w-80">
    <div class="flex flex-col gap-1">
        <p-treeselect class="md:w-80 w-full" formControlName="selectedNodes" [options]="nodes" placeholder="Select Item" [invalid]="isInvalid('selectedNodes')" />
        @if (isInvalid('selectedNodes')) {
            <p-message severity="error" size="small" variant="simple">Selection is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TreeSelectModule } from 'primeng/treeselect';
import { ButtonModule } from 'primeng/button';
import { NodeService } from '@/service/nodeservice';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full md:w-80">
                <div class="flex flex-col gap-1">
                    <p-treeselect class="md:w-80 w-full" formControlName="selectedNodes" [options]="nodes" placeholder="Select Item" [invalid]="isInvalid('selectedNodes')" />
                    @if (isInvalid('selectedNodes')) {
                        <p-message severity="error" size="small" variant="simple">Selection is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [MessageModule, ToastModule, TreeSelectModule, ButtonModule, ReactiveFormsModule],
    providers: [NodeService]
})
export class TreeselectReactiveformsDemo implements OnInit {
    messageService = inject(MessageService);
    nodes!: any[];
    exampleForm: FormGroup | undefined;
    formSubmitted: boolean = false;

    ngOnInit() {
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            this.exampleForm.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.exampleForm.get(controlName);
        return control?.invalid && this.formSubmitted;
    }
}
```
</details>

## Sizes

TreeSelect provides small and large sizes as alternatives to the base.

```html
<p-treeselect [(ngModel)]="value1" [options]="nodes" size="small" placeholder="Small" class="md:w-80 w-full" />
<p-treeselect [(ngModel)]="value2" [options]="nodes" placeholder="Normal" class="md:w-80 w-full" />
<p-treeselect [(ngModel)]="value3" [options]="nodes" size="large" placeholder="Large" class="md:w-80 w-full" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card flex flex-col items-center gap-4">
            <p-treeselect [(ngModel)]="value1" [options]="nodes" size="small" placeholder="Small" class="md:w-80 w-full" />
            <p-treeselect [(ngModel)]="value2" [options]="nodes" placeholder="Normal" class="md:w-80 w-full" />
            <p-treeselect [(ngModel)]="value3" [options]="nodes" size="large" placeholder="Large" class="md:w-80 w-full" />
        </div>
    `,
    standalone: true,
    imports: [TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectSizesDemo implements OnInit {
    nodes!: any[];
    value1: any;
    value2: any;
    value3: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## Template

TreeSelect offers multiple templates for customization through templating.

```html
<p-treeselect class="md:w-80 w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item">
    <ng-template #dropdownicon>
        <i class="pi pi-search"></i>
    </ng-template>
    <ng-template #header>
        <div class="font-medium px-3 py-2">Available Files</div>
    </ng-template>
    <ng-template #footer>
        <div class="px-3 pt-1 pb-2 flex justify-between">
            <p-button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
            <p-button label="Remove All" severity="danger" text size="small" icon="pi pi-plus" />
        </div>
    </ng-template>
</p-treeselect>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-treeselect class="md:w-80 w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item">
                <ng-template #dropdownicon>
                    <i class="pi pi-search"></i>
                </ng-template>
                <ng-template #header>
                    <div class="font-medium px-3 py-2">Available Files</div>
                </ng-template>
                <ng-template #footer>
                    <div class="px-3 pt-1 pb-2 flex justify-between">
                        <p-button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
                        <p-button label="Remove All" severity="danger" text size="small" icon="pi pi-plus" />
                    </div>
                </ng-template>
            </p-treeselect>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectTemplateDemo implements OnInit {
    nodes!: any[];
    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## templatedrivenforms-doc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4 w-full md:w-80">
    <div class="flex flex-col gap-1">
        <p-treeselect #node="ngModel" [(ngModel)]="selectedNodes" [invalid]="node.invalid && exampleForm.submitted" name="node" class="md:w-80 w-full" [options]="nodes" placeholder="Select Item" required />
        @if (node.invalid && exampleForm.submitted) {
            <p-message severity="error" size="small" variant="simple">Selection is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TreeSelectModule } from 'primeng/treeselect';
import { ButtonModule } from 'primeng/button';
import { NodeService } from '@/service/nodeservice';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <p-toast />
        <div class="card flex justify-center">
            <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4 w-full md:w-80">
                <div class="flex flex-col gap-1">
                    <p-treeselect #node="ngModel" [(ngModel)]="selectedNodes" [invalid]="node.invalid && exampleForm.submitted" name="node" class="md:w-80 w-full" [options]="nodes" placeholder="Select Item" required />
                    @if (node.invalid && exampleForm.submitted) {
                        <p-message severity="error" size="small" variant="simple">Selection is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [MessageModule, ToastModule, TreeSelectModule, ButtonModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectTemplatedrivenformsDemo implements OnInit {
    messageService = inject(MessageService);
    selectedNodes: any;
    nodes!: any[];

    ngOnInit() {
    }

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            form.resetForm();
        }
    }
}
```
</details>

## virtualscroll-doc

VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance issues. Usage is simple as setting virtualScroll property to true and defining virtualScrollItemSize to specify the height of an item.

```html
<p-treeselect
    class="w-full md:w-80"
    [(ngModel)]="selectedNodes"
    [options]="nodes"
    display="chip"
    [metaKeySelection]="false"
    selectionMode="checkbox"
    placeholder="Select Item"
    [virtualScroll]="true"
    [virtualScrollItemSize]="35"
    [virtualScrollOptions]="{ scrollHeight: '200px' }"
></p-treeselect>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { NodeService } from '@/service/nodeservice';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-treeselect
                class="w-full md:w-80"
                [(ngModel)]="selectedNodes"
                [options]="nodes"
                display="chip"
                [metaKeySelection]="false"
                selectionMode="checkbox"
                placeholder="Select Item"
                [virtualScroll]="true"
                [virtualScrollItemSize]="35"
                [virtualScrollOptions]="{ scrollHeight: '200px' }"
            ></p-treeselect>
        </div>
    `,
    standalone: true,
    imports: [TreeSelectModule, FormsModule],
    providers: [NodeService]
})
export class TreeselectVirtualscrollDemo implements OnInit {
    nodes!: any[];
    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getLargeTreeNodes().then((files) => (this.nodes = files));
    }

    ngOnInit() {
    }
}
```
</details>

## Tree Select

TreeSelect is a form component to choose from hierarchical data.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<TreeSelectPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| inputId | string | - | Identifier of the underlying input element. |
| scrollHeight | string | 400px | Height of the viewport, a scrollbar is defined if height of list exceeds this value. |
| metaKeySelection | boolean | false | Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically. |
| display | "chip" \| "comma" | comma | Defines how the selected items are displayed. |
| selectionMode | "multiple" \| "single" \| "checkbox" | single | Defines the selection mode. |
| tabindex | string | 0 | Index of the element in tabbing order. |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| placeholder | string | - | Label to display when there are no selections. |
| panelClass | string \| string[] \| Set<string> \| { [klass: string]: any } | - | Style class of the overlay panel. |
| panelStyle | { [klass: string]: any } | - | Inline style of the panel element. |
| panelStyleClass | string | - | Style class of the panel element. |
| containerStyle | { [klass: string]: any } | - | Inline style of the container element. **(Deprecated)** |
| containerStyleClass | string | - | Style class of the container element. **(Deprecated)** |
| labelStyle | { [klass: string]: any } | - | Inline style of the label element. |
| labelStyleClass | string | - | Style class of the label element. |
| overlayOptions | OverlayOptions | - | Specifies the options for the overlay. |
| emptyMessage | string | - | Text to display when there are no options available. Defaults to value from PrimeNG locale configuration. |
| filter | boolean | false | When specified, displays an input field to filter the items. |
| filterBy | string | label | When filtering is enabled, filterBy decides which field or fields (comma separated) to search against. |
| filterMode | string | lenient | Mode for filtering valid values are "lenient" and "strict". Default is lenient. |
| filterPlaceholder | string | - | Placeholder text to show when filter input is empty. |
| filterLocale | string | - | Locale to use in filtering. The default locale is the host environment's current locale. |
| filterInputAutoFocus | boolean | true | Determines whether the filter input should be automatically focused when the component is rendered. |
| propagateSelectionDown | boolean | true | Whether checkbox selections propagate to descendant nodes. |
| propagateSelectionUp | boolean | true | Whether checkbox selections propagate to ancestor nodes. |
| showClear | boolean | false | When enabled, a clear icon is displayed to clear the value. |
| resetFilterOnHide | boolean | true | Clears the filter value when hiding the dropdown. |
| virtualScroll | boolean | false | Whether the data should be loaded on demand during scroll. |
| virtualScrollItemSize | number | - | Height of an item in the list for VirtualScrolling. |
| virtualScrollOptions | ScrollerOptions | - | Whether to use the scroller feature. The properties of scroller component can be used like an object in it. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| options | TreeNode<any>[] | - | An array of treenodes. |
| loading | boolean | false | Displays a loader to indicate data load is in progress. |
| loadingMode | "icon" \| "mask" | mask | Loading mode display. |
| size | InputSignal<"small" \| "large"> | undefined | Specifies the size of the component. |
| variant | InputSignal<"outlined" \| "filled"> | undefined | Specifies the input variant of the component. |
| fluid | InputSignalWithTransform<boolean, unknown> | undefined | Spans 100% width of the container when enabled. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onNodeExpand | event: TreeSelectNodeExpandEvent | Callback to invoke when a node is expanded. |
| onNodeCollapse | event: TreeSelectNodeCollapseEvent | Callback to invoke when a node is collapsed. |
| onShow | value: any | Callback to invoke when the overlay is shown. |
| onHide | event: Event | Callback to invoke when the overlay is hidden. |
| onClear | value: any | Callback to invoke when input field is cleared. |
| onFilter | event: TreeFilterEvent | Callback to invoke when data is filtered. |
| onFocus | event: Event | Callback to invoke when treeselect gets focus. |
| onBlur | event: Event | Callback to invoke when treeselect loses focus. |
| onNodeUnselect | event: TreeNodeUnSelectEvent | Callback to invoke when a node is unselected. |
| onNodeSelect | event: TreeNodeSelectEvent | Callback to invoke when a node is selected. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| value | TemplateRef<TreeSelectValueTemplateContext> | Custom value template. |
| header | TemplateRef<TreeSelectHeaderTemplateContext> | Custom header template. |
| empty | TemplateRef<void> | Custom empty message template. |
| footer | TemplateRef<TreeSelectHeaderTemplateContext> | Custom footer template. |
| clearicon | TemplateRef<void> | Custom clear icon template. |
| triggericon | TemplateRef<void> | Custom trigger icon template. |
| dropdownicon | TemplateRef<void> | Custom dropdown icon template. |
| filtericon | TemplateRef<void> | Custom filter icon template. |
| closeicon | TemplateRef<void> | Custom close icon template. |
| itemtogglericon | TemplateRef<TreeSelectItemTogglerIconTemplateContext> | Custom item toggler icon template. |
| itemcheckboxicon | TemplateRef<TreeSelectItemCheckboxIconTemplateContext> | Custom item checkbox icon template. |
| itemloadingicon | TemplateRef<void> | Custom item loading icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| hiddenInputContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the hidden input container's DOM element. |
| hiddenInput | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the hidden input's DOM element. |
| labelContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the label container's DOM element. |
| label | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the label's DOM element. |
| chipItem | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the chip item's DOM element. |
| pcChip | ChipPassThrough | Used to pass attributes to the Chip component. |
| clearIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the clear icon's DOM element. |
| dropdown | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the dropdown's DOM element. |
| dropdownIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the dropdown icon's DOM element. |
| panel | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the panel's DOM element. |
| hiddenFirstFocusableEl | PassThroughOption<HTMLElement, I> | Used to pass attributes to the first hidden focusable element's DOM element. |
| treeContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the tree container's DOM element. |
| pcTree | TreePassThrough | Used to pass attributes to the Tree component. |
| hiddenLastFocusableEl | PassThroughOption<HTMLElement, I> | Used to pass attributes to the last hidden focusable element's DOM element. |
| pcOverlay | OverlayPassThrough | Used to pass attributes to the Overlay component. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-treeselect | Class name of the root element |
| p-treeselect-label-container | Class name of the label container element |
| p-treeselect-label | Class name of the label element |
| p-treeselect-chip-item | Class name of the chip item element |
| p-treeselect-clear-icon | Class name of the clear icon element |
| p-treeselect-chip | Class name of the chip element |
| p-treeselect-dropdown | Class name of the dropdown element |
| p-treeselect-dropdown-icon | Class name of the dropdown icon element |
| p-treeselect-overlay | Class name of the panel element |
| p-treeselect-tree-container | Class name of the tree container element |
| p-treeselect-empty-message | Class name of the empty message element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| treeselect.background | --p-treeselect-background | Background of root |
| treeselect.disabled.background | --p-treeselect-disabled-background | Disabled background of root |
| treeselect.filled.background | --p-treeselect-filled-background | Filled background of root |
| treeselect.filled.hover.background | --p-treeselect-filled-hover-background | Filled hover background of root |
| treeselect.filled.focus.background | --p-treeselect-filled-focus-background | Filled focus background of root |
| treeselect.border.color | --p-treeselect-border-color | Border color of root |
| treeselect.hover.border.color | --p-treeselect-hover-border-color | Hover border color of root |
| treeselect.focus.border.color | --p-treeselect-focus-border-color | Focus border color of root |
| treeselect.invalid.border.color | --p-treeselect-invalid-border-color | Invalid border color of root |
| treeselect.color | --p-treeselect-color | Color of root |
| treeselect.disabled.color | --p-treeselect-disabled-color | Disabled color of root |
| treeselect.placeholder.color | --p-treeselect-placeholder-color | Placeholder color of root |
| treeselect.invalid.placeholder.color | --p-treeselect-invalid-placeholder-color | Invalid placeholder color of root |
| treeselect.shadow | --p-treeselect-shadow | Shadow of root |
| treeselect.padding.x | --p-treeselect-padding-x | Padding x of root |
| treeselect.padding.y | --p-treeselect-padding-y | Padding y of root |
| treeselect.border.radius | --p-treeselect-border-radius | Border radius of root |
| treeselect.focus.ring.width | --p-treeselect-focus-ring-width | Focus ring width of root |
| treeselect.focus.ring.style | --p-treeselect-focus-ring-style | Focus ring style of root |
| treeselect.focus.ring.color | --p-treeselect-focus-ring-color | Focus ring color of root |
| treeselect.focus.ring.offset | --p-treeselect-focus-ring-offset | Focus ring offset of root |
| treeselect.focus.ring.shadow | --p-treeselect-focus-ring-shadow | Focus ring shadow of root |
| treeselect.transition.duration | --p-treeselect-transition-duration | Transition duration of root |
| treeselect.sm.font.size | --p-treeselect-sm-font-size | Sm font size of root |
| treeselect.sm.padding.x | --p-treeselect-sm-padding-x | Sm padding x of root |
| treeselect.sm.padding.y | --p-treeselect-sm-padding-y | Sm padding y of root |
| treeselect.lg.font.size | --p-treeselect-lg-font-size | Lg font size of root |
| treeselect.lg.padding.x | --p-treeselect-lg-padding-x | Lg padding x of root |
| treeselect.lg.padding.y | --p-treeselect-lg-padding-y | Lg padding y of root |
| treeselect.dropdown.width | --p-treeselect-dropdown-width | Width of dropdown |
| treeselect.dropdown.color | --p-treeselect-dropdown-color | Color of dropdown |
| treeselect.overlay.background | --p-treeselect-overlay-background | Background of overlay |
| treeselect.overlay.border.color | --p-treeselect-overlay-border-color | Border color of overlay |
| treeselect.overlay.border.radius | --p-treeselect-overlay-border-radius | Border radius of overlay |
| treeselect.overlay.color | --p-treeselect-overlay-color | Color of overlay |
| treeselect.overlay.shadow | --p-treeselect-overlay-shadow | Shadow of overlay |
| treeselect.tree.padding | --p-treeselect-tree-padding | Padding of tree |
| treeselect.clear.icon.color | --p-treeselect-clear-icon-color | Color of clear icon |
| treeselect.empty.message.padding | --p-treeselect-empty-message-padding | Padding of empty message |
| treeselect.chip.border.radius | --p-treeselect-chip-border-radius | Border radius of chip |

