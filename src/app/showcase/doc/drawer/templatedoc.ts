import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Drawer is customizable by <i>header</i>, <i>content</i>, <i>footer</i> templates.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-drawer [(visible)]="visible">
                <ng-template pTemplate="header">
                    <div class="flex items-center gap-2">
                        <p-avatar
                            image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
                            shape="circle"
                        />
                        <span class="font-bold">Amy Elsner</span>
                    </div>
                </ng-template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </p>
                <ng-template pTemplate="footer">
                    <div class="flex items-center gap-2">
                        <button pButton label="Account" icon="pi pi-user" class="w-full" outlined></button>
                        <button
                            pButton
                            label="Logout"
                            icon="pi pi-sign-out"
                            class="w-full"
                            severity="danger"
                            text
                        ></button>
                    </div>
                </ng-template>
            </p-drawer>
            <button pButton (click)="visible = true" icon="pi pi-plus"></button>
        </div>
        <app-code [code]="code" selector="drawer-template-demo"></app-code>
    `,
})
export class TemplateDoc {
    visible: boolean = false;

    code: Code = {
        basic: `<p-drawer [(visible)]="visible">
    <ng-template pTemplate="header">
        <div class="flex items-center gap-2">
            <p-avatar
                image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
                shape="circle"
            />
            <span class="font-bold">Amy Elsner</span>
        </div>
    </ng-template>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
    </p>
    <ng-template pTemplate="footer">
        <div class="flex items-center gap-2">
            <button pButton label="Account" icon="pi pi-user" class="w-full" outlined></button>
            <button
                pButton
                label="Logout"
                icon="pi pi-sign-out"
                class="w-full"
                severity="danger"
                text
            ></button>
        </div>
    </ng-template>
</p-drawer>
<button pButton (click)="visible = true" icon="pi pi-plus"></button>`,

        html: `<div class="card flex justify-center">
    <p-drawer [(visible)]="visible">
        <ng-template pTemplate="header">
            <div class="flex items-center gap-2">
                <p-avatar
                    image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
                    shape="circle"
                />
                <span class="font-bold">Amy Elsner</span>
            </div>
        </ng-template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
        </p>
        <ng-template pTemplate="footer">
            <div class="flex items-center gap-2">
                <button pButton label="Account" icon="pi pi-user" class="w-full" outlined></button>
                <button
                    pButton
                    label="Logout"
                    icon="pi pi-sign-out"
                    class="w-full"
                    severity="danger"
                    text
                ></button>
            </div>
        </ng-template>
    </p-drawer>
    <button pButton (click)="visible = true" icon="pi pi-plus"></button>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'drawer-template-demo',
    templateUrl: './drawer-template-demo.html',
    standalone: true,
    imports: [DrawerModule, ButtonModule]
})
export class DrawerTemplateDemo {
    visible: boolean = false;
}`,
    };
}
