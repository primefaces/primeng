import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContextMenuModule } from 'primeng/contextmenu';

@Component({
    selector: 'contextmenu-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, ContextMenuModule],
    template: `
        <app-docptviewer [docs]="docs">
            <img #image src="https://primefaces.org/cdn/primeng/images/demo/nature/nature2.jpg" alt="Logo" aria-haspopup="true" class="w-full md:w-80 rounded shadow-lg" (contextmenu)="cm.show($event)" />
            <p-contextMenu #cm [target]="image" [model]="items" />
        </app-docptviewer>
    `
})
export class PTViewer {
    items = [
        {
            label: 'Copy',
            icon: 'pi pi-copy'
        },
        {
            label: 'Rename',
            icon: 'pi pi-file-edit'
        },
        {
            separator: true
        },
        {
            label: 'Share',
            icon: 'pi pi-share-alt',
            items: [
                {
                    label: 'Facebook',
                    icon: 'pi pi-facebook'
                },
                {
                    label: 'Twitter',
                    icon: 'pi pi-twitter'
                }
            ]
        }
    ];

    docs = [
        {
            data: getPTOptions('ContextMenu'),
            key: 'ContextMenu'
        }
    ];
}
