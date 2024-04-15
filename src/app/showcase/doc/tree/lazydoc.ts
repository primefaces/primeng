import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TreeNode } from '@alamote/primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'lazy-demo',
    template: `
        <app-docsectiontext>
            <p>Lazy loading is useful when dealing with huge datasets, in this example nodes are dynamically loaded on demand using <i>loading</i> property and <i>onNodeExpand</i> method.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tree class="w-full md:w-30rem" [value]="nodes" [filter]="true" (onNodeExpand)="nodeExpand($event)" [loading]="loading"></p-tree>
        </div>
        <app-code [code]="code" selector="tree-lazy-demo"></app-code>
    `
})
export class LazyDoc implements OnInit {
    loading: boolean = false;

    nodes!: TreeNode[];

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.nodes = this.initiateNodes();
            this.loading = false;
            this.cd.markForCheck();
        }, 2000);
    }

    initiateNodes(): TreeNode[] {
        return [
            {
                key: '0',
                label: 'Node 0',
                leaf: false
            },
            {
                key: '1',
                label: 'Node 1',
                leaf: false
            },
            {
                key: '2',
                label: 'Node 2',
                leaf: false
            }
        ];
    }

    nodeExpand(event: any) {
        if (!event.node.children) {
            this.loading = true;
            setTimeout(() => {
                event.node.children = [];
                for (let i = 0; i < 3; i++) {
                    event.node.children.push({
                        key: event.node.key + '-' + i,
                        label: 'Node ' + event.node.key + '-' + i,
                        leaf: false
                    });
                }
                this.loading = false;
                this.cd.markForCheck();
            }, 500);
        }
    }

    code: Code = {
        basic: `<p-tree class="w-full md:w-30rem" [value]="nodes" [filter]="true" (onNodeExpand)="nodeExpand($event)" [loading]="loading"></p-tree>`,

        html: `
<div class="card flex justify-content-center">
    <p-tree class="w-full md:w-30rem" [value]="nodes" [filter]="true" (onNodeExpand)="nodeExpand($event)" [loading]="loading"></p-tree>
</div>`,

        typescript: `import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TreeNode } from '@alamote/primeng/api';

@Component({
    selector: 'tree-lazy-demo',
    templateUrl: './tree-lazy-demo.html'
})
export class TreeLazyDemo implements OnInit {
    loading: boolean = false;

    nodes!: TreeNode[];

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.nodes = this.initiateNodes();
            this.loading = false;
            this.cd.markForCheck();
        }, 2000);
    }

    initiateNodes(): TreeNode[] {
        return [
            {
                key: '0',
                label: 'Node 0',
                leaf: false
            },
            {
                key: '1',
                label: 'Node 1',
                leaf: false
            },
            {
                key: '2',
                label: 'Node 2',
                leaf: false
            }
        ];
    }

    nodeExpand(event: any) {
        if (!event.node.children) {
            this.loading = true;
            setTimeout(() => {
                event.node.children = [];
                for (let i = 0; i < 3; i++) {
                    event.node.children.push({
                        key: event.node.key + '-' + i,
                        label: 'Node ' + event.node.key + '-' + i,
                        leaf: false
                    });
                }
                this.loading = false;
                this.cd.markForCheck();
            }, 500);
        }
    }
}`,

        data: `{
    key: '0',
    label: 'Node 0',
    leaf: false
},
...`
    };
}
