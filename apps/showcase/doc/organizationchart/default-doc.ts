import { Component } from '@angular/core';
import { OrganizationChartModule, OrgChartNode } from 'primeng/organizationchart';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'default-doc',
    standalone: true,
    imports: [OrganizationChartModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Nodes can define <i>collapsedByDefault</i> and <i>selectedByDefault</i> properties to configure the initial state.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center overflow-x-auto">
                <p-organization-chart [value]="data" [collapsible]="true" selectionMode="single" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class DefaultDoc {
    data: OrgChartNode[] = [
        {
            label: 'Founder',
            expanded: true,
            children: [
                {
                    label: 'Product Lead',
                    collapsedByDefault: true,
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
                            label: 'Frontend Developer',
                            selectedByDefault: true
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
