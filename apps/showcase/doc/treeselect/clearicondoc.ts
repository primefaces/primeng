import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { RouterModule } from '@angular/router';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'clear-icon-doc',
    standalone: true,
    imports: [TreeSelectModule, FormsModule, RouterModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>clearIcon</i> template allows you to customize the icon used to clear the input field.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-treeselect [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" class="md:w-80 w-full" [showClear]="true">
                <ng-template #clearicon>
                    <i class="pi pi-times-circle"></i>
                </ng-template>
            </p-treeselect>
        </div>
        <app-code [code]="code" selector="tree-select-clear-icon-demo"></app-code>
    `
})
export class ClearIconDoc {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    code: Code = {
        basic: `<p-treeselect [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" class="md:w-80 w-full" [showClear]="true">
    <ng-template #clearicon>
        <i class="pi pi-times-circle"></i>
    </ng-template>
</p-treeselect>`,

        html: `<div class="card flex justify-center">
    <p-treeselect [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" class="md:w-80 w-full" [showClear]="true">
        <ng-template #clearicon>
            <i class="pi pi-times-circle"></i>
        </ng-template>
    </p-treeselect>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { NodeService } from '@/service/nodeservice';
import { FormsModule } from '@angular/forms';
import { TreeSelect } from 'primeng/treeselect';

@Component({
    selector: 'tree-select-clear-icon-demo',
    templateUrl: './tree-select-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, TreeSelect],
    providers: [NodeService]
  })
export class TreeSelectClearIconDemo {
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
