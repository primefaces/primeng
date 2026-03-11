import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'tabs-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, TabsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-tabs [value]="0">
                <p-tablist>
                    <p-tab [value]="0">Header I</p-tab>
                    <p-tab [value]="1">Header II</p-tab>
                    <p-tab [value]="2">Header III</p-tab>
                </p-tablist>
                <p-tabpanels>
                    <p-tabpanel [value]="0">
                        <p class="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    </p-tabpanel>
                    <p-tabpanel [value]="1">
                        <p class="m-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
                    </p-tabpanel>
                    <p-tabpanel [value]="2">
                        <p class="m-0">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate.</p>
                    </p-tabpanel>
                </p-tabpanels>
            </p-tabs>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Tabs'),
            key: 'Tabs'
        },
        {
            data: getPTOptions('TabList'),
            key: 'TabList'
        },
        {
            data: getPTOptions('Tab'),
            key: 'Tab'
        },
        {
            data: getPTOptions('TabPanels'),
            key: 'TabPanels'
        },
        {
            data: getPTOptions('TabPanel'),
            key: 'TabPanel'
        }
    ];
}
