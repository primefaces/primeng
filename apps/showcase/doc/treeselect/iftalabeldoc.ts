import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';

@Component({
    selector: 'iftalabel-doc',
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel class="w-full md:w-80">
                <p-treeselect [(ngModel)]="selectedValue" inputId="t_file" [options]="nodes" class="w-full" containerStyleClass="w-full" />
                <label for="t_file">File</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="tree-select-iftalabel-demo"></app-code>
    `
})
export class IftaLabelDoc {
    nodes!: any[];

    selectedValue: any;
    code: Code = {
        basic: `<p-iftalabel class="w-full md:w-80">
    <p-treeselect [(ngModel)]="selectedValue" inputId="t_file" [options]="nodes" class="w-full" containerStyleClass="w-full" />
    <label for="t_file">File</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel class="w-full md:w-80">
        <p-treeselect [(ngModel)]="selectedValue" inputId="t_file" [options]="nodes" class="w-full" containerStyleClass="w-full" />
        <label for="t_file">File</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { NodeService } from '@/service/nodeservice';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'tree-select-iftalabel-demo',
    templateUrl: './tree-select-iftalabel-demo.html',
    standalone: true,
    imports: [FormsModule, TreeSelectModule, IftaLabelModule],
    providers: [NodeService]
})
export class TreeSelectIftaLabelDemo {
    nodes!: any[];

    selectedValue: any;

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

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }
}
