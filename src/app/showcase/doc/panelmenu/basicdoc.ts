import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>PanelMenu requires a collection of menuitems as its <i>model</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-panelMenu [model]="items" styleClass="w-full md:w-80" />
        </div>
        <app-code [code]="code" selector="panel-menu-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Files',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'Documents',
                        icon: 'pi pi-file',
                        items: [
                            {
                                label: 'Invoices',
                                icon: 'pi pi-file-pdf',
                                items: [
                                    {
                                        label: 'Pending',
                                        icon: 'pi pi-stop'
                                    },
                                    {
                                        label: 'Paid',
                                        icon: 'pi pi-check-circle'
                                    }
                                ]
                            },
                            {
                                label: 'Clients',
                                icon: 'pi pi-users'
                            }
                        ]
                    },
                    {
                        label: 'Images',
                        icon: 'pi pi-image',
                        items: [
                            {
                                label: 'Logos',
                                icon: 'pi pi-image'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Cloud',
                icon: 'pi pi-cloud',
                items: [
                    {
                        label: 'Upload',
                        icon: 'pi pi-cloud-upload'
                    },
                    {
                        label: 'Download',
                        icon: 'pi pi-cloud-download'
                    },
                    {
                        label: 'Sync',
                        icon: 'pi pi-refresh'
                    }
                ]
            },
            {
                label: 'Devices',
                icon: 'pi pi-desktop',
                items: [
                    {
                        label: 'Phone',
                        icon: 'pi pi-mobile'
                    },
                    {
                        label: 'Desktop',
                        icon: 'pi pi-desktop'
                    },
                    {
                        label: 'Tablet',
                        icon: 'pi pi-tablet'
                    }
                ]
            }
        ];
    }

    code: Code = {
        basic: `<p-panelMenu [model]="items" styleClass="w-full md:w-20rem" />`,

        html: `<div class="card flex justify-center">
    <p-panelMenu [model]="items" styleClass="w-full md:w-80" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
    selector: 'panel-menu-basic-demo',
    templateUrl: './panel-menu-basic-demo.html',
    standalone: true,
    imports: [PanelMenuModule]
})
export class PanelMenuBasicDemo implements OnInit {
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Files',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'Documents',
                        icon: 'pi pi-file',
                        items: [
                            {
                                label: 'Invoices',
                                icon: 'pi pi-file-pdf',
                                items: [
                                    {
                                        label: 'Pending',
                                        icon: 'pi pi-stop'
                                    },
                                    {
                                        label: 'Paid',
                                        icon: 'pi pi-check-circle'
                                    }
                                ]
                            },
                            {
                                label: 'Clients',
                                icon: 'pi pi-users'
                            }
                        ]
                    },
                    {
                        label: 'Images',
                        icon: 'pi pi-image',
                        items: [
                            {
                                label: 'Logos',
                                icon: 'pi pi-image'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Cloud',
                icon: 'pi pi-cloud',
                items: [
                    {
                        label: 'Upload',
                        icon: 'pi pi-cloud-upload'
                    },
                    {
                        label: 'Download',
                        icon: 'pi pi-cloud-download'
                    },
                    {
                        label: 'Sync',
                        icon: 'pi pi-refresh'
                    }
                ]
            },
            {
                label: 'Devices',
                icon: 'pi pi-desktop',
                items: [
                    {
                        label: 'Phone',
                        icon: 'pi pi-mobile'
                    },
                    {
                        label: 'Desktop',
                        icon: 'pi pi-desktop'
                    },
                    {
                        label: 'Tablet',
                        icon: 'pi pi-tablet'
                    }
                ]
            }
        ]
    }
}`
    };
}
