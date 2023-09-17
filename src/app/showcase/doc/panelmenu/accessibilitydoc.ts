import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <h3>Screen Reader</h3>
            <p>
                Accordion header elements have a <i>button</i> role, an <i>aria-label</i> defined using the <i>label</i> property of the menuitem model and <i>aria-controls</i> to define the id of the content section along with
                <i>aria-expanded</i> for the visibility state.
            </p>
            <p>The content of an accordion panel uses <i>region</i> role, defines an id that matches the <i>aria-controls</i> of the header and <i>aria-labelledby</i> referring to the id of the header.</p>
            <p>
                The tree elements has a <i>tree</i> as the role and each menu item has a <i>treeitem</i> role along with <i>aria-label</i>, <i>aria-selected</i> and <i>aria-expanded</i> attributes. The container element of a treenode has the
                <i>group</i> role. The <i>aria-setsize</i>, <i>aria-posinset</i> and <i>aria-level</i> attributes are calculated implicitly and added to each treeitem.
            </p>

            <h3>Header Keyboard Support</h3>
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
                            <td>Adds focus to the first header when focus moves in to the component, if there is already a focused tab header then moves the focus out of the component based on the page tab sequence.</td>
                        </tr>
                        <tr>
                            <td><i>enter</i></td>
                            <td>Toggles the visibility of the content.</td>
                        </tr>
                        <tr>
                            <td><i>space</i></td>
                            <td>Toggles the visibility of the content.</td>
                        </tr>
                        <tr>
                            <td><i>down arrow</i></td>
                            <td>If panel is collapsed then moves focus to the next header, otherwise first treenode of the panel receives the focus.</td>
                        </tr>
                        <tr>
                            <td><i>up arrow</i></td>
                            <td>If previous panel is collapsed then moves focus to the previous header, otherwise last treenode of the previous panel receives the focus.</td>
                        </tr>
                        <tr>
                            <td><i>home</i></td>
                            <td>Moves focus to the first header.</td>
                        </tr>
                        <tr>
                            <td><i>end</i></td>
                            <td>Moves focus to the last header.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Tree Keyboard Support</h3>
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
                            <td>Moves focus to the next focusable element in the page tab order.</td>
                        </tr>
                        <tr>
                            <td><i>shift</i> + <i>tab</i></td>
                            <td>Moves focus to the previous focusable element in the page tab order.</td>
                        </tr>
                        <tr>
                            <td><i>enter</i></td>
                            <td>Activates the focused treenode.</td>
                        </tr>
                        <tr>
                            <td><i>space</i></td>
                            <td>Activates the focused treenode.</td>
                        </tr>
                        <tr>
                            <td><i>down arrow</i></td>
                            <td>Moves focus to the next treenode.</td>
                        </tr>
                        <tr>
                            <td><i>up arrow</i></td>
                            <td>Moves focus to the previous treenode.</td>
                        </tr>
                        <tr>
                            <td><i>right arrow</i></td>
                            <td>If node is closed, opens the node otherwise moves focus to the first child node.</td>
                        </tr>
                        <tr>
                            <td><i>left arrow</i></td>
                            <td>If node is open, closes the node otherwise moves focus to the parent node.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    </div>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;
}
