import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'position-doc',
    template: `
        <app-docsectiontext>
            <p>
                Drawer location is configured with the <i>position</i> property that can take <i>left</i>, <i>right</i>,
                <i>top</i> and <i>bottom</i> as a value.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-drawer header="Left Drawer" [(visible)]="visible1" position="left">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </p>
            </p-drawer>

            <p-drawer header="Right Drawer" [(visible)]="visible2" position="right">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </p>
            </p-drawer>

            <p-drawer header="Top Drawer" [(visible)]="visible3" position="top" style="height: auto">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </p>
            </p-drawer>
 
            <p-drawer header="Bottom Drawer" [(visible)]="visible4" position="bottom" style="height: auto">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </p>
            </p-drawer>
            <div class="flex gap-2 justify-center">
                <p-button type="button" (click)="visible1 = true" icon="pi pi-arrow-right" />
                <p-button type="button" (click)="visible2 = true" icon="pi pi-arrow-left" />
                <p-button type="button" (click)="visible3 = true" icon="pi pi-arrow-down" />
                <p-button type="button" (click)="visible4 = true" icon="pi pi-arrow-up" />
            </div>
        </div>
        <app-code [code]="code" selector="drawer-position-demo"></app-code>
    `,
})
export class PositionDoc {
    visible1: boolean = false;

    visible2: boolean = false;

    visible3: boolean = false;

    visible4: boolean = false;

    code: Code = {
        basic: `<p-drawer header="Left Drawer" [(visible)]="visible1" position="left">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
    </p>
</p-drawer>

<p-drawer header="Right Drawer" [(visible)]="visible2" position="right">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
    </p>
</p-drawer>

<p-drawer header="Top Drawer" [(visible)]="visible3" position="top" style="height: auto">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
    </p>
</p-drawer>

<p-drawer header="Bottom Drawer" [(visible)]="visible4" position="bottom" style="height: auto">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
    </p>
</p-drawer>
<div class="flex gap-2 justify-center">
    <p-button type="button" (click)="visible1 = true" icon="pi pi-arrow-right" />
    <p-button type="button" (click)="visible2 = true" icon="pi pi-arrow-left" />
    <p-button type="button" (click)="visible3 = true" icon="pi pi-arrow-down" />
    <p-button type="button" (click)="visible4 = true" icon="pi pi-arrow-up" />
</div>`,

        html: `<div class="card">
    <p-drawer header="Left Drawer" [(visible)]="visible1" position="left">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
        </p>
    </p-drawer>

    <p-drawer header="Right Drawer" [(visible)]="visible2" position="right">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
        </p>
    </p-drawer>

    <p-drawer header="Top Drawer" [(visible)]="visible3" position="top" style="height: auto">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
        </p>
    </p-drawer>

    <p-drawer header="Bottom Drawer" [(visible)]="visible4" position="bottom" style="height: auto">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
        </p>
    </p-drawer>
    <div class="flex gap-2 justify-center">
        <p-button type="button" (click)="visible1 = true" icon="pi pi-arrow-right" />
        <p-button type="button" (click)="visible2 = true" icon="pi pi-arrow-left" />
        <p-button type="button" (click)="visible3 = true" icon="pi pi-arrow-down" />
        <p-button type="button" (click)="visible4 = true" icon="pi pi-arrow-up" />
    </div>
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
}`,
    };
}
