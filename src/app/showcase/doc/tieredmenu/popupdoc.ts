import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'popup-doc',
    template: `
        <app-docsectiontext>
            <p>Popup mode is enabled by adding <i>popup</i> property and calling <i>toggle</i> method with an event of the target.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button label="Toggle" (click)="menu.toggle($event)" />
            <p-tieredMenu #menu [model]="items" [popup]="true" />
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
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus',
                        items: [
                            {
                                label: 'Document',
                                icon: 'pi pi-file'
                            },
                            {
                                label: 'Image',
                                icon: 'pi pi-image'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Open',
                        icon: 'pi pi-folder-open'
                    },
                    {
                        label: 'Print',
                        icon: 'pi pi-print'
                    }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-file-edit',
                items: [
                    {
                        label: 'Copy',
                        icon: 'pi pi-copy'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times'
                    }
                ]
            },
            {
                label: 'Search',
                icon: 'pi pi-search'
            },
            {
                separator: true
            },
            {
                label: 'Share',
                icon: 'pi pi-share-alt',
                items: [
                    {
                        label: 'Slack',
                        icon: 'pi pi-slack'
                    },
                    {
                        label: 'Whatsapp',
                        icon: 'pi pi-whatsapp'
                    }
                ]
            }
        ];
    }

    code: Code = {
        basic: `<p-button label="Toggle" (click)="menu.toggle($event)" />
<p-tieredMenu #menu [model]="items" [popup]="true" />`,

        html: `<div class="card flex justify-center">
    <p-button label="Toggle" (click)="menu.toggle($event)" />
    <p-tieredMenu #menu [model]="items" [popup]="true" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'tiered-menu-popup-demo',
    templateUrl: './tiered-menu-popup-demo.html',
    standalone: true,
    imports: [TieredMenuModule, ButtonModule]
})
export class TieredMenuPopupDemo implements OnInit {
    items: MenuItem[] | undefined;
    
    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus',
                        items: [
                            {
                                label: 'Document',
                                icon: 'pi pi-file'
                            },
                            {
                                label: 'Image',
                                icon: 'pi pi-image'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Open',
                        icon: 'pi pi-folder-open'
                    },
                    {
                        label: 'Print',
                        icon: 'pi pi-print'
                    }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-file-edit',
                items: [
                    {
                        label: 'Copy',
                        icon: 'pi pi-copy'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times'
                    }
                ]
            },
            {
                label: 'Search',
                icon: 'pi pi-search'
            },
            {
                separator: true
            },
            {
                label: 'Share',
                icon: 'pi pi-share-alt',
                items: [
                    {
                        label: 'Slack',
                        icon: 'pi pi-slack'
                    },
                    {
                        label: 'Whatsapp',
                        icon: 'pi pi-whatsapp'
                    }
                ]
            }
        ]
    }
}`
    };
}
