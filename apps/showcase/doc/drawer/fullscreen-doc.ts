import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
    selector: 'fullscreen-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, DrawerModule, ButtonModule, FormsModule],
    template: `
        <app-docsectiontext>
            <p>Drawer can cover the whole page when <i>fullScreen</i> property is enabled.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-drawer header="Drawer" [(visible)]="visible" [fullScreen]="true">
                    <p class="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </p>
                </p-drawer>
                <p-button (click)="visible = true" icon="pi pi-window-maximize" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class FullScreenDoc {
    visible: boolean = false;
}
