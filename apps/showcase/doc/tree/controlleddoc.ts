import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { Component, OnInit, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'controlled-doc',
    standalone: true,
    imports: [TreeModule, ButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Tree requires a collection of <i>TreeNode</i> instances as a <i>value</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-2 mb-6">
                <p-button icon="pi pi-plus" label="Expand all" (click)="expandAll()" />
                <p-button icon="pi pi-minus" label="Collapse all" (click)="collapseAll()" />
            </div>
            <p-tree [value]="files()" class="w-full md:w-[30rem]" />
        </div>
        <app-code [code]="code" selector="tree-controlled-demo"></app-code>
    `
})
export class ControlledDoc implements OnInit {
    files = signal<TreeNode[]>(undefined);

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files.set(data);
        });
    }

    expandAll() {
        const updatedFiles = this.files().map((node) => this.expandRecursive(node, true));
        this.files.set(updatedFiles);
    }

    collapseAll() {
        const updatedFiles = this.files().map((node) => this.expandRecursive(node, false));
        this.files.set(updatedFiles);
    }

    private expandRecursive(node: TreeNode, isExpand: boolean): TreeNode {
        return {
            ...node,
            expanded: isExpand,
            children: node.children ? node.children.map((child) => this.expandRecursive(child, isExpand)) : node.children
        };
    }

    code: Code = {
        basic: `<div class="flex flex-wrap gap-2 mb-6">
    <p-button icon="pi pi-plus" label="Expand all" (click)="expandAll()" />
    <p-button icon="pi pi-minus" label="Collapse all" (click)="collapseAll()" />
</div>
<p-tree [value]="files()" class="w-full md:w-[30rem]" />`,

        html: `<div class="card">
    <div class="flex flex-wrap gap-2 mb-6">
        <p-button icon="pi pi-plus" label="Expand all" (click)="expandAll()" />
        <p-button icon="pi pi-minus" label="Collapse all" (click)="collapseAll()" />
    </div>
    <p-tree [value]="files()" class="w-full md:w-[30rem]" />
</div>`,

        typescript: `import { Component, OnInit, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'tree-controlled-demo',
    templateUrl: './tree-controlled-demo.html',
    standalone: true,
    imports: [Tree, ButtonModule],
    providers: [NodeService]
})
export class TreeControlledDemo implements OnInit {
    files = signal<TreeNode[]>(undefined);

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files.set(data);
        });
    }

    expandAll() {
        const updatedFiles = this.files().map((node) => this.expandRecursive(node, true));
        this.files.set(updatedFiles);
    }

    collapseAll() {
        const updatedFiles = this.files().map((node) => this.expandRecursive(node, false));
        this.files.set(updatedFiles);
    }

    private expandRecursive(node: TreeNode, isExpand: boolean): TreeNode {
        return {
            ...node,
            expanded: isExpand,
            children: node.children ? node.children.map((child) => this.expandRecursive(child, isExpand)) : node.children
        };
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
