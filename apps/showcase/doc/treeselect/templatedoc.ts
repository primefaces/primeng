import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>TreeSelect offers multiple templates for customization through templating.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-treeselect class="md:w-80 w-full" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item">
                <ng-template #dropdownicon>
                    <i class="pi pi-search"></i>
                </ng-template>
                <ng-template #header>
                    <div class="font-medium px-3 py-2">Available Files</div>
                </ng-template>
                <ng-template #footer>
                    <div class="px-3 pt-1 pb-2 flex justify-between">
                        <p-button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
                        <p-button label="Remove All" severity="danger" text size="small" icon="pi pi-plus" />
                    </div>
                </ng-template>
            </p-treeselect>
        </div>
        <app-code [code]="code" selector="tree-select-template-demo"></app-code>
    `
})
export class TemplateDoc {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    code: Code = {
        basic: `<p-treeselect class="md:w-80 w-full" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item">
    <ng-template #dropdownicon>
        <i class="pi pi-search"></i>
    </ng-template>
    <ng-template #header>
        <div class="font-medium px-3 py-2">Available Files</div>
    </ng-template>
    <ng-template #footer>
        <div class="px-3 pt-1 pb-2 flex justify-between">
            <p-button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
            <p-button label="Remove All" severity="danger" text size="small" icon="pi pi-plus" />
        </div>
    </ng-template>
</p-treeselect>`,

        html: `<div class="card flex justify-center">
    <p-treeselect class="md:w-80 w-full" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item">
        <ng-template #dropdownicon>
            <i class="pi pi-search"></i>
        </ng-template>
        <ng-template #header>
            <div class="font-medium px-3 py-2">Available Files</div>
        </ng-template>
        <ng-template #footer>
            <div class="px-3 pt-1 pb-2 flex justify-between">
                <p-button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
                <p-button label="Remove All" severity="danger" text size="small" icon="pi pi-plus" />
            </div>
        </ng-template>
    </p-treeselect>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { NodeService } from '@/service/nodeservice';
import { FormsModule } from '@angular/forms';
import { TreeSelect } from 'primeng/treeselect';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'tree-select-template-demo',
    templateUrl: './tree-select-template-demo.html',
    standalone: true,
    imports: [FormsModule, TreeSelect, ButtonModule],
    providers: [NodeService]
  })
export class TreeSelectTemplateDemo {
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
