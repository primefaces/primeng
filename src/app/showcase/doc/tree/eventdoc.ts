import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from '@alamote/primeng/api';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'event-doc',
    template: `
        <app-docsectiontext>
            <p>An event is provided for each type of user interaction such as expand, collapse and selection.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-tree
                [value]="files"
                class="w-full md:w-30rem"
                selectionMode="single"
                [(selection)]="selectedFile"
                (onNodeExpand)="nodeExpand($event)"
                (onNodeCollapse)="nodeCollapse($event)"
                (onNodeSelect)="nodeSelect($event)"
                (onNodeUnselect)="nodeUnselect($event)"
            ></p-tree>
        </div>
        <app-code [code]="code" selector="tree-events-demo"></app-code>
    `,
    providers: [MessageService]
})
export class EventDoc implements OnInit {
    files!: TreeNode[];

    selectedFile!: TreeNode;

    constructor(private nodeService: NodeService, private messageService: MessageService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => (this.files = data));
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

    code: Code = {
        basic: `<p-tree [value]="files" class="w-full md:w-30rem" selectionMode="single" [(selection)]="selectedFile"
    (onNodeExpand)="nodeExpand($event)" (onNodeCollapse)="nodeCollapse($event)" (onNodeSelect)="nodeSelect($event)"(onNodeUnselect)="nodeUnselect($event)"></p-tree>`,

        html: `
<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <p-tree [value]="files" class="w-full md:w-30rem" selectionMode="single" [(selection)]="selectedFile"
        (onNodeExpand)="nodeExpand($event)" (onNodeCollapse)="nodeCollapse($event)" (onNodeSelect)="nodeSelect($event)"(onNodeUnselect)="nodeUnselect($event)"></p-tree>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from '@alamote/primeng/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'tree-events-demo',
    templateUrl: './tree-events-demo.html',
    providers: [MessageService]
})
export class TreeEventsDemo implements OnInit {
    files!: TreeNode[];

    selectedFile!: TreeNode;

    constructor(private nodeService: NodeService, private messageService: MessageService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => (this.files = data));
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
