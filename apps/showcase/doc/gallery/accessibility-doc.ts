import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                Gallery uses semantic button elements for all interactive controls. The <i>data-scope</i> and <i>data-part</i> attributes identify each part of the gallery for assistive technologies. Use <i>aria-label</i> attributes on buttons to
                provide accessible names.
            </p>
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
                        <td>
                            <i>tab</i>
                        </td>
                        <td>Moves focus between interactive elements.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>enter</i>
                        </td>
                        <td>Activates the focused button (zoom, rotate, flip, navigate, etc.).</td>
                    </tr>
                    <tr>
                        <td>
                            <i>space</i>
                        </td>
                        <td>Activates the focused button.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class AccessibilityDoc {}
