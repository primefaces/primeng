import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, PanelModule],
    template: `
        <app-docsectiontext>
            <p>
                Each component has a special <i>pt</i> property to define an object with keys corresponding to the available DOM elements. Each value can either be a string, an object or a function that returns a string or an object to define the
                arbitrary properties to apply to the element such as styling, aria, data-* or custom attributes. If the value is a string or a function that returns a string, it is considered as a class definition and added to the class attribute of
                the element. Every component documentation has a dedicated section to document the available section names exposed via PT.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-panel header="Header" toggleable [pt]="pt">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-panel>
        </div>
        <app-code selector="panel-pt-demo" />
    `
})
export class BasicDoc {
    pt = {
        root: '!border !border-primary !rounded-xl p-4',
        header: (options) => ({
            id: 'myPanelHeader',
            style: {
                'user-select': 'none'
            },
            class: ['!text-primary font-bold !p-0']
        }),
        content: { class: 'text-primary-700 dark:text-primary-200 !p-0 mt-2' },
        title: 'text-xl',
        pcToggleButton: {
            icon: {
                class: 'text-primary'
            }
        }
    };
}
