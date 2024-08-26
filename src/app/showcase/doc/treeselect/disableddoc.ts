import { Component } from '@angular/core';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-treeSelect class="md:w-80 w-full" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" [disabled]="true" placeholder="TreeSelect" />
        </div>
        <app-code [code]="code" selector="tree-select-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    code: Code = {
        basic: `<p-treeSelect 
    class="md:w-80 w-full" 
    containerStyleClass="w-full" 
    [(ngModel)]="selectedNodes" 
    [options]="nodes" 
    [disabled]="true" 
    placeholder="TreeSelect" />`,

        html: `<div class="card flex justify-center">
    <p-treeSelect 
        class="md:w-80 w-full"
        containerStyleClass="w-full"
        [(ngModel)]="selectedNodes" 
        [options]="nodes" 
        [disabled]="true" 
        placeholder="TreeSelect" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { NodeService } from '@service/nodeservice';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';

@Component({
    selector: 'tree-select-disabled-demo',
    templateUrl: './tree-select-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, TreeSelectModule],
    providers: [NodeService]
})
export class TreeSelectDisabledDemo {
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
