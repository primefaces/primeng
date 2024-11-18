import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'organization-chart-colored-demo',
    template: `
        <app-docsectiontext>
            <p>Styling a specific node is configured with <i>class</i> and <i>style</i> options of a TreeNode.</p></app-docsectiontext
        >
        <div class="card overflow-x-auto">
            <p-organization-chart [value]="data" [collapsible]="true">
                <ng-template let-node pTemplate="person">
                    <div class="flex flex-col">
                        <div class="flex flex-col items-center">
                            <img [src]="node.data.image" class="mb-4 w-12 h-12" />
                            <span class="font-bold mb-2">{{ node.data.name }}</span>
                            <span>{{ node.data.title }}</span>
                        </div>
                    </div>
                </ng-template>
            </p-organization-chart>
        </div>
        <app-code [code]="code" selector="organization-chart-colored-demo"></app-code>
    `
})
export class ColoredDoc {
    data: TreeNode[] = [
        {
            expanded: true,
            type: 'person',
            styleClass: '!bg-indigo-100 !text-indigo-900 rounded-xl',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    styleClass: '!bg-purple-100 !text-purple-900 rounded-xl',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            label: 'Sales',
                            styleClass: '!bg-purple-100 !text-purple-900 rounded-xl'
                        },
                        {
                            label: 'Marketing',
                            styleClass: '!bg-purple-100 !text-purple-900 rounded-xl'
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    styleClass: '!bg-teal-100 !text-teal-900 rounded-xl',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development',
                            styleClass: '!bg-teal-100 !text-teal-900 rounded-xl'
                        },
                        {
                            label: 'UI/UX Design',
                            styleClass: '!bg-teal-100 !text-teal-900 rounded-xl'
                        }
                    ]
                }
            ]
        }
    ];

    code: Code = {
        basic: `<p-organization-chart [value]="data" [collapsible]="true">
    <ng-template let-node pTemplate="person">
        <div class="flex flex-col">
            <div class="flex flex-col items-center">
                <img [src]="node.data.image" class="mb-4 w-12 h-12" />
                <span class="font-bold mb-2">{{ node.data.name }}</span>
                <span>{{ node.data.title }}</span>
            </div>
        </div>
    </ng-template>
</p-organization-chart>`,

        html: `<div class="card overflow-x-auto">
    <p-organization-chart [value]="data" [collapsible]="true">
        <ng-template let-node pTemplate="person">
            <div class="flex flex-col">
                <div class="flex flex-col items-center">
                    <img [src]="node.data.image" class="mb-4 w-12 h-12" />
                    <span class="font-bold mb-2">{{ node.data.name }}</span>
                    <span>{{ node.data.title }}</span>
                </div>
            </div>
        </ng-template>
    </p-organization-chart>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
    selector: 'organization-chart-colored-demo',
    templateUrl: './organization-chart-colored-demo.html',
    standalone: true,
    imports: [OrganizationChartModule]
})
export class OrganizationChartColoredDemo {
     data: TreeNode[] = [
        {
            expanded: true,
            type: 'person',
            styleClass: '!bg-indigo-100 !text-indigo-900 rounded-xl',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO',
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    styleClass: '!bg-purple-100 !text-purple-900 rounded-xl',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO',
                    },
                    children: [
                        {
                            label: 'Sales',
                            styleClass: '!bg-purple-100 !text-purple-900 rounded-xl',
                        },
                        {
                            label: 'Marketing',
                            styleClass: '!bg-purple-100 !text-purple-900 rounded-xl',
                        },
                    ],
                },
                {
                    expanded: true,
                    type: 'person',
                    styleClass: '!bg-teal-100 !text-teal-900 rounded-xl',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO',
                    },
                    children: [
                        {
                            label: 'Development',
                            styleClass: '!bg-teal-100 !text-teal-900 rounded-xl',
                        },
                        {
                            label: 'UI/UX Design',
                            styleClass: '!bg-teal-100 !text-teal-900 rounded-xl',
                        },
                    ],
                },
            ],
        },
    ];
}`
    };
}
