import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>OrganizationChart requires a collection of <i>TreeNode</i> instances as a <i>value</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center overflow-x-auto">
            <p-organization-chart [value]="data" />
        </div>
        <app-code [code]="code" selector="organization-chart-basic-doc"></app-code>
    `
})
export class BasicDoc {
    data: TreeNode[] = [
        {
            label: 'Argentina',
            expanded: true,
            children: [
                {
                    label: 'Argentina',
                    expanded: true,
                    children: [
                        {
                            label: 'Argentina'
                        },
                        {
                            label: 'France'
                        }
                    ]
                },
                {
                    label: 'France',
                    expanded: true,
                    children: [
                        {
                            label: 'France'
                        },
                        {
                            label: 'Morocco'
                        }
                    ]
                }
            ]
        }
    ];

    code: Code = {
        basic: `<p-organization-chart [value]="data" />`,

        html: `<div class="card flex justify-center">
    <p-organization-chart [value]="data" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
    selector: 'organization-chart-basic-doc',
    templateUrl: './organization-chart-basic-doc.html',
    standalone: true,
    imports: [OrganizationChartModule]
})
export class OrganizationChartBasicDoc {
    data: TreeNode[] = [
        {
            label: 'F.C Barcelona',
            expanded: true,
            children: [
                {
                    label: 'Argentina',
                    expanded: true,
                    children: [
                        {
                            label: 'Argentina'
                        },
                        {
                            label: 'France'
                        }
                    ]
                },
                {
                    label: 'France',
                    expanded: true,
                    children: [
                        {
                            label: 'France'
                        },
                        {
                            label: 'Morocco'
                        }
                    ]
                }
            ]
        }
    ];
}`
    };
}
