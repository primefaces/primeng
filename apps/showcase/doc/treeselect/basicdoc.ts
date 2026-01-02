import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { RouterModule } from '@angular/router';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [TreeSelectModule, FormsModule, RouterModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>TreeSelect is used as a controlled component with <i>ng-model</i> directive along with an <i>options</i> collection. Internally <a routerLink="/tree">Tree</a> component is used so the options model is based on TreeNode API.</p>
            <p>In single selection mode, value binding should be the <i>key</i> value of a node.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-treeselect class="md:w-80 w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item" />
        </div>
        <app-code selector="tree-select-basic-demo"></app-code>
    `
})
export class BasicDoc {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }
}
