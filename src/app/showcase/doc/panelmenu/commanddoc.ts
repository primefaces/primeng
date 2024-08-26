import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'command-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>command</i> property defines the callback to run when an item is activated by click or a key event.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast />
            <p-panelMenu [model]="items" styleClass="w-full md:w-80" />
        </div>
        <app-code [code]="code" selector="panel-menu-command-demo"></app-code>
    `,
    providers: [MessageService]
})
export class CommandDoc implements OnInit {
    items: MenuItem[];

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Files',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus',
                        command: () => {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
                        }
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-search',
                        command: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 });
                        }
                    },
                    {
                        label: 'Print',
                        icon: 'pi pi-print',
                        command: () => {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No printer connected', life: 3000 });
                        }
                    }
                ]
            },
            {
                label: 'Sync',
                icon: 'pi pi-cloud',
                items: [
                    {
                        label: 'Import',
                        icon: 'pi pi-cloud-download',
                        command: () => {
                            this.messageService.add({ severity: 'info', summary: 'Downloads', detail: 'Downloaded from cloud', life: 3000 });
                        }
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-cloud-upload',
                        command: () => {
                            this.messageService.add({ severity: 'info', summary: 'Shared', detail: 'Exported to cloud', life: 3000 });
                        }
                    }
                ]
            },
            {
                label: 'Sign Out',
                icon: 'pi pi-sign-out',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Signed out', detail: 'User logged out', life: 3000 });
                }
            }
        ];
    }

    code: Code = {
        basic: `<p-toast />
<p-panelMenu [model]="items" styleClass="w-full md:w-80" />`,

        html: `<div class="card flex justify-center">
    <p-toast />
    <p-panelMenu [model]="items" styleClass="w-full md:w-80" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'panel-menu-command-demo',
    templateUrl: './panel-menu-command-demo.html',
    standalone: true,
    imports: [PanelMenuModule, ToastModule],
    providers: [MessageService]
})
export class PanelMenuCommandDemo implements OnInit {
    items: MenuItem[];

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Files',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus',
                        command: () => {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
                        }
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-search',
                        command: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 });
                        }
                    },
                    {
                        label: 'Print',
                        icon: 'pi pi-print',
                        command: () => {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No printer connected', life: 3000 });
                        }
                    }
                ]
            },
            {
                label: 'Sync',
                icon: 'pi pi-cloud',
                items: [
                    {
                        label: 'Import',
                        icon: 'pi pi-cloud-download',
                        command: () => {
                            this.messageService.add({ severity: 'info', summary: 'Downloads', detail: 'Downloaded from cloud', life: 3000 });
                        }
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-cloud-upload',
                        command: () => {
                            this.messageService.add({ severity: 'info', summary: 'Shared', detail: 'Exported to cloud', life: 3000 });
                        }
                    }
                ]
            },
            {
                label: 'Sign Out',
                icon: 'pi pi-sign-out',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Signed out', detail: 'User logged out', life: 3000 });
                }
            }
        ];
    }
}`
    };
}
