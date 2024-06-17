import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                SplitButton component renders two native button elements, main button uses the label property to define <i>aria-label</i> by default which can be customized with <i>buttonProps</i>. Dropdown button requires an explicit definition to
                describe it using <i>menuButtonProps</i> option and also includes <i>aria-haspopup</i>, <i>aria-expanded</i> for states along with <i>aria-controls</i> to define the relation between the popup and the button.
            </p>

            <p>The popup overlay uses <i>menu</i> role on the list and each action item has a <i>menuitem</i> role with an <i>aria-label</i> as the menuitem label. The id of the menu refers to the <i>aria-controls</i> of the dropdown button.</p>
        </app-docsectiontext>

        <app-code [code]="code" [hideToggleCode]="true" [hideStackBlitz]="true" [hideCodeSandbox]="true"></app-code>

        <h3>Main Button Keyboard Support</h3>
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
                            <i>enter</i>
                        </td>
                        <td>Activates the button.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>space</i>
                        </td>
                        <td>Activates the button.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>Menu Button Keyboard Support</h3>
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
                            <i>enter</i>
                        </td>
                        <td>Toggles the visibility of the menu.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>space</i>
                        </td>
                        <td>Toggles the visibility of the menu.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>down arrow</i>
                        </td>
                        <td>Opens the menu and moves focus to the first item.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>up arrow</i>
                        </td>
                        <td>Opens the menu and moves focus to the last item.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>Menu Keyboard Support</h3>
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
                            <i>enter</i>
                        </td>
                        <td>Actives the menuitem, closes the menu and sets focus on the menu button.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>escape</i>
                        </td>
                        <td>Closes the menu and sets focus on the menu button.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>down arrow</i>
                        </td>
                        <td>Moves focus to the next item, if it is the last one then first item receives the focus.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>up arrow</i>
                        </td>
                        <td>Moves focus to the previous item, if it is the first one then last item receives the focus.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>home</i>
                        </td>
                        <td>Moves focus to the first item.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>end</i>
                        </td>
                        <td>Moves focus to the last item.</td>
                    </tr>
                </tbody>
            </table>
        </div>`
})
export class AccessibilityDoc {
    code: Code = {
        basic: `<p-splitButton 
    [buttonProps]="{'aria-label': 'Default Action'}" 
    [menuButtonProps]="{'aria-label': 'More Options'}" />`
    };
}
