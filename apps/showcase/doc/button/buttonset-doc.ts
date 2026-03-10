import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'buttonset-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Multiple buttons are grouped when wrapped inside an element with <i>p-buttonset</i> class.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <span class="p-buttonset">
                    <button pButton pRipple label="Save" icon="pi pi-check"></button>
                    <button pButton pRipple label="Delete" icon="pi pi-trash"></button>
                    <button pButton pRipple label="Cancel" icon="pi pi-times"></button>
                </span>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ButtonsetDoc {}
