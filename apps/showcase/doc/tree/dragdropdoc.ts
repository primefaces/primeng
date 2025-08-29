import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { Component, OnInit } from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';

@Component({
    selector: 'drag-drop-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Nodes can be reordered within the same tree and also can be transferred between other trees using drag&drop.</p>
            <p>Note: This demo implementation inserts dropped nodes as siblings. Dropping inside a folder is not supported in this example.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tree [value]="files" class="w-full md:w-[30rem]" [draggableNodes]="true" [droppableNodes]="true" (onNodeDrop)="onNodeDrop($event)" />
        </div>
        <app-code [code]="code" selector="tree-drag-drop-demo"></app-code>
    `,
    styles: [
        `
            /*
            * ::ng-deep is used here to style the PrimeNG p-tree component's internal elements.
            * This is necessary because the default styles for drag-and-drop do not provide a clear
            * line indicator as requested. This approach is scoped to the component and is
            * a common workaround for styling third-party component internals.
            */
            :host ::ng-deep {
                .p-treenode-content.p-treenode-dragover {
                    border-top: 2px solid #007bff;
                }
            }
        `
    ],
    providers: [TreeDragDropService]
})
export class DragDropDoc implements OnInit {
    files!: TreeNode[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => (this.files = data));
    }

    onNodeDrop(event) {
        const dragNode = event.dragNode;
        const dropNode = event.dropNode;
        const dropIndex = event.index;

        // 1. Remove node from its original position
        this.removeNode(dragNode, this.files);

        // 2. Insert node into its new position
        if (dropNode) {
            // Dropped on another node, insert it as a sibling at the given index
            const dropNodeParent = this.findParent(dropNode, this.files);
            if (dropNodeParent && dropNodeParent.children) {
                dropNodeParent.children.splice(dropIndex, 0, dragNode);
            } else {
                // Drop node is a root node, so insert at root level
                this.files.splice(dropIndex, 0, dragNode);
            }
        } else {
            // Dropped at the root level (not on any specific node)
            this.files.splice(dropIndex, 0, dragNode);
        }

        // 3. Trigger change detection
        this.files = [...this.files];
    }

    removeNode(node: TreeNode, tree: TreeNode[]) {
        const parent = this.findParent(node, tree);
        if (parent && parent.children) {
            parent.children = parent.children.filter((c) => c.key !== node.key);
        } else {
            // It's a root node
            this.files = this.files.filter((n) => n.key !== node.key);
        }
    }

    findParent(node: TreeNode, tree: TreeNode[]): TreeNode | null {
        for (const n of tree) {
            if (n.children && n.children.some((c) => c.key === node.key)) {
                return n;
            }
            if (n.children) {
                const parent = this.findParent(node, n.children);
                if (parent) {
                    return parent;
                }
            }
        }
        return null;
    }

    code: Code = {
        basic: `<p-tree [value]="files" class="w-full md:w-[30rem]" [draggableNodes]="true" [droppableNodes]="true" (onNodeDrop)="onNodeDrop($event)" />`,

        html: `<div class="card">
    <p-tree [value]="files" class="w-full md:w-[30rem]" [draggableNodes]="true" [droppableNodes]="true" (onNodeDrop)="onNodeDrop($event)" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { Tree } from 'primeng/tree';

@Component({
    selector: 'tree-drag-drop-demo',
    templateUrl: './tree-drag-drop-demo.html',
    styles: [
        \`
            /*
            * ::ng-deep is used here to style the PrimeNG p-tree component's internal elements.
            * This is necessary because the default styles for drag-and-drop do not provide a clear
            * line indicator as requested. This approach is scoped to the component and is
            * a common workaround for styling third-party component internals.
            */
            :host ::ng-deep {
                .p-treenode-content.p-treenode-dragover {
                    border-top: 2px solid #007bff;
                }
            }
        \`
    ],
    standalone: true,
    imports: [Tree],
    providers: [TreeDragDropService, NodeService]
})
export class TreeDragDropDemo implements OnInit {
    files!: TreeNode[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => (this.files = data));
    }

    onNodeDrop(event) {
        const dragNode = event.dragNode;
        const dropNode = event.dropNode;
        const dropIndex = event.index;

        // 1. Remove node from its original position
        this.removeNode(dragNode, this.files);

        // 2. Insert node into its new position
        if (dropNode) {
            // Dropped on another node, insert it as a sibling at the given index
            const dropNodeParent = this.findParent(dropNode, this.files);
            if (dropNodeParent && dropNodeParent.children) {
                dropNodeParent.children.splice(dropIndex, 0, dragNode);
            } else {
                // Drop node is a root node, so insert at root level
                this.files.splice(dropIndex, 0, dragNode);
            }
        } else {
            // Dropped at the root level (not on any specific node)
            this.files.splice(dropIndex, 0, dragNode);
        }

        // 3. Trigger change detection
        this.files = [...this.files];
    }

    removeNode(node: TreeNode, tree: TreeNode[]) {
        const parent = this.findParent(node, tree);
        if (parent && parent.children) {
            parent.children = parent.children.filter((c) => c.key !== node.key);
        } else {
            // It's a root node
            this.files = this.files.filter((n) => n.key !== node.key);
        }
    }

    findParent(node: TreeNode, tree: TreeNode[]): TreeNode | null {
        for (const n of tree) {
            if (n.children && n.children.some((c) => c.key === node.key)) {
                return n;
            }
            if (n.children) {
                const parent = this.findParent(node, n.children);
                if (parent) {
                    return parent;
                }
            }
        }
        return null;
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
