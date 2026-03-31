import { Component } from '@angular/core';
import { OrganizationChartModule, OrgChartNode } from 'primeng/organizationchart';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'partial-doc',
    standalone: true,
    imports: [OrganizationChartModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Collapsible and selectable behaviors can be controlled at the node level using the <i>collapsible</i> and <i>selectable</i> properties of a TreeNode.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center overflow-x-auto">
                <p-organization-chart [value]="data" selectionMode="single" [(selection)]="selectedNode" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class PartialDoc {
    selectedNode: any;

    data: OrgChartNode[] = [
        {
            label: 'Founder',
            expanded: true,
            collapsible: true,
            selectable: false,
            children: [
                {
                    label: 'Product Lead',
                    expanded: true,
                    children: [
                        {
                            label: 'UX/UI Designer',
                            selectable: false
                        },
                        {
                            label: 'Product Manager'
                        }
                    ]
                },
                {
                    label: 'Engineering Lead',
                    expanded: true,
                    selectable: false,
                    collapsible: true,
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
