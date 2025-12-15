import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'menu-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, MenuModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-menu [model]="items" />
        </app-docptviewer>
    `
})
export class PTViewer {
    items = [
        {
            label: 'Documents',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-search'
                }
            ]
        },
        {
            separator: true
        },
        {
            label: 'Profile',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog'
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out'
                }
            ]
        }
    ];

    docs = [
        {
            data: getPTOptions('Menu'),
            key: 'Menu'
        }
    ];
}
