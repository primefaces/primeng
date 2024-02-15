import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'selection-doc',
    template: `
        <app-docsectiontext>
            <p>
                Nodes can be selected by defining <i>selectionMode</i> along with a value binding with <i>selection</i> properties. By default only one node can be selected, set <i>selectionMode</i> as <i>multiple</i> to select more than one.
            </p></app-docsectiontext
        >
        <div class="card flex justify-content-center overflow-x-auto">
            <p-organizationChart [value]="data" selectionMode="multiple" [(selection)]="selectedNodes">
                <ng-template let-node pTemplate="person">
                    <div class="p-2 text-center">
                        <img [src]="node.data.image" class="mb-3 w-3rem h-3rem" />
                        <div class="font-bold">{{ node.data.name }}</div>
                        <div>{{ node.data.title }}</div>
                    </div>
                </ng-template>
            </p-organizationChart>
        </div>
        <app-code [code]="code" selector="organization-chart-selection-demo"></app-code>
    `
})
export class SelectionDoc {
    selectedNodes!: TreeNode[];

    data: TreeNode[] = [
        {
            expanded: true,
            type: 'person',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            label: 'Sales'
                        },
                        {
                            label: 'Marketing'
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development'
                        },
                        {
                            label: 'UI/UX Design'
                        }
                    ]
                }
            ]
        }
    ];

    code: Code = {
        basic: `<p-organizationChart [value]="data" selectionMode="multiple" [(selection)]="selectedNodes">
    <ng-template let-node pTemplate="person">
        <div class="p-2 text-center">
            <img [src]="node.data.image" class="mb-3 w-3rem h-3rem" />
            <div class="font-bold">{{ node.data.name }}</div>
            <div>{{ node.data.title }}</div>
        </div>
    </ng-template>
</p-organizationChart>`,

        html: `
<div class="card flex justify-content-center overflow-x-auto">
    <p-organizationChart [value]="data" selectionMode="multiple" [(selection)]="selectedNodes">
        <ng-template let-node pTemplate="person">
            <div class="p-2 text-center">
                <img [src]="node.data.image" class="mb-3 w-3rem h-3rem" />
                <div class="font-bold">{{ node.data.name }}</div>
                <div>{{ node.data.title }}</div>
            </div>
        </ng-template>
    </p-organizationChart>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'organization-chart-selection-demo',
    templateUrl: './organization-chart-selection-demo.html',
})
export class OrganizationChartSelectionDemo {
    selectedNodes!: TreeNode[];

    data: TreeNode[] = [
        {
            expanded: true,
            type: 'person',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            label: 'Sales'
                        },
                        {
                            label: 'Marketing'
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development'
                        },
                        {
                            label: 'UI/UX Design'
                        }
                    ]
                }
            ]
        }
    ];
}`
    };
}
