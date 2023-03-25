import { Component, Input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>OrganizationChart requires a collection of <i>TreeNode</i> instances as a <i>value</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center overflow-x-auto">
            <p-organizationChart [value]="data"></p-organizationChart>
        </div>
        <app-code [code]="code" selector="organization-chart-basic-doc"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

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
        basic: `
<p-organizationChart [value]="data"></p-organizationChart>`,

        html: `
<div class="card flex justify-content-center">
    <p-organizationChart [value]="data"></p-organizationChart>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'organization-chart-basic-doc',
    templateUrl: './organization-chart-basic-doc.html',
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
