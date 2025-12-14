import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
    selector: 'panelmenu-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, PanelMenuModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-panelmenu [model]="items" styleClass="w-full md:w-80" />
        </app-docptviewer>
    `
})
export class PTViewer {
    items = [
        {
            label: 'Documents',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus',
                    shortcut: '⌘+N'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-search',
                    shortcut: '⌘+S'
                }
            ]
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    shortcut: '⌘+O'
                },
                {
                    label: 'Messages',
                    icon: 'pi pi-inbox',
                    badge: '2'
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    shortcut: '⌘+Q'
                }
            ]
        }
    ];

    docs = [
        {
            data: getPTOptions('PanelMenu'),
            key: 'PanelMenu'
        }
    ];
}
