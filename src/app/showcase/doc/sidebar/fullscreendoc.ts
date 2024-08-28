import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'full-screen-doc',
    template: `
        <app-docsectiontext>
            <p>Sidebar can cover the whole page when <i>fullScreen</i> property is enabled.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-sidebar [(visible)]="sidebarVisible" [fullScreen]="true">
                <ng-template pTemplate="header">
                    <span class="font-semibold text-xl">Sidebar</span>
                </ng-template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-sidebar>
            <p-button (onClick)="sidebarVisible = true" icon="pi pi-window-maximize" />
        </div>
        <app-code [code]="code" selector="sidebar-full-screen-demo"></app-code>
    `
})
export class FullScreenDoc {
    sidebarVisible: boolean = false;

    code: Code = {
        basic: `<p-sidebar [(visible)]="sidebarVisible" [fullScreen]="true">
        <ng-template pTemplate="header">
            <span class="font-semibold text-xl">
                Sidebar
            </span>
        </ng-template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
    </p-sidebar>
<p-button (onClick)="sidebarVisible = true" icon="pi pi-window-maximize" />`,

        html: `<div class="card flex justify-content-center">
    <p-sidebar [(visible)]="sidebarVisible" [fullScreen]="true">
        <ng-template pTemplate="header">
            <span class="font-semibold text-xl">
                Sidebar
            </span>
        </ng-template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
        </p>
    </p-sidebar>
    <p-button (onClick)="sidebarVisible = true" icon="pi pi-window-maximize" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'sidebar-full-screen-demo',
    templateUrl: './sidebar-full-screen-demo.html',
    standalone: true,
    imports: [SidebarModule, ButtonModule]
})
export class SidebarFullScreenDemo {
    sidebarVisible: boolean = false;
}`
    };
}
