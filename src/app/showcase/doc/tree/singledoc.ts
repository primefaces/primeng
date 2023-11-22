import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'single-doc',
    template: `
        <app-docsectiontext>
            <p>Single node selection is configured by setting <i>selectionMode</i> as <i>single</i> along with <i>selection</i> properties to manage the selection value binding.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tree [value]="files" class="w-full md:w-30rem" selectionMode="single" [(selection)]="selectedFile"></p-tree>
        </div>
        <app-code [code]="code" selector="tree-single-demo"></app-code>
    `
})
export class SingleDoc implements OnInit {

    files!: TreeNode[];

    selectedFile!: TreeNode;

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => (this.files = data));
    }

    code: Code = {
        basic: `
<p-tree [value]="files" class="w-full md:w-30rem" selectionMode="single" [(selection)]="selectedFile"></p-tree>`,

        html: `
<div class="card flex justify-content-center">
    <p-tree [value]="files" class="w-full md:w-30rem" selectionMode="single" [(selection)]="selectedFile"></p-tree>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'tree-single-demo',
    templateUrl: './tree-single-demo.html'
})
export class TreeSingleDemo implements OnInit {
    files!: TreeNode[];

    selectedFile!: TreeNode;
    
    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => (this.files = data));
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
