import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'dialog-template-demo',
    template: `
        <app-docsectiontext>
            <p>Dialog can be customized using <i>header</i> and <i>footer</i> templates.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button (click)="showDialog()" label="Show" />
            <p-dialog header="Header" [(visible)]="visible" [modal]="true" [style]="{ width: '25rem' }">
                <ng-template pTemplate="header">
                    <div class="inline-flex items-center justify-center gap-2">
                        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                        <span class="font-bold whitespace-nowrap">Amy Elsner</span>
                    </div>
                </ng-template>
                <span class="p-text-secondary block mb-8">Update your information.</span>
                <div class="flex items-center gap-4 mb-4">
                    <label for="username" class="font-semibold w-24">Username</label>
                    <input pInputText id="username" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex items-center gap-4 mb-8">
                    <label for="email" class="font-semibold w-24">Email</label>
                    <input pInputText id="email" class="flex-auto" autocomplete="off" />
                </div>
                <ng-template pTemplate="footer">
                    <p-button label="Cancel" [text]="true" severity="secondary" (click)="visible = false" />
                    <p-button label="Save" [outlined]="true" severity="secondary" (click)="visible = false" />
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
        basic: `<p-button (click)="showDialog()" label="Show" />
<p-dialog 
    header="Header" 
    [(visible)]="visible" 
    [modal]="true" 
    [style]="{ width: '25rem' }">
        <ng-template pTemplate="header">
            <div class="inline-flex items-center justify-center gap-2">
                <p-avatar 
                    image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
                    shape="circle" />
                <span class="font-bold whitespace-nowrap">
                    Amy Elsner
                </span>
            </div>
        </ng-template>
        <span class="p-text-secondary block mb-8">Update your information.</span>
        <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">
                Username
            </label>
            <input pInputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Email</label>
            <input pInputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <ng-template pTemplate="footer">
            <p-button 
                label="Cancel" 
                [text]="true" 
                severity="secondary" 
                (click)="visible = false" />
            <p-button 
                label="Save" 
                [outlined]="true" 
                severity="secondary" 
                (click)="visible = false" 
              />
        </ng-template>
</p-dialog>`,

        html: `<div class="card flex justify-center">
    <p-button (click)="showDialog()" label="Show" />
    <p-dialog 
        header="Header" 
        [(visible)]="visible" 
        [modal]="true" 
        [style]="{ width: '25rem' }">
            <ng-template pTemplate="header">
                <div class="inline-flex items-center justify-center gap-2">
                    <p-avatar 
                        image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
                        shape="circle" />
                    <span class="font-bold whitespace-nowrap">
                        Amy Elsner
                    </span>
                </div>
            </ng-template>
            <span class="p-text-secondary block mb-8">Update your information.</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="username" class="font-semibold w-24">
                    Username
                </label>
                <input pInputText id="username" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="email" class="font-semibold w-24">Email</label>
                <input pInputText id="email" class="flex-auto" autocomplete="off" />
            </div>
            <ng-template pTemplate="footer">
                <p-button 
                    label="Cancel" 
                    [text]="true" 
                    severity="secondary" 
                    (click)="visible = false" />
                <p-button 
                    label="Save" 
                    [outlined]="true" 
                    severity="secondary" 
                    (click)="visible = false" 
                  />
            </ng-template>
    </p-dialog>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
        
@Component({
    selector: 'dialog-template-demo',
    templateUrl: './dialog-template-demo.html',
    standalone: true,
    imports: [DialogModule, ButtonModule, InputTextModule, AvatarModule]
})
export class DialogTemplateDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}`
    };
}
