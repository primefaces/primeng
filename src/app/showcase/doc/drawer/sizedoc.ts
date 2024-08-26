import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'size-doc',
    template: `
        <app-docsectiontext>
            <p>Drawer dimension can be defined with <i>style</i> or <i>styleClass</i> properties which can also be responsive when used with a CSS utility library like PrimeFlex.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-drawer [(visible)]="visible" styleClass="w-[30rem]">
                <ng-template pTemplate="header">
                    <span class="font-semibold text-xl">Drawer</span>
                </ng-template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-drawer>
            <p-button (click)="visible = true" icon="pi pi-arrow-right" />
        </div>
        <app-code [code]="code" selector="drawer-size-demo"></app-code>
    `
})
export class SizeDoc {
    visible: boolean = false;

    code: Code = {
        basic: `<p-drawer [(visible)]="visible" styleClass="w-[30rem]">
    <ng-template pTemplate="header">
        <span class="font-semibold text-xl">Drawer</span>
    </ng-template>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
    </p>
</p-drawer>
<p-button (click)="visible = true" icon="pi pi-arrow-right" />`,

        html: `<div class="card flex justify-center">
    <p-drawer [(visible)]="visible" styleClass="w-[30rem]">
        <ng-template pTemplate="header">
            <span class="font-semibold text-xl">Drawer</span>
        </ng-template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </p-drawer>
    <p-button (click)="visible = true" icon="pi pi-arrow-right" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'drawer-size-demo',
    templateUrl: './drawer-size-demo.html',
    standalone: true,
    imports: [DrawerModule, ButtonModule]
})
export class DrawerSizeDemo {
    visible: boolean = false;
}`
    };
}
