import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'context-menu-basic-demo',
    template: `
        <app-docsectiontext>
            <p>ContextMenu can be attached to a particular element whose local template variable name is defined using the <i>target</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <img #img src="https://primefaces.org/cdn/primeng/images/demo/nature/nature2.jpg" alt="Logo" aria-haspopup="true" class="max-w-full" />
            <p-contextMenu [target]="img" [model]="items" />
        </div>
        <app-code [code]="code" selector="context-menu-basic-demo"></app-code>
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

    code: Code = {
        basic: `<img 
    #img 
    src="https://primefaces.org/cdn/primeng/images/demo/nature/nature2.jpg" 
    alt="Logo" 
    aria-haspopup="true" 
    class="max-w-full" />
<p-contextMenu [target]="img" [model]="items" />`,

        html: `<div class="card flex justify-content-center">
    <img 
        #img 
        src="https://primefaces.org/cdn/primeng/images/demo/nature/nature2.jpg" 
        alt="Logo"
        aria-haspopup="true" 
        class="max-w-full" />
    <p-contextMenu [target]="img" [model]="items" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';

@Component({
    selector: 'context-menu-basic-demo',
    templateUrl: './context-menu-basic-demo.html',
    standalone: true,
    imports: [ContextMenuModule]
})
export class ContextMenuBasicDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Copy', icon: 'pi pi-copy' },
            { label: 'Rename', icon: 'pi pi-file-edit' }
        ];
    }
}`
    };
}
