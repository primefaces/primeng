import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                ToggleButton component uses an element with <i>button</i> role and updates <i>aria-pressed</i> state for screen readers. Value to describe the component can be defined with <i>ariaLabelledBy</i> or <i>ariaLabel</i> props, it is highly
                suggested to use either of these props as the component changes the label displayed which will result in screen readers to read different labels when the component receives focus. To prevent this, always provide an aria label that
                does not change related to state.
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
                        <td>Moves focus to the button.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>space</i>
                        </td>
                        <td>Toggles the checked state.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class AccessibilityDoc {
    code: Code = {
        basic: `<span id="rememberme">Remember Me</span>
<p-toggleButton ariaLabelledBy="rememberme" />

<p-toggleButton ariaLabel="Remember Me" />`
    };
}
