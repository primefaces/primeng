import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { ButtonModule } from 'primeng/button';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [FormsModule, TreeSelectModule, ButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>TreeSelect offers multiple templates for customization through templating.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-treeselect class="md:w-80 w-full" [(ngModel)]="selectedNodes" [options]="nodes" placeholder="Select Item">
                <ng-template #dropdownicon>
                    <i class="pi pi-search"></i>
                </ng-template>
                <ng-template #header>
                    <div class="font-medium px-3 py-2">Available Files</div>
                </ng-template>
                <ng-template #footer>
                    <div class="px-3 pt-1 pb-2 flex justify-between">
                        <p-button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
                        <p-button label="Remove All" severity="danger" text size="small" icon="pi pi-plus" />
                    </div>
                </ng-template>
            </p-treeselect>
        </div>
        <app-code></app-code>
    `
})
export class TemplateDoc {
    nodes!: any[];

    selectedNodes: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }
}
