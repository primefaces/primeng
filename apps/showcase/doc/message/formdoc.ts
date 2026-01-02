import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'form-doc',
    standalone: true,
    imports: [FormsModule, MessageModule, InputTextModule, InputMaskModule, AppCodeModule, AppDocSectionText, CommonModule],
    template: `
        <app-docsectiontext>
            <p>Validation errors in a form are displayed with the <i>error</i> severity.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div class="flex flex-col gap-4">
                <p-message severity="error" icon="pi pi-times-circle" styleClass="mb-2">Validation Failed</p-message>
                <div class="flex flex-col gap-1">
                    <input pInputText placeholder="Username" [(ngModel)]="username" aria-label="username" [invalid]="!username" />
                    @if (!username) {
                        <p-message severity="error" variant="simple" size="small">Username is required</p-message>
                    }
                </div>
                <div class="flex flex-col gap-1">
                    <p-inputmask mask="(999) 999-9999" [(ngModel)]="phone" placeholder="Phone" [invalid]="!phone" />
                    @if (!phone) {
                        <p-message severity="error" variant="simple" size="small">Phone number is required</p-message>
                    }
                </div>
            </div>
        </div>
        <app-code selector="message-form-demo"></app-code>
    `
})
export class FormDoc {
    username: string | undefined;

    phone: string | undefined;
}
