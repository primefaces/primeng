import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';

@Component({
    selector: 'virtual-scroll-doc',
    standalone: true,
    imports: [FormsModule, TreeSelectModule, AppCode, AppDocSectionText],
    template: ` <app-docsectiontext>
            <p>
                VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance
                issues. Usage is simple as setting <i>virtualScroll</i> property to true and defining <i>virtualScrollItemSize</i> to specify the height of an item.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-treeselect
                class="w-full md:w-80"
                [(ngModel)]="selectedNodes"
                [options]="nodes"
                display="chip"
                [metaKeySelection]="false"
                selectionMode="checkbox"
                placeholder="Select Item"
                [virtualScroll]="true"
                [virtualScrollItemSize]="35"
                [virtualScrollOptions]="{ scrollHeight: '200px' }"
            ></p-treeselect>
        </div>
        <app-code selector="tree-select-virtual-scroll-demo"></app-code>`
})
export class VirtualScrollDoc {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getLargeTreeNodes().then((files) => (this.nodes = files));
    }
}
