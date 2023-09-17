import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'custom-content-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Label of a menuitem both supports simple strings and html values as well. By default, html values are escaped, use <i>escape</i> property to allow html.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-menu [model]="items"></p-menu>
        </div>
        <app-code [code]="code" selector="menu-custom-content-demo"></app-code>
    </section>`
})
export class CustomContentDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Options',
                items: [
                    {
                        label: '<span class="text-xl font-bold">Refresh</span>',
                        escape: false,
                        icon: 'pi pi-refresh',
                        iconClass: 'text-xl'
                    },
                    {
                        label: '<span class="text-xl font-bold">Delete</span>',
                        escape: false,
                        icon: 'pi pi-times',
                        iconClass: 'text-xl'
                    }
                ]
            },
            {
                label: 'Navigate',
                items: [
                    {
                        label: 'Angular',
                        icon: 'pi pi-external-link',
                        url: 'http://angular.io'
                    },
                    {
                        label: 'Router',
                        icon: 'pi pi-upload',
                        routerLink: '/fileupload'
                    }
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
    selector: 'menu-custom-content-demo',
    templateUrl: './menu-custom-content-demo.html'
})
export class MenuCustomContentDemo implements OnInit {
    items: MenuItem[] | undefined;
    
    ngOnInit() {
        this.items = [
            {
                label: 'Options',
                items: [
                    {
                        label: '<span class="text-xl font-bold">Refresh</span>',
                        escape: false,
                        icon: 'pi pi-refresh',
                        iconClass: 'text-xl'
                    },
                    {
                        label: '<span class="text-xl font-bold">Delete</span>',
                        escape: false,
                        icon: 'pi pi-times',
                        iconClass: 'text-xl'
                    }
                ]
            },
            {
                label: 'Navigate',
                items: [
                    {
                        label: 'Angular',
                        icon: 'pi pi-external-link',
                        url: 'http://angular.io'
                    },
                    {
                        label: 'Router',
                        icon: 'pi pi-upload',
                        routerLink: '/fileupload'
                    }
                ]
            }
        ];
    }
}`
    };
}
