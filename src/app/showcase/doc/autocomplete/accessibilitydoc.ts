import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>
                    Value to describe the component can either be provided via <i>label</i> tag combined with <i>inputId</i> prop or using <i>aria-labelledby</i>, <i>aria-label</i> props. The input element has <i>combobox</i> role in addition to
                    <i>aria-autocomplete</i>, <i>aria-haspopup</i> and <i>aria-expanded</i> attributes. The relation between the input and the popup is created with <i>aria-controls</i> and <i>aria-activedescendant</i> attribute is used to instruct
                    screen reader which option to read during keyboard navigation within the popup list.
                </p>
                <p>In multiple mode, chip list uses <i>listbox</i> role whereas each chip has the <i>option</i> role with <i>aria-label</i> set to the label of the chip.</p>
                <p>
                    The popup list has an id that refers to the <i>aria-controls</i> attribute of the input element and uses <i>listbox</i> as the role. Each list item has <i>option</i> role and an id to match the <i>aria-activedescendant</i> of the
                    input element.
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
                            <td>Moves focus to the next the focusable element in the page tab sequence.</td>
                        </tr>
                        <tr>
                            <td><i>shift</i> + <i>tab</i></td>
                            <td>Moves focus to the previous the focusable element in the page tab sequence.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>enter</i>
                            </td>
                            <td>Toggles the visibility of the content.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>space</i>
                            </td>
                            <td>Toggles the visibility of the content.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>down arrow</i>
                            </td>
                            <td>Moves focus to the next header.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>up arrow</i>
                            </td>
                            <td>Moves focus to the previous header.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>home</i>
                            </td>
                            <td>Moves focus to the first header.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>end</i>
                            </td>
                            <td>Moves focus to the last header.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </app-developmentsection>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<label for="ac1">Username</label>
<p-autoComplete inputId="ac1"></p-autoComplete>

<span id="ac2">Email</span>
<p-autoComplete aria-labelledby="ac2"></p-autoComplete>

<p-autoComplete aria-label="City"></p-autoComplete>`
    };
}
