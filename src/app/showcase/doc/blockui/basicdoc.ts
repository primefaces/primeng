import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'block-ui-basic-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>The element to block should be placed as a child of BlockUI and <i>blocked</i> property is required to control the state.</p>
        </app-docsectiontext>
        <div class="card">
            <button type="button" pButton pRipple label="Block" (click)="blockedPanel = true"></button>
            <button type="button" pButton pRipple label="Unblock" (click)="blockedPanel = false"></button>
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
    </section>`
})
export class BasicDoc {
    blockedPanel: boolean = false;

    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<button type="button" pButton pRipple label="Block" (click)="blockedPanel = true"></button>
<button type="button" pButton pRipple label="Unblock" (click)="blockedPanel = false"></button>
<p-blockUI [target]="pnl" [blocked]="blockedPanel">
    <i class="pi pi-lock" style="font-size: 3rem"></i>
</p-blockUI>
<p-panel #pnl header="Header" styleClass="mt-4">
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</p-panel>`,
        html: `
<div class="card">
    <button type="button" pButton pRipple label="Block" (click)="blockedPanel=true"></button>
    <button type="button" pButton pRipple label="Unblock" (click)="blockedPanel=false"></button>
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
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'block-ui-basic-demo',
    templateUrl: './block-ui-basic-demo.html'
})
export class BlockUiBasicDemo {
    blockedPanel: boolean = false;
}`
    };
}
