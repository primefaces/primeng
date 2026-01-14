import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'invalid-doc',
    standalone: true,
    imports: [FormsModule, AppCode, AppDocSectionText, FloatLabelModule, InputTextModule],
    template: `
        <app-docsectiontext>
            <p>When the form element is invalid, the label is also highlighted.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel>
                <input pInputText id="value1" [(ngModel)]="value1" [invalid]="!value1" autocomplete="off" />
                <label for="value1">Username</label>
            </p-floatlabel>

            <p-floatlabel variant="in">
                <input pInputText id="value2" [(ngModel)]="value2" [invalid]="!value2" autocomplete="off" />
                <label for="value2">Username</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <input pInputText id="value3" [(ngModel)]="value3" [invalid]="!value3" autocomplete="off" />
                <label for="value3">Username</label>
            </p-floatlabel>
        </div>
        <app-code></app-code>
    `
})
export class InvalidDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}
