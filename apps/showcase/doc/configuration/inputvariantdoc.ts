import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'inputvariant-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                Input fields come in two styles, default is <i>outlined</i> with borders around the field whereas <i>filled</i> alternative adds a background color to the field. A theme such as Material may add more additional design changes per each
                variant.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class InputVariantDoc {
    code: Code = {
        typescript: `providePrimeNG({
    inputVariant: 'filled' 
})`
    };
}
