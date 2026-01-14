import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TreeSelectModule } from 'primeng/treeselect';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'floatlabel-doc',
    standalone: true,
    imports: [FormsModule, RouterModule, TreeSelectModule, FloatLabelModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                A floating label appears on top of the input field when focused. Visit
                <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel class="w-full md:w-80">
                <p-treeselect [(ngModel)]="value1" inputId="over_label" [options]="nodes" class="w-full" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>

            <p-floatlabel class="w-full md:w-80" variant="in">
                <p-treeselect [(ngModel)]="value2" inputId="in_label" [options]="nodes" class="w-full" />
                <label for="in_label">In Label</label>
            </p-floatlabel>

            <p-floatlabel class="w-full md:w-80" variant="on">
                <p-treeselect [(ngModel)]="value3" inputId="on_label" [options]="nodes" class="w-full" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
        <app-code></app-code>
    `
})
export class FloatLabelDoc {
    nodes!: any[];

    value1: any;

    value2: any;

    value3: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }
}
