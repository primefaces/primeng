import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from '@alamote/primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'circle-doc',
    template: `
        <app-docsectiontext>
            <p>Items can be displayed around the button when <i>type</i> is set to <i>circle</i>. Additional <i>radius</i> property defines the radius of the circle.</p>
        </app-docsectiontext>
        <div class="card">
            <div style="height: 500px" class="flex align-items-center justify-content-center">
                <p-toast></p-toast>
                <p-speedDial [model]="items" type="circle" [radius]="80" buttonClassName="p-button-warning"></p-speedDial>
            </div>
        </div>
        <app-code [code]="code" selector="speed-dial-circle-demo"></app-code>
    `,
    providers: [MessageService]
})
export class CircleDoc implements OnInit {
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
        basic: `<p-speedDial [model]="items" type="circle" [radius]="80" buttonClassName="p-button-warning"></p-speedDial>`,

        html: `
<div class="card">
    <div style="height: 500px" class="flex align-items-center justify-content-center">
        <p-toast></p-toast>
        <p-speedDial [model]="items" type="circle" [radius]="80" buttonClassName="p-button-warning"></p-speedDial>
    </div>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from '@alamote/primeng/api';

@Component({
    selector: 'speed-dial-circle-demo',
    templateUrl: './speed-dial-circle-demo.html',
    providers: [MessageService]
})
export class SpeedDialCircleDemo implements OnInit {
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
}`
    };
}
