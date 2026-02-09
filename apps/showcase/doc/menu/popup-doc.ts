import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'popup-doc',
    standalone: true,
    imports: [MenuModule, ButtonModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Popup mode is enabled by setting <i>popup</i> property to <i>true</i> and calling <i>toggle</i> method with an event of the target.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-menu #menu [model]="items" [popup]="true" />
            <p-button (click)="menu.toggle($event)" icon="pi pi-ellipsis-v" />
        </div>
        <app-code></app-code>
    `,
    providers: [MessageService]
})
export class PopupDoc implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Options',
                items: [
                    {
                        label: 'Refresh',
                        icon: 'pi pi-refresh'
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-upload'
                    }
                ]
            }
        ];
    }
}
