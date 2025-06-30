import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'router-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Menu items support navigation via routerLink, programmatic routing using commands, or external URLs.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-panelmenu [model]="items" class="w-full md:w-80" />
        </div>
        <app-code [code]="code" selector="panel-menu-router-demo"></app-code>
    `,
    providers: [MessageService]
})
export class RouterDoc implements OnInit {
    items: MenuItem[];

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Installation',
                        icon: 'pi pi-eraser',
                        routerLink: '/installation'
                    },
                    {
                        label: 'Configuration',
                        icon: 'pi pi-heart',
                        routerLink: '/configuration'
                    }
                ]
            },
            {
                label: 'Programmatic',
                icon: 'pi pi-link',
                command: () => {
                    this.router.navigate(['/installation']);
                }
            },
            {
                label: 'External',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    }
                ]
            }
        ];
    }

    code: Code = {
        basic: `<p-panelmenu [model]="items" class="w-full md:w-80" />`,

        html: `<div class="card flex justify-center">
    <p-panelmenu [model]="items" class="w-full md:w-80" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { Router } from '@angular/router';

@Component({
    selector: 'panel-menu-router-demo',
    templateUrl: './panel-menu-router-demo.html',
    standalone: true,
    imports: [PanelMenu],
    providers: [MessageService]
})
export class PanelMenuRouterDemo implements OnInit {
    items: MenuItem[];

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Installation',
                        icon: 'pi pi-eraser',
                        routerLink: '/installation'
                    },
                    {
                        label: 'Configuration',
                        icon: 'pi pi-heart',
                        routerLink: '/configuration'
                    }
                ]
            },
            {
                label: 'Programmatic',
                icon: 'pi pi-link',
                command: () => {
                    this.router.navigate(['/installation']);
                }
            },
            {
                label: 'External',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Angular',
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
                        url: 'https://vitejs.dev/'
                    }
                ]
            }
        ];
    }
}`
    };
}
