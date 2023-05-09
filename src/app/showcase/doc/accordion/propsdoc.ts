import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <h5>Properties for Accordion</h5>
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
                        <td>multiple</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, multiple tabs can be activated at the same time.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the component.</td>
                    </tr>
                    <tr>
                        <td>headerStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the header section.</td>
                    </tr>
                    <tr>
                        <td>contentStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the content section.</td>
                    </tr>
                    <tr>
                        <td>tabStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the accordion tab.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>false</td>
                        <td>Style class of the component.</td>
                    </tr>
                    <tr>
                        <td>headerStyleClass</td>
                        <td>string</td>
                        <td>false</td>
                        <td>Style class of the header section.</td>
                    </tr>
                    <tr>
                        <td>tabStyleClass</td>
                        <td>string</td>
                        <td>false</td>
                        <td>Style class of the accordion tab.</td>
                    </tr>
                    <tr>
                        <td>contentStyleClass</td>
                        <td>string</td>
                        <td>false</td>
                        <td>Style class of the content section.</td>
                    </tr>
                    <tr>
                        <td>activeIndex</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Index of the active tab or an array of indexes to change selected tab programmatically.</td>
                    </tr>
                    <tr>
                        <td>expandIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of a collapsed tab.</td>
                    </tr>
                    <tr>
                        <td>collapseIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of an expanded tab.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h5>Properties for AccordionTab</h5>
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
                        <td>Title of the tab.</td>
                    </tr>
                    <tr>
                        <td>selected</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if the tab is active.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines whether the tab can be selected.</td>
                    </tr>
                    <tr>
                        <td>transitionOptions</td>
                        <td>string</td>
                        <td>400ms cubic-bezier(0.86, 0, 0.07, 1)</td>
                        <td>Transition options of the animation.</td>
                    </tr>
                    <tr>
                        <td>cache</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether a lazy loaded panel should avoid getting loaded again on reselection.</td>
                    </tr>
                    <tr>
                        <td>iconPos</td>
                        <td>string</td>
                        <td>start</td>
                        <td>Position of the icon, valid values are "end", "start".</td>
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
