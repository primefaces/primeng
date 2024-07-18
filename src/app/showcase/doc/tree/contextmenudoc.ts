import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

@Component({
    selector: 'context-menu-doc',
    template: `
        <app-docsectiontext>
            <p>Tree requires a collection of <i>TreeNode</i> instances as a value.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tree class="w-full md:w-30rem" [value]="files" selectionMode="single" [(selection)]="selectedFile" [contextMenu]="cm" />
            <p-contextMenu #cm [model]="items" />
            <p-toast />
        </div>
        <app-code [code]="code" selector="tree-context-menu-demo"></app-code>
    `,
    providers: [MessageService]
})
export class ContextMenuDoc implements OnInit {
    files!: TreeNode[];

    selectedFile!: TreeNode | null;

    items!: MenuItem[];

    constructor(private nodeService: NodeService, private messageService: MessageService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((files) => (this.files = files));

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedFile) },
            { label: 'Unselect', icon: 'pi pi-times', command: (event) => this.unselectFile() }
        ];
    }

    viewFile(file: TreeNode) {
        this.messageService.add({ severity: 'info', summary: 'Node Details', detail: file.label });
    }

    unselectFile() {
        this.selectedFile = null;
    }

    code: Code = {
        basic: `<p-tree 
    class="w-full md:w-30rem" 
    [value]="files" 
    selectionMode="single" 
    [(selection)]="selectedFile" 
    [contextMenu]="cm" />
<p-contextMenu #cm [model]="items" />
<p-toast />`,

        html: `<div class="card flex justify-content-center">
    <p-tree 
        class="w-full md:w-30rem" 
        [value]="files"
        selectionMode="single" 
        [(selection)]="selectedFile" 
        [contextMenu]="cm" />
    <p-contextMenu #cm [model]="items" />
    <p-toast />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { NodeService } from '@service/nodeservice';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'tree-context-menu-demo',
    templateUrl: './tree-context-menu-demo.html',
    standalone: true,
    imports: [TreeModule, ContextMenuModule, ToastModule],
    providers: [MessageService, NodeService]
})
export class TreeContextMenuDemo implements OnInit {
    files!: TreeNode[];

    selectedFile!: TreeNode | null;

    items!: MenuItem[];

    constructor(private nodeService: NodeService, private messageService: MessageService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((files) => (this.files = files));

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedFile) },
            { label: 'Unselect', icon: 'pi pi-times', command: (event) => this.unselectFile() }
        ];
    }

    viewFile(file: TreeNode) {
        this.messageService.add({ severity: 'info', summary: 'Node Details', detail: file.label });
    }

    unselectFile() {
        this.selectedFile = null;
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
