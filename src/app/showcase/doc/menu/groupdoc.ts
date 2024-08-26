import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'menu-group-demo',
    template: `
        <app-docsectiontext>
            <p>Menu supports one level of nesting by defining children with <i>items</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-menu [model]="items" />
        </div>
        <app-code [code]="code" selector="menu-group-demo"></app-code>
    `,
    providers: [MessageService]
})
export class GroupDoc implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Documents',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-search'
                    }
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out'
                    }
                ]
            }
        ];
    }

    code: Code = {
        basic: `<p-menu [model]="items" />`,

        html: `<div class="card flex justify-center">
    <p-menu [model]="items" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
        
@Component({
    selector: 'menu-group-demo',
    templateUrl: './menu-group-demo.html',
    standalone: true,
    imports: [MenuModule, ToastModule]
})
export class MenuGroupDemo implements OnInit {
    items: MenuItem[] | undefined;
    
    ngOnInit() {
        this.items = [
            {
                label: 'Documents',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-search'
                    }
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out'
                    }
                ]
            }
        ];
    }

}`
    };
}
