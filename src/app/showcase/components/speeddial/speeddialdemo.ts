import {Component, OnInit} from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    templateUrl: './speeddialdemo.html',
    styleUrls: ['./speeddialdemo.scss'],
    providers: [MessageService]
})
export class SpeedDialDemo implements OnInit {

    items: MenuItem[];

    tooltipItems: MenuItem[];

    leftTooltipItems: MenuItem[];

    constructor(private messageService: MessageService) { }

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

        this.tooltipItems = [
            {
                tooltipOptions: {
                    tooltipLabel: "Add"
                },
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Update"
                },
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Delete"
                },
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Upload"
                },
                icon: 'pi pi-upload',
                routerLink: ['/fileupload']
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Angular Website"
                },
                icon: 'pi pi-external-link',
                url: 'http://angular.io'
            }
        ];

        this.leftTooltipItems = [
            {
                tooltipOptions: {
                    tooltipLabel: "Add",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Update",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Delete",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                icon: 'pi pi-upload',
                tooltipOptions: {
                    tooltipLabel: "Upload",
                    tooltipPosition: "left",
                },
                routerLink: ['/fileupload']
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Angular Website",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-external-link',
                url: 'http://angular.io'
            }
        ];
    }
}
