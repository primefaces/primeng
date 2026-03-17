import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'float-label-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, RouterModule, FormsModule, FloatLabelModule, IconFieldModule, InputIconModule, InputTextModule],
    template: `
        <app-docsectiontext>
            <p>FloatLabel visually integrates a label with its form element. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap justify-center items-end gap-4">
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
        </app-demo-wrapper>
    `
})
export class FloatLabelDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}
