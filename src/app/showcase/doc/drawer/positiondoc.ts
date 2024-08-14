import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'position-doc',
    template: `
        <app-docsectiontext>
            <p>Drawer location is configured with the <i>position</i> property that can take <i>left</i>, <i>right</i>, <i>top</i> and <i>bottom</i> as a value.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-content-center gap-2">
            <p-drawer [(visible)]="visible1" position="left">
                <h3>Left Drawer</h3>
            </p-drawer>

            <p-drawer [(visible)]="visible2" position="right">
                <h3>Right Drawer</h3>
            </p-drawer>

            <p-drawer [(visible)]="visible3" position="top">
                <h3>Top Drawer</h3>
            </p-drawer>

            <p-drawer [(visible)]="visible4" position="bottom">
                <h3>Bottom Drawer</h3>
            </p-drawer>

            <p-button type="button" class="mr-2" (click)="visible1 = true" icon="pi pi-arrow-right" />
            <p-button type="button" class="mr-2" (click)="visible2 = true" icon="pi pi-arrow-left" />
            <p-button type="button" class="mr-2" (click)="visible3 = true" icon="pi pi-arrow-down" />
            <p-button type="button" class="mr-2" (click)="visible4 = true" icon="pi pi-arrow-up" />
        </div>
        <app-code [code]="code" selector="drawer-position-demo"></app-code>
    `
})
export class PositionDoc {
    visible1: boolean = false;

    visible2: boolean = false;

    visible3: boolean = false;

    visible4: boolean = false;

    code: Code = {
        basic: `<p-drawer [(visible)]="visible1" position="left">
    <h3>Left Drawer</h3>
</p-drawer>

<p-drawer [(visible)]="visible2" position="right">
    <h3>Right Drawer</h3>
</p-drawer>

<p-drawer [(visible)]="visible3" position="top">
    <h3>Top Drawer</h3>
</p-drawer>

<p-drawer [(visible)]="visible4" position="bottom">
    <h3>Bottom Drawer</h3>
</p-drawer>

<p-button 
    type="button" 
    class="mr-2" 
    (click)="visible1 = true" 
    icon="pi pi-arrow-right" />
<p-button 
    type="button" 
    class="mr-2" 
    (click)="visible2 = true" 
    icon="pi pi-arrow-left" />
<p-button 
    type="button" 
    class="mr-2" 
    (click)="visible3 = true" 
    icon="pi pi-arrow-down" />
<p-button 
    type="button" 
    class="mr-2" 
    (click)="visible4 = true" 
    icon="pi pi-arrow-up" />`,

        html: `<div class="card flex flex-wrap justify-content-center gap-2">
    <p-drawer [(visible)]="visible1" position="left">
        <h3>Left Drawer</h3>
    </p-drawer>

    <p-drawer [(visible)]="visible2" position="right">
        <h3>Right Drawer</h3>
    </p-drawer>

    <p-drawer [(visible)]="visible3" position="top">
        <h3>Top Drawer</h3>
    </p-drawer>

    <p-drawer [(visible)]="visible4" position="bottom">
        <h3>Bottom Drawer</h3>
    </p-drawer>

    <p-button 
        type="button"
        class="mr-2" 
        (click)="visible1 = true" 
        icon="pi pi-arrow-right" />
    <p-button 
        type="button" 
        class="mr-2" 
        (click)="visible2 = true" 
        icon="pi pi-arrow-left" />
    <p-button 
        type="button"
        class="mr-2" 
        (click)="visible3 = true" 
        icon="pi pi-arrow-down" />
    <p-button 
        type="button" 
        class="mr-2" 
        (click)="visible4 = true" 
        icon="pi pi-arrow-up" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'drawer-position-demo',
    templateUrl: './drawer-position-demo.html',
    standalone: true,
    imports: [DrawerModule, ButtonModule]
})
export class DrawerPositionDemo {
    visible1: boolean = false;
    
    visible2: boolean = false;
    
    visible3: boolean = false;
    
    visible4: boolean = false;
}`
    };
}
