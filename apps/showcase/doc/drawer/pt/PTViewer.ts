import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { TimesIcon } from 'primeng/icons';

@Component({
    selector: 'drawer-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, DrawerModule, TimesIcon],
    template: `
        <app-docptviewer [docs]="docs" class="!justify-start" #docref>
            <p-drawer [(visible)]="visible" styleClass="!relative !h-[450px] !w-80" header="Drawer" [maskStyle]="{ position: 'relative !important' }" [appendTo]="docref?.nativeElement" [baseZIndex]="2">
                <ng-template #headless>
                    <span class="p-hidden-accessible p-hidden-focusable" tabindex="0" role="presentation" aria-hidden="true" data-p-hidden-accessible="true" data-p-hidden-focusable="true" data-pc-section="firstfocusableelement"></span>
                    <div class="p-drawer-header" data-pc-section="header">
                        <div class="p-drawer-title" data-pc-section="title">Drawer</div>
                        <button
                            class="p-button p-component p-button-icon-only p-button-secondary p-button-rounded p-button-text p-drawer-close-button"
                            type="button"
                            aria-label="Close"
                            data-pc-name="pcclosebutton"
                            data-p-disabled="false"
                            data-p-severity="secondary"
                            data-pc-group-section="iconcontainer"
                            data-pc-extend="button"
                            data-pc-section="root"
                        >
                            <svg data-p-icon="times" class="p-button-icon"></svg>
                        </button>
                    </div>
                    <div class="p-drawer-content" data-pc-section="content">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                        </p>
                    </div>
                    <div class="p-drawer-footer" data-pc-section="footer">Footer</div>
                    <span class="p-hidden-accessible p-hidden-focusable" tabindex="0" role="presentation" aria-hidden="true" data-p-hidden-accessible="true" data-p-hidden-focusable="true" data-pc-section="lastfocusableelement"></span>
                </ng-template>
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
