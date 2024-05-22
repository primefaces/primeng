import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'command-doc',
    template: `
        <app-docsectiontext>
            <p>The function to invoke when an item is clicked is defined using the <i>command</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast />
            <p-menu [model]="items" />
        </div>
        <app-code [code]="code" selector="menu-command-demo"></app-code>
    `,
    providers: [MessageService]
})
export class CommandDoc implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'New',
                icon: 'pi pi-plus',
                command: () => {
                    this.update();
                }
            },
            {
                label: 'Search',
                icon: 'pi pi-search',
                command: () => {
                    this.delete();
                }
            }
        ];
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Search Completed', detail: 'No results found', life: 3000 });
    }

    code: Code = {
        basic: `<p-toast />
<p-menu [model]="items" />`,

        html: `<div class="card flex justify-content-center">
    <p-toast />
    <p-menu [model]="items" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'menu-command-demo',
    templateUrl: './menu-command-demo.html',
    standalone: true,
    imports: [MenuModule, ToastModule],
    providers: [MessageService]
})
export class MenuCommandDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'New',
                icon: 'pi pi-plus',
                command: () => {
                    this.update();
                }
            },
            {
                label: 'Search',
                icon: 'pi pi-search',
                command: () => {
                    this.delete();
                }
            }
        ];
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Search Completed', detail: 'No results found', life: 3000 });
    }
}`
    };
}
