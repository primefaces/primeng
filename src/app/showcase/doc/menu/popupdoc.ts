import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primengrtl/api';
import { Code } from '@domain/code';

@Component({
    selector: 'popup-doc',
    template: `
        <app-docsectiontext>
            <p>Popup mode is enabled by setting <i>popup</i> property to <i>true</i> and calling <i>toggle</i> method with an event of the target.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-menu #menu [model]="items" [popup]="true" />
            <p-button (onClick)="menu.toggle($event)" icon="pi pi-ellipsis-v" />
        </div>
        <app-code [code]="code" selector="menu-popup-demo"></app-code>
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
    code: Code = {
        basic: `<p-toast />
<p-menu #menu [model]="items" [popup]="true" />
<p-button (onClick)="menu.toggle($event)" icon="pi pi-ellipsis-v"/>`,

        html: `<div class="card flex justify-content-center">
    <p-menu #menu [model]="items" [popup]="true" />
    <p-button (onClick)="menu.toggle($event)" icon="pi pi-ellipsis-v"/>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primengrtl/api';
import { MenuModule } from 'primengrtl/menu';
import { ButtonModule } from 'primengrtl/button';

@Component({
    selector: 'menu-popup-demo',
    templateUrl: './menu-popup-demo.html',
    standalone: true,
    imports: [MenuModule, ButtonModule]
})
export class MenuPopupDemo implements OnInit {
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
}`
    };
}
