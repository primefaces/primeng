import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { Component, OnInit, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'virtual-scroll-doc',
    standalone: true,
    imports: [TreeModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>VirtualScroller is a performance-approach to handle huge data efficiently. Setting <i>virtualScroll</i> property as true and providing a <i>virtualScrollItemSize</i> in pixels would be enough to enable this functionality.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tree [value]="nodes()" scrollHeight="250px" [virtualScroll]="true" [virtualScrollItemSize]="46" />
        </div>
        <app-code [code]="code" selector="tree-virtual-scroll-demo"></app-code>
    `
})
export class VirtualScrollDoc implements OnInit {
    nodes = signal<TreeNode[]>(undefined);

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodes.set(this.nodeService.generateNodes(150));
    }

    code: Code = {
        basic: `<p-tree [value]="nodes()" scrollHeight="250px" [virtualScroll]="true" [virtualScrollItemSize]="46" />`,

        html: `<div class="card">
    <p-tree [value]="nodes()" scrollHeight="250px" [virtualScroll]="true" [virtualScrollItemSize]="46" />
</div>`,

        typescript: `import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { Tree } from 'primeng/tree';

@Component({
    selector: 'tree-virtual-scroll-demo',
    templateUrl: './tree-virtual-scroll-demo.html',
    standalone: true,
    imports: [Tree],
    providers: [NodeService]
})
export class TreeVirtualScrollDemo implements OnInit {
    nodes = signal<TreeNode[]>(undefined);

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodes.set(this.nodeService.generateNodes(150));
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
}
`
    };
}
