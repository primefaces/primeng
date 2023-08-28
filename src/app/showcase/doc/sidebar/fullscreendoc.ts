import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'full-screen-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Sidebar can cover the whole page when <i>fullScreen</i> property is enabled.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-sidebar [(visible)]="sidebarVisible" [fullScreen]="true">
                <h3>Full Screen Sidebar</h3>
            </p-sidebar>
            <p-button (click)="sidebarVisible = true" icon="pi pi-th-large"></p-button>
        </div>
        <app-code [code]="code" selector="sidebar-full-screen-demo"></app-code>
    </section>`
})
export class FullScreenDoc {
    @Input() id: string;

    @Input() title: string;

    sidebarVisible: boolean = false;

    code: Code = {
        basic: `
<p-sidebar [(visible)]="sidebarVisible" [fullScreen]="true">
    <h3>Full Screen Sidebar</h3>
</p-sidebar>
<p-button (click)="sidebarVisible = true" icon="pi pi-th-large"></p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-sidebar [(visible)]="sidebarVisible" [fullScreen]="true">
        <h3>Full Screen Sidebar</h3>
    </p-sidebar>
    <p-button (click)="sidebarVisible = true" icon="pi pi-th-large"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'sidebar-full-screen-demo',
    templateUrl: './sidebar-full-screen-demo.html'
})
export class SidebarFullScreenDemo {
    sidebarVisible: boolean = false;
}`
    };
}
