import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'router-doc',
    standalone: true,
    imports: [MegaMenuModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Menu items support navigation via routerLink, programmatic routing using commands, or external URLs.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-megamenu [model]="items" />
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class RouterDoc implements OnInit {
    items: MegaMenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    [
                        {
                            label: 'RouterLink',
                            items: [
                                { label: 'Theming', routerLink: '/theming' },
                                { label: 'UI Kit', routerLink: '/uikit' }
                            ]
                        }
                    ]
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
                    [
                        {
                            label: 'External',
                            items: [
                                { label: 'Angular', url: 'https://angular.dev/' },
                                {
                                    label: 'Vite.js',
                                    url: 'https://vitejs.dev/'
                                }
                            ]
                        }
                    ]
                ]
            }
        ];
    }
}
