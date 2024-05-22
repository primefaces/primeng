import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'dialog-without-modal-demo',
    template: `
        <app-docsectiontext>
            <p>Mask layer behind the Dialog is configured with the <i>modal</i> property. By default, no modal layer is added.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button (click)="showDialog()" label="Show" />
            <p-dialog header="Edit Profile" [(visible)]="visible" [style]="{ width: '25rem' }">
                <span class="p-text-secondary block mb-5">Update your information.</span>
                <div class="flex align-items-center gap-3 mb-3">
                    <label for="username" class="font-semibold w-6rem">Username</label>
                    <input pInputText id="username" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex align-items-center gap-3 mb-5">
                    <label for="email" class="font-semibold w-6rem">Email</label>
                    <input pInputText id="email" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex justify-content-end gap-2">
                    <p-button label="Cancel" severity="secondary" (click)="visible = false" />
                    <p-button label="Save" (click)="visible = false" />
                </div>
            </p-dialog>
        </div>
        <app-code [code]="code" selector="dialog-without-modal-demo"></app-code>
    `
})
export class WithoutModalDoc {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    code: Code = {
        basic: `<p-button (click)="showDialog()" label="Show" />
<p-dialog header="Edit Profile" [(visible)]="visible" [style]="{ width: '25rem' }">
    <span class="p-text-secondary block mb-5">Update your information.</span>
    <div class="flex align-items-center gap-3 mb-3">
        <label for="username" class="font-semibold w-6rem">Username</label>
        <input pInputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Email</label>
        <input pInputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-content-end gap-2">
        <p-button label="Cancel" severity="secondary" (click)="visible = false" />
        <p-button label="Save" (click)="visible = false" />
    </div>
</p-dialog>`,

        html: `<div class="card flex justify-content-center">
    <p-button (click)="showDialog()" label="Show" />
    <p-dialog header="Edit Profile" [(visible)]="visible" [style]="{ width: '25rem' }">
        <span class="p-text-secondary block mb-5">Update your information.</span>
        <div class="flex align-items-center gap-3 mb-3">
            <label for="username" class="font-semibold w-6rem">Username</label>
            <input pInputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="email" class="font-semibold w-6rem">Email</label>
            <input pInputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-content-end gap-2">
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
    selector: 'dialog-without-modal-demo',
    templateUrl: './dialog-without-modal-demo.html',
    standalone: true,
    imports: [DialogModule, ButtonModule, InputTextModule]
})
export class DialogWithoutModalDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}`
    };
}
