import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>Input OTP uses a set of InputText components, refer to the <a routerLink="/inputtext">InputText</a> component for more information about the screen reader support.</p>
        </app-docsectiontext>

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
                        <td><i>tab</i></td>
                        <td>Moves focus to the input otp.</td>
                    </tr>
                    <tr>
                        <td><i>right arrow</i></td>
                        <td>Moves focus to the next input element.</td>
                    </tr>
                    <tr>
                        <td><i>left arrow</i></td>
                        <td>Moves focus to the previous input element.</td>
                    </tr>
                    <tr>
                        <td><i>backspace</i></td>
                        <td>Deletes the input and moves focus to the previous input element.</td>
                    </tr>
                </tbody>
            </table>
        </div>`
})
export class AccessibilityDoc {
    code: Code = {
        basic: `<label for="date">Date</label>
<p-inputMask inputId="date"></p-inputMask>

<span id="phone">Phone</span>
<p-inputMask ariaLabelledBy="phone"></p-inputMask>

<p-inputMask ariaLabel="Age"></p-inputMask>`
    };
}
