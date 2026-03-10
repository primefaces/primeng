import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'size-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper],
    template: `
        <app-docsectiontext>
            <p>Size of an icon is controlled with the font-size property of the element.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center items-center gap-4">
                <i class="pi pi-check" style="font-size: 0.875rem"></i>
                <i class="pi pi-times" style="font-size: 1.313rem"></i>
                <i class="pi pi-search" style="font-size: 1.75rem"></i>
                <i class="pi pi-user" style="font-size: 2.188rem"></i>
            </div>
            <app-code [code]="code" [hideToggleCode]="true"></app-code>
        </app-demo-wrapper>
    `
})
export class SizeDoc {
    code: Code = {
        html: `<i class="pi pi-check" style="font-size: 0.875rem"></i>
<i class="pi pi-times" style="font-size: 1.313rem"></i>
<i class="pi pi-search" style="font-size: 1.75rem"></i>
<i class="pi pi-user" style="font-size: 2.188rem"></i>`
    };
}
