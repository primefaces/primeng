import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Sidebar is used as a container and visibility is controlled with a binding to <i>visible</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-sidebar [(visible)]="sidebarVisible">
                <h3>Sidebar</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-sidebar>
            <p-button (click)="sidebarVisible = true" icon="pi pi-arrow-right" />
        </div>
        <app-code [code]="code" selector="sidebar-basic-demo"></app-code>
    `
})
export class BasicDoc {
    sidebarVisible: boolean = false;

    code: Code = {
        basic: `<p-sidebar [(visible)]="sidebarVisible">
    <h3>Sidebar</h3>
    <p>
        Lorem ipsum dolor sit amet...
    </p>
</p-sidebar>
<p-button (click)="sidebarVisible = true" icon="pi pi-arrow-right" />`,

        html: `<div class="card flex justify-content-center">
    <p-sidebar [(visible)]="sidebarVisible">
        <h3>Sidebar</h3>
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
    selector: 'sidebar-basic-demo',
    templateUrl: './sidebar-basic-demo.html',
    standalone: true,
    imports: [SidebarModule, ButtonModule]
})
export class SidebarBasicDemo {
    sidebarVisible: boolean = false;
}`
    };
}
