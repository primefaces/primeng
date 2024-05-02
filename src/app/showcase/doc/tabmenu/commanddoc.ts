import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'command-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>command</i> property defines the callback to run when an item is activated by click or a key event.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast />
            <p-tabMenu [model]="items" />
        </div>
        <app-code [code]="code" selector="tab-menu-command-demo"></app-code>
    `,
    providers: [MessageService]
})
export class CommandDoc implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-home',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Selected', detail: 'Dashboard', life: 3000 });
                }
            },
            {
                label: 'Transactions',
                icon: 'pi pi-chart-line',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Selected', detail: 'Transactions', life: 3000 });
                }
            },
            {
                label: 'Products',
                icon: 'pi pi-list',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Selected', detail: 'Products', life: 3000 });
                }
            },
            {
                label: 'Messages',
                icon: 'pi pi-inbox',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Selected', detail: 'Messages', life: 3000 });
                }
            }
        ];
    }

    code: Code = {
        basic: `<p-toast />
<p-tabMenu [model]="items" />`,

        html: `<div class="card">
    <p-toast />
    <p-tabMenu [model]="items" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'tab-menu-command-demo',
    templateUrl: './tab-menu-command-demo.html',
    standalone: true,
    imports: [TabMenuModule, ToastModule],
    providers: [MessageService]
})
export class TabMenuCommandDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-home',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Selected', detail: 'Dashboard', life: 3000 });
                }
            },
            {
                label: 'Transactions',
                icon: 'pi pi-chart-line',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Selected', detail: 'Transactions', life: 3000 });
                }
            },
            {
                label: 'Products',
                icon: 'pi pi-list',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Selected', detail: 'Products', life: 3000 });
                }
            },
            {
                label: 'Messages',
                icon: 'pi pi-inbox',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Selected', detail: 'Messages', life: 3000 });
                }
            }
        ];
    }

}`
    };
}
