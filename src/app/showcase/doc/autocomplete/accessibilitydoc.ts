import { Component, Input } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                Value to describe the component can either be provided via <i>label</i> tag combined with <i>inputId</i> prop or using <i>ariaLabelledBy</i>, <i>ariaLabel</i> props. The input element has <i>combobox</i> role in addition to
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
                        <td>Moves focus to the input element when popup is not visible. If the popup is open and an item is highlighted then popup gets closed, item gets selected and focus moves to the next focusable element.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>up arrow</i>
                        </td>
                        <td>Highlights the previous item if popup is visible.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>down arrow</i>
                        </td>
                        <td>Highlights the next item if popup is visible.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>enter</i>
                        </td>
                        <td>Selects the highlighted item and closes the popup if popup is visible.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>home</i>
                        </td>
                        <td>Highlights the first item if popup is visible.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>end</i>
                        </td>
                        <td>Highlights the last item if popup is visible.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>escape</i>
                        </td>
                        <td>Hides the popup.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>Chips Input Keyboard Support</h3>
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
                            <i>backspace</i>
                        </td>
                        <td>Deletes the previous chip if the input field is empty.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>left arrow</i>
                        </td>
                        <td>Moves focus to the previous chip if available and input field is empty.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>Chip Keyboard Support</h3>
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
                            <i>left arrow</i>
                        </td>
                        <td>Moves focus to the previous chip if available.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>right arrow</i>
                        </td>
                        <td>Moves focus to the next chip, if there is none then input field receives the focus.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>backspace</i>
                        </td>
                        <td>Deletes the chips and adds focus to the input field.</td>
                    </tr>
                </tbody>
            </table>
        </div>`
})
export class AccessibilityDoc {
    code: Code = {
        basic: `<label for="ac1">Username</label>
<p-autoComplete inputId="ac1"/>

<span id="ac2">Email</span>
<p-autoComplete ariaLabelledBy="ac2"/>

<p-autoComplete ariaLabel="City"/>`
    };
}
