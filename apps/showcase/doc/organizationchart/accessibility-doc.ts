import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'accessibility-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: ` <app-docsectiontext>
        <h3>Screen Reader</h3>
        <p>
            Component uses ARIA roles and attributes for screen reader accessibility. The root element has <i>role="tree"</i> with <i>aria-multiselectable</i> for multiple selection support. Each tree item uses <i>role="treeitem"</i> with
            <i>aria-level</i> for hierarchy, <i>aria-expanded</i> for collapse state, and <i>aria-selected</i> for selection state. Child nodes are grouped with <i>role="group"</i>.
        </p>
        <h3>Keyboard Support</h3>
        <h4>Node</h4>
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
                        <td>Moves focus through the focusable nodes within the chart.</td>
                    </tr>
                    <tr>
                        <td><i>enter</i></td>
                        <td>Toggles the selection state of a node.</td>
                    </tr>
                    <tr>
                        <td><i>space</i></td>
                        <td>Toggles the selection state of a node.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h4>Collapse Button</h4>
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
                        <td>Moves focus through the focusable elements within the chart.</td>
                    </tr>
                    <tr>
                        <td><i>enter</i></td>
                        <td>Toggles the expanded state of a node.</td>
                    </tr>
                    <tr>
                        <td><i>space</i></td>
                        <td>Toggles the expanded state of a node.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </app-docsectiontext>`
})
export class AccessibilityDoc {}
