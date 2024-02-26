import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'lazy-virtual-scroll-doc',
    template: `
        <app-docsectiontext>
            <p>VirtualScroller is a performance-approach to handle huge data efficiently. Setting <i>virtualScroll</i> property as true and providing a <i>virtualScrollItemSize</i> in pixels would be enough to enable this functionality.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tree class="w-full md:w-30rem" scrollHeight="250px" [virtualScroll]="true" [lazy]="true" [virtualScrollItemSize]="46" [value]="files" (onNodeExpand)="nodeExpand($event)" [loading]="loading"></p-tree>
        </div>
        <app-code [code]="code" selector="tree-virtual-scroll-lazy-demo"></app-code>
    `
})
export class LazyVirtualScrollDoc implements OnInit {
    loading: boolean = false;

    files!: TreeNode[];

    virtualFiles!: TreeNode[];

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.nodeService.getLazyFiles().then((files) => (this.files = this.duplicateData(files, 50)));
            this.loading = false;
            this.cd.markForCheck();
        }, 1000);
    }

    duplicateData(data: TreeNode[], count: number): TreeNode[] {
        let duplicatedData: TreeNode[] = [];
        for (let i = 0; i < count; i++) {
            duplicatedData = [...duplicatedData, ...data.map((item) => ({ ...item }))];
        }
        return duplicatedData;
    }

    nodeExpand(event: any) {
        if (event.node) {
            this.loading = true;
            setTimeout(() => {
                this.nodeService.getLazyFiles().then((nodes) => {
                    event.node.children = nodes;
                    this.files = [...this.files, event.node.children];
                });
                this.loading = false;
                this.cd.markForCheck();
            }, 200);
        }
    }

    code: Code = {
        basic: `<p-tree class="w-full md:w-30rem" scrollHeight="250px" [virtualScroll]="true" [lazy]="true" [virtualScrollItemSize]="46" [value]="files" (onNodeExpand)="nodeExpand($event)" [loading]="loading"></p-tree>`,

        html: `<div class="card flex justify-content-center">
<p-tree class="w-full md:w-30rem" scrollHeight="250px" [virtualScroll]="true" [lazy]="true" [virtualScrollItemSize]="46" [value]="files" (onNodeExpand)="nodeExpand($event)" [loading]="loading"></p-tree>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'tree-template-demo',
    templateUrl: './tree-template-demo.html'
})
export class TreeTemplateDemo implements OnInit {
    loading: boolean = false;

    files!: TreeNode[];

    virtualFiles!: TreeNode[];

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.nodeService.getLazyFiles().then((files) => (this.files = this.duplicateData(files, 50)));
            this.loading = false;
            this.cd.markForCheck();
        }, 1000);
    }

    duplicateData(data: TreeNode[], count: number): TreeNode[] {
        let duplicatedData: TreeNode[] = [];
        for (let i = 0; i < count; i++) {
            duplicatedData = [...duplicatedData, ...data.map((item) => ({ ...item }))];
        }
        return duplicatedData;
    }

    nodeExpand(event: any) {
        if (event.node) {
            this.loading = true;
            setTimeout(() => {
                this.nodeService.getLazyFiles().then((nodes) => {
                    event.node.children = nodes;
                    this.files = [...this.files, event.node.children];
                });
                this.loading = false;
                this.cd.markForCheck();
            }, 200);
        }
    }
}`
    };
}
