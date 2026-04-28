import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'translation-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>A translation is specified using the translation property during initialization.</p>
            <app-code [code]="code" [hideToggleCode]="true"></app-code>
        </app-docsectiontext>
    `
})
export class TranslationDoc {
    code: Code = {
        typescript: `providePrimeNG({ 
    translation: {
        accept: 'Aceptar',
        reject: 'Rechazar',
        //translations
    }
})`
    };
}
