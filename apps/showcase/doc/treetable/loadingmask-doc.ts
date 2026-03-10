import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

@Component({
    selector: 'loadingmask-doc',
    standalone: true,
    imports: [TreeTableModule, AppDocSectionText, AppCode, AppDemoWrapper, DeferredDemo],
    template: ` <app-docsectiontext>
            <p>The <i>loading</i> property displays a mask layer to indicate busy state. Use the paginator to display the mask.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable [value]="files" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }" [loading]="true">
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
        </app-demo-wrapper>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingMaskDoc {
    files!: TreeNode[];

    constructor(
        private nodeService: NodeService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
    }
}
