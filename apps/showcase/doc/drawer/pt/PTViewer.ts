import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';

@Component({
    selector: 'drawer-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, DrawerModule],
    template: `
        <app-docptviewer [docs]="docs" class="!justify-start" #docref>
            <p-drawer [(visible)]="visible" styleClass="!relative" header="Drawer" [maskStyle]="{ position: 'relative !important' }" [appendTo]="docref?.nativeElement" [baseZIndex]="2">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-drawer>
        </app-docptviewer>
    `
})
export class PTViewer {
    visible: boolean = true;
    docs = [
        {
            data: getPTOptions('Drawer'),
            key: 'Drawer'
        }
    ];
}
