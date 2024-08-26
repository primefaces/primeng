import { Component } from '@angular/core';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

@Component({
    selector: 'floatlabel-doc',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-floatLabel class="md:w-80 w-full">
                <p-treeSelect containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" />
                <label for="treeselect">Tree Select</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="tree-select-floatlabel-demo"></app-code>
    `
})
export class FloatLabelDoc {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    code: Code = {
        basic: `<p-floatLabel class="md:w-80 w-full">
    <p-treeSelect 
        containerStyleClass="w-full" 
        [(ngModel)]="selectedNodes" 
        [options]="nodes" 
        placeholder="Select Item" />
    <label for="treeselect">
        Tree Select
    </label>
</p-floatLabel>`,

        html: `<div class="card flex justify-center">
    <p-floatLabel class="md:w-80 w-full">
        <p-treeSelect 
            containerStyleClass="w-full" 
            [(ngModel)]="selectedNodes" 
            [options]="nodes" 
            placeholder="Select Item" />
        <label for="treeselect">
            Tree Select
        </label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { NodeService } from '@service/nodeservice';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'tree-select-floatlabel-demo',
    templateUrl: './tree-select-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, TreeSelectModule, FloatLabelModule],
    providers: [NodeService]
})
export class TreeSelectFloatlabelDemo {
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
