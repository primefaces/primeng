import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [FormsModule, PasswordModule, DividerModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>3 templates are included to customize the overlay. These are <i>header</i>, <i>content</i> and <i>footer</i>. Note that content overrides the default meter.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-password [(ngModel)]="value" autocomplete="off">
                <ng-template #header>
                    <div class="font-semibold text-xm mb-4">Reset Password</div>
                </ng-template>
                <ng-template #footer>
                    <p-divider />
                    <ul class="pl-2 my-0 leading-normal text-sm">
                        <li>At least one lowercase</li>
                        <li>At least one uppercase</li>
                        <li>At least one numeric</li>
                        <li>Minimum 8 characters</li>
                    </ul>
                </ng-template>
            </p-password>
        </div>
        <app-code></app-code>
    `
})
export class TemplateDoc {
    value!: string;
}
