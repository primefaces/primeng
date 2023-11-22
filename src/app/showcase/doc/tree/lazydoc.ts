import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'lazy-demo',
    template: `
        <app-docsectiontext>
            <p>Lazy loading is useful when dealing with huge datasets, in this example nodes are dynamically loaded on demand using <i>loading</i> property and <i>onNodeExpand</i> method.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tree class="w-full md:w-30rem" [value]="files" (onNodeExpand)="nodeExpand($event)" [loading]="loading"></p-tree>
        </div>
        <app-code [code]="code" selector="tree-lazy-demo"></app-code>
    `,
    providers: [MessageService]
})
export class LazyDoc implements OnInit {

    loading: boolean = false;

    files!: TreeNode[];

    constructor(private nodeService: NodeService, private messageService: MessageService) {}

    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.nodeService.getLazyFiles().then((files) => (this.files = files));
            this.loading = false;
        }, 1000);
    }

    nodeExpand(event: any) {
        if (event.node) {
            this.loading = true;
            setTimeout(() => {
                this.nodeService.getLazyFiles().then((nodes) => {
                    event.node.children = nodes;
                    this.messageService.add({ severity: 'info', summary: 'Children Loaded', detail: event.node.label });
                });
                this.loading = false;
            }, 200);
        }
    }

    code: Code = {
        basic: `
<p-tree class="w-full md:w-30rem" [value]="files" (onNodeExpand)="nodeExpand($event)" [loading]="loading"></p-tree>`,

        html: `
<div class="card flex justify-content-center">
    <p-tree class="w-full md:w-30rem" [value]="files" (onNodeExpand)="nodeExpand($event)" [loading]="loading"></p-tree>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'tree-lazy-demo',
    templateUrl: './tree-lazy-demo.html',
    providers: [MessageService]
})
export class TreeLazyDemo implements OnInit {
    loading: boolean = false;

    files!: TreeNode[];

    constructor(private nodeService: NodeService, private messageService: MessageService) { }

    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.nodeService.getLazyFiles().then((files) => (this.files = files));
            this.loading = false;
        }, 1000);
    }

    nodeExpand(event: any) {
        if (event.node) {
            this.loading = true;
            setTimeout(() => {
                this.nodeService.getLazyFiles().then((nodes) => {
                    event.node.children = nodes;
                    this.messageService.add({ severity: 'info', summary: 'Children Loaded', detail: event.node.label });
                });
                this.loading = false;
            }, 200);
        }
    }
}`,

        service: ['NodeService'],

        data: `
    /* NodeService */
{
    "label": "Lazy Node 0",
    "data": "Node 0",
    "expandedIcon": "pi pi-folder-open",
    "collapsedIcon": "pi pi-folder",
    "leaf": false
}
...`
    };
}
