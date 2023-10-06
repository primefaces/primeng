import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'command-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>The function to invoke when an item is clicked is defined using the <i>command</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-menu [model]="items"></p-menu>
        </div>
        <app-code [code]="code" selector="menu-command-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class CommandDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    this.update();
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    this.delete();
                }
            }
        ];
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }

    code: Code = {
        basic: `
<p-toast></p-toast>
<p-menu [model]="items"></p-menu>`,

        html: `
<div class="card flex justify-content-center">
    <p-menu [model]="items"></p-menu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'menu-command-demo',
    templateUrl: './menu-command-demo.html',
    providers: [MessageService]
})
export class MenuCommandDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}
    
    ngOnInit() {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    this.update();
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    this.delete();
                }
            }
        ];
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }
}`
    };
}
