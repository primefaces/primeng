import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'preserve-space-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                Use the <i>preserveSpace</i> option when you want to remove extra whitespace in the layout when nodes in the tree are collapsed. This helps optimize the use of screen space and is ideal for reducing empty gaps in dynamic or large
                trees.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center overflow-x-auto">
            <p-organization-chart [value]="data" [preserveSpace]="false" [collapsible]="true" />
        </div>
        <app-code [code]="code" selector="organization-chart-preserve-space-doc"></app-code>
    `
})
export class PreserveSpaceDoc {
    data: TreeNode[] = [
        {
            label: 'Argentina',
            expanded: true,
            children: [
                {
                    label: 'Argentina',
                    expanded: false,
                    children: [
                        {
                            label: 'Argentina'
                        },
                        {
                            label: 'France'
                        },
                        {
                            label: 'Switzerland'
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
                        },
                        {
                            label: 'Switzerland'
                        }
                    ]
                }
            ]
        }
    ];

    code: Code = {
        basic: `<p-organization-chart [value]="data" [preserveSpace]="true" [collapsible]="true" />`,

        html: `<div class="card flex justify-center">
    <p-organization-chart [value]="data" [preserveSpace]="true" [collapsible]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
    selector: 'organization-chart-preserve-space-doc',
    templateUrl: './organization-chart-preserve-space-doc.html',
    standalone: true,
    imports: [OrganizationChartModule]
})
export class OrganizationChartPreserveSpaceDoc {
    data: TreeNode[] = [
        {
            label: 'Argentina',
            expanded: true,
            children: [
                {
                    label: 'Argentina',
                    expanded: false,
                    children: [
                        {
                            label: 'Argentina'
                        },
                        {
                            label: 'France'
                        },
                        {
                            label: 'Switzerland'
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
                        },
                        {
                            label: 'Switzerland'
                        }
                    ]
                }
            ]
        }
    ];
}`
    };
}
