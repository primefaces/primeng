import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Drawer is used as a container and visibility is controlled with a binding to <i>visible</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-drawer [(visible)]="visible" header="Drawer">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </p>
            </p-drawer>
            <p-button (click)="visible = true" icon="pi pi-arrow-right" />
        </div>
        <app-code [code]="code" selector="drawer-basic-demo"></app-code>
    `,
})
export class BasicDoc {
    visible: boolean = false;

    code: Code = {
        basic: `<p-drawer [(visible)]="visible" header="Drawer">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
    </p>
</p-drawer>
<p-button (click)="visible = true" icon="pi pi-arrow-right" />`,

        html: `<div class="card flex justify-center">
    <p-drawer [(visible)]="visible" header="Drawer">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
        </p>
    </p-drawer>
    <p-button (click)="visible = true" icon="pi pi-arrow-right" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'drawer-basic-demo',
    templateUrl: './drawer-basic-demo.html',
    standalone: true,
    imports: [DrawerModule, ButtonModule]
})
export class DrawerBasicDemo {
    visible: boolean = false;
}`,
    };
}
