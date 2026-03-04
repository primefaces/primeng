import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { ScrollTop, ScrollTopModule } from 'primeng/scrolltop';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, ScrollTopModule],
    template: `
        <app-docsectiontext>
            <p>ScrollTop listens window scroll by default.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center">
            <p class="text-sm">Scroll down the page to display the ScrollTo component.</p>
            <i class="pi pi-angle-down animate-fadeout animate-duration-1000 animate-infinite" style="fontsize: 1.75rem; margin-bottom: 26.25rem"></i>
            <p-scrolltop />
        </div>
        <app-code></app-code>
    `
})
export class BasicDoc {}
