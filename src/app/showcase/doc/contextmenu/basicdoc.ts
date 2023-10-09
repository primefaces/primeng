import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'context-menu-basic-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>ContextMenu can be attached to a particular element whose local template variable name is defined using the <i>target</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <img #img src="https://primefaces.org/cdn/primeng/images/demo/nature/nature3.jpg" alt="Logo" aria-haspopup="true" class="max-w-full" />
            <p-contextMenu [target]="img" [model]="items"></p-contextMenu>
        </div>
        <app-code [code]="code" selector="context-menu-basic-demo"></app-code>
    </section>`
})
export class BasicDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            { label: 'View', icon: 'pi pi-fw pi-search' },
            { label: 'Delete', icon: 'pi pi-fw pi-trash' }
        ];
    }

    code: Code = {
        basic: `
<img #img src="https://primefaces.org/cdn/primeng/images/demo/nature/nature3.jpg" alt="Logo" aria-haspopup="true" class="max-w-full">
<p-contextMenu [target]="img" [model]="items"></p-contextMenu>`,

        html: `
<div class="card flex justify-content-center">
    <img #img src="https://primefaces.org/cdn/primeng/images/demo/nature/nature3.jpg" alt="Logo" aria-haspopup="true" class="max-w-full">
    <p-contextMenu [target]="img" [model]="items"></p-contextMenu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'context-menu-basic-demo',
    templateUrl: './context-menu-basic-demo.html'
})
export class ContextMenuBasicDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            { label: 'View', icon: 'pi pi-fw pi-search' },
            { label: 'Delete', icon: 'pi pi-fw pi-trash' }
        ];
    }
}`
    };
}
