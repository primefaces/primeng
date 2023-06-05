import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>Splitter bar defines <i>separator</i> as the role with <i>aria-orientation</i> set to either horizontal or vertical.</p>
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
                                <td>Moves focus through the splitter bar.</td>
                            </tr>
                            <tr>
                                <td><i>down arrow</i></td>
                                <td>Moves a vertical splitter down.</td>
                            </tr>
                            <tr>
                                <td><i>up arrow</i></td>
                                <td>Moves a vertical splitter up.</td>
                            </tr>
                            <tr>
                                <td><i>left arrow</i></td>
                                <td>Moves a vertical splitter to the left.</td>
                            </tr>
                            <tr>
                                <td><i>right arrow</i></td>
                                <td>Moves a vertical splitter to the right.</td>
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
