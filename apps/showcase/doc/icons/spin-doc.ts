import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'spin-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper],
    template: `
        <app-docsectiontext>
            <p>Special <i>pi-spin</i> class applies infinite rotation to an icon.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center gap-4">
                <i class="pi pi-spin pi-spinner" style="font-size: 1.75rem"></i>
                <i class="pi pi-spin pi-cog" style="font-size: 1.75rem"></i>
            </div>
            <app-code [code]="code" [hideToggleCode]="true"></app-code>
        </app-demo-wrapper>
    `
})
export class SpinDoc {
    code: Code = {
        html: `<i class="pi pi-spin pi-spinner" style="font-size: 1.75rem"></i>
<i class="pi pi-spin pi-cog" style="font-size: 1.75rem"></i>`
    };
}
