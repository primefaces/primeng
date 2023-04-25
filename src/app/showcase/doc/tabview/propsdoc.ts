import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <h3>Properties of TabView</h3>
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
                        <td>activeIndex</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Index of the active tab to change selected tab programmatically.</td>
                    </tr>
                    <tr>
                        <td>controlClose</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether tab close is controlled at onClose event or not.</td>
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
                        <td>scrollable</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled displays buttons at each side of the tab headers to scroll the tab list.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>Properties of TabPanel</h3>
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
                        <td>header</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Title of the tabPanel.</td>
                    </tr>
                    <tr>
                        <td>selected</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if tab is active.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When true, tab cannot be activated.</td>
                    </tr>
                    <tr>
                        <td>closable</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if tab can be removed.</td>
                    </tr>
                    <tr>
                        <td>headerStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the tab header.</td>
                    </tr>
                    <tr>
                        <td>headerStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the tab header.</td>
                    </tr>
                    <tr>
                        <td>cache</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether a lazy loaded panel should avoid getting loaded again on reselection.</td>
                    </tr>
                    <tr>
                        <td>tooltip</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Advisory information to display in a tooltip on hover.</td>
                    </tr>
                    <tr>
                        <td>tooltipStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the tooltip.</td>
                    </tr>
                    <tr>
                        <td>tooltipPosition</td>
                        <td>string</td>
                        <td>top</td>
                        <td>Position of the tooltip, valid values are right, left, top and bottom.</td>
                    </tr>
                    <tr>
                        <td>tooltipPositionStyle</td>
                        <td>string</td>
                        <td>absolute</td>
                        <td>Type of CSS position.</td>
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
