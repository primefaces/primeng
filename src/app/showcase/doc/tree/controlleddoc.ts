import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'controlled-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Tree requires a collection of <i>TreeNode</i> instances as a <i>value</i>.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center justify-content-center">
            <div class="mb-3">
                <button pButton type="button" label="Expand all" (click)="expandAll()" class="mr-2"></button>
                <button pButton type="button" label="Collapse all" (click)="collapseAll()"></button>
            </div>
            <p-tree [value]="files" class="w-full md:w-30rem"></p-tree>
        </div>
        <app-code [code]="code" selector="tree-controlled-demo"></app-code>
    </section>`
})
export class ControlledDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    files!: TreeNode[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => (this.files = data));
    }

    expandAll() {
        this.files.forEach((node) => {
            this.expandRecursive(node, true);
        });
    }

    collapseAll() {
        this.files.forEach((node) => {
            this.expandRecursive(node, false);
        });
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach((childNode) => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }

    code: Code = {
        basic: `
<div class="mb-3">
    <button pButton type="button" label="Expand all" (click)="expandAll()" class="mr-2"></button>
    <button pButton type="button" label="Collapse all" (click)="collapseAll()"></button>
</div>
<p-tree [value]="files" class="w-full md:w-30rem"></p-tree>`,

        html: `
<div class="card flex flex-column align-items-center justify-content-center">
    <div class="mb-3">
        <button pButton type="button" label="Expand all" (click)="expandAll()" class="mr-2"></button>
        <button pButton type="button" label="Collapse all" (click)="collapseAll()"></button>
    </div>
    <p-tree [value]="files" class="w-full md:w-30rem"></p-tree>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'tree-controlled-demo',
    templateUrl: './tree-controlled-demo.html'
})
export class TreeControlledDemo implements OnInit {
    files!: TreeNode[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => (this.files = data));
    }

    expandAll() {
        this.files.forEach((node) => {
            this.expandRecursive(node, true);
        });
    }

    collapseAll() {
        this.files.forEach((node) => {
            this.expandRecursive(node, false);
        });
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach((childNode) => {
                this.expandRecursive(childNode, isExpand);
            });
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
