import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'dialog-position-demo',
    template: `
        <app-docsectiontext>
            <p>The <i>position</i> property is used to display a Dialog at all edges and corners of the screen.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap justify-center gap-2 mb-2">
                <p-button (click)="showDialog('left')" icon="pi pi-arrow-right" label="Left" severity="secondary" styleClass="min-w-40"/>
                <p-button (click)="showDialog('right')" icon="pi pi-arrow-left" label="Right" severity="secondary" styleClass="min-w-40"/>
            </div>
            <div class="flex flex-wrap justify-center gap-2 mb-2">
                <p-button (click)="showDialog('topleft')" icon="pi pi-arrow-down-right" label="TopLeft" severity="secondary" styleClass="min-w-40"/>
                <p-button (click)="showDialog('top')" icon="pi pi-arrow-down" label="Top" severity="secondary" styleClass="min-w-40"/>
                <p-button (click)="showDialog('topright')" icon="pi pi-arrow-down-left" label="TopRight" severity="secondary" styleClass="min-w-40"/>
            </div>
            <div class="flex flex-wrap justify-center gap-2">
                <p-button (click)="showDialog('bottomleft')" icon="pi pi-arrow-up-right" label="BottomLeft" severity="secondary" styleClass="min-w-40"/>
                <p-button (click)="showDialog('bottom')" icon="pi pi-arrow-up" label="Bottom" severity="secondary" styleClass="min-w-40"/>
                <p-button (click)="showDialog('bottomright')" icon="pi pi-arrow-up-left" label="BottomRight" severity="secondary" styleClass="min-w-40"/>
            </div>
            <p-dialog header="Edit Profile" [modal]="true" [(visible)]="visible" [position]="position" [style]="{ width: '25rem' }">
                <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
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
        basic: `<div class="flex flex-wrap justify-center gap-2 mb-2">
    <p-button 
        (click)="showDialog('left')" 
        icon="pi pi-arrow-right" 
        label="Left" 
        severity="secondary" 
        styleClass="min-w-40"/>
    <p-button 
        (click)="showDialog('right')" 
        icon="pi pi-arrow-left" 
        label="Right" 
        severity="secondary" 
        styleClass="min-w-40"/>
</div>
<div class="flex flex-wrap justify-center gap-2 mb-2">
    <p-button 
        (click)="showDialog('topleft')" 
        icon="pi pi-arrow-down-right" 
        label="TopLeft" 
        severity="secondary" 
        styleClass="min-w-40"/>
    <p-button 
        (click)="showDialog('top')" 
        icon="pi pi-arrow-down" 
        label="Top" 
        severity="secondary" 
        styleClass="min-w-40"/>
    <p-button 
        (click)="showDialog('topright')" 
        icon="pi pi-arrow-down-left" 
        label="TopRight" 
        severity="secondary" 
        styleClass="min-w-40"/>
</div>
<div class="flex flex-wrap justify-center gap-2">
    <p-button 
        (click)="showDialog('bottomleft')" 
        icon="pi pi-arrow-up-right" 
        label="BottomLeft" 
        severity="secondary" 
        styleClass="min-w-40"/>
    <p-button 
        (click)="showDialog('bottom')" 
        icon="pi pi-arrow-up" 
        label="Bottom" 
        severity="secondary" 
        styleClass="min-w-40"/>
    <p-button 
        (click)="showDialog('bottomright')" 
        icon="pi pi-arrow-up-left" 
        label="BottomRight" 
        severity="secondary" 
        styleClass="min-w-40"/>
</div>
<p-dialog header="Edit Profile" [modal]="true" [(visible)]="visible" [position]="position" [style]="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
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

        html: `<div class="card">
    <div class="flex flex-wrap justify-center gap-2 mb-2">
        <p-button 
            (click)="showDialog('left')" 
            icon="pi pi-arrow-right" 
            label="Left" 
            severity="secondary" 
            styleClass="min-w-40"/>
        <p-button 
            (click)="showDialog('right')" 
            icon="pi pi-arrow-left" 
            label="Right" 
            severity="secondary" 
            styleClass="min-w-40"/>
    </div>
    <div class="flex flex-wrap justify-center gap-2 mb-2">
        <p-button 
            (click)="showDialog('topleft')" 
            icon="pi pi-arrow-down-right" 
            label="TopLeft" 
            severity="secondary" 
            styleClass="min-w-40"/>
        <p-button 
            (click)="showDialog('top')" 
            icon="pi pi-arrow-down" 
            label="Top" 
            severity="secondary" 
            styleClass="min-w-40"/>
        <p-button 
            (click)="showDialog('topright')" 
            icon="pi pi-arrow-down-left" 
            label="TopRight" 
            severity="secondary" 
            styleClass="min-w-40"/>
    </div>
    <div class="flex flex-wrap justify-center gap-2">
        <p-button 
            (click)="showDialog('bottomleft')" 
            icon="pi pi-arrow-up-right" 
            label="BottomLeft" 
            severity="secondary" 
            styleClass="min-w-40"/>
        <p-button 
            (click)="showDialog('bottom')" 
            icon="pi pi-arrow-up" 
            label="Bottom" 
            severity="secondary" 
            styleClass="min-w-40"/>
        <p-button 
            (click)="showDialog('bottomright')" 
            icon="pi pi-arrow-up-left" 
            label="BottomRight" 
            severity="secondary" 
            styleClass="min-w-40"/>
    </div>
    <p-dialog header="Edit Profile" [modal]="true" [(visible)]="visible" [position]="position" [style]="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
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
