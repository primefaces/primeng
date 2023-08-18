import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'dialog-basic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Dialog is used as a container and visibility is controlled with <i>visible</i> property. Dialogs are <i>draggable</i> and <i>resizable</i> by default.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button (click)="showDialog()" icon="pi pi-external-link" label="Show"></p-button>
            <p-dialog header="Header" [(visible)]="visible" [style]="{ width: '50vw' }">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-dialog>
        </div>
        <app-code [code]="code" selector="dialog-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    code: Code = {
        basic: `
<p-button (click)="showDialog()" icon="pi pi-external-link" label="Show"></p-button>
<p-dialog header="Header" [(visible)]="visible" [style]="{width: '50vw'}">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</p-dialog>`,

        html: `
<div class="card flex justify-content-center">
    <p-button (click)="showDialog()" icon="pi pi-external-link" label="Show"></p-button>
    <p-dialog header="Header" [(visible)]="visible" [style]="{width: '50vw'}">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </p-dialog>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'dialog-basic-demo',
    templateUrl: './dialog-basic-demo.html'
})
export class DialogBasicDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}`
    };
}
