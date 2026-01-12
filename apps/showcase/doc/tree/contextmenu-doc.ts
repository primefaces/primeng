import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, Component, model, OnInit, signal } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'contextmenu-doc',
    standalone: true,
    imports: [TreeModule, ContextMenuModule, ToastModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Tree has exclusive integration with ContextMenu using the <i>contextMenu</i> property along with the <i>contextMenuSelection</i> to manage the selection.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast [style]="{ marginTop: '80px' }" />
            <p-tree [value]="files()" class="w-full md:w-80" selectionMode="single" [(selection)]="selectedNode" [(contextMenuSelection)]="contextMenuNode" [contextMenu]="cm" contextMenuSelectionMode="separate" />
            <p-contextmenu #cm [model]="items" />
        </div>
        <app-code></app-code>
    `,
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuDoc implements OnInit {
    files = signal<TreeNode[]>([]);

    selectedNode = model<TreeNode | null>(null);

    contextMenuNode = model<TreeNode | null>(null);

    items!: MenuItem[];

    constructor(
        private nodeService: NodeService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.nodeService.getFiles().then((files) => this.files.set(files));

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: () => this.viewFile(this.contextMenuNode()) },
            { label: 'Toggle', icon: 'pi pi-sort', command: () => this.toggleFile(this.contextMenuNode()) }
        ];
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
}
