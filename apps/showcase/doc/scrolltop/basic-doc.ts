import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { ScrollTop, ScrollTopModule } from 'primeng/scrolltop';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, ScrollTopModule],
    template: `
        <app-docsectiontext>
            <p>ScrollTop listens window scroll by default.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-col items-center">
                <p class="text-sm">Scroll down the page to display the ScrollTo component.</p>
                <i class="pi pi-angle-down animate-fadeout animate-duration-1000 animate-infinite" style="fontsize: 1.75rem; margin-bottom: 26.25rem"></i>
                <p-scrolltop />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {}
