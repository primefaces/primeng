import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'reversed-keys-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Following keys are reserved in the preset scheme and cannot be used as a token name; <i>primitive</i>, <i>semantic</i>, <i>components</i>, <i>directives</i>, <i>colorscheme</i>, <i>light</i>, <i>dark</i>, <i>common</i>, <i>root</i>,
                <i>states</i> and <i>extend</i>.
            </p>
        </app-docsectiontext>
    `
})
export class ReversedKeysDoc {}
