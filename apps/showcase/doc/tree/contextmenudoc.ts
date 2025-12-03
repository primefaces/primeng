import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, Component, model, OnInit, signal } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'context-menu-doc',
    standalone: true,
    imports: [TreeModule, ContextMenuModule, ToastModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Tree has exclusive integration with ContextMenu using the <i>contextMenu</i> property. When a context menu is attached, left-click selection is disabled and only right-click works. The <i>contextMenuSelectionMode</i> property defines
                the behavior: in <b>separate</b> mode (default), right-click only updates <i>contextMenuSelection</i>, while in <b>joint</b> mode, right-click updates both <i>selection</i> and <i>contextMenuSelection</i> together.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4">
            <p-toast [style]="{ marginTop: '80px' }" />
            <div class="flex w-full gap-8">
                <div class="flex flex-1 flex-col gap-2">
                    <span class="font-semibold">Separate Mode</span>
                    <p-tree
                        [value]="files()"
                        class="flex-1 border border-surface rounded-lg"
                        selectionMode="single"
                        [(selection)]="selectedNodeSeparate"
                        [(contextMenuSelection)]="contextMenuNodeSeparate"
                        [contextMenu]="cmSeparate"
                        contextMenuSelectionMode="separate"
                    />
                    <p-contextmenu #cmSeparate [model]="itemsSeparate" />
                    <div class="text-sm mt-2">
                        <div><b>Selection:</b> {{ selectedNodeSeparate()?.label || 'None' }}</div>
                        <div><b>Context Menu Selection:</b> {{ contextMenuNodeSeparate()?.label || 'None' }}</div>
                    </div>
                </div>
                <div class="flex flex-1 flex-col gap-2">
                    <span class="font-semibold">Joint Mode</span>
                    <p-tree
                        [value]="files2()"
                        class="flex-1 border border-surface rounded-lg"
                        selectionMode="single"
                        [(selection)]="selectedNodeJoint"
                        [(contextMenuSelection)]="contextMenuNodeJoint"
                        [contextMenu]="cmJoint"
                        contextMenuSelectionMode="joint"
                    />
                    <p-contextmenu #cmJoint [model]="itemsJoint" />
                    <div class="text-sm mt-2">
                        <div><b>Selection:</b> {{ selectedNodeJoint()?.label || 'None' }}</div>
                        <div><b>Context Menu Selection:</b> {{ contextMenuNodeJoint()?.label || 'None' }}</div>
                    </div>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="tree-context-menu-demo"></app-code>
    `,
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuDoc implements OnInit {
    files = signal<TreeNode[]>([]);

    files2 = signal<TreeNode[]>([]);

    selectedNodeSeparate = model<TreeNode | null>(null);

    contextMenuNodeSeparate = model<TreeNode | null>(null);

    selectedNodeJoint = model<TreeNode | null>(null);

    contextMenuNodeJoint = model<TreeNode | null>(null);

    itemsSeparate!: MenuItem[];

    itemsJoint!: MenuItem[];

    constructor(
        private nodeService: NodeService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.nodeService.getFiles().then((files) => this.files.set(files));
        this.nodeService.getFiles().then((files) => this.files2.set(files));

        this.itemsSeparate = [
            { label: 'View', icon: 'pi pi-search', command: () => this.viewFile(this.contextMenuNodeSeparate()) },
            { label: 'Toggle', icon: 'pi pi-sort', command: () => this.toggleFile(this.files, this.contextMenuNodeSeparate()) }
        ];

        this.itemsJoint = [
            { label: 'View', icon: 'pi pi-search', command: () => this.viewFile(this.contextMenuNodeJoint()) },
            { label: 'Toggle', icon: 'pi pi-sort', command: () => this.toggleFile(this.files2, this.contextMenuNodeJoint()) }
        ];
    }

    viewFile(node: TreeNode | null) {
        if (node) {
            this.messageService.add({ severity: 'info', summary: 'File Selected', detail: node.label });
        }
    }

    toggleFile(filesSignal: typeof this.files, node: TreeNode | null) {
        if (node) {
            filesSignal.set(this.updateNodeInTree(filesSignal(), node.key, { ...node, expanded: !node.expanded }));
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
        basic: `<!-- Separate Mode (default) -->
<p-tree
    [value]="files()"
    selectionMode="single"
    [(selection)]="selectedNode"
    [(contextMenuSelection)]="contextMenuNode"
    [contextMenu]="cm"
    contextMenuSelectionMode="separate"
/>

<!-- Joint Mode -->
<p-tree
    [value]="files()"
    selectionMode="single"
    [(selection)]="selectedNode"
    [(contextMenuSelection)]="contextMenuNode"
    [contextMenu]="cm"
    contextMenuSelectionMode="joint"
/>`,

        html: `<div class="card flex flex-wrap gap-4">
    <p-toast [style]="{ marginTop: '80px' }" />
    <div class="flex w-full gap-8">
        <div class="flex flex-1 flex-col gap-2">
            <span class="font-semibold">Separate Mode</span>
            <p-tree
                [value]="files()"
                class="flex-1 border border-surface rounded-lg"
                selectionMode="single"
                [(selection)]="selectedNodeSeparate"
                [(contextMenuSelection)]="contextMenuNodeSeparate"
                [contextMenu]="cmSeparate"
                contextMenuSelectionMode="separate"
            />
            <p-contextmenu #cmSeparate [model]="itemsSeparate" />
            <div class="text-sm mt-2">
                <div><b>Selection:</b> {{ selectedNodeSeparate()?.label || 'None' }}</div>
                <div><b>Context Menu Selection:</b> {{ contextMenuNodeSeparate()?.label || 'None' }}</div>
            </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
            <span class="font-semibold">Joint Mode</span>
            <p-tree
                [value]="files2()"
                class="flex-1 border border-surface rounded-lg"
                selectionMode="single"
                [(selection)]="selectedNodeJoint"
                [(contextMenuSelection)]="contextMenuNodeJoint"
                [contextMenu]="cmJoint"
                contextMenuSelectionMode="joint"
            />
            <p-contextmenu #cmJoint [model]="itemsJoint" />
            <div class="text-sm mt-2">
                <div><b>Selection:</b> {{ selectedNodeJoint()?.label || 'None' }}</div>
                <div><b>Context Menu Selection:</b> {{ contextMenuNodeJoint()?.label || 'None' }}</div>
            </div>
        </div>
    </div>
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

    files2 = signal<TreeNode[]>([]);

    selectedNodeSeparate = model<TreeNode | null>(null);

    contextMenuNodeSeparate = model<TreeNode | null>(null);

    selectedNodeJoint = model<TreeNode | null>(null);

    contextMenuNodeJoint = model<TreeNode | null>(null);

    itemsSeparate!: MenuItem[];

    itemsJoint!: MenuItem[];

    constructor(
        private nodeService: NodeService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.nodeService.getFiles().then((files) => this.files.set(files));
        this.nodeService.getFiles().then((files) => this.files2.set(files));

        this.itemsSeparate = [
            { label: 'View', icon: 'pi pi-search', command: () => this.viewFile(this.contextMenuNodeSeparate()) },
            { label: 'Toggle', icon: 'pi pi-sort', command: () => this.toggleFile(this.files, this.contextMenuNodeSeparate()) }
        ];

        this.itemsJoint = [
            { label: 'View', icon: 'pi pi-search', command: () => this.viewFile(this.contextMenuNodeJoint()) },
            { label: 'Toggle', icon: 'pi pi-sort', command: () => this.toggleFile(this.files2, this.contextMenuNodeJoint()) }
        ];
    }

    viewFile(node: TreeNode | null) {
        if (node) {
            this.messageService.add({ severity: 'info', summary: 'File Selected', detail: node.label });
        }
    }

    toggleFile(filesSignal: typeof this.files, node: TreeNode | null) {
        if (node) {
            filesSignal.set(this.updateNodeInTree(filesSignal(), node.key, { ...node, expanded: !node.expanded }));
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
