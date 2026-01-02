import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-group-demo',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ButtonGroupModule, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Multiple buttons are grouped when wrapped inside an element with <i>ButtonGroup</i> component.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-buttongroup>
                <p-button label="Save" icon="pi pi-check" />
                <p-button label="Delete" icon="pi pi-trash" />
                <p-button label="Cancel" icon="pi pi-times" />
            </p-buttongroup>
        </div>
        <app-code selector="button-group-demo"></app-code>
    `
})
export class ButtonGroupDoc {}
