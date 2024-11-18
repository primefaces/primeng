import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';

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
        <div class="card flex justify-center">
            <p-treeselect class="md:w-80 w-full" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" [filter]="true" [filterInputAutoFocus]="true" />
        </div>
        <app-code [code]="code" selector="tree-select-filter-demo"></app-code>
    `
})
export class FilterDoc {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    code: Code = {
        basic: `<p-treeselect class="md:w-80 w-full" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" [filter]="true" [filterInputAutoFocus]="true" />`,

        html: `<div class="card flex justify-center">
    <p-treeselect class="md:w-80 w-full" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes"placeholder="Select Item" [filter]="true" [filterInputAutoFocus]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { NodeService } from '@/service/nodeservice';
import { FormsModule } from '@angular/forms';
import { TreeSelect } from 'primeng/treeselect';

@Component({
    selector: 'tree-select-filter-demo',
    templateUrl: './tree-select-filter-demo.html',
    standalone: true,
    imports: [FormsModule, TreeSelect],
    providers: [NodeService]
})
export class TreeSelectFilterDemo {
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
