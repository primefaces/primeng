import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'color-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCodeModule],
    template: `
        <app-docsectiontext>
            <p>Icon color is defined with the <i>color</i> property which is inherited from parent by default.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <i class="pi pi-check" style="color: slateblue"></i>
            <i class="pi pi-times" style="color: green"></i>
            <i class="pi pi-search" style="color: var(--primary-color)"></i>
            <i class="pi pi-user" style="color: #708090"></i>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class ColorDoc {
    code: Code = {
        basic: `<i class="pi pi-check" style="color: slateblue"></i>
<i class="pi pi-times" style="color: green"></i>
<i class="pi pi-search" style="color: var(--primary-color)"></i>
<i class="pi pi-user" style="color: #708090"></i>`
    };
}
