import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'linear-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>SpeedDial items are defined with the <i>model</i> property based on MenuModel API. Default orientation of the items is linear and <i>direction</i> property is used to define the position of the items related to the button.</p>
        </app-docsectiontext>
        <div class="card">
            <div style="height: 500px; position: relative;" class="speeddial-linear-demo">
                <p-toast></p-toast>
                <p-speedDial [model]="items" direction="up"></p-speedDial>
                <p-speedDial [model]="items" direction="down"></p-speedDial>
                <p-speedDial [model]="items" direction="left"></p-speedDial>
                <p-speedDial [model]="items" direction="right"></p-speedDial>
            </div>
        </div>
        <app-code [code]="code" selector="speed-dial-linear-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class LinearDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                icon: 'pi pi-upload',
                routerLink: ['/fileupload']
            },
            {
                icon: 'pi pi-external-link',
                target: '_blank',
                url: 'http://angular.io'
            }
        ];
    }

    code: Code = {
        basic: `
<p-speedDial [model]="items" direction="up"></p-speedDial>
<p-speedDial [model]="items" direction="down"></p-speedDial>
<p-speedDial [model]="items" direction="left"></p-speedDial>
<p-speedDial [model]="items" direction="right"></p-speedDial>`,

        html: `
<div class="card">
    <div style="height: 500px; position: relative;" class="speeddial-linear-demo">
        <p-toast></p-toast>
        <p-speedDial [model]="items" direction="up"></p-speedDial>
        <p-speedDial [model]="items" direction="down"></p-speedDial>
        <p-speedDial [model]="items" direction="left"></p-speedDial>
        <p-speedDial [model]="items" direction="right"></p-speedDial>
    </div>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'speed-dial-linear-demo',
    templateUrl: './speed-dial-linear-demo.html',
    styleUrls: ['./speed-dial-linear-demo.scss'],
    providers: [MessageService]
})
export class SpeedDialLinearDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                icon: 'pi pi-upload',
                routerLink: ['/fileupload']
            },
            {
                icon: 'pi pi-external-link',
                target:'_blank',
                url: 'http://angular.io'
            }
        ];
    }
}`,

        scss: `
:host ::ng-deep {
    .speeddial-linear-demo {
        .p-speeddial-direction-up {
            left: calc(50% - 2rem);
            bottom: 0;
        }

        .p-speeddial-direction-down {
            left: calc(50% - 2rem);
            top: 0;
        }

        .p-speeddial-direction-left {
            right: 0;
            top: calc(50% - 2rem);
        }

        .p-speeddial-direction-right {
            left: 0;
            top: calc(50% - 2rem);
        }
    }
}`
    };
}
