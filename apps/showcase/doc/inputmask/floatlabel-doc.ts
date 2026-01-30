import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'floatlabel-doc',
    standalone: true,
    imports: [FormsModule, RouterModule, InputMaskModule, InputText, FloatLabelModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>FloatLabel visually integrates a label with its form element. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel>
                <input pInputText id="over_label" [(ngModel)]="value1" pInputMask="999-99-9999" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>

            <p-floatlabel variant="in">
                <input pInputText id="in_label" [(ngModel)]="value2" pInputMask="999-99-9999" />
                <label for="in_label">In Label</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <input pInputText id="on_label" [(ngModel)]="value3" pInputMask="999-99-9999" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
        <app-code></app-code>
    `
})
export class FloatlabelDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}
