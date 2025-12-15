import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component, OnInit, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'lazy-demo',
    standalone: true,
    imports: [TreeModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Lazy loading is useful when dealing with huge datasets, in this example nodes are dynamically loaded on demand using
                <i>loading</i> property and <i>onNodeExpand</i> method.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-tree class="w-full md:w-[30rem]" [value]="nodes()" loadingMode="icon" (onNodeExpand)="onNodeExpand($event)" />
        </div>
        <app-code [code]="code" selector="tree-lazy-demo"></app-code>
    `
})
export class LazyDoc implements OnInit {
    nodes = signal<TreeNode[]>(undefined);

    ngOnInit() {
        this.nodes.set(this.initiateNodes());

        setTimeout(() => {
            this.nodes.set(this.nodes().map((node) => ({ ...node, loading: false })));
        }, 2000);
    }

    initiateNodes(): TreeNode[] {
        return [
            {
                key: '0',
                label: 'Node 0',
                leaf: false,
                loading: true
            },
            {
                key: '1',
                label: 'Node 1',
                leaf: false,
                loading: true
            },
            {
                key: '2',
                label: 'Node 2',
                leaf: false,
                loading: true
            }
        ];
    }

    onNodeExpand(event: any) {
        if (!event.node.children) {
            event.node.loading = true;

            setTimeout(() => {
                const _nodes = this.nodes();
                let _node = { ...event.node };
                _node.children = [];

                for (let i = 0; i < 3; i++) {
                    _node.children.push({
                        key: event.node.key + '-' + i,
                        label: 'Lazy ' + event.node.label + '-' + i
                    });
                }

                const key = parseInt(_node.key, 10);
                _nodes[key] = { ..._node, loading: false };
                this.nodes.set([..._nodes]);
            }, 500);
        }
    }

    code: Code = {
        basic: `<p-tree class="w-full md:w-[30rem]" [value]="nodes()" loadingMode="icon" (onNodeExpand)="onNodeExpand($event)" />`,

        html: `<div class="card">
    <p-tree class="w-full md:w-[30rem]" [value]="nodes()" loadingMode="icon" (onNodeExpand)="onNodeExpand($event)" />
</div>`,

        typescript: `import { Component, OnInit, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';

@Component({
    selector: 'tree-lazy-demo',
    templateUrl: './tree-lazy-demo.html',
    standalone: true,
    imports: [Tree]
})
export class TreeLazyDemo implements OnInit {
    nodes = signal<TreeNode[]>(undefined);

    ngOnInit() {
        this.nodes.set(this.initiateNodes());

        setTimeout(() => {
            this.nodes.set(this.nodes().map((node) => ({ ...node, loading: false })));
        }, 2000);
    }

    initiateNodes(): TreeNode[] {
        return [
            {
                key: '0',
                label: 'Node 0',
                leaf: false,
                loading: true
            },
            {
                key: '1',
                label: 'Node 1',
                leaf: false,
                loading: true
            },
            {
                key: '2',
                label: 'Node 2',
                leaf: false,
                loading: true
            }
        ];
    }

    onNodeExpand(event: any) {
        if (!event.node.children) {
            event.node.loading = true;

            setTimeout(() => {
                const _nodes = this.nodes();
                let _node = { ...event.node };
                _node.children = [];

                for (let i = 0; i < 3; i++) {
                    _node.children.push({
                        key: event.node.key + '-' + i,
                        label: 'Lazy ' + event.node.label + '-' + i
                    });
                }

                const key = parseInt(_node.key, 10);
                _nodes[key] = { ..._node, loading: false };
                this.nodes.set([..._nodes]);
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
