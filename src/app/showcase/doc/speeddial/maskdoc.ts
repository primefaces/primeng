import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'mask-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Adding <i>mask</i> property displays a modal layer behind the popup items.</p>
        </app-docsectiontext>
        <div class="card">
            <div style="height: 350px; position: relative;" class="speeddial-mask-demo">
                <p-toast></p-toast>
                <p-speedDial [model]="items" direction="up" [mask]="true"></p-speedDial>
            </div>
        </div>
        <app-code [code]="code" selector="speed-dial-mask-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class MaskDoc implements OnInit {
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
<p-speedDial [model]="items" direction="up" [mask]="true"></p-speedDial>`,

        html: `
<div class="card">
    <div style="height: 350px; position: relative;" class="speeddial-mask-demo">
        <p-toast></p-toast>
        <p-speedDial [model]="items" direction="up" [mask]="true"></p-speedDial>
    </div>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'speed-dial-mask-demo',
    templateUrl: './speed-dial-mask-demo.html',
    styleUrls: ['./speed-dial-mask-demo.scss'],
    providers: [MessageService]
})
export class SpeedDialMaskDemo implements OnInit {
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
}`,

        scss: `
:host ::ng-deep {
    .speeddial-mask-demo {
        .p-speeddial-direction-up {
            right: 0;
            bottom: 0;
        }
    }
}`
    };
}
