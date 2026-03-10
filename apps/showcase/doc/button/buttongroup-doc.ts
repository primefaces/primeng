import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'buttongroup-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, ButtonGroupModule, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Multiple buttons are grouped when wrapped inside an element with <i>ButtonGroup</i> component.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-buttongroup>
                    <p-button label="Save" icon="pi pi-check" />
                    <p-button label="Delete" icon="pi pi-trash" />
                    <p-button label="Cancel" icon="pi pi-times" />
                </p-buttongroup>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ButtonGroupDoc {}
