import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'selection-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                Nodes can be selected by defining <i>selectionMode</i> along with a value binding with <i>selection</i> properties. By default only one node can be selected, set <i>selectionMode</i> as <i>multiple</i> to select more than one.
            </p></app-docsectiontext
        >
        <div class="card flex justify-center overflow-x-auto">
            <p-organization-chart [value]="data" selectionMode="multiple" [(selection)]="selectedNodes" [collapsible]="true">
                <ng-template let-node pTemplate="person">
                    <div class="flex flex-col">
                        <div class="flex flex-col items-center">
                            <img [src]="node.data.image" class="mb-4 w-12 h-12" />
                            <div class="font-bold mb-2">{{ node.data.name }}</div>
                            <div>{{ node.data.title }}</div>
                        </div>
                    </div>
                </ng-template>
            </p-organization-chart>
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
        basic: `<p-organization-chart [value]="data" selectionMode="multiple" [(selection)]="selectedNodes" [collapsible]="true">
    <ng-template let-node pTemplate="person">
        <div class="flex flex-col">
            <div class="flex flex-col items-center">
                <img [src]="node.data.image" class="mb-4 w-12 h-12" />
                <div class="font-bold mb-2">{{ node.data.name }}</div>
                <div>{{ node.data.title }}</div>
            </div>
        </div>
    </ng-template>
</p-organization-chart>`,

        html: `<div class="card flex justify-center overflow-x-auto">
    <p-organization-chart [value]="data" selectionMode="multiple" [(selection)]="selectedNodes" [collapsible]="true">
        <ng-template let-node pTemplate="person">
            <div class="flex flex-col">
                <div class="flex flex-col items-center">
                    <img [src]="node.data.image" class="mb-4 w-12 h-12" />
                    <div class="font-bold mb-2">{{ node.data.name }}</div>
                    <div>{{ node.data.title }}</div>
                </div>
            </div>
        </ng-template>
    </p-organization-chart>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
    selector: 'organization-chart-selection-demo',
    templateUrl: './organization-chart-selection-demo.html',
    standalone: true,
    imports: [OrganizationChartModule]
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
