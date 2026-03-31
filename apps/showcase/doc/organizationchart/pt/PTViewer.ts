import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
    selector: 'organizationchart-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, OrganizationChartModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-organizationchart [value]="data" [collapsible]="true">
                <ng-template let-node #node>
                    <span>{{ node.label }}</span>
                </ng-template>
            </p-organizationchart>
        </app-docptviewer>
    `
})
export class PTViewer {
    data = [
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

    docs = [
        {
            data: getPTOptions('OrganizationChart'),
            key: 'OrganizationChart'
        }
    ];
}
