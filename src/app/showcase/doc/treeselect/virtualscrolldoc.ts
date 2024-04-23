import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'virtual-scroll-doc',
    template: ` <app-docsectiontext>
            <p>
                VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance
                issues. Usage is simple as setting <i>virtualScroll</i> property to true and defining <i>virtualScrollItemSize</i> to specify the height of an item.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-treeSelect
                class="w-full md:w-20rem"
                containerStyleClass="w-full"
                [(ngModel)]="selectedNodes"
                [options]="nodes"
                display="chip"
                [metaKeySelection]="false"
                selectionMode="checkbox"
                placeholder="Select Item"
                [virtualScroll]="true"
                [virtualScrollItemSize]="46"
                [virtualScrollOptions]="{ scrollHeight: '200px' }"
            ></p-treeSelect>
        </div>
        <app-code [code]="code" selector="tree-select-virtual-scroll-demo"></app-code>`
})
export class VirtualScrollDoc {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getLargeTreeNodes().then((files) => (this.nodes = files));
    }

    code: Code = {
        basic: `<p-treeSelect class="w-full md:w-20rem" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" display="chip" [metaKeySelection]="false" selectionMode="checkbox" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="46" [virtualScrollOptions]="{scrollHeight: '200px'}"></p-treeSelect>`,
        html: `
<div class="card flex justify-content-center">
    <p-treeSelect class="w-full md:w-20rem" containerStyleClass="w-full" [(ngModel)]="selectedNodes" [options]="nodes" display="chip" [metaKeySelection]="false" selectionMode="checkbox" placeholder="Select Item" [virtualScroll]="true" [virtualScrollItemSize]="46" [virtualScrollOptions]="{scrollHeight: '200px'}"></p-treeSelect>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'tree-select-virtual-scroll-demo',
    templateUrl: './tree-select-virtual-scroll-demo.html'
})
export class TreeSelectVirtualScrollDemo {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getLargeTreeNodes().then((files) => (this.nodes = files));
    }
}`,

        service: ['NodeService']
    };
}
