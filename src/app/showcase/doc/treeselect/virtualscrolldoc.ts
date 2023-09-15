import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';
import {TreeNode} from "../../../components/api/treenode";

@Component({
    selector: 'checkbox-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Virtual scroll</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-treeSelect class="w-full md:w-20rem" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" display="chip" [metaKeySelection]="false" selectionMode="checkbox" placeholder="Select Item"
                          [virtualScroll]="true" [virtualScrollItemSize]="40" [virtualScrollOptions]="{scrollHeight: '200px'}"></p-treeSelect>
        </div>
        <app-code [code]="code" selector="tree-select-checkbox-demo"></app-code>
    </section>`
})
export class VirtualScrollDoc {
    @Input() id: string;

    @Input() title: string;

    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        // this.nodeService.getFiles().then((files) => (this.nodes = files));
        this.nodes = this.getMockedTreeNodes(10, 100);
    }

    private getMockedTreeNodes(parentCount: number, childrenCount: number): TreeNode[] {
        let nodes: TreeNode[] = [];
        for (let i = 0; i < parentCount; i++) {
            let node: TreeNode = {
                key: i.toString(),
                label: 'Parent ' + i,
                selectable: true,
                children: []
            };
            for (let j = 0; j < childrenCount; j++) {
                node.children.push({
                    key: i + '-' + j,
                    label: 'Child ' + i + '-' + j,
                    selectable: true,
                });
            }
            nodes.push(node);
        }
        return nodes;
    }

    code: Code = {
        basic: `<p-treeSelect class="w-full md:w-20rem" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" display="chip" [metaKeySelection]="false" selectionMode="checkbox" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="40" [virtualScrollOptions]="{scrollHeight: '200px'}"></p-treeSelect>`,
        html: `
<div class="card flex justify-content-center">
    <p-treeSelect class="w-full md:w-20rem" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" display="chip" [metaKeySelection]="false" selectionMode="checkbox" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="40" [virtualScrollOptions]="{scrollHeight: '200px'}"></p-treeSelect>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'tree-select-checkbox-demo',
    templateUrl: './tree-select-checkbox-demo.html'
})
export class TreeSelectCheckboxDemo {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
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
