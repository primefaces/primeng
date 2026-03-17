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
            <p>Styling a specific node is configured with <i>class</i> and <i>style</i> options of a TreeNode.</p></app-docsectiontext
        >
        <app-demo-wrapper>
            <div class="overflow-x-auto">
                <p-organization-chart [value]="data" [collapsible]="true">
                    <ng-template #node let-node>
                        @if (node.type === 'person') {
                            <div class="flex flex-col">
                                <div class="flex flex-col items-center">
                                    <img [src]="node.data.image" class="mb-4 w-12 h-12" />
                                    <span class="font-bold mb-2">{{ node.data.name }}</span>
                                    <span>{{ node.data.title }}</span>
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
            styleClass: 'bg-indigo-100! text-indigo-900! rounded-xl',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-purple-100! text-purple-900! rounded-xl',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            label: 'Sales',
                            styleClass: 'bg-purple-100! text-purple-900! rounded-xl'
                        },
                        {
                            label: 'Marketing',
                            styleClass: 'bg-purple-100! text-purple-900! rounded-xl'
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-teal-100! text-teal-900! rounded-xl',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development',
                            styleClass: 'bg-teal-100! text-teal-900! rounded-xl'
                        },
                        {
                            label: 'UI/UX Design',
                            styleClass: 'bg-teal-100! text-teal-900! rounded-xl'
                        }
                    ]
                }
            ]
        }
    ];
}
