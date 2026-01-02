import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'invalid-doc',
    standalone: true,
    imports: [FormsModule, PasswordModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-4">
            <p-password [(ngModel)]="value1" [invalid]="!value1" placeholder="Password" />
            <p-password [(ngModel)]="value2" [invalid]="!value2" variant="filled" placeholder="Password" />
        </div>
        <app-code selector="password-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value1!: string;

    value2!: string;
}
