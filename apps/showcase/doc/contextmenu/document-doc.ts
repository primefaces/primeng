import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'document-doc',
    standalone: true,
    imports: [ContextMenuModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Setting <i>global</i> property to <i>true</i> attaches the context menu to the document.</p>
        </app-docsectiontext>
        <div class="card text-center">
            <p class="mb-0">Right-Click anywhere on this page to view the global ContextMenu.</p>
            <p-contextmenu [model]="items" [global]="true" />
        </div>
        <app-code></app-code>
    `
})
export class DocumentDoc implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Translate',
                icon: 'pi pi-language'
            },
            {
                label: 'Speech',
                icon: 'pi pi-volume-up',
                items: [
                    {
                        label: 'Start',
                        icon: 'pi pi-caret-right'
                    },
                    {
                        label: 'Stop',
                        icon: 'pi pi-pause'
                    }
                ]
            },
            {
                separator: true
            },
            {
                label: 'Print',
                icon: 'pi pi-print'
            }
        ];
    }
}
