import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [OrganizationChartModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Custom content instead of a node <i>label</i> is defined using the <i>#node</i> template reference.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="overflow-x-auto">
                <p-organization-chart [value]="data" [collapsible]="true">
                    <ng-template #node let-node>
                        <div class="flex items-start gap-2">
                            <img src="https://primefaces.org/cdn/primeng/images/flag/flag_placeholder.png" [alt]="node.label" [class]="'h-full !w-10 flag flag-' + node.data.flag" />
                            <div class="flex flex-col items-start gap-0.5">
                                <div class="font-semibold leading-none">{{ node.label }}</div>
                                <div class="text-xs leading-none opacity-75">{{ node.data.description }}</div>
                            </div>
                        </div>
                    </ng-template>
                </p-organization-chart>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class TemplateDoc {
    data: TreeNode[] = [
        {
            label: 'USD',
            expanded: true,
            data: { flag: 'us', description: 'United States Dollar' },
            children: [
                {
                    label: 'CAD',
                    expanded: true,
                    data: { flag: 'ca', description: 'Canadian Dollar' },
                    children: [
                        {
                            label: 'AUD',
                            data: { flag: 'au', description: 'Australian Dollar' }
                        },
                        {
                            label: 'NZD',
                            data: { flag: 'nz', description: 'New Zealand Dollar' }
                        }
                    ]
                },
                {
                    label: 'MXN',
                    expanded: true,
                    data: { flag: 'mx', description: 'Mexican Peso' },
                    children: [
                        {
                            label: 'COP',
                            data: { flag: 'ar', description: 'Argentine Peso' }
                        },
                        {
                            label: 'BRL',
                            data: { flag: 'br', description: 'Brazilian Real' }
                        }
                    ]
                }
            ]
        }
    ];
}
