import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'virtual-scroll-doc',
    template: `
        <app-docsectiontext>
            <p>VirtualScroller is a performance-approach to handle huge data efficiently. Setting <i>virtualScroll</i> property as true and providing a <i>virtualScrollItemSize</i> in pixels would be enough to enable this functionality.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tree class="w-full md:w-30rem" scrollHeight="250px" [virtualScroll]="true" [virtualScrollItemSize]="46" [value]="files"></p-tree>
        </div>
        <app-code [code]="code" selector="tree-virtual-scroll-demo"></app-code>
    `
})
export class VirtualScrollDoc implements OnInit {
    loading: boolean = false;

    files!: TreeNode[];

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files = this.duplicateData(data, 50);
            this.cd.markForCheck();
        });
    }

    duplicateData(data: TreeNode[], count: number): TreeNode[] {
        let duplicatedData: TreeNode[] = [];
        for (let i = 0; i < count; i++) {
            duplicatedData = [...duplicatedData, ...data.map((item) => ({ ...item }))];
        }
        return duplicatedData;
    }

    code: Code = {
        basic: `<p-tree class="w-full md:w-30rem" scrollHeight="250px" [virtualScroll]="true" [virtualScrollItemSize]="46" [value]="files"></p-tree>`,

        html: `
<div class="card flex justify-content-center">
<p-tree class="w-full md:w-30rem" scrollHeight="250px" [virtualScroll]="true" [virtualScrollItemSize]="46" [value]="files"></p-tree>
</div>`,

        typescript: `
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'tree-virtual-scroll-demo',
    templateUrl: './tree-virtual-scroll-demo.html'
})
export class TreeVirtualScrollDemo implements OnInit {
    loading: boolean = false;

    files!: TreeNode[];

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files = this.duplicateData(data, 50);
            this.cd.markForCheck();
        });
    }

    duplicateData(data: TreeNode[], count: number): TreeNode[] {
        let duplicatedData: TreeNode[] = [];
        for (let i = 0; i < count; i++) {
            duplicatedData = [...duplicatedData, ...data.map((item) => ({ ...item }))];
        }
        return duplicatedData;
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
