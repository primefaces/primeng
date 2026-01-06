import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'size-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, DrawerModule, ButtonModule, FormsModule],
    template: `
        <app-docsectiontext>
            <p>Drawer dimension can be defined with <i>style</i> or <i>class</i> properties, this responsive example utilizes Tailwind.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-drawer header="Drawer" [(visible)]="visible" styleClass="!w-full md:!w-80 lg:!w-[30rem]">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-drawer>
            <p-button (click)="visible = true" icon="pi pi-arrow-right" />
        </div>
        <app-code></app-code>
    `
})
export class SizeDoc {
    visible: boolean = false;
}
