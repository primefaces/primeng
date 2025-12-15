import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'overlayappendto-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Defines the default location of the overlays; <i>self</i> refers to the host element and <i>body</i> targets the document body. Defaults to <i>self</i>.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class OverlayAppendToDoc {
    code: Code = {
        typescript: `providePrimeNG({
    overlayAppendTo: 'body'
})`
    };
}
