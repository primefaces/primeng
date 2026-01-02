import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'context-menu-basic-demo',
    standalone: true,
    imports: [ContextMenuModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                ContextMenu can be attached to a particular element whose local template variable name is defined using the
                <i>target</i> property.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <img #img src="https://primefaces.org/cdn/primeng/images/demo/nature/nature2.jpg" alt="Logo" aria-haspopup="true" class="w-full md:w-[30rem] rounded shadow-lg" />
            <p-contextmenu [target]="img" [model]="items" />
        </div>
        <app-code selector="context-menu-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Copy', icon: 'pi pi-copy' },
            { label: 'Rename', icon: 'pi pi-file-edit' }
        ];
    }
}
