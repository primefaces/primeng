import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'semi-circle-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>type</i> is defined as <i>semi-circle</i>, items are displayed in a half-circle around the button.</p>
        </app-docsectiontext>
        <div class="card">
            <div style="height: 500px; position: relative;" class="speeddial-linear-demo">
                <p-toast></p-toast>
                <p-speedDial [model]="items" direction="up" [radius]="80" type="semi-circle"></p-speedDial>
                <p-speedDial [model]="items" direction="down" [radius]="80" type="semi-circle"></p-speedDial>
                <p-speedDial [model]="items" direction="left" [radius]="80" type="semi-circle"></p-speedDial>
                <p-speedDial [model]="items" direction="right" [radius]="80" type="semi-circle"></p-speedDial>
            </div>
        </div>
        <app-code [code]="code" selector="speed-dial-semi-circle-demo"></app-code>
    `,
    providers: [MessageService]
})
export class SemiCircleDoc implements OnInit {
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
<p-speedDial [model]="items" direction="up" [radius]="80" type="semi-circle"></p-speedDial>
<p-speedDial [model]="items" direction="down" [radius]="80" type="semi-circle"></p-speedDial>
<p-speedDial [model]="items" direction="left" [radius]="80" type="semi-circle"></p-speedDial>
<p-speedDial [model]="items" direction="right" [radius]="80" type="semi-circle"></p-speedDial>`,

        html: `
<div class="card">
    <div style="height: 500px; position: relative;" class="speeddial-linear-demo">
        <p-toast></p-toast>
        <p-speedDial [model]="items" direction="up" [radius]="80" type="semi-circle"></p-speedDial>
        <p-speedDial [model]="items" direction="down" [radius]="80" type="semi-circle"></p-speedDial>
        <p-speedDial [model]="items" direction="left" [radius]="80" type="semi-circle"></p-speedDial>
        <p-speedDial [model]="items" direction="right" [radius]="80" type="semi-circle"></p-speedDial>
    </div>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'speed-dial-semi-circle-demo',
    templateUrl: './speed-dial-semi-circle-demo.html',
    styleUrls: ['./speed-dial-semi-circle-demo.scss'],
    providers: [MessageService]
})
export class SpeedDialSemiCircleDemo implements OnInit {
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
