import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { TreeTableModule } from 'primeng/treetable';

@Component({
    selector: 'tree-table-loading-skeleton-doc',
    standalone: true,
    imports: [TreeTableModule, AppDocSectionText, AppCode, DeferredDemo, SkeletonModule],
    template: ` <app-docsectiontext>
            <p>Skeleton component can be used as a placeholder during the loading process.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-treetable [value]="files()" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Type</th>
                        </tr>
                    </ng-template>
                    <ng-template #body>
                        <tr>
                            <td><p-skeleton /></td>
                            <td><p-skeleton /></td>
                            <td><p-skeleton /></td>
                        </tr>
                    </ng-template>
                </p-treetable>
            </div>
        </p-deferred-demo>
        <app-code selector="tree-table-loading-skeleton-demo"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSkeletonDoc {
    files = signal<TreeNode[]>([]);

    constructor(private nodeService: NodeService) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => this.files.set(files));
    }
}
