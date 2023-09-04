import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'multiple-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                More than one node is selectable by setting <i>selectionMode</i> to <i>multiple</i>. By default in multiple selection mode, metaKey press (e.g. <i>⌘</i>) is necessary to add to existing selections however this can be configured with
                disabling the <i>metaKeySelection</i> property. Note that in touch enabled devices, TreeSelect always ignores metaKey.
            </p>
            <p>In multiple selection mode, value binding should be a key-value pair where key is the node key and value is a boolean to indicate selection.</p>
        </app-docsectiontext>
        <app-code [code]="exampleCode" [hideToggleCode]="true"></app-code>
        <div class="card flex justify-content-center">
            <p-treeSelect class="w-full md:w-20rem" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" [metaKeySelection]="false" selectionMode="multiple" placeholder="Select Item"></p-treeSelect>
        </div>
        <app-code [code]="code" selector="tree-select-multiple-demo"></app-code>
    </section>`
})
export class MultipleDoc {
    @Input() id: string;

    @Input() title: string;

    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    exampleCode: Code = {
        typescript: `
{
    '0-0': true,
    '0-1-0': true
}`
    };

    code: Code = {
        basic: `
<p-treeSelect class="w-full md:w-20rem" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" [metaKeySelection]="false" selectionMode="multiple" placeholder="Select Item"></p-treeSelect>`,

        html: `
<div class="card flex justify-content-center">
    <p-treeSelect class="w-full md:w-20rem" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" [metaKeySelection]="false" selectionMode="multiple" placeholder="Select Item"></p-treeSelect>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'tree-select-multiple-demo',
    templateUrl: './tree-select-multiple-demo.html'
})
export class TreeSelectMultipleDemo {
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
