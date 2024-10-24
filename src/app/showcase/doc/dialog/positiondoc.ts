import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'dialog-position-demo',
    template: `
        <app-docsectiontext>
            <p>The <i>position</i> property is used to display a Dialog at all edges and corners of the screen.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center gap-2">
            <div class="flex flex-wrap gap-2">
                <p-button (onClick)="showDialog('start')" icon="pi pi-arrow-end" label="Start" severity="secondary" />
                <p-button (onClick)="showDialog('end')" icon="pi pi-arrow-start" label="End" severity="secondary" />
            </div>
            <div class="flex flex-wrap gap-2">
                <p-button (onClick)="showDialog('top-start')" icon="pi pi-arrow-end-end" label="TopStart" severity="secondary" />
                <p-button (onClick)="showDialog('top')" icon="pi pi-arrow-down" label="Top" severity="secondary" />
                <p-button (onClick)="showDialog('top-end')" icon="pi pi-arrow-end-start" label="TopEnd" severity="secondary" />
            </div>
            <div class="flex flex-wrap gap-2">
                <p-button (onClick)="showDialog('bottom-start')" icon="pi pi-arrow-start-end" label="BottomStart" severity="secondary" />
                <p-button (onClick)="showDialog('bottom')" icon="pi pi-arrow-up" label="Bottom" severity="secondary" />
                <p-button (onClick)="showDialog('bottom-end')" icon="pi pi-arrow-start-start" label="BottomEnd" severity="secondary" />
            </div>
            <p-dialog header="Edit Profile" [modal]="true" [(visible)]="visible" [position]="position" [style]="{ width: '25rem' }">
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
                    <p-button label="Cancel" severity="secondary" (onClick)="visible = false" />
                    <p-button label="Save" (onClick)="visible = false" />
                </div>
            </p-dialog>
        </div>
        <app-code [code]="code" selector="dialog-position-demo"></app-code>
    `
})
export class PositionDoc {
    visible: boolean = false;

    position: string = 'center';

    showDialog(position: string) {
        this.position = position;
        this.visible = true;
    }

    code: Code = {
        basic: `<div class="flex flex-wrap gap-2">
    <p-button
        (onClick)="showDialog('start')"
        icon="pi pi-arrow-end"
        label="Start"
        severity="secondary" />
    <p-button
        (onClick)="showDialog('end')"
        icon="pi pi-arrow-start"
        label="End"
        severity="secondary" />
</div>
<div class="flex flex-wrap gap-2">
    <p-button
        (onClick)="showDialog('top-start')"
        icon="pi pi-arrow-end-end"
        label="TopStart"
        severity="secondary" />
    <p-button
        (onClick)="showDialog('top')"
        icon="pi pi-arrow-down"
        label="Top"
        severity="secondary" />
    <p-button
        (onClick)="showDialog('top-end')"
        icon="pi pi-arrow-end-start"
        label="TopEnd"
        severity="secondary" />
</div>
<div class="flex flex-wrap gap-2">
    <p-button
        (onClick)="showDialog('bottom-start')"
        icon="pi pi-arrow-start-end"
        label="BottomStart"
        severity="secondary" />
    <p-button
        (onClick)="showDialog('bottom')"
        icon="pi pi-arrow-up"
        label="Bottom"
        severity="secondary" />
    <p-button
        (onClick)="showDialog('bottom-end')"
        icon="pi pi-arrow-start-start"
        label="BottomEnd"
        severity="secondary" />
</div>
<p-dialog
    header="Edit Profile"
    [modal]="true"
    [(visible)]="visible"
    [position]="position"
    [style]="{ width: '25rem' }">
        <span class="p-text-secondary block mb-5">
            Update your information.
        </span>
        <div class="flex align-items-center gap-3 mb-3">
            <label for="username" class="font-semibold w-6rem">
                Username
            </label>
            <input pInputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="email" class="font-semibold w-6rem">
                Email
            </label>
            <input pInputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-content-end gap-2">
            <p-button label="Cancel" severity="secondary" (onClick)="visible = false" />
            <p-button label="Save" (onClick)="visible = false" />
        </div>
</p-dialog>`,

        html: `<div class="card flex flex-column align-items-center gap-2">
    <div class="flex flex-wrap gap-2">
        <p-button
            (onClick)="showDialog('start')"
            icon="pi pi-arrow-end"
            label="Start"
            severity="secondary" />
        <p-button
            (onClick)="showDialog('end')"
            icon="pi pi-arrow-start"
            label="End"
            severity="secondary" />
    </div>
    <div class="flex flex-wrap gap-2">
        <p-button
            (onClick)="showDialog('top-start')"
            icon="pi pi-arrow-end-end"
            label="TopStart"
            severity="secondary" />
        <p-button
            (onClick)="showDialog('top')"
            icon="pi pi-arrow-down"
            label="Top"
            severity="secondary" />
        <p-button
            (onClick)="showDialog('top-end')"
            icon="pi pi-arrow-end-start"
            label="TopEnd"
            severity="secondary" />
    </div>
    <div class="flex flex-wrap gap-2">
        <p-button
            (onClick)="showDialog('bottom-start')"
            icon="pi pi-arrow-start-end"
            label="BottomStart"
            severity="secondary" />
        <p-button
            (onClick)="showDialog('bottom')"
            icon="pi pi-arrow-up"
            label="Bottom"
            severity="secondary" />
        <p-button
            (onClick)="showDialog('bottom-end')"
            icon="pi pi-arrow-start-start"
            label="BottomEnd"
            severity="secondary" />
    </div>
    <p-dialog
        header="Edit Profile"
        [modal]="true"
        [(visible)]="visible"
        [position]="position"
        [style]="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5">
                Update your information.
            </span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="username" class="font-semibold w-6rem">
                    Username
                </label>
                <input pInputText id="username" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label for="email" class="font-semibold w-6rem">
                    Email
                </label>
                <input pInputText id="email" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-content-end gap-2">
                <p-button label="Cancel" severity="secondary" (onClick)="visible = false" />
                <p-button label="Save" (onClick)="visible = false" />
            </div>
    </p-dialog>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DialogModule } from 'primengrtl/dialog';
import { ButtonModule } from 'primengrtl/button';
import { InputTextModule } from 'primengrtl/inputtext';

@Component({
    selector: 'dialog-position-demo',
    templateUrl: './dialog-position-demo.html',
    standalone: true,
    imports: [DialogModule, ButtonModule, InputTextModule]
})
export class DialogPositionDemo {
    visible: boolean = false;

    position: string = 'center';

    showDialog(position: string) {
        this.position = position;
        this.visible = true;
    }
}`
    };
}
