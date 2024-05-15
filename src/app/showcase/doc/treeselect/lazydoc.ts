import { ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'lazy-doc',
    template: `
        <app-docsectiontext>
            <p>Lazy loading is useful when dealing with huge datasets, in this example nodes are dynamically loaded on demand using <i>loading</i> property and <i>onNodeExpand</i> method.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-treeSelect
                class="w-full"
                containerStyleClass="w-full"
                [(ngModel)]="selectedNodes"
                [loading]="loading"
                (onNodeExpand)="onNodeExpand($event)"
                [options]="nodes"
                display="chip"
                [metaKeySelection]="false"
                selectionMode="checkbox"
                placeholder="Select Item"
                [loading]="loading"
            />
        </div>
        <app-code [code]="code" selector="tree-select-basic-demo"></app-code>
    `
})
export class LazyDoc {
    selectedNodes: TreeNode[] = [];

    nodes!: TreeNode[];

    loading: boolean = false;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading = true;

        setTimeout(() => {
            this.nodes = this.initiateNodes();
            this.loading = false;
            this.cd.markForCheck();
        }, 2000);
    }

    initiateNodes(): TreeNode[] {
        return [
            {
                key: '0',
                label: 'Node 0',
                leaf: false
            },
            {
                key: '1',
                label: 'Node 1',
                leaf: false
            },
            {
                key: '2',
                label: 'Node 2',
                leaf: false
            }
        ];
    }

    onNodeExpand(event: any) {
        if (!event.node.children) {
            this.loading = true;

            setTimeout(() => {
                let _node = { ...event.node };
                _node.children = [];

                for (let i = 0; i < 1500; i++) {
                    _node.children.push({
                        key: event.node.key + '-' + i,
                        label: 'Lazy ' + event.node.label + '-' + i
                    });
                }

                this.nodes[parseInt(event.node.key, 10)] = _node;

                this.loading = false;
                this.cd.markForCheck();
            }, 500);
        }
    }

    code: Code = {
        basic: `<p-treeSelect
    class="w-full"
    containerStyleClass="w-full"
    [(ngModel)]="selectedNodes"
    [loading]="loading"
    (onNodeExpand)="onNodeExpand($event)"
    [options]="nodes"
    display="chip"
    [metaKeySelection]="false"
    selectionMode="checkbox"
    placeholder="Select Item"
    [loading]="loading"
/>`,

        html: `<div class="card flex justify-content-center">
    <p-treeSelect
        class="w-full"
        containerStyleClass="w-full"
        [(ngModel)]="selectedNodes"
        [loading]="loading"
        (onNodeExpand)="onNodeExpand($event)"
        [options]="nodes"
        display="chip"
        [metaKeySelection]="false"
        selectionMode="checkbox"
        placeholder="Select Item"
        [loading]="loading"
    />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { NodeService } from '@service/nodeservice';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';

@Component({
    selector: 'tree-select-lazy-demo',
    templateUrl: './tree-select-lazy-demo.html',
    standalone: true,
    imports: [FormsModule, TreeSelectModule]
  })
export class TreeSelectLazyDemo {
    selectedNodes: TreeNode[] = [];

    nodes!: TreeNode[];

    loading: boolean = false;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading = true;

        setTimeout(() => {
            this.nodes = this.initiateNodes();
            this.loading = false;
            this.cd.markForCheck();
        }, 2000);
    }

    initiateNodes(): TreeNode[] {
        return [
            {
                key: '0',
                label: 'Node 0',
                leaf: false
            },
            {
                key: '1',
                label: 'Node 1',
                leaf: false
            },
            {
                key: '2',
                label: 'Node 2',
                leaf: false
            }
        ];
    }

    onNodeExpand(event: any) {
        if (!event.node.children) {
            this.loading = true;

            setTimeout(() => {
                let _node = { ...event.node };
                _node.children = [];

                for (let i = 0; i < 150; i++) {
                    _node.children.push({
                        key: event.node.key + '-' + i,
                        label: 'Lazy ' + event.node.label + '-' + i
                    });
                }

                this.nodes[parseInt(event.node.key, 10)] = _node;

                this.loading = false;
                this.cd.markForCheck();
            }, 500);
        }
    }
}`,

        service: ['NodeService'],

        data: `
    /* NodeService */
{
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
        {
            key: '0-0',
            label: 'Work',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-cog',
            children: [
                { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
            ]
        },
        {
            key: '0-1',
            label: 'Home',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-home',
            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
        }
    ]
},
...`
    };
}
