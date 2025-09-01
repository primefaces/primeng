import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'floatvariant-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Float labels for input fields come in three styles, (<i>over</i>, <i>on</i>, and <i>in</i>). The name of each option specifies where the label element will float relative to its input's top border. The default is <i>over</i>.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class FloatVariantDoc {
    code: Code = {
        typescript: `providePrimeNG({
    floatVariant: 'over' 
})`
    };
}
