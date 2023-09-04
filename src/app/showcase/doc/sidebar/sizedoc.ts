import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'size-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Sidebar dimension can be defined with <i>style</i> or <i>styleClass</i> properties which can also be responsive when used with a CSS utility library like PrimeFlex.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-sidebar [(visible)]="sidebarVisible" styleClass="w-30rem">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-sidebar>
            <p-button (click)="sidebarVisible = true" icon="pi pi-arrow-right"></p-button>
        </div>
        <app-code [code]="code" selector="sidebar-size-demo"></app-code>
    </section>`
})
export class SizeDoc {
    @Input() id: string;

    @Input() title: string;

    sidebarVisible: boolean = false;

    code: Code = {
        basic: `
<p-sidebar [(visible)]="sidebarVisible" styleClass="w-30rem">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</p-sidebar>
<p-button (click)="sidebarVisible = true" icon="pi pi-arrow-right"></p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-sidebar [(visible)]="sidebarVisible" styleClass="w-30rem">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </p-sidebar>
    <p-button (click)="sidebarVisible = true" icon="pi pi-arrow-right"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'sidebar-size-demo',
    templateUrl: './sidebar-size-demo.html'
})
export class SidebarSizeDemo {
    sidebarVisible: boolean = false;
}`
    };
}
