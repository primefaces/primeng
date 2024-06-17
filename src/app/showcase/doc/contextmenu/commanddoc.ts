import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';
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
        <div class="card flex md:justify-content-center">
            <p-toast />
            <ul class="m-0 p-0 list-none border-1 surface-border border-round p-3 flex flex-column gap-2 w-full md:w-30rem">
                <li
                    *ngFor="let user of users"
                    [class]="[
                        'p-2',
                        'hover:surface-hover',
                        'border-round',
                        'border-1',
                        'border-transparent',
                        'transition-all',
                        'transition-duration-200',
                        'flex',
                        'align-items-center',
                        'justify-content-between',
                        selectedUser?.id === user?.id ? 'border-primary' : ''
                    ]"
                    (contextmenu)="onContextMenu($event, user)"
                >
                    <div class="flex align-items-center gap-2">
                        <img [alt]="user.name" [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + user.image" style="width: 32px" />
                        <span class="font-bold">{{ user.name }}</span>
                    </div>
                    <p-tag [value]="user.role" [severity]="getBadge(user)" />
                </li>
            </ul>

            <p-contextMenu #cm [model]="items" (onHide)="onHide()" />
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
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invitation sent!', life: 3000 });
                }
            }
        ];
    }

    getBadge(user) {
        if (user.role === 'Member') return 'info';
        else if (user.role === 'Guest') return 'warning';
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
<ul class="m-0 p-0 list-none border-1 surface-border border-round p-3 flex flex-column gap-2 w-full md:w-30rem">
    <li
        *ngFor="let user of users"
        [class]="[
            'p-2',
            'hover:surface-hover',
            'border-round',
            'border-1',
            'border-transparent',
            'transition-all',
            'transition-duration-200',
            'flex',
            'align-items-center',
            'justify-content-between',
            selectedUser?.id === user?.id ? 'border-primary' : ''
        ]"
        (contextmenu)="onContextMenu($event, user)">
        <div class="flex align-items-center gap-2">
            <img 
                [alt]="user.name" 
                [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + user.image" 
                style="width: 32px" />
            <span class="font-bold">
                {{ user.name }}
            </span>
        </div>
        <p-tag [value]="user.role" [severity]="getBadge(user)" />
    </li>
</ul>
<p-contextMenu #cm [model]="items" (onHide)="onHide()" />`,

        html: `<div class="card flex justify-content-center">
    <p-toast />
    <ul class="m-0 p-0 list-none border-1 surface-border border-round p-3 flex flex-column gap-2 w-full md:w-30rem">
        <li
            *ngFor="let user of users"
            [class]="[
                'p-2',
                'hover:surface-hover',
                'border-round',
                'border-1',
                'border-transparent',
                'transition-all',
                'transition-duration-200',
                'flex',
                'align-items-center',
                'justify-content-between',
                selectedUser?.id === user?.id ? 'border-primary' : ''
            ]"
            (contextmenu)="onContextMenu($event, user)">
            <div class="flex align-items-center gap-2">
                <img 
                    [alt]="user.name" 
                    [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + user.image" 
                    style="width: 32px" />
                <span class="font-bold">
                    {{ user.name }}
                </span>
            </div>
            <p-tag [value]="user.role" [severity]="getBadge(user)" />
        </li>
    </ul>

    <p-contextMenu #cm [model]="items" (onHide)="onHide()" />
</div>`,

        typescript: `import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

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
    imports: [ContextMenuModule, ToastModule, CommonModule, TagModule],
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
        else if (user.role === 'Guest') return 'warning';
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
