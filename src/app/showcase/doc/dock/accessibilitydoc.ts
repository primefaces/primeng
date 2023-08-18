import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>
                    Dock component uses the <i>menu</i> role with the <i>aria-orientation</i> and the value to describe the menu can either be provided with <i>aria-labelledby</i> or <i>aria-label</i> props. Each list item has a
                    <i>presentation</i> role whereas anchor elements have a <i>menuitem</i> role with <i>aria-label</i> referring to the label of the item and <i>aria-disabled</i> defined if the item is disabled.
                </p>
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
                                <td>Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the next focusable item in the page tab sequence.</td>
                            </tr>
                            <tr>
                                <td><i>shift</i> + <i>tab</i></td>
                                <td>Add focus to the last item if focus moves in to the menu. If the focus is already within the menu, focus moves to the previous focusable item in the page tab sequence.</td>
                            </tr>
                            <tr>
                                <td><i>enter</i></td>
                                <td>Activates the focused menuitem.</td>
                            </tr>
                            <tr>
                                <td><i>space</i></td>
                                <td>Activates the focused menuitem.</td>
                            </tr>
                            <tr>
                                <td><i>down arrow</i></td>
                                <td>Moves focus to the next menuitem in vertical layout.</td>
                            </tr>
                            <tr>
                                <td><i>up arrow</i></td>
                                <td>Moves focus to the previous menuitem in vertical layout.</td>
                            </tr>
                            <tr>
                                <td><i>home</i></td>
                                <td>Moves focus to the first menuitem in horizontal layout.</td>
                            </tr>
                            <tr>
                                <td><i>end</i></td>
                                <td>Moves focus to the last menuitem in horizontal layout.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </app-docsectiontext>
        </div>
    </app-developmentsection>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;
}
