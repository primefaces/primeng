import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'popup-doc',
    template: `
        <app-docsectiontext>
            <p>Popup mode is enabled by adding <i>popup</i> property and calling <i>toggle</i> method with an event of the target.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <button #btn type="button" pButton icon="pi pi-bars" label="Show" (click)="menu.toggle($event)"></button>
            <p-tieredMenu #menu [model]="items" [popup]="true"></p-tieredMenu>
        </div>
        <app-code [code]="code" selector="tiered-menu-popup-demo"></app-code>
    `
})
export class PopupDoc implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Bookmark',
                                icon: 'pi pi-fw pi-bookmark'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-fw pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-trash'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Left',
                        icon: 'pi pi-fw pi-align-left'
                    },
                    {
                        label: 'Right',
                        icon: 'pi pi-fw pi-align-right'
                    },
                    {
                        label: 'Center',
                        icon: 'pi pi-fw pi-align-center'
                    },
                    {
                        label: 'Justify',
                        icon: 'pi pi-fw pi-align-justify'
                    }
                ]
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                separator: true
            },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-power-off'
            }
        ];
    }

    code: Code = {
        basic: `
<button #btn type="button" pButton icon="pi pi-bars" label="Show" (click)="menu.toggle($event)"></button>
<p-tieredMenu #menu [model]="items" [popup]="true"></p-tieredMenu>`,

        html: `
<div class="card flex justify-content-center">
    <button #btn type="button" pButton icon="pi pi-bars" label="Show" (click)="menu.toggle($event)"></button>
    <p-tieredMenu #menu [model]="items" [popup]="true"></p-tieredMenu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'tiered-menu-popup-demo',
    templateUrl: './tiered-menu-popup-demo.html'
})
export class TieredMenuPopupDemo implements OnInit {
    items: MenuItem[] | undefined;
    
    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Bookmark',
                                icon: 'pi pi-fw pi-bookmark'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-fw pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-trash'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Left',
                        icon: 'pi pi-fw pi-align-left'
                    },
                    {
                        label: 'Right',
                        icon: 'pi pi-fw pi-align-right'
                    },
                    {
                        label: 'Center',
                        icon: 'pi pi-fw pi-align-center'
                    },
                    {
                        label: 'Justify',
                        icon: 'pi pi-fw pi-align-justify'
                    }
                ]
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                separator: true
            },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-power-off'
            }
        ];
    }
}`
    };
}
