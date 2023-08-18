import { Component, Input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'organization-chart-colored-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Styling a specific node is configured with <i>class</i> and <i>style</i> options of a TreeNode.</p></app-docsectiontext
        >
        <div class="card flex justify-content-center overflow-x-auto">
            <p-organizationChart [value]="data">
                <ng-template let-node pTemplate="person">
                    <div class="p-2 text-center">
                        <img [src]="node.data.image" class="mb-3 w-3rem h-3rem" />
                        <div class="font-bold">{{ node.data.name }}</div>
                        <div>{{ node.data.title }}</div>
                    </div>
                </ng-template>
            </p-organizationChart>
        </div>
        <app-code [code]="code" selector="organization-chart-colored-demo"></app-code>
    </section>`
})
export class ColoredDoc {
    @Input() id: string;

    @Input() title: string;

    data: TreeNode[] = [
        {
            expanded: true,
            type: 'person',
            styleClass: 'bg-indigo-500 text-white',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-purple-500 text-white',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            label: 'Sales',
                            styleClass: 'bg-purple-500 text-white',
                            style: ' border-radius: 12px'
                        },
                        {
                            label: 'Marketing',
                            styleClass: 'bg-purple-500 text-white',
                            style: ' border-radius: 12px'
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-teal-500 text-white',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development',
                            styleClass: 'bg-teal-500 text-white'
                        },
                        {
                            label: 'UI/UX Design',
                            styleClass: 'bg-teal-500 text-white'
                        }
                    ]
                }
            ]
        }
    ];

    code: Code = {
        basic: `
<p-organizationChart [value]="data">
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
    <p-organizationChart [value]="data">
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
    selector: 'organization-chart-colored-demo',
    templateUrl: './organization-chart-colored-demo.html',
})
export class OrganizationChartColoredDemo {
    data: TreeNode[] = [
        {
            expanded: true,
            type: 'person',
            styleClass: 'bg-indigo-500 text-white',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-purple-500 text-white',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            label: 'Sales',
                            styleClass: 'bg-purple-500 text-white',
                            style: ' border-radius: 12px'
                        },
                        {
                            label: 'Marketing',
                            styleClass: 'bg-purple-500 text-white',
                            style: ' border-radius: 12px'
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-teal-500 text-white',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development',
                            styleClass: 'bg-teal-500 text-white'
                        },
                        {
                            label: 'UI/UX Design',
                            styleClass: 'bg-teal-500 text-white'
                        }
                    ]
                }
            ]
        }
    ];
}`
    };
}
