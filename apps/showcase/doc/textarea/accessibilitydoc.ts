import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'text-area-accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                Textarea component renders a native textarea element that implicitly includes any passed prop. Value to describe the component can either be provided via <i>label</i> tag combined with <i>id</i> prop or using <i>aria-labelledby</i>,
                <i>aria-label</i> props.
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
                </tbody>
            </table>
        </div>
    </div>`
})
export class AccessibilityDoc {
    code: Code = {
        basic: `<label for="address1">Address 1</label>
<textarea pTextarea id="address1"></textarea>

<span id="address2">Address 2</span>
<textarea pTextarea aria-labelledby="address2"></textarea>

<textarea pTextarea aria-label="Address Details"></textarea>`
    };
}
