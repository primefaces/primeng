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
                        <td>key</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Key to match the key of a message to display.</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of the message.</td>
                    </tr>
                    <tr>
                        <td>closeIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of the close button.</td>
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
                        <td>position</td>
                        <td>string</td>
                        <td>top-right</td>
                        <td>Position of the component, valid values are "top-right", "top-left", "bottom-left", "bottom-right", "top-center, "bottom-center" and "center".</td>
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
                        <td>300ms ease-out</td>
                        <td>Transition options of the show animation.</td>
                    </tr>
                    <tr>
                        <td>hideTransitionOptions</td>
                        <td>string</td>
                        <td>250ms ease-in</td>
                        <td>Transition options of the hide animation.</td>
                    </tr>
                    <tr>
                        <td>showTransformOptions</td>
                        <td>string</td>
                        <td>translateY(100%)</td>
                        <td>Transform options of the show animation.</td>
                    </tr>
                    <tr>
                        <td>hideTransformOptions</td>
                        <td>string</td>
                        <td>translateY(-100%)</td>
                        <td>Transform options of the hide animation.</td>
                    </tr>
                    <tr>
                        <td>preventOpenDuplicates</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>It does not add the new message if there is already a toast displayed with the same content</td>
                    </tr>
                    <tr>
                        <td>breakpoints</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Object literal to define styles per screen size.</td>
                    </tr>
                    <tr>
                        <td>preventDuplicates</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Displays only once a message with the same content.</td>
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
