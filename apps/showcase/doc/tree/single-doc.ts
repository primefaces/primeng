import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'single-doc',
    standalone: true,
    imports: [TreeModule, FormsModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Single node selection is configured by setting <i>selectionMode</i> as <i>single</i> along with <i>selection</i> properties to manage the selection value binding.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tree [value]="files()" class="w-full md:w-[30rem]" selectionMode="single" [(selection)]="selectedFile" />
        </div>
        <app-code></app-code>
    `
})
export class SingleDoc implements OnInit {
    files = signal<TreeNode[]>(undefined);

    selectedFile!: TreeNode;

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files.set(data);
        });
    }
}
