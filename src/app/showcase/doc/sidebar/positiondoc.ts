import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'position-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Sidebar location is configured with the <i>position</i> property that can take <i>left</i>, <i>right</i>, <i>top</i> and <i>bottom</i> as a value.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-content-center gap-2">
            <p-sidebar [(visible)]="sidebarVisible1" position="left">
                <h3>Left Sidebar</h3>
            </p-sidebar>

            <p-sidebar [(visible)]="sidebarVisible2" position="right">
                <h3>Right Sidebar</h3>
            </p-sidebar>

            <p-sidebar [(visible)]="sidebarVisible3" position="top">
                <h3>Top Sidebar</h3>
            </p-sidebar>

            <p-sidebar [(visible)]="sidebarVisible4" position="bottom">
                <h3>Bottom Sidebar</h3>
            </p-sidebar>

            <p-button type="button" class="mr-2" (click)="sidebarVisible1 = true" icon="pi pi-arrow-right"></p-button>
            <p-button type="button" class="mr-2" (click)="sidebarVisible2 = true" icon="pi pi-arrow-left"></p-button>
            <p-button type="button" class="mr-2" (click)="sidebarVisible3 = true" icon="pi pi-arrow-down"></p-button>
            <p-button type="button" class="mr-2" (click)="sidebarVisible4 = true" icon="pi pi-arrow-up"></p-button>
        </div>
        <app-code [code]="code" selector="sidebar-position-demo"></app-code>
    </section>`
})
export class PositionDoc {
    @Input() id: string;

    @Input() title: string;

    sidebarVisible1: boolean = false;

    sidebarVisible2: boolean = false;

    sidebarVisible3: boolean = false;

    sidebarVisible4: boolean = false;

    code: Code = {
        basic: `
<p-sidebar [(visible)]="sidebarVisible1" position="left">
    <h3>Left Sidebar</h3>
</p-sidebar>

<p-sidebar [(visible)]="sidebarVisible2" position="right">
    <h3>Right Sidebar</h3>
</p-sidebar>

<p-sidebar [(visible)]="sidebarVisible3" position="top">
    <h3>Top Sidebar</h3>
</p-sidebar>

<p-sidebar [(visible)]="sidebarVisible4" position="bottom">
    <h3>Bottom Sidebar</h3>
</p-sidebar>

<p-button type="button" class="mr-2" (click)="sidebarVisible1 = true" icon="pi pi-arrow-right"></p-button>
<p-button type="button" class="mr-2" (click)="sidebarVisible2 = true" icon="pi pi-arrow-left"></p-button>
<p-button type="button" class="mr-2" (click)="sidebarVisible3 = true" icon="pi pi-arrow-down"></p-button>
<p-button type="button" class="mr-2" (click)="sidebarVisible4 = true" icon="pi pi-arrow-up"></p-button>`,

        html: `
<div class="card flex flex-wrap justify-content-center gap-2">
    <p-sidebar [(visible)]="sidebarVisible1" position="left">
        <h3>Left Sidebar</h3>
    </p-sidebar>

    <p-sidebar [(visible)]="sidebarVisible2" position="right">
        <h3>Right Sidebar</h3>
    </p-sidebar>

    <p-sidebar [(visible)]="sidebarVisible3" position="top">
        <h3>Top Sidebar</h3>
    </p-sidebar>

    <p-sidebar [(visible)]="sidebarVisible4" position="bottom">
        <h3>Bottom Sidebar</h3>
    </p-sidebar>

    <p-button type="button" class="mr-2" (click)="sidebarVisible1 = true" icon="pi pi-arrow-right"></p-button>
    <p-button type="button" class="mr-2" (click)="sidebarVisible2 = true" icon="pi pi-arrow-left"></p-button>
    <p-button type="button" class="mr-2" (click)="sidebarVisible3 = true" icon="pi pi-arrow-down"></p-button>
    <p-button type="button" class="mr-2" (click)="sidebarVisible4 = true" icon="pi pi-arrow-up"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'sidebar-position-demo',
    templateUrl: './sidebar-position-demo.html'
})
export class SidebarPositionDemo {
    sidebarVisible1: boolean = false;
    
    sidebarVisible2: boolean = false;
    
    sidebarVisible3: boolean = false;
    
    sidebarVisible4: boolean = false;
}`
    };
}
