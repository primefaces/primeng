import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'full-screen-doc',
    template: `
        <app-docsectiontext>
            <p>Drawer can cover the whole page when <i>fullScreen</i> property is enabled.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-drawer [(visible)]="visible" [fullScreen]="true">
                <ng-template pTemplate="header">
                    <span class="font-semibold text-xl">Drawer</span>
                </ng-template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-drawer>
            <p-button (click)="visible = true" icon="pi pi-window-maximize" />
        </div>
        <app-code [code]="code" selector="drawer-full-screen-demo"></app-code>
    `
})
export class FullScreenDoc {
    visible: boolean = false;

    code: Code = {
        basic: `<p-drawer [(visible)]="visible" [fullScreen]="true">
        <ng-template pTemplate="header">
            <span class="font-semibold text-xl">
                Drawer
            </span>
        </ng-template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
    </p-drawer>
<p-button (click)="visible = true" icon="pi pi-window-maximize" />`,

        html: `<div class="card flex justify-center">
    <p-drawer [(visible)]="visible" [fullScreen]="true">
        <ng-template pTemplate="header">
            <span class="font-semibold text-xl">
                Drawer
            </span>
        </ng-template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
        </p>
    </p-drawer>
    <p-button (click)="visible = true" icon="pi pi-window-maximize" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'drawer-full-screen-demo',
    templateUrl: './drawer-full-screen-demo.html',
    standalone: true,
    imports: [DrawerModule, ButtonModule]
})
export class DrawerFullScreenDemo {
    visible: boolean = false;
}`
    };
}
