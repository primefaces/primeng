import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'lazy-virtual-scroll-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>VirtualScroller is a performance-approach to handle huge data efficiently. Setting <i>virtualScroll</i> property as true and providing a <i>virtualScrollItemSize</i> in pixels would be enough to enable this functionality.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tree [value]="nodes" scrollHeight="250px" [virtualScroll]="true" [lazy]="true" [virtualScrollItemSize]="46" (onNodeExpand)="nodeExpand($event)" [loading]="loading" />
        </div>
        <app-code [code]="code" selector="tree-virtual-scroll-lazy-demo"></app-code>
    `
})
export class LazyVirtualScrollDoc implements OnInit {
    loading: boolean = false;

    nodes!: TreeNode[];

    constructor(
        private nodeService: NodeService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.nodes = this.nodeService.generateNodes(150);
            this.loading = false;
        }, 1000);
    }

    nodeExpand(event: any) {
        if (event.node) {
            this.loading = true;
            setTimeout(() => {
                event.node.children = this.nodeService.createNodes(5, event.node.key);
                this.loading = false;
                this.nodes = [...this.nodes];
                this.cd.markForCheck();
            }, 200);
        }
    }

    code: Code = {
        basic: `<p-tree [value]="nodes" scrollHeight="250px" [virtualScroll]="true" [lazy]="true" [virtualScrollItemSize]="46" (onNodeExpand)="nodeExpand($event)" [loading]="loading" />`,

        html: `<div class="card">
    <p-tree [value]="nodes" scrollHeight="250px" [virtualScroll]="true" [lazy]="true" [virtualScrollItemSize]="46" (onNodeExpand)="nodeExpand($event)" [loading]="loading" />
</div>`,

        typescript: `import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { Tree } from 'primeng/tree';

@Component({
    selector: 'tree-virtual-scroll-lazy-demo',
    templateUrl: './tree-virtual-scroll-lazy-demo.html',
    standalone: true,
    imports: [Tree],
    providers: [NodeService]
})
export class TreeVirtualScrollLazyDemo implements OnInit {
    loading: boolean = false;

    nodes!: TreeNode[];

    constructor(
        private nodeService: NodeService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.nodes = this.nodeService.generateNodes(150);
            this.loading = false;
        }, 1000);
    }

    nodeExpand(event: any) {
        if (event.node) {
            this.loading = true;
            setTimeout(() => {
                event.node.children = this.nodeService.createNodes(5, event.node.key);
                this.loading = false;
                this.nodes = [...this.nodes];
                this.cd.markForCheck();
            }, 200);
        }
    }
}`,
        service: ['NodeService'],

        data: `
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Injectable()
export class NodeService {
    generateNodes(count: number): TreeNode[] {
        return this.createNodes(count);
    }

    createNodes(length: number, parentKey?: string): TreeNode[] {
        const _createNodes = (length: number, level: number, parentKey?: string): TreeNode[] => {
            const nodes: TreeNode[] = [];
            for (let i = 0; i < length; i++) {
                const key = parentKey ? \`\${parentKey}-\${i}\` : \`\${i}\`;
                nodes.push({
                    key,
                    label: \`Node \${key}\`,
                    children: level < 2 ? _createNodes(5, level + 1, key) : []
                });
            }
            return nodes;
        };
        return _createNodes(length, 0, parentKey);
    }
}`
    };
}
