import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'multiple-doc',
    standalone: true,
    imports: [TreeModule, FormsModule, ToggleSwitchModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                More than one node is selectable by setting <i>selectionMode</i> to <i>multiple</i>. By default in multiple selection mode, metaKey press (e.g. <i>⌘</i>) is necessary to add to existing selections however this can be configured with
                disabling the <i>metaKeySelection</i> property. Note that in touch enabled devices, Tree always ignores metaKey.
            </p>
            <p>In multiple selection mode, value binding should be a key-value pair where key is the node key and value is a boolean to indicate selection.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex items-center mb-6 gap-2">
                <p-toggleswitch inputId="input-metakey" [(ngModel)]="metaKeySelection" />
                <label for="input-metakey">MetaKey</label>
            </div>
            <p-tree [metaKeySelection]="metaKeySelection" [value]="files()" class="w-full md:w-[30rem]" selectionMode="multiple" [(selection)]="selectedFiles" />
        </div>
        <app-code></app-code>
    `
})
export class MultipleDoc implements OnInit {
    metaKeySelection: boolean = false;

    files = signal<TreeNode[]>(undefined);

    selectedFiles!: TreeNode[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files.set(data);
        });
    }
}
