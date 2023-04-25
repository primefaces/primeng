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
                        <td>header</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Header text of the panel.</td>
                    </tr>
                    <tr>
                        <td>toggleable</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if content of panel can be expanded and collapsed.</td>
                    </tr>
                    <tr>
                        <td>collapsed</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines the initial state of panel content, supports one or two-way binding as well.</td>
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
                        <td>expandIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Expand icon of the toggle button.</td>
                    </tr>
                    <tr>
                        <td>collapseIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Collapsed icon of the toggle button.</td>
                    </tr>
                    <tr>
                        <td>showHeader</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Specifies if header of panel cannot be displayed.</td>
                    </tr>
                    <tr>
                        <td>transitionOptions</td>
                        <td>string</td>
                        <td>400ms cubic-bezier(0.86, 0, 0.07, 1)</td>
                        <td>Transition options of the animation.</td>
                    </tr>
                    <tr>
                        <td>toggler</td>
                        <td>string</td>
                        <td>icon</td>
                        <td>Specifies the toggler element to toggle the panel content, valid values are "icon" and "header".</td>
                    </tr>
                    <tr>
                        <td>iconPos</td>
                        <td>string</td>
                        <td>right</td>
                        <td>Position of the icons, valid values are "end", "start" and "center".</td>
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
