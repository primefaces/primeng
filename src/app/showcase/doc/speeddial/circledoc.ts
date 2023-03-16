import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'speeddial-circle-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Items can be displayed around the button when <i>type</i> is set to <i>circle</i>. Additional <i>radius</i> property defines the radius of the circle.</p>
        </app-docsectiontext>
        <div class="card">
            <div style="height: 500px" class="flex align-items-center justify-content-center">
                <p-toast></p-toast>
                <p-speedDial [model]="items" type="circle" [radius]="80" buttonClassName="p-button-warning"></p-speedDial>
            </div>
        </div>
        <app-code [code]="code" selector="speeddial-circle-demo"></app-code>
    </div>`,
    providers: [MessageService]
})
export class CircleDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: MenuItem[];

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
                url: 'http://angular.io'
            }
        ];
    }

    code: Code = {
        basic: `
<p-speedDial [model]="items" type="circle" [radius]="80" buttonClassName="p-button-warning"></p-speedDial>`,

        html: `
<div class="card">
    <div style="height: 500px" class="flex align-items-center justify-content-center">
        <p-toast></p-toast>
        <p-speedDial [model]="items" type="circle" [radius]="80" buttonClassName="p-button-warning"></p-speedDial>
    </div>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'speeddial-circle-demo',
    templateUrl: './speeddial-circle-demo.html',
    styleUrls: ['./speeddial-circle-demo.scss'],
    providers: [MessageService]
})
export class SpeeddialCircleDemo implements OnInit {
    items: MenuItem[];

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
                url: 'http://angular.io'
            }
        ];
    }
}`
    };
}
