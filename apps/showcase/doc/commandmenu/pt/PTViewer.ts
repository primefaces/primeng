import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommandMenuModule } from 'primeng/commandmenu';

@Component({
    selector: 'commandmenu-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, CommandMenuModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-commandmenu [options]="commands" optionLabel="label" optionValue="value" [group]="true" optionGroupLabel="group" optionGroupChildren="items" placeholder="Search for commands...">
                <ng-template #empty>No results found</ng-template>
            </p-commandmenu>
        </app-docptviewer>
    `
})
export class PTViewer implements OnInit {
    commands!: any[];

    docs = [
        {
            data: getPTOptions('CommandMenu'),
            key: 'CommandMenu'
        }
    ];

    ngOnInit() {
        this.commands = [
            {
                group: 'Recents',
                items: [
                    { label: 'Open Settings', value: 'open settings' },
                    { label: 'Search Files', value: 'search files' },
                    { label: 'Open Terminal', value: 'open terminal' }
                ]
            },
            {
                group: 'Files',
                items: [
                    { label: 'New File', value: 'new file' },
                    { label: 'Save All', value: 'save-all' },
                    { label: 'Export Project', value: 'export project' }
                ]
            }
        ];
    }
}
