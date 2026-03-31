import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'colored-doc',
    standalone: true,
    imports: [OrganizationChartModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Styling a specific node is configured with <i>styleClass</i> option of a TreeNode and custom templates.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="overflow-x-auto">
                <p-organization-chart [value]="data" [collapsible]="true">
                    <ng-template #node let-node>
                        @if (node.type === 'person') {
                            <div class="flex items-center gap-3">
                                <img [src]="node.data.image" [alt]="node.data.name" class="w-12 h-12" />
                                <div class="flex flex-col items-start gap-1">
                                    <span class="font-bold">{{ node.data.name }}</span>
                                    <span class="text-sm">{{ node.data.title }}</span>
                                </div>
                            </div>
                        } @else {
                            <div>{{ node.label }}</div>
                        }
                    </ng-template>
                </p-organization-chart>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ColoredDoc {
    data: TreeNode[] = [
        {
            expanded: true,
            type: 'person',
            styleClass: 'bg-rose-500/5! border-rose-500! text-rose-900! dark:text-rose-50! rounded-xl',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-emerald-500/5! border-emerald-500! text-emerald-900! dark:text-emerald-50! rounded-xl',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            label: 'Sales'
                        },
                        {
                            label: 'Marketing'
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-blue-500/5! border-blue-500! text-blue-900! dark:text-blue-50! rounded-xl',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development'
                        },
                        {
                            label: 'UI/UX Design'
                        }
                    ]
                }
            ]
        }
    ];
}
