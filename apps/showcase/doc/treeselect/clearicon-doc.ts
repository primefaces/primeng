import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { RouterModule } from '@angular/router';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'clearicon-doc',
    standalone: true,
    imports: [TreeSelectModule, FormsModule, RouterModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>showClear</i> is enabled, a clear icon is displayed to clear the value.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-treeselect [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" class="md:w-80 w-full" [showClear]="true" />
        </div>
        <app-code></app-code>
    `
})
export class ClearIconDoc {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }
}
