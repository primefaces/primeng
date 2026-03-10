import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TreeSelectModule } from 'primeng/treeselect';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'iftalabel-doc',
    standalone: true,
    imports: [FormsModule, RouterModule, TreeSelectModule, IftaLabelModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-iftalabel class="w-full md:w-80">
                    <p-treeselect [(ngModel)]="selectedValue" inputId="t_file" [options]="nodes" class="w-full" />
                    <label for="t_file">File</label>
                </p-iftalabel>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class IftaLabelDoc {
    nodes!: any[];

    selectedValue: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }
}
