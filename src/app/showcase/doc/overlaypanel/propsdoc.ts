import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>dismissable</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Enables to hide the overlay when outside is clicked.</td>
                    </tr>
                    <tr>
                        <td>showCloseIcon</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, displays a close icon at top right corner.</td>
                    </tr>
                    <tr>
                        <td>ariaCloseLabel</td>
                        <td>string</td>
                        <td>close</td>
                        <td>Aria label of the close icon.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the component.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the component.</td>
                    </tr>
                    <tr>
                        <td>appendTo</td>
                        <td>any</td>
                        <td>null</td>
                        <td>
                            Target element to attach the panel, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having
                            #mydiv as variable name).
                        </td>
                    </tr>
                    <tr>
                        <td>baseZIndex</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Base zIndex value to use in layering.</td>
                    </tr>
                    <tr>
                        <td>autoZIndex</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to automatically manage layering.</td>
                    </tr>
                    <tr>
                        <td>showTransitionOptions</td>
                        <td>string</td>
                        <td>.12s cubic-bezier(0, 0, 0.2, 1)</td>
                        <td>Transition options of the show animation.</td>
                    </tr>
                    <tr>
                        <td>hideTransitionOptions</td>
                        <td>string</td>
                        <td>.1s linear</td>
                        <td>Transition options of the hide animation.</td>
                    </tr>
                    <tr>
                        <td>focusOnShow</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>When enabled, first button receives focus on show.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class PropsDoc {
    @Input() id: string;

    @Input() title: string;
}
