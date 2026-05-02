import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { Component, OnInit, signal } from '@angular/core';
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
        <app-code></app-code>
    `
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
}
