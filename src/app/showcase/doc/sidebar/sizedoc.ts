import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'size-doc',
    template: `
        <app-docsectiontext>
            <p>Sidebar dimension can be defined with <i>style</i> or <i>styleClass</i> properties which can also be responsive when used with a CSS utility library like PrimeFlex.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-sidebar [(visible)]="sidebarVisible" styleClass="w-30rem">
                <ng-template pTemplate="header">
                    <span class="font-semibold text-xl">Sidebar</span>
                </ng-template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-sidebar>
            <p-button (click)="sidebarVisible = true" icon="pi pi-arrow-right" />
        </div>
        <app-code [code]="code" selector="sidebar-size-demo"></app-code>
    `
})
export class SizeDoc {
    sidebarVisible: boolean = false;

    code: Code = {
        basic: `<p-sidebar [(visible)]="sidebarVisible" styleClass="w-30rem">
    <ng-template pTemplate="header">
        <span class="font-semibold text-xl">Sidebar</span>
    </ng-template>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
    </p>
</p-sidebar>
<p-button (click)="sidebarVisible = true" icon="pi pi-arrow-right" />`,

        html: `<div class="card flex justify-content-center">
    <p-sidebar [(visible)]="sidebarVisible" styleClass="w-30rem">
        <ng-template pTemplate="header">
            <span class="font-semibold text-xl">Sidebar</span>
        </ng-template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </p-sidebar>
    <p-button (click)="sidebarVisible = true" icon="pi pi-arrow-right" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'sidebar-size-demo',
    templateUrl: './sidebar-size-demo.html',
    standalone: true,
    imports: [SidebarModule, ButtonModule]
})
export class SidebarSizeDemo {
    sidebarVisible: boolean = false;
}`
    };
}
