import {Component,OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';

@Component({
    templateUrl: './splitbuttondemo.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .p-splitbutton {
            margin-right: .25rem;
        }
    `]
})
export class SplitButtonDemo implements OnInit {
    
    items: MenuItem[];
    nestedItems: MenuItem[];
    
    constructor(private messageService: MessageService) {}
    
    ngOnInit() {
        this.items = [
            {label: 'Update', icon: 'pi pi-refresh', command: () => {
                this.update();
            }},
            {label: 'Delete', icon: 'pi pi-times', command: () => {
                this.delete();
            }},
            {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
            {separator:true},
            {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
        ];
        
        this.nestedItems = [
            {
                label:'File',
                icon:'pi pi-fw pi-file',
                items:[
                    {
                        label:'New',
                        icon:'pi pi-fw pi-plus',
                        items:[
                            {
                                label:'Bookmark',
                                icon:'pi pi-fw pi-bookmark'
                            },
                            {
                                label:'Video',
                                icon:'pi pi-fw pi-video'
                            },
                        ]
                    },
                    {
                        label:'Delete',
                        icon:'pi pi-fw pi-trash'
                    },
                    {
                        separator:true
                    },
                    {
                        label:'Export',
                        icon:'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label:'Edit',
                icon:'pi pi-fw pi-pencil',
                items:[
                    {
                        label:'Left',
                        icon:'pi pi-fw pi-align-left'
                    },
                    {
                        label:'Right',
                        icon:'pi pi-fw pi-align-right'
                    },
                    {
                        label:'Center',
                        icon:'pi pi-fw pi-align-center'
                    },
                    {
                        label:'Justify',
                        icon:'pi pi-fw pi-align-justify'
                    }
                ]
            },
            {
                label:'Users',
                icon:'pi pi-fw pi-user',
                items:[
                    {
                        label:'New',
                        icon:'pi pi-fw pi-user-plus'
                    },
                    {
                        label:'Delete',
                        icon:'pi pi-fw pi-user-minus'
                    },
                    {
                        label:'Search',
                        icon:'pi pi-fw pi-users',
                        items:[
                            {
                                label:'Filter',
                                icon:'pi pi-fw pi-filter',
                                items:[
                                    {
                                        label:'Print',
                                        icon:'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon:'pi pi-fw pi-bars',
                                label:'List'
                            }
                        ]
                    }
                ]
            },
            {
                label:'Events',
                icon:'pi pi-fw pi-calendar',
                items:[
                    {
                        label:'Edit',
                        icon:'pi pi-fw pi-pencil',
                        items:[
                            {
                                label:'Save',
                                icon:'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label:'Delete',
                                icon:'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    },
                    {
                        label:'Archieve',
                        icon:'pi pi-fw pi-calendar-times',
                        items:[
                            {
                                label:'Remove',
                                icon:'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                separator:true
            },
            {
                label:'Quit',
                icon:'pi pi-fw pi-power-off'
            }
        ];
    }

    save(severity: string) {
        this.messageService.add({severity: severity, summary:'Success', detail:'Data Saved'});
    }
    
    update() {
        this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
    }
    
    delete() {
        this.messageService.add({severity:'success', summary:'Success', detail:'Data Deleted'});
    }

}
