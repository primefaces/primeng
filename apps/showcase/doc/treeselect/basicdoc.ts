import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>TreeSelect is used as a controlled component with <i>ng-model</i> directive along with an <i>options</i> collection. Internally <a routerLink="/tree">Tree</a> component is used so the options model is based on TreeNode API.</p>
            <p>In single selection mode, value binding should be the <i>key</i> value of a node.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-treeselect class="md:w-80 w-full" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" />
        </div>
        <app-code [code]="code" selector="tree-select-basic-demo"></app-code>
    `
})
export class BasicDoc {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    code: Code = {
        basic: `<p-treeselect class="md:w-80 w-full" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" />`,

        html: `<div class="card flex justify-center">
    <p-treeselect class="md:w-80 w-full" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { NodeService } from '@/service/nodeservice';
import { FormsModule } from '@angular/forms';
import { TreeSelect } from 'primeng/treeselect';

@Component({
    selector: 'tree-select-basic-demo',
    templateUrl: './tree-select-basic-demo.html',
    standalone: true,
    imports: [FormsModule, TreeSelect],
    providers: [NodeService]
  })
export class TreeSelectBasicDemo {
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
