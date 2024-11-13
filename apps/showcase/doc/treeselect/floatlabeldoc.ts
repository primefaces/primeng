import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { Component } from '@angular/core';

@Component({
    selector: 'floatlabel-doc',
    template: `
        <app-docsectiontext>
            <p>
                A floating label appears on top of the input field when focused. Visit
                <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel class="w-full md:w-80">
                <p-treeselect [(ngModel)]="value1" inputId="over_label" [options]="nodes" class="w-full" containerStyleClass="w-full" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>

            <p-floatlabel class="w-full md:w-80" variant="in">
                <p-treeselect [(ngModel)]="value2" inputId="in_label" [options]="nodes" class="w-full" containerStyleClass="w-full" />
                <label for="in_label">In Label</label>
            </p-floatlabel>

            <p-floatlabel class="w-full md:w-80" variant="on">
                <p-treeselect [(ngModel)]="value3" inputId="on_label" [options]="nodes" class="w-full" containerStyleClass="w-full" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
        <app-code [code]="code" selector="tree-select-floatlabel-demo"></app-code>
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

    code: Code = {
        basic: `<p-floatlabel class="w-full md:w-80">
    <p-treeselect [(ngModel)]="value1" inputId="over_label" [options]="nodes" class="w-full" containerStyleClass="w-full" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel class="w-full md:w-80" variant="in">
    <p-treeselect [(ngModel)]="value2" inputId="in_label" [options]="nodes" class="w-full" containerStyleClass="w-full" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel class="w-full md:w-80" variant="on">
    <p-treeselect [(ngModel)]="value3" inputId="on_label" [options]="nodes" class="w-full" containerStyleClass="w-full" />
    <label for="on_label">On Label</label>
</p-floatlabel>`,

        html: `<div class="card flex flex-wrap justify-center items-end gap-4">
    <p-floatlabel class="w-full md:w-80">
        <p-treeselect [(ngModel)]="value1" inputId="over_label" [options]="nodes" class="w-full" containerStyleClass="w-full" />
        <label for="over_label">Over Label</label>
    </p-floatlabel>

    <p-floatlabel class="w-full md:w-80" variant="in">
        <p-treeselect [(ngModel)]="value2" inputId="in_label" [options]="nodes" class="w-full" containerStyleClass="w-full" />
        <label for="in_label">In Label</label>
    </p-floatlabel>

    <p-floatlabel class="w-full md:w-80" variant="on">
        <p-treeselect [(ngModel)]="value3" inputId="on_label" [options]="nodes" class="w-full" containerStyleClass="w-full" />
        <label for="on_label">On Label</label>
    </p-floatlabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { NodeService } from '@/service/nodeservice';
import { FormsModule } from '@angular/forms';
import { TreeSelect } from 'primeng/treeselect';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
    selector: 'tree-select-floatlabel-demo',
    templateUrl: './tree-select-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, TreeSelect, FloatLabel],
    providers: [NodeService]
})
export class TreeSelectFloatlabelDemo {
    nodes!: any[];

    value1: any;

    value2: any;

    value3: any;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }
}`,

        service: ['NodeService'],

        data: `
    /* NodeService */
{
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
        {
            key: '0-0',
            label: 'Work',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-cog',
            children: [
                { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
            ]
        },
        {
            key: '0-1',
            label: 'Home',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-home',
            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
        }
    ]
},
...`
    };
}
