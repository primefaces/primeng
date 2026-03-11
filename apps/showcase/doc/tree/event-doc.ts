import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'event-doc',
    standalone: true,
    imports: [TreeModule, FormsModule, ToastModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>An event is provided for each type of user interaction such as expand, collapse and selection.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast />
            <p-tree
                [value]="files()"
                class="w-full md:w-[30rem]"
                selectionMode="single"
                [(selection)]="selectedFile"
                (onNodeExpand)="nodeExpand($event)"
                (onNodeCollapse)="nodeCollapse($event)"
                (onNodeSelect)="nodeSelect($event)"
                (onNodeUnselect)="nodeUnselect($event)"
            />
        </div>
        <app-code></app-code>
    `,
    providers: [MessageService]
})
export class EventDoc implements OnInit {
    files = signal<TreeNode[]>(undefined);

    selectedFile!: TreeNode;

    constructor(
        private nodeService: NodeService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files.set(data);
        });
    }

    nodeExpand(event: any) {
        this.messageService.add({ severity: 'success', summary: 'Node Expanded', detail: event.node.label });
    }

    nodeCollapse(event: any) {
        this.messageService.add({ severity: 'warn', summary: 'Node Collapsed', detail: event.node.label });
    }

    nodeSelect(event: any) {
        this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
    }

    nodeUnselect(event: any) {
        this.messageService.add({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
    }
}
