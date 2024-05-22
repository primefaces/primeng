import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'context-menu-document-demo',
    template: `
        <app-docsectiontext>
            <p>Setting <i>global</i> property to <i>true</i> attaches the context menu to the document.</p>
        </app-docsectiontext>
        <div class="card text-center">
            <p class="mb-0">Right-Click anywhere on this page to view the global ContextMenu.</p>
            <p-contextMenu [model]="items" [global]="true" />
        </div>
        <app-code [code]="code" selector="context-menu-document-demo"></app-code>
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

    code: Code = {
        basic: `<p-contextMenu [model]="items" [global]="true" />`,

        html: `<div class="card text-center">
    <p class="mb-0">Right-Click anywhere on this page to view the global ContextMenu.</p>
    <p-contextMenu [model]="items" [global]="true" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';

@Component({
    selector: 'context-menu-document-demo',
    templateUrl: './context-menu-document-demo.html',
    standalone: true,
    imports: [ContextMenuModule]
})
export class ContextMenuDocumentDemo implements OnInit {
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
        ]
    }
}`,

        module: `
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ContextMenuDemo } from './contextmenudemo';

@NgModule({
    imports: [CommonModule, ContextMenuModule],
    declarations: [ContextMenuDemo]
})
export class ContextMenuDemoModule {}`
    };
}
