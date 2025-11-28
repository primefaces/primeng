import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Code } from '@/domain/code';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'dialog-doc',
    standalone: true,
    imports: [AppDocSectionText, ButtonModule, DialogModule, InputTextModule, AppCode],
    template: `
        <app-docsectiontext>
            <p>Overlays such as Dialog and Drawer are positioned relative to the viewport and have their own animations.</p>
            <div class="card flex justify-center">
                <p-button (click)="showDialog()" label="Show" />
                <p-dialog header="Edit Profile" [modal]="true" [(visible)]="visible" [style]="{ width: '25rem' }" styleClass="demo-dialog">
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
            <app-code [code]="code" hideToggleCode hideStackBlitz></app-code>
        </app-docsectiontext>
    `,
    styles: [
        `
            .demo-dialog.p-dialog-enter-active {
                animation: demo-dialog-in 500ms ease-out;
            }

            .demo-dialog.p-dialog-leave-active {
                animation: demo-dialog-out 500ms ease-in;
            }

            @keyframes demo-dialog-in {
                from {
                    opacity: 0;
                    transform: translateY(-10%) scale(1.1);
                    filter: blur(10px);
                }
            }

            @keyframes demo-dialog-out {
                to {
                    opacity: 0;
                    transform: translateY(200%) rotate(-90deg);
                }
            }
        `
    ]
})
export class DialogDoc {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    code: Code = {
        scss: `.p-dialog-enter-active {
    animation: demo-dialog-in 500ms ease-out;
}

.p-dialog-leave-active {
    animation: demo-dialog-out 500ms ease-in;
}

@keyframes demo-dialog-in {
    from {
        opacity: 0;
        transform: translateY(-10%) scale(1.1);
        filter: blur(10px);
    }
}

@keyframes demo-dialog-out {
    to {
        opacity: 0;
        transform: translateY(200%) rotate(-90deg);
    }
}`
    };
}
