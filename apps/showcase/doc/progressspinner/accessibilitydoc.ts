import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'progress-spinner-accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>ProgressSpinner components uses <i>progressbar</i> role. Value to describe the component can be defined using <i>aria-labelledby</i> and <i>aria-label</i> props.</p>
        </app-docsectiontext>

        <app-code [code]="code" [hideToggleCode]="true"></app-code>

        <h3>Keyboard Support</h3>
        <p>Component does not include any interactive elements.</p>
    </div>`
})
export class AccessibilityDoc {
    code: Code = {
        html: `<p-progress-spinner aria-label="Loading"></p-progress-spinner>`
    };
}
