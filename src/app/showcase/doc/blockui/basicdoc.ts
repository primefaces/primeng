import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'block-ui-basic-demo',
    template: `
        <app-docsectiontext>
            <p>The element to block should be placed as a child of BlockUI and <i>blocked</i> property is required to control the state.</p>
        </app-docsectiontext>
        <div class="card">
            <p-button label="Block" (onClick)="blockedPanel = true" />
            <p-button label="Unblock" (onClick)="blockedPanel = false" />
            <p-blockUI [target]="pnl" [blocked]="blockedPanel">
                <i class="pi pi-lock" style="font-size: 3rem"></i>
            </p-blockUI>
            <p-panel #pnl header="Header" styleClass="mt-4">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-panel>
        </div>
        <app-code [code]="code" selector="block-ui-basic-demo"></app-code>
    `
})
export class BasicDoc {
    blockedPanel: boolean = false;

    code: Code = {
        basic: `<p-button label="Block" (onClick)="blockedPanel = true" />
<p-button label="Unblock" (onClick)="blockedPanel = false" />
<p-blockUI [target]="pnl" [blocked]="blockedPanel">
    <i class="pi pi-lock" style="font-size: 3rem"></i>
</p-blockUI>
<p-panel #pnl header="Header" styleClass="mt-4">
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
    </p>
</p-panel>`,
        html: `<div class="card">
    <p-button label="Block" (onClick)="blockedPanel = true" />
    <p-button label="Unblock" (onClick)="blockedPanel = false" />
    <p-blockUI [target]="pnl" [blocked]="blockedPanel">
        <i class="pi pi-lock" style="font-size: 3rem"></i>
    </p-blockUI>
    <p-panel #pnl header="Header" styleClass="mt-4">
        <p class="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </p-panel>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'block-ui-basic-demo',
    templateUrl: './block-ui-basic-demo.html',
    standalone: true,
    imports: [BlockUIModule, ButtonModule, PanelModule, RippleModule]
})
export class BlockUiBasicDemo {
    blockedPanel: boolean = false;
}`
    };
}
