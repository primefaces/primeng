import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';

@Component({
    selector: 'multiple-doc',
    standalone: true,
    imports: [TreeSelectModule, FormsModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                More than one node is selectable by setting <i>selectionMode</i> to <i>multiple</i>. By default in multiple selection mode, metaKey press (e.g. <i>⌘</i>) is necessary to add to existing selections however this can be configured with
                disabling the <i>metaKeySelection</i> property. Note that in touch enabled devices, TreeSelect always ignores metaKey.
            </p>
            <p>In multiple selection mode, value binding should be a key-value pair where key is the node key and value is a boolean to indicate selection.</p>
        </app-docsectiontext>
        <app-code [code]="exampleCode" [hideToggleCode]="true"></app-code>
        <div class="card flex justify-center">
            <p-treeselect class="w-full md:w-80" [(ngModel)]="selectedNodes" [options]="nodes" [metaKeySelection]="false" selectionMode="multiple" placeholder="Select Item" />
        </div>
        <app-code></app-code>
    `
})
export class MultipleDoc {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    exampleCode = {
        typescript: `{
    '0-0': true,
    '0-1-0': true
}`
    };
}
