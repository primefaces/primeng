import { Code } from '@/domain/code';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';

interface Users {
    id: number;
    name: string;
    image: string;
    role: string;
}

@Component({
    selector: 'context-menu-command-demo',
    template: `
        <app-docsectiontext>
            <p>The function to invoke when an item is clicked is defined using the <i>command</i> property.</p>
        </app-docsectiontext>
        <div class="card flex sm:justify-center">
            <p-toast />
            <ul class="m-0 list-none border border-surface rounded p-4 flex flex-col gap-2 w-full sm:w-96">
                <li
                    *ngFor="let user of users"
                    class="p-2 hover:bg-emphasis rounded border border-transparent transition-all duration-200 flex items-center justify-content-between"
                    [ngClass]="{ 'border-primary': selectedId === user.id }"
                    (contextmenu)="onContextMenu($event, user)"
                >
                    <div class="flex flex-1 items-center gap-2">
                        <img class="w-8 h-8" [alt]="user.name" [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + user.image" />
                        <span class="font-bold">{{ user.name }}</span>
                    </div>
                    <p-tag [value]="user.role" [severity]="getBadge(user)" />
                </li>
            </ul>

            <p-contextmenu #cm [model]="items" (onHide)="onHide()" />
        </div>

        <app-code [code]="code" selector="context-menu-command-demo"></app-code>
    `,
    providers: [MessageService]
})
export class CommandDoc implements OnInit {
    items: MenuItem[] | undefined;

    @ViewChild('cm') cm: ContextMenu;

    selectedUser: Users;

    users: Users[];

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.users = [
            { id: 0, name: 'Amy Elsner', image: 'amyelsner.png', role: 'Admin' },
            { id: 1, name: 'Anna Fali', image: 'annafali.png', role: 'Member' },
            { id: 2, name: 'Asiya Javayant', image: 'asiyajavayant.png', role: 'Member' },
            { id: 3, name: 'Bernardo Dominic', image: 'bernardodominic.png', role: 'Guest' },
            { id: 4, name: 'Elwin Sharvill', image: 'elwinsharvill.png', role: 'Member' }
        ];

        this.items = [
            {
                label: 'Roles',
                icon: 'pi pi-users',
                items: [
                    {
                        label: 'Admin',
                        command: () => {
                            this.selectedUser.role = 'Admin';
                        }
                    },
                    {
                        label: 'Member',
                        command: () => {
                            this.selectedUser.role = 'Member';
                        }
                    },
                    {
                        label: 'Guest',
                        command: () => {
                            this.selectedUser.role = 'Guest';
                        }
                    }
                ]
            },
            {
                label: 'Invite',
                icon: 'pi pi-user-plus',
                command: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Invitation sent!',
                        life: 3000
                    });
                }
            }
        ];
    }

    getBadge(user) {
        if (user.role === 'Member') return 'info';
        else if (user.role === 'Guest') return 'warn';
        else return null;
    }

    onContextMenu(event, user) {
        this.selectedUser = user;
        this.cm.show(event);
    }

    onHide() {
        this.selectedUser = null;
    }

    code: Code = {
        basic: `<p-toast />
    <ul class="m-0 list-none border border-surface rounded p-4 flex flex-col gap-2 w-full sm:w-96">
        <li
            *ngFor="let user of users"
            class="p-2 hover:bg-emphasis rounded border border-transparent transition-all duration-200 flex items-center justify-content-between"
            [ngClass]="{ 'border-primary': selectedId === user.id }"
            (contextmenu)="onContextMenu($event, user)"
        >
            <div class="flex flex-1 items-center gap-2">
                <img
                    class="w-8 h-8"
                    [alt]="user.name"
                    [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + user.image"
                />
                <span class="font-bold">{{ user.name }}</span>
            </div>
            <p-tag [value]="user.role" [severity]="getBadge(user)" />
        </li>
    </ul>

    <p-contextmenu #cm [model]="items" (onHide)="onHide()" />`,

        html: `<div class="card flex sm:justify-center">
    <p-toast />
    <ul class="m-0 list-none border border-surface rounded p-4 flex flex-col gap-2 w-full sm:w-96">
        <li
            *ngFor="let user of users"
            class="p-2 hover:bg-emphasis rounded border border-transparent transition-all duration-200 flex items-center justify-content-between"
            [ngClass]="{ 'border-primary': selectedId === user.id }"
            (contextmenu)="onContextMenu($event, user)"
        >
            <div class="flex flex-1 items-center gap-2">
                <img
                    class="w-8 h-8"
                    [alt]="user.name"
                    [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + user.image"
                />
                <span class="font-bold">{{ user.name }}</span>
            </div>
            <p-tag [value]="user.role" [severity]="getBadge(user)" />
        </li>
    </ul>

    <p-contextmenu #cm [model]="items" (onHide)="onHide()" />
</div>`,

        typescript: `import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ContextMenu } from 'primeng/contextmenu';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';

interface Users {
    id: number;
    name: string;
    image: string;
    role: string;
}

@Component({
    selector: 'context-menu-command-demo',
    templateUrl: './context-menu-command-demo.html',
    standalone: true,
    imports: [ContextMenu, ToastModule, CommonModule, Tag],
    providers: [MessageService]
})
export class ContextMenuCommandDemo implements OnInit {
    items: MenuItem[] | undefined;

    @ViewChild('cm') cm: ContextMenu;

    selectedUser : Users

    users : Users[];

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.users = [
            { id: 0, name: 'Amy Elsner', image: 'amyelsner.png', role: 'Admin' },
            { id: 1, name: 'Anna Fali', image: 'annafali.png', role: 'Member' },
            { id: 2, name: 'Asiya Javayant', image: 'asiyajavayant.png', role: 'Member' },
            { id: 3, name: 'Bernardo Dominic', image: 'bernardodominic.png', role: 'Guest' },
            { id: 4, name: 'Elwin Sharvill', image: 'elwinsharvill.png', role: 'Member' }
        ];

        this.items = [
            {
                label: 'Roles',
                icon: 'pi pi-users',
                items: [
                    {
                        label: 'Admin',
                        command: () => {
                            this.selectedUser.role = 'Admin';
                        }
                    },
                    {
                        label: 'Member',
                        command: () => {
                            this.selectedUser.role = 'Member';
                        }
                    },
                    {
                        label: 'Guest',
                        command: () => {
                            this.selectedUser.role = 'Guest';
                        }
                    }
                ]
            },
            {
                label: 'Invite',
                icon: 'pi pi-user-plus',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invitation sent!', life: 3000 });
                }
            }
        ];
    }

    getBadge(user) {
        if (user.role === 'Member') return 'info';
        else if (user.role === 'Guest') return 'warn';
        else return null;
    }

    onContextMenu(event, user) {
        this.selectedUser = user;
        this.cm.show(event);
    }

    onHide() {
        this.selectedUser = null;
    }
}`
    };
}
