import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, Component, model, signal } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'context-menu-doc',
    standalone: true,
    imports: [TreeModule, ContextMenuModule, ToastModule, AppCode, AppDocSectionText, DeferredDemo],
    template: `
        <app-docsectiontext>
            <p>
                Tree has exclusive integration with ContextMenu using the <i>contextMenu</i> property to open a menu on right click along with <i>contextMenuSelection</i> and <i>contextMenuSelectionMode</i> properties to control the selection via the
                menu.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-toast [style]="{ marginTop: '80px' }" />
            <p-deferred-demo (load)="loadDemoData()">
                <p-tree [value]="files()" class="w-full md:w-[30rem]" [contextMenuSelectionMode]="true" [(contextMenuSelection)]="selectedNode" [contextMenu]="cm" />
            </p-deferred-demo>
            <p-contextmenu #cm [model]="items" />
        </div>
        <app-code [code]="code" selector="tree-context-menu-demo"></app-code>
    `,
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuDoc {
    files = signal<TreeNode[]>([]);

    selectedNode = model<TreeNode | null>(null);

    items!: MenuItem[];

    constructor(
        private nodeService: NodeService,
        private messageService: MessageService
    ) {}

    loadDemoData() {
        this.nodeService.getFiles().then((files) => this.files.set(files));

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: () => this.viewFile(this.selectedNode()) },
            { label: 'Toggle', icon: 'pi pi-sort', command: () => this.toggleFile(this.selectedNode()) },
            { label: 'Unselect', icon: 'pi pi-times', command: () => this.unselectFile() }
        ];
    }

    unselectFile() {
        this.selectedNode.set(null);
    }

    viewFile(node: TreeNode | null) {
        if (node) {
            this.messageService.add({ severity: 'info', summary: 'File Selected', detail: node.label });
        }
    }

    toggleFile(node: TreeNode | null) {
        if (node) {
            this.files.set(this.updateNodeInTree(this.files(), node.key, { ...node, expanded: !node.expanded }));
        }
    }

    updateNodeInTree(nodes: TreeNode[], key: string | undefined, updatedNode: TreeNode): TreeNode[] {
        return nodes.map((n) => {
            if (n.key === key) {
                return updatedNode;
            }
            if (n.children) {
                return { ...n, children: this.updateNodeInTree(n.children, key, updatedNode) };
            }
            return n;
        });
    }

    code: Code = {
        basic: `<p-toast [style]="{ marginTop: '80px' }" />

<p-tree [value]="files()" class="w-full md:w-[30rem]" [contextMenuSelectionMode]="true" [(contextMenuSelection)]="selectedNode" [contextMenu]="cm" />

<p-contextmenu #cm [model]="items" />`,

        html: `<div class="card">
    <p-toast [style]="{ marginTop: '80px' }" />

    <p-tree [value]="files()" class="w-full md:w-[30rem]" [contextMenuSelectionMode]="true" [(contextMenuSelection)]="selectedNode" [contextMenu]="cm" />

    <p-contextmenu #cm [model]="items" />
</div>`,

        typescript: `import { Component, OnInit, model, signal } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { Tree } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'tree-context-menu-demo',
    templateUrl: './tree-context-menu-demo.html',
    standalone: true,
    imports: [Tree, ContextMenuModule, ToastModule],
    providers: [MessageService, NodeService]
})
export class TreeContextMenuDemo implements OnInit {
    files = signal<TreeNode[]>([]);

    selectedNode = model<TreeNode | null>(null);

    items!: MenuItem[];

    constructor(
        private nodeService: NodeService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.nodeService.getFiles().then((files) => this.files.set(files));

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: () => this.viewFile(this.selectedNode()) },
            { label: 'Toggle', icon: 'pi pi-sort', command: () => this.toggleFile(this.selectedNode()) },
            { label: 'Unselect', icon: 'pi pi-times', command: () => this.unselectFile() }
        ];
    }

    unselectFile() {
        this.selectedNode.set(null);
    }

    viewFile(node: TreeNode | null) {
        if (node) {
            this.messageService.add({ severity: 'info', summary: 'File Selected', detail: node.label });
        }
    }

    toggleFile(node: TreeNode | null) {
        if (node) {
            this.files.set(this.updateNodeInTree(this.files(), node.key, { ...node, expanded: !node.expanded }));
        }
    }

    updateNodeInTree(nodes: TreeNode[], key: string | undefined, updatedNode: TreeNode): TreeNode[] {
        return nodes.map((n) => {
            if (n.key === key) {
                return updatedNode;
            }
            if (n.children) {
                return { ...n, children: this.updateNodeInTree(n.children, key, updatedNode) };
            }
            return n;
        });
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
