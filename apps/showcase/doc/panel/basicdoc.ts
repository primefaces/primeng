import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [PanelModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>A simple Panel is created with a <i>header</i> property along with the content as children.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-panel header="Header" [pt]="{ header: myMethod }" toggleable>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-panel>
        </div>
    `
})
export class BasicDoc {
    // TODO: debug root element: [pt]="{ root: myMethod }"

    myMethod(params) {
        const { props, state } = params;
        return {
            class: {
                'COLLAPSE-CHANGE': !params.instance.collapsed()
            },
            style: {
                background: !params.instance.collapsed() ? 'red !important;' : 'blue !important;'
            }
        };
    }
}
