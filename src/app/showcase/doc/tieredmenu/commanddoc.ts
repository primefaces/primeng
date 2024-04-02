import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'command-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>command</i> property defines the callback to run when an item is activated by click or a key event.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tieredMenu [model]="items"></p-tieredMenu>
            <p-toast />
        </div>
        <app-code [code]="code" selector="tiered-menu-command-demo"></app-code>
    `
})
export class CommandDoc implements OnInit {
    constructor(private messageService: MessageService) {}
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
                        command: () => {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
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
                label: 'Search',
                icon: 'pi pi-search',
                command: () => {
                    this.messageService.add({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 });
                }
            },
            {
                separator: true
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
            }
        ];
    }

    code: Code = {
        basic: `<p-tieredMenu [model]="items"></p-tieredMenu>
<p-toast/>`,

        html: `<div class="card flex justify-content-center">
        <p-tieredMenu [model]="items"></p-tieredMenu>
        <p-toast/>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'tiered-menu-command-demo',
    templateUrl: './tiered-menu-command-demo.html'
})
export class TieredMenuCommandDemo implements OnInit {
    constructor(private messageService: MessageService) {} 
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
                command: () => {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
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
            label: 'Search',
            icon: 'pi pi-search',
            command: () => {
              this.messageService.add({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 });
            }
          },
          {
            separator: true
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
          }
        ];
      }
}`
    };
}
