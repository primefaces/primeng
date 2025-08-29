import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { Component, OnInit } from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';

@Component({
    selector: 'drag-drop-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Nodes can be reordered by dragging and dropping. A blue line indicates the drop position. Dropping a node onto a folder will make it a child of that folder.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tree [value]="files" class="w-full md:w-[30rem]" [draggableNodes]="true" [droppableNodes]="true" (onNodeDrop)="onNodeDrop($event)" />
        </div>
        <app-code [code]="code" selector="tree-drag-drop-demo"></app-code>
    `,
    styles: [
        `
            :host ::ng-deep {
                /* More specific selector to target the content of the node being dragged over */
                .p-treenode.p-treenode-dragover > .p-treenode-content {
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

        this.removeNode(dragNode, this.files);

        if (dropNode) {
            // If dropping onto a folder, add as a child
            if (dropNode.children) {
                dropNode.children.push(dragNode);
            }
            // Otherwise, drop as a sibling
            else {
                const dropNodeParent = this.findParent(dropNode, this.files);
                if (dropNodeParent && dropNodeParent.children) {
                    dropNodeParent.children.splice(dropIndex, 0, dragNode);
                } else {
                    this.files.splice(dropIndex, 0, dragNode);
                }
            }
        } else {
            // Dropped at root level
            this.files.splice(dropIndex, 0, dragNode);
        }

        this.files = [...this.files];
    }

    removeNode(node: TreeNode, tree: TreeNode[]) {
        const parent = this.findParent(node, tree);
        if (parent && parent.children) {
            parent.children = parent.children.filter((c) => c.key !== node.key);
        } else {
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
            :host ::ng-deep {
                .p-treenode.p-treenode-dragover > .p-treenode-content {
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

        this.removeNode(dragNode, this.files);

        if (dropNode) {
            // If dropping onto a folder, add as a child
            if (dropNode.children) {
                dropNode.children.push(dragNode);
            }
            // Otherwise, drop as a sibling
            else {
                const dropNodeParent = this.findParent(dropNode, this.files);
                if (dropNodeParent && dropNodeParent.children) {
                    dropNodeParent.children.splice(dropIndex, 0, dragNode);
                } else {
                    this.files.splice(dropIndex, 0, dragNode);
                }
            }
        } else {
            // Dropped at root level
            this.files.splice(dropIndex, 0, dragNode);
        }

        this.files = [...this.files];
    }

    removeNode(node: TreeNode, tree: TreeNode[]) {
        const parent = this.findParent(node, tree);
        if (parent && parent.children) {
            parent.children = parent.children.filter((c) => c.key !== node.key);
        } else {
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
        data: \`
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
...\`
    };
}
