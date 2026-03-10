import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [BlockUIModule, ButtonModule, PanelModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The element to block should be placed as a child of BlockUI and <i>blocked</i> property is required to control the state.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-button label="Block" (click)="blockedPanel = true" class="me-2" severity="secondary" />
            <p-button label="Unblock" (click)="blockedPanel = false" severity="secondary" />
            <p-blockui [target]="pnl" [blocked]="blockedPanel" />
            <p-panel #pnl header="Header" class="mt-5">
                <p class="m-0 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-panel>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {
    blockedPanel: boolean = false;
}
