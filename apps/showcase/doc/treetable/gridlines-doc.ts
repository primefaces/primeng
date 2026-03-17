import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

@Component({
    selector: 'grid-lines-doc',
    standalone: true,
    imports: [TreeTableModule, AppCode, AppDemoWrapper, AppDocSectionText, DeferredDemo],
    template: ` <section class="py-6">
        <app-docsectiontext>
            <p>Enabling <i>showGridlines</i> displays grid lines.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable [value]="files" [scrollable]="true" showGridlines [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Type</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowNode let-rowData="rowData">
                        <tr [ttRow]="rowNode">
                            <td>
                                <div class="flex items-center gap-2">
                                    <p-treetable-toggler [rowNode]="rowNode" />
                                    <span>{{ rowData.name }}</span>
                                </div>
                            </td>
                            <td>{{ rowData.size }}</td>
                            <td>{{ rowData.type }}</td>
                        </tr>
                    </ng-template>
                </p-treetable>
            </p-deferred-demo>
            <app-code></app-code>
        </app-demo-wrapper>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridlinesDoc {
    files!: TreeNode[];

    constructor(private nodeService: NodeService) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
    }
}
