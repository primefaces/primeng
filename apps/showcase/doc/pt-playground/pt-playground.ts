// TODO: this doc will be removed later
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [PanelModule, AppDocSectionText, ButtonModule, TabsModule],
    template: `
        <app-docsectiontext>
            <p>A simple Panel is created with a <i>header</i> property along with the content as children.</p>
        </app-docsectiontext>
        <div class="card flex flex-col gap-4">
            <!-- 
            <p-button label="button Label" [pt]="{root: 'ROOTPT'}"/>
        -->

            <p-panel header="PARENT-Header">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p-panel header="SUB-Header" [pt]="{ root: subPanelPT }">
                    <p>this is a sub panel component</p>
                    <p-panel header="NESTED-header" [pt]="{ root: nestedPanelPt }">
                        <p>this is a sub panel component</p>
                    </p-panel>
                </p-panel>
            </p-panel>
        </div>
    `
})
export class PTPlayground {
    subPanelPT(params) {
        // console.log('subpanel', params);

        return {
            root: 'YO'
        };
    }

    nestedPanelPt(params) {
        console.log('nested', params);
        return {
            root: 'yo'
        };
    }
}
