import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'checkbox-doc',
    standalone: true,
    imports: [TreeModule, FormsModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Selection of multiple nodes via checkboxes is enabled by configuring <i>selectionMode</i> as <i>checkbox</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tree [value]="files()" selectionMode="checkbox" class="w-full md:w-[30rem]" [(selection)]="selectedFiles" />
        </div>
        <app-code selector="tree-checkbox-demo"></app-code>
    `
})
export class CheckboxDoc implements OnInit {
    files = signal<TreeNode[]>(undefined);

    selectedFiles!: TreeNode[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files.set(data);
        });
    }
}
