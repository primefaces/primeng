import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { Component, OnInit, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [TreeModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Tree component requires an array of <i>TreeNode</i> objects as its <i>value</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tree [value]="files()" class="w-full md:w-[30rem]" />
        </div>
        <app-code selector="tree-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    files = signal<TreeNode[]>(undefined);

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files.set(data);
        });
    }
}
