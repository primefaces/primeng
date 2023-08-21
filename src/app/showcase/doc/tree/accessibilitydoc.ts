import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <app-docsectiontext [title]="title" [id]="id">
            <h3>Screen Reader</h3>
            <p>
                Value to describe the component can either be provided with <i>aria-labelledby</i> or <i>aria-label</i> props. The root list element has a <i>tree</i> role whereas each list item has a <i>treeitem</i> role along with
                <i>aria-label</i>, <i>aria-selected</i> and <i>aria-expanded</i> attributes. In checkbox selection, <i>aria-checked</i> is used instead of <i>aria-selected</i>. The container element of a treenode has the <i>group</i> role. Checkbox
                and toggle icons are hidden from screen readers as their parent element with <i>treeitem</i> role and attributes are used instead for readers and keyboard support. The <i>aria-setsize</i>, <i>aria-posinset</i> and
                <i>aria-level</i> attributes are calculated implicitly and added to each treeitem.
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
                            <td>
                                Moves focus to the first selected node when focus enters the component, if there is none then first element receives the focus. If focus is already inside the component, moves focus to the next focusable element in the
                                page tab sequence.
                            </td>
                        </tr>
                        <tr>
                            <td><i>shift</i> + <i>tab</i></td>
                            <td>
                                Moves focus to the last selected node when focus enters the component, if there is none then first element receives the focus. If focus is already inside the component, moves focus to the previous focusable element in
                                the page tab sequence.
                            </td>
                        </tr>
                        <tr>
                            <td><i>enter</i></td>
                            <td>Selects the focused treenode.</td>
                        </tr>
                        <tr>
                            <td><i>space</i></td>
                            <td>Selects the focused treenode.</td>
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
    </app-developmentsection>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;
}
