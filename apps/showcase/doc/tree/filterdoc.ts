import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'filter-doc',
    standalone: true,
    imports: [TreeModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Filtering is enabled by adding the <i>filter</i> property, by default label property of a node is used to compare against the value in the text field, in order to customize which field(s) should be used during search define
                <i>filterBy</i> property. In addition <i>filterMode</i> specifies the filtering strategy. In <i>lenient</i> mode when the query matches a node, children of the node are not searched further as all descendants of the node are included.
                On the other hand, in <i>strict</i> mode when the query matches a node, filtering continues on all descendants.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4">
            <div class="flex-auto md:flex md:justify-start md:items-center flex-col">
                <p-tree [value]="files()" [filter]="true" filterPlaceholder="Lenient Filter" />
            </div>
            <div class="flex-auto md:flex md:justify-start md:items-center flex-col">
                <p-tree [value]="files2()" [filter]="true" filterMode="strict" filterPlaceholder="Strict Filter" />
            </div>
        </div>
        <app-code [code]="code" selector="tree-filter-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterDoc implements OnInit {
    files = signal<TreeNode[]>(undefined);

    files2 = signal<TreeNode[]>(undefined);

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files.set(data);
            this.files2.set(data);
        });
    }

    code: Code = {
        basic: `<p-tree [value]="files()" [filter]="true" filterPlaceholder="Lenient Filter" />
<p-tree [value]="files2()" [filter]="true" filterMode="strict" filterPlaceholder="Strict Filter" />`,

        html: `<div class="card flex flex-wrap gap-4">
    <div class="flex-auto md:flex md:justify-start md:items-center flex-col">
        <p-tree [value]="files()" [filter]="true" filterPlaceholder="Lenient Filter" />
    </div>
    <div class="flex-auto md:flex md:justify-start md:items-center flex-col">
        <p-tree [value]="files2()" [filter]="true" filterMode="strict" filterPlaceholder="Strict Filter" />
    </div>
</div>`,

        typescript: `import { Component, OnInit, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { Tree } from 'primeng/tree';

@Component({
    selector: 'tree-filter-demo',
    templateUrl: './tree-filter-demo.html',
    standalone: true,
    imports: [Tree],
    providers: [NodeService]
})
export class TreeFilterDemo implements OnInit {
    files = signal<TreeNode[]>(undefined);

    files2 = signal<TreeNode[]>(undefined);

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files.set(data);
            this.files2.set(data);
        });
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
