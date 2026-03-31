import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [OrganizationChartModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>OrganizationChart requires a collection of <i>TreeNode</i> instances as a <i>value</i>.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center overflow-x-auto">
                <p-organization-chart [value]="data" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {
    data: TreeNode[] = [
        {
            label: 'Founder',
            expanded: true,
            children: [
                {
                    label: 'Product Lead',
                    expanded: true,
                    children: [
                        {
                            label: 'UX/UI Designer'
                        },
                        {
                            label: 'Product Manager'
                        }
                    ]
                },
                {
                    label: 'Engineering Lead',
                    expanded: true,
                    children: [
                        {
                            label: 'Frontend Developer'
                        },
                        {
                            label: 'Backend Developer'
                        }
                    ]
                }
            ]
        }
    ];
}
