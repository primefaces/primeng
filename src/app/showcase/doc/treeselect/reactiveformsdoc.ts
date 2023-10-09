import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>TreeSelect can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card">
            <form class="flex justify-content-center" [formGroup]="formGroup">
                <p-treeSelect class="md:w-20rem w-full" containerStyleClass="w-full" formControlName="selectedNodes" [options]="nodes" placeholder="Select Item"></p-treeSelect>
            </form>
        </div>
        <app-code [code]="code" selector="tree-select-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    nodes!: any[];

    formGroup!: FormGroup;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
        this.formGroup = new FormGroup({
            selectedNodes: new FormControl()
        });
    }

    code: Code = {
        basic: `
<form [formGroup]="formGroup">
    <p-treeSelect class="md:w-20rem w-full" containerStyleClass="w-full" formControlName="selectedNodes" [options]="nodes" placeholder="Select Item"></p-treeSelect>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-treeSelect class="md:w-20rem w-full" containerStyleClass="w-full" formControlName="selectedNodes" [options]="nodes" placeholder="Select Item"></p-treeSelect>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'tree-select-reactive-forms-demo',
    templateUrl: './tree-select-reactive-forms-demo.html'
})
export class TreeSelectReactiveFormsDemo implements OnInit {
    nodes!: any[];

    formGroup!: FormGroup;

    constructor(private nodeService: NodeService) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
    }

    ngOnInit() {
        this.formGroup = new FormGroup({
            selectedNodes: new FormControl()
        });
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
