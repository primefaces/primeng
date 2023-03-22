import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'dialog-responsive-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Dialog width can be adjusted per screen size with the <i>breakpoints</i> option where a key defines the max-width for the breakpoint and value for the corresponding width. When no breakpoint matches width defined in
                <i>style</i> property is used.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button (click)="showDialog()" icon="pi pi-external-link" label="Show"></p-button>
            <p-dialog header="Header" [(visible)]="visible" [breakpoints]="{ '960px': '75vw' }" [style]="{ width: '50vw' }" [draggable]="false" [resizable]="false">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-dialog>
        </div>
        <app-code [code]="code" selector="dialog-responsive-demo"></app-code>
    </section>`
})
export class ResponsiveDoc {
    @Input() id: string;

    @Input() title: string;

    visible: boolean;

    showDialog() {
        this.visible = true;
    }

    code: Code = {
        basic: `
<p-button (click)="showDialog()" icon="pi pi-external-link" label="Show"></p-button>
<p-dialog header="Header" [(visible)]="visible" [breakpoints]="{ '960px': '75vw' }" [style]="{ width: '50vw' }" [draggable]="false" [resizable]="false">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</p-dialog>`,

        html: `
<div class="card flex justify-content-center">
    <p-button (click)="showDialog()" icon="pi pi-external-link" label="Show"></p-button>
    <p-dialog header="Header" [(visible)]="visible" [breakpoints]="{ '960px': '75vw' }" [style]="{ width: '50vw' }" [draggable]="false" [resizable]="false">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </p-dialog>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'dialog-responsive-demo',
    templateUrl: './dialog-responsive-demo.html'
})
export class DialogResponsiveDemo {
    visible: boolean;

    showDialog() {
        this.visible = true;
    }
}`
    };
}
