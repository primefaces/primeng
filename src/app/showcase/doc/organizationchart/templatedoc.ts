import { Component, Input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Custom content instead of a node <i>label</i> is defined using the <i>pTemplate</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center overflow-x-auto">
            <p-organizationChart [value]="data">
                <ng-template let-node pTemplate="default">
                    <div class="p-2 text-center">
                        <img src="https://primefaces.org/cdn/primeng/images/flag/flag_placeholder.png" [alt]="node.label" [class]="'flag' + ' flag-' + node.data" width="32" />
                        <div>{{ node.data.name }}</div>
                        <div class="p-2">{{ node.label }}</div>
                    </div>
                </ng-template>
            </p-organizationChart>
        </div>
        <app-code [code]="code" selector="organization-chart-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    data: TreeNode[] = [
        {
            label: 'Argentina',
            expanded: true,
            data: 'ar',
            children: [
                {
                    label: 'Argentina',
                    expanded: true,
                    data: 'ar',
                    children: [
                        {
                            label: 'Argentina',
                            data: 'ar'
                        },
                        {
                            label: 'Croatia',
                            data: 'hr'
                        }
                    ]
                },
                {
                    label: 'France',
                    expanded: true,
                    data: 'fr',
                    children: [
                        {
                            label: 'France',
                            data: 'fr'
                        },
                        {
                            label: 'Morocco',
                            data: 'ma'
                        }
                    ]
                }
            ]
        }
    ];

    code: Code = {
        basic: `
<p-organizationChart [value]="data">
    <ng-template let-node pTemplate="default">
        <div class="p-2 text-center">
            <img src="https://primefaces.org/cdn/primeng/images/flag/flag_placeholder.png" [alt]="node.label" [class]="'flag' + ' flag-' + node.data" width="32" />
            <div>{{ node.data.name }}</div>
            <div class="p-2">{{ node.label }}</div>
        </div>
    </ng-template>
</p-organizationChart>`,

        html: `
<div class="card flex justify-content-center">
    <p-organizationChart [value]="data">
        <ng-template let-node pTemplate="default">
            <div class="p-2 text-center">
                <img src="https://primefaces.org/cdn/primeng/images/flag/flag_placeholder.png" [alt]="node.label" [class]="'flag' + ' flag-' + node.data" width="32" />
                <div>{{ node.data.name }}</div>
                <div class="p-2">{{ node.label }}</div>
            </div>
        </ng-template>
    </p-organizationChart>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'organization-chart-template-demo',
    templateUrl: './organization-chart-template-demo.html',
})
export class OrganizationChartTemplateDemo {
    data: TreeNode[] = [
        {
            label: 'Argentina',
            expanded: true,
            data: 'ar',
            children: [
                {
                    label: 'Argentina',
                    expanded: true,
                    data: 'ar',
                    children: [
                        {
                            label: 'Argentina',
                            data: 'ar'
                        },
                        {
                            label: 'Croatia',
                            data: 'hr'
                        }
                    ]
                },
                {
                    label: 'France',
                    expanded: true,
                    data: 'fr',
                    children: [
                        {
                            label: 'France',
                            data: 'fr'
                        },
                        {
                            label: 'Morocco',
                            data: 'ma'
                        }
                    ]
                }
            ]
        }
    ];
}`
    };
}
