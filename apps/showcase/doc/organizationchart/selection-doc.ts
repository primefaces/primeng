import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'selection-doc',
    standalone: true,
    imports: [OrganizationChartModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Nodes can be selected by defining <i>selectionMode</i> along with a value binding with <i>selection</i> properties. By default only one node can be selected, set <i>selectionMode</i> as <i>multiple</i> to select more than one.
            </p></app-docsectiontext
        >
        <app-demo-wrapper>
            <div class="flex justify-center overflow-x-auto">
                <p-organization-chart [value]="data" selectionMode="multiple" [(selection)]="selectedNodes" [collapsible]="true">
                    <ng-template #node let-node>
                        @if (node.type === 'person') {
                            <div class="flex flex-col">
                                <div class="flex flex-col items-center">
                                    <img [src]="node.data.image" class="mb-4 w-12 h-12" />
                                    <div class="font-bold mb-2">{{ node.data.name }}</div>
                                    <div>{{ node.data.title }}</div>
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
export class SelectionDoc {
    selectedNodes!: TreeNode[];

    data: TreeNode[] = [
        {
            expanded: true,
            type: 'person',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
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
