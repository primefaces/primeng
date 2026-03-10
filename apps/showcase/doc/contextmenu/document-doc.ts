import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'document-doc',
    standalone: true,
    imports: [ContextMenuModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Setting <i>global</i> property to <i>true</i> attaches the context menu to the document.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="text-center">
                <p class="mb-0 text-sm">Right-Click anywhere on this page to view the global ContextMenu.</p>
                <p-contextmenu [model]="items" [global]="true" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
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
