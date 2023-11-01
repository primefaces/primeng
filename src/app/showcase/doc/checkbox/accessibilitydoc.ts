import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'accessibility-doc',
    template: `
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>
                    Checkbox component uses a hidden native checkbox element internally that is only visible to screen readers. Value to describe the component can either be provided via <i>label</i> tag combined with <i>inputId</i> prop or using
                    <i>ariaLabelledBy</i>, <i>ariaLabel</i> props.
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
                            <td>Moves focus to the checkbox.</td>
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
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `<label for="chkbox1">Remember Me</label>
<p-checkbox inputId="chkbox1"></p-checkbox>

<span id="chkbox2">Remember Me</span>
<p-checkbox ariaLabelledBy="chkbox2"></p-checkbox>

<p-checkbox ariaLabel="Remember Me"></p-checkbox>`
    };
}
