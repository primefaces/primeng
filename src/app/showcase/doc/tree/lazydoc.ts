import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'lazy-demo',
    template: `
        <app-docsectiontext>
            <p>
                Lazy loading is useful when dealing with huge datasets, in this example nodes are dynamically loaded on demand using <i>loading</i> property and <i>onNodeExpand</i> method. Default value of <i>loadingMode</i> is <i>mask</i> and also
                <i>icon</i> is available.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap p-fluid gap-3">
            <div class="flex-auto md:flex md:justify-content-start md:align-items-center flex-column">
                <label for="mask" class="font-bold block mb-2">Mask Mode</label>
                <p-tree class="w-full md:w-30rem" [value]="nodes" (onNodeExpand)="onNodeExpand($event)" [loading]="loading" />
            </div>
            <div class="flex-auto md:flex md:justify-content-start md:align-items-center flex-column">
                <label for="icon" class="font-bold block mb-2">Icon Mode</label>
                <p-tree class="w-full md:w-30rem" [value]="nodes2" loadingMode="icon" (onNodeExpand)="onNodeExpand2($event)" />
            </div>
        </div>
        <app-code [code]="code" selector="tree-lazy-demo"></app-code>
    `
})
export class LazyDoc implements OnInit {
    loading: boolean = false;

    nodes!: TreeNode[];

    nodes2!: TreeNode[];

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading = true;
        this.nodes2 = this.initiateNodes2();

        setTimeout(() => {
            this.nodes = this.initiateNodes();
            this.loading = false;
            this.nodes2.map((node) => (node.loading = false));
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

    initiateNodes2(): TreeNode[] {
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
            this.loading = true;

            setTimeout(() => {
                let _node = { ...event.node };
                _node.children = [];

                for (let i = 0; i < 3; i++) {
                    _node.children.push({
                        key: event.node.key + '-' + i,
                        label: 'Lazy ' + event.node.label + '-' + i
                    });
                }

                this.nodes[parseInt(event.node.key, 10)] = _node;

                this.loading = false;
                this.cd.markForCheck();
            }, 500);
        }
    }

    onNodeExpand2(event: any) {
        if (!event.node.children) {
            event.node.loading = true;

            setTimeout(() => {
                let _node = { ...event.node };
                _node.children = [];

                for (let i = 0; i < 3; i++) {
                    _node.children.push({
                        key: event.node.key + '-' + i,
                        label: 'Lazy ' + event.node.label + '-' + i
                    });
                }

                const key = parseInt(_node.key, 10);
                this.nodes2[key] = { ..._node, loading: false };
                this.cd.markForCheck();
            }, 500);
        }
    }

    code: Code = {
        basic: `<p-tree 
    class="w-full md:w-30rem" 
    [value]="nodes" 
    (onNodeExpand)="onNodeExpand($event)" 
    [loading]="loading" />
<p-tree 
    class="w-full md:w-30rem" 
    [value]="nodes2" 
    loadingMode="icon" 
    (onNodeExpand)="onNodeExpand2($event)" />`,

        html: `<div class="card flex flex-wrap p-fluid gap-3">
    <div class="flex-auto md:flex md:justify-content-start md:align-items-center flex-column">
        <label for="mask" class="font-bold block mb-2">Mask Mode</label>
        <p-tree 
            class="w-full md:w-30rem" 
            [value]="nodes" 
            (onNodeExpand)="onNodeExpand($event)" 
            [loading]="loading" />
    </div>
    <div class="flex-auto md:flex md:justify-content-start md:align-items-center flex-column">
        <label for="icon" class="font-bold block mb-2">Icon Mode</label>
        <p-tree 
            class="w-full md:w-30rem" 
            [value]="nodes2" 
            loadingMode="icon" 
            (onNodeExpand)="onNodeExpand2($event)" />
    </div>
</div>`,

        typescript: `import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'tree-lazy-demo',
    templateUrl: './tree-lazy-demo.html',
    standalone: true,
    imports: [TreeModule]
})
export class TreeLazyDemo implements OnInit {
    loading: boolean = false;

    nodes!: TreeNode[];

    nodes2!: TreeNode[];

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading = true;
        this.nodes2 = this.initiateNodes2();

        setTimeout(() => {
            this.nodes = this.initiateNodes();
            this.loading = false;
            this.nodes2.map((node) => (node.loading = false));
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

    initiateNodes2(): TreeNode[] {
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
            this.loading = true;

            setTimeout(() => {
                let _node = { ...event.node };
                _node.children = [];

                for (let i = 0; i < 3; i++) {
                    _node.children.push({
                        key: event.node.key + '-' + i,
                        label: 'Lazy ' + event.node.label + '-' + i
                    });
                }

                this.nodes[parseInt(event.node.key, 10)] = _node;

                this.loading = false;
                this.cd.markForCheck();
            }, 500);
        }
    }

    onNodeExpand2(event: any) {
        if (!event.node.children) {
            event.node.loading = true;

            setTimeout(() => {
                let _node = { ...event.node };
                _node.children = [];

                for (let i = 0; i < 3; i++) {
                    _node.children.push({
                        key: event.node.key + '-' + i,
                        label: 'Lazy ' + event.node.label + '-' + i
                    });
                }

                const key = parseInt(_node.key, 10);
                this.nodes2[key] = { ..._node, loading: false };
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
