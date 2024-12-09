import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'translation-doc',
    standalone: false,
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
