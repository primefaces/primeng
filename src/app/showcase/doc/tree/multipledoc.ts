import { Component, OnInit } from '@angular/core';
import { TreeNode } from '@alamote/primeng/api';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'multiple-doc',
    template: `
        <app-docsectiontext>
            <p>
                More than one node is selectable by setting <i>selectionMode</i> to <i>multiple</i>. By default in multiple selection mode, metaKey press (e.g. <i>⌘</i>) is necessary to add to existing selections however this can be configured with
                disabling the <i>metaKeySelection</i> property. Note that in touch enabled devices, Tree always ignores metaKey.
            </p>
            <p>In multiple selection mode, value binding should be a key-value pair where key is the node key and value is a boolean to indicate selection.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center justify-content-center">
            <div class="flex align-items-center mb-4 gap-2">
                <p-inputSwitch inputId="input-metakey" [(ngModel)]="metaKeySelection"></p-inputSwitch>
                <label for="input-metakey">MetaKey</label>
            </div>
            <p-tree [metaKeySelection]="metaKeySelection" [value]="files" class="w-full md:w-30rem" selectionMode="multiple" [(selection)]="selectedFiles"></p-tree>
        </div>
        <app-code [code]="code" selector="tree-multiple-demo"></app-code>
    `
})
export class MultipleDoc implements OnInit {
    metaKeySelection: boolean = false;

    files!: TreeNode[];

    selectedFiles!: TreeNode[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => (this.files = data));
    }

    code: Code = {
        basic: `<div class="flex align-items-center mb-4 gap-2">
    <p-inputSwitch inputId="input-metakey" [(ngModel)]="metaKeySelection"></p-inputSwitch>
    <label for="input-metakey">MetaKey</label>
</div>
<p-tree [metaKeySelection]="metaKeySelection" [value]="files" class="w-full md:w-30rem" selectionMode="multiple" [(selection)]="selectedFiles"></p-tree>`,

        html: `
<div class="card flex flex-column align-items-center justify-content-center">
    <div class="flex align-items-center mb-4 gap-2">
        <p-inputSwitch inputId="input-metakey" [(ngModel)]="metaKeySelection"></p-inputSwitch>
        <label for="input-metakey">MetaKey</label>
    </div>
    <p-tree [metaKeySelection]="metaKeySelection" [value]="files" class="w-full md:w-30rem" selectionMode="multiple" [(selection)]="selectedFiles"></p-tree>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { TreeNode } from '@alamote/primeng/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'tree-multiple-demo',
    templateUrl: './tree-multiple-demo.html'
})
export class TreeMultipleDemo implements OnInit {
    metaKeySelection: boolean = false;

    files!: TreeNode[];

    selectedFiles!: TreeNode[];

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
