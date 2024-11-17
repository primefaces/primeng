import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Custom content instead of a node <i>label</i> is defined using the <i>pTemplate</i> property.</p>
        </app-docsectiontext>
        <div class="card overflow-x-auto">
            <p-organization-chart [value]="data" [collapsible]="true">
                <ng-template let-node pTemplate="default">
                    <div class="flex flex-col items-center">
                        <img src="https://primefaces.org/cdn/primeng/images/flag/flag_placeholder.png" [alt]="node.label" [class]="'flag' + ' flag-' + node.data" width="32" />
                        <div class="mt-4 font-medium text-lg">{{ node.label }}</div>
                    </div>
                </ng-template>
            </p-organization-chart>
        </div>
        <app-code [code]="code" selector="organization-chart-template-demo"></app-code>
    `
})
export class TemplateDoc {
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
        basic: `<p-organization-chart [value]="data" [collapsible]="true">
    <ng-template let-node pTemplate="default">
        <div class="flex flex-col items-center">
            <img
                src="https://primefaces.org/cdn/primeng/images/flag/flag_placeholder.png"
                [alt]="node.label"
                [class]="'flag' + ' flag-' + node.data"
                width="32"
            />
            <div class="mt-4 font-medium text-lg">{{ node.label }}</div>
        </div>
    </ng-template>
</p-organization-chart>`,

        html: `<div class="card overflow-x-auto">
    <p-organization-chart [value]="data" [collapsible]="true">
        <ng-template let-node pTemplate="default">
            <div class="flex flex-col items-center">
                <img
                    src="https://primefaces.org/cdn/primeng/images/flag/flag_placeholder.png"
                    [alt]="node.label"
                    [class]="'flag' + ' flag-' + node.data"
                    width="32"
                />
                <div class="mt-4 font-medium text-lg">{{ node.label }}</div>
            </div>
        </ng-template>
    </p-organization-chart>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
    selector: 'organization-chart-template-demo',
    templateUrl: './organization-chart-template-demo.html',
    standalone: true,
    imports: [OrganizationChartModule]
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
