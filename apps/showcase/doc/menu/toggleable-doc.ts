import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'toggleable-doc',
    standalone: true,
    imports: [MenuModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Nested submenus are toggleable by default. Use <i>expanded</i> to control the initial state and <i>toggleable</i> to override the default behavior per item.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-menu [model]="items" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ToggleableDoc implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Dashboard', icon: 'pi pi-home' },
            { separator: true },
            {
                label: 'Workspace',
                items: [
                    { label: 'Analytics', icon: 'pi pi-chart-line' },
                    {
                        label: 'Projects',
                        icon: 'pi pi-folder',
                        items: [
                            { label: 'Active Projects', icon: 'pi pi-briefcase' },
                            { label: 'Recent', icon: 'pi pi-clock' },
                            { label: 'Favorites', icon: 'pi pi-star' },
                            { label: 'Completed', icon: 'pi pi-check-circle' }
                        ]
                    }
                ]
            },
            { separator: true },
            { label: 'Help & Support', icon: 'pi pi-question-circle' }
        ];
    }
}
