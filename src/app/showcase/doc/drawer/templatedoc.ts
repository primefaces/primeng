import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Drawer is customizable by <i>header</i>, <i>content</i>, <i>footer</i> templates.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-drawer [(visible)]="visible">
                <ng-template pTemplate="header">
                    <div class="flex align-items-center gap-2">
                        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                        <span class="font-bold">Amy Elsner</span>
                    </div>
                </ng-template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-drawer>
            <p-button (click)="visible = true" icon="pi pi-plus" />
        </div>
        <app-code [code]="code" selector="drawer-template-demo"></app-code>
    `
})
export class TemplateDoc {
    visible: boolean = false;

    code: Code = {
        basic: `<p-drawer [(visible)]="visible">
    <ng-template pTemplate="header">
        <div class="flex align-items-center gap-2">
            <p-avatar 
                image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
                shape="circle" />
            <span class="font-bold">
                Amy Elsner
            </span>
        </div>
    </ng-template>
    <p>
        Lorem ipsum dolor sit amet...
    </p>
</p-drawer>
<p-button (click)="visible = true" icon="pi pi-plus" />`,

        html: `<div class="card flex justify-content-center">
    <p-drawer [(visible)]="visible">
        <ng-template pTemplate="header">
            <div class="flex align-items-center gap-2">
                <p-avatar 
                    image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
                    shape="circle" />
                <span class="font-bold">
                    Amy Elsner
                </span>
            </div>
        </ng-template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
        </p>
    </p-drawer>
    <p-button (click)="visible = true" icon="pi pi-plus" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'drawer-template-demo',
    templateUrl: './drawer-template-demo.html',
    standalone: true,
    imports: [DrawerModule, ButtonModule]
})
export class DrawerTemplateDemo {
    visible: boolean = false;
}`
    };
}
