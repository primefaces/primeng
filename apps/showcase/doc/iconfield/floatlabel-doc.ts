import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'floatlabel-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCodeModule, RouterModule, FormsModule, FloatLabelModule, IconFieldModule, InputIconModule, InputTextModule],
    template: `
        <app-docsectiontext>
            <p>FloatLabel visually integrates a label with its form element. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel>
                <p-iconfield>
                    <p-inputicon class="pi pi-search" />
                    <input pInputText id="over_label" [(ngModel)]="value1" autocomplete="off" />
                </p-iconfield>
                <label for="over_label">Over Label</label>
            </p-floatlabel>

            <p-floatlabel variant="in">
                <p-iconfield>
                    <p-inputicon class="pi pi-search" />
                    <input pInputText id="in_label" [(ngModel)]="value2" autocomplete="off" />
                </p-iconfield>
                <label for="in_label">In Label</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <p-iconfield>
                    <p-inputicon class="pi pi-search" />
                    <input pInputText id="on_label" [(ngModel)]="value3" autocomplete="off" />
                </p-iconfield>
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
        <app-code></app-code>
    `
})
export class FloatLabelDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}
