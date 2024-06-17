import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

@Component({
    selector: 'filter-doc',
    template: `
        <app-docsectiontext>
            <p>
                Filtering is enabled by adding the <i>filter</i> property, by default label property of a node is used to compare against the value in the text field, in order to customize which field(s) should be used during search define
                <i>filterBy</i> property. In addition <i>filterMode</i> specifies the filtering strategy. In <i>lenient</i> mode when the query matches a node, children of the node are not searched further as all descendants of the node are included.
                On the other hand, in <i>strict</i> mode when the query matches a node, filtering continues on all descendants.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-content-center gap-5">
            <p-tree [value]="files" class="w-full md:w-30rem" [filter]="true" filterPlaceholder="Lenient Filter" />
            <p-tree [value]="files" class="w-full md:w-30rem" [filter]="true" filterMode="strict" filterPlaceholder="Strict Filter" />
        </div>
        <app-code [code]="code" selector="tree-filter-demo"></app-code>
    `
})
export class FilterDoc implements OnInit {
    files!: TreeNode[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => (this.files = data));
    }

    code: Code = {
        basic: `<p-tree 
    [value]="files" 
    class="w-full md:w-30rem" 
    [filter]="true" 
    filterPlaceholder="Lenient Filter" />
<p-tree 
    [value]="files" 
    class="w-full md:w-30rem" 
    [filter]="true" 
    filterMode="strict" 
    filterPlaceholder="Strict Filter" />`,

        html: `<div class="card flex flex-wrap justify-content-center gap-5">
    <p-tree 
        [value]="files" 
        class="w-full md:w-30rem" 
        [filter]="true" 
        filterPlaceholder="Lenient Filter" />
    <p-tree 
        [value]="files"
        class="w-full md:w-30rem" 
        [filter]="true" 
        filterMode="strict" 
        filterPlaceholder="Strict Filter" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@service/nodeservice';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'tree-filter-demo',
    templateUrl: './tree-filter-demo.html',
    standalone: true,
    imports: [TreeModule],
    providers: [NodeService]
})
export class TreeFilterDemo implements OnInit {
    files!: TreeNode[];

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
