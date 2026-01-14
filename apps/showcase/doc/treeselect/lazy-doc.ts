import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { TreeSelectModule } from 'primeng/treeselect';

@Component({
    selector: 'lazy-doc',
    standalone: true,
    imports: [FormsModule, TreeSelectModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Lazy loading is useful when dealing with huge datasets, in this example nodes are dynamically loaded on demand using
                <i>loading</i> property and <i>onNodeExpand</i> method.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-treeselect
                class="w-full md:w-80"
                [(ngModel)]="selectedNodes"
                (onNodeExpand)="onNodeExpand($event)"
                [options]="nodes()"
                display="chip"
                [metaKeySelection]="false"
                selectionMode="checkbox"
                placeholder="Select Item"
                [loading]="loading"
                loadingMode="icon"
            />
        </div>
        <app-code></app-code>
    `
})
export class LazyDoc {
    selectedNodes: TreeNode[] = [];

    nodes = signal<TreeNode[]>(undefined);

    loading = signal<boolean>(false);

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading.set(true);
        this.nodes.set(this.initiateNodes());
    }

    initiateNodes(): TreeNode[] {
        return [
            {
                key: '0',
                label: 'Node 0',
                leaf: false,
                loading: false
            },
            {
                key: '1',
                label: 'Node 1',
                leaf: false,
                loading: false
            },
            {
                key: '2',
                label: 'Node 2',
                leaf: false,
                loading: false
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
}
