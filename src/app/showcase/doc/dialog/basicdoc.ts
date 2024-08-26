import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'dialog-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Dialog is used as a container and visibility is controlled with <i>visible</i> property.</p></app-docsectiontext
        >

        <div class="card flex justify-center">
            <p-button (click)="showDialog()" label="Show" />
            <p-dialog header="Edit Profile" [modal]="true" [(visible)]="visible" [style]="{ width: '25rem' }">
                <span class="p-text-secondary block mb-8">Update your information.</span>
                <div class="flex items-center gap-4 mb-4">
                    <label for="username" class="font-semibold w-24">Username</label>
                    <input pInputText id="username" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex items-center gap-4 mb-8">
                    <label for="email" class="font-semibold w-24">Email</label>
                    <input pInputText id="email" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex justify-end gap-2">
                    <p-button label="Cancel" severity="secondary" (click)="visible = false" />
                    <p-button label="Save" (click)="visible = false" />
                </div>
            </p-dialog>
        </div>
        <app-code [code]="code" selector="dialog-basic-demo"></app-code>
    `
})
export class BasicDoc {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    code: Code = {
        basic: `<p-button (click)="showDialog()" label="Show" />
<p-dialog header="Edit Profile" [modal]="true" [(visible)]="visible" [style]="{ width: '25rem' }">
    <span class="p-text-secondary block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Username</label>
        <input pInputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Email</label>
        <input pInputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
        <p-button label="Cancel" severity="secondary" (click)="visible = false" />
        <p-button label="Save" (click)="visible = false" />
    </div>
</p-dialog>`,

        html: `<div class="card flex justify-center">
    <p-button (click)="showDialog()" label="Show" />
    <p-dialog header="Edit Profile" [modal]="true" [(visible)]="visible" [style]="{ width: '25rem' }">
        <span class="p-text-secondary block mb-8">Update your information.</span>
        <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Username</label>
            <input pInputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Email</label>
            <input pInputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
            <p-button label="Cancel" severity="secondary" (click)="visible = false" />
            <p-button label="Save" (click)="visible = false" />
        </div>
    </p-dialog>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'dialog-basic-demo',
    templateUrl: './dialog-basic-demo.html',
    standalone: true,
    imports: [DialogModule, ButtonModule, InputTextModule]
})
export class DialogBasicDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}`
    };
}
