import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'navigation-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Navigation is specified using url property for external links and with <i>routerLink</i> for internal ones. If a menuitem has an active route, <i>p-menuitem-link-active</i> style class is added as an indicator. Active route link can
                be configured with <i>routerLinkActiveOptions</i> property of MenuItem API.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-menu [model]="items"></p-menu>
        </div>
        <app-code [code]="code" selector="menu-navigation-demo"></app-code>
    </section>`
})
export class NavigationDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                items: [
                    { label: 'New', icon: 'pi pi-plus', url: 'https://primeng.org' },
                    { label: 'Open', icon: 'pi pi-download', routerLink: ['/menu'] },
                    { label: 'Recent Files', icon: 'pi pi-download', routerLink: ['/pagename'], queryParams: { recent: 'true' } }
                ]
            }
        ];
    }

    code: Code = {
        basic: `
<p-menu [model]="items"></p-menu>`,

        html: `
<div class="card flex justify-content-center">
    <p-menu [model]="items"></p-menu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'menu-navigation-demo',
    templateUrl: './menu-navigation-demo.html'
})
export class MenuNavigationDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}
    
    ngOnInit() {
        this.items = [{
            label: 'File',
            items: [
                {label: 'New', icon: 'pi pi-plus', url: 'https://primeng.org'},
                {label: 'Open', icon: 'pi pi-download', routerLink: ['/menu']},
                {label: 'Recent Files', icon: 'pi pi-download', routerLink: ['/pagename'], queryParams: {'recent': 'true'}}
            ]
        }];
    }
}`
    };
}
