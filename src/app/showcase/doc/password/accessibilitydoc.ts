import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                Value to describe the component can either be provided via <i>label</i> tag combined with <i>id</i> prop or using <i>ariaLabelledBy</i>, <i>ariaLabel</i> props. Screen reader is notified about the changes to the strength of the
                password using a section that has <i>aria-live</i> while typing.
            </p>
        </app-docsectiontext>

        <app-code [code]="code" [hideToggleCode]="true" [hideCodeSandbox]="true" [hideStackBlitz]="true"></app-code>

        <h3>Keyboard Support</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Function</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <i>tab</i>
                        </td>
                        <td>Moves focus to the input.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>escape</i>
                        </td>
                        <td>Hides the strength meter if open.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class AccessibilityDoc {
    code: Code = {
        basic: `<label for="pwd1">Password</label>
<p-password inputId="pwd1" />

<span id="pwd2">Password</span>
<p-password ariaLabelledBy="pwd2" />

<p-password ariaLabel="Password" />`
    };
}
