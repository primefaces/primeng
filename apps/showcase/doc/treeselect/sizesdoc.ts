import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';

@Component({
    selector: 'sizes-doc',
    template: `
        <app-docsectiontext>
            <p>TreeSelect provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-treeselect [(ngModel)]="value1" [options]="nodes" size="small" placeholder="Small" class="md:w-80 w-full" containerStyleClass="w-full" />
            <p-treeselect [(ngModel)]="value2" [options]="nodes" placeholder="Normal" class="md:w-80 w-full" containerStyleClass="w-full" />
            <p-treeselect [(ngModel)]="value3" [options]="nodes" size="large" placeholder="Large" class="md:w-80 w-full" containerStyleClass="w-full" />
        </div>
        <app-code [code]="code" selector="tree-select-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    nodes!: any[];

    value1: any;

    value2: any;

    value3: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    code: Code = {
        basic: `<p-treeselect [(ngModel)]="value1" [options]="nodes" size="small" placeholder="Small" class="md:w-80 w-full" containerStyleClass="w-full" />
<p-treeselect [(ngModel)]="value2" [options]="nodes" placeholder="Normal" class="md:w-80 w-full" />
<p-treeselect [(ngModel)]="value3" [options]="nodes" size="large" placeholder="Large" class="md:w-80 w-full" containerStyleClass="w-full" />`,

        html: `<div class="card flex flex-col items-center gap-4">
    <p-treeselect [(ngModel)]="value1" [options]="nodes" size="small" placeholder="Small" class="md:w-80 w-full" containerStyleClass="w-full" />
    <p-treeselect [(ngModel)]="value2" [options]="nodes" placeholder="Normal" class="md:w-80 w-full" containerStyleClass="w-full" />
    <p-treeselect [(ngModel)]="value3" [options]="nodes" size="large" placeholder="Large" class="md:w-80 w-full" containerStyleClass="w-full" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { NodeService } from '@/service/nodeservice';
import { FormsModule } from '@angular/forms';
import { TreeSelect } from 'primeng/treeselect';

@Component({
    selector: 'tree-select-sizes-demo',
    templateUrl: './tree-select-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, TreeSelect],
    providers: [NodeService]
  })
export class TreeSelectSizesDemo {
    nodes!: any[];

    value1: any;

    value2: any;

    value3: any;

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
