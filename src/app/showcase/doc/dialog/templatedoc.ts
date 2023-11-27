import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'dialog-template-demo',
    template: `
        <app-docsectiontext>
            <p>Dialog can be customized using <i>header</i> and <i>footer</i> templates.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button (click)="showDialog()" icon="pi pi-external-link" label="Show"></p-button>
            <p-dialog header="Header" [(visible)]="visible" [style]="{ width: '50vw' }">
                <ng-template pTemplate="header">
                    <span class="text-xl font-bold">Header Content</span>
                </ng-template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <ng-template pTemplate="footer">
                    <p-button icon="pi pi-check" (click)="visible = false" label="Ok" styleClass="p-button-text"></p-button>
                </ng-template>
            </p-dialog>
        </div>
        <app-code [code]="code" selector="dialog-template-demo"></app-code>
    `
})
export class TemplateDoc {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    code: Code = {
        basic: `<p-button (click)="showDialog()" icon="pi pi-external-link" label="Show"></p-button>
<p-dialog header="Header" [(visible)]="visible" [style]="{ width: '50vw' }">
    <ng-template pTemplate="header">
        <span class="text-xl font-bold">Header Content</span>
    </ng-template>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <ng-template pTemplate="footer">
        <p-button icon="pi pi-check" (click)="visible = false" label="Ok" styleClass="p-button-text"></p-button>
    </ng-template>
</p-dialog>`,

        html: `
<div class="card flex justify-content-center">
    <p-button (click)="showDialog()" icon="pi pi-external-link" label="Show"></p-button>
    <p-dialog header="Header" [(visible)]="visible" [style]="{ width: '50vw' }">
        <ng-template pTemplate="header">
            <span class="text-xl font-bold">Header Content</span>
        </ng-template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <ng-template pTemplate="footer">
            <p-button icon="pi pi-check" (click)="visible = false" label="Ok" styleClass="p-button-text"></p-button>
        </ng-template>
    </p-dialog>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'dialog-template-demo',
    templateUrl: './dialog-template-demo.html'
})
export class DialogTemplateDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}`
    };
}
