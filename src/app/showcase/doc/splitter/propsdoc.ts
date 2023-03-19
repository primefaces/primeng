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
                        <td>panelSizes</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Size of the elements relative to 100%.</td>
                    </tr>
                    <tr>
                        <td>minSizes</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Minimum size of the elements relative to 100%.</td>
                    </tr>
                    <tr>
                        <td>layout</td>
                        <td>string</td>
                        <td>horizontal</td>
                        <td>Orientation of the panels, valid values are "horizontal" and "vertical".</td>
                    </tr>
                    <tr>
                        <td>gutterSize</td>
                        <td>number</td>
                        <td>4</td>
                        <td>Size of the divider in pixels.</td>
                    </tr>
                    <tr>
                        <td>stateKey</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Storage identifier of a stateful Splitter.</td>
                    </tr>
                    <tr>
                        <td>stateStorage</td>
                        <td>string</td>
                        <td>session</td>
                        <td>Defines where a stateful splitter keeps its state, valid values are "session" for sessionStorage and "local" for localStorage.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>object</td>
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
                        <td>panelStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the panel.</td>
                    </tr>
                    <tr>
                        <td>panelStyle</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the pnanel.</td>
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
