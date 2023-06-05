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
                        <td>id</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Unique identifier of the element.</td>
                    </tr>
                    <tr>
                        <td>model</td>
                        <td>object</td>
                        <td>null</td>
                        <td>MenuModel instance to define the action items.</td>
                    </tr>
                    <tr>
                        <td>visible</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Specifies the visibility of the overlay.</td>
                    </tr>
                    <tr>
                        <td>className</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the element.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the element.</td>
                    </tr>
                    <tr>
                        <td>direction</td>
                        <td>string</td>
                        <td>up</td>
                        <td>Specifies the opening direction of actions. Valid values are 'up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left' and 'down-right'</td>
                    </tr>
                    <tr>
                        <td>transitionDelay</td>
                        <td>number</td>
                        <td>30</td>
                        <td>Transition delay step for each action item.</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td>string</td>
                        <td>linear</td>
                        <td>Specifies the opening type of actions.</td>
                    </tr>
                    <tr>
                        <td>radius</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Radius for *circle types.</td>
                    </tr>
                    <tr>
                        <td>mask</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to show a mask element behind the speeddial</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the component is disabled.</td>
                    </tr>
                    <tr>
                        <td>hideOnClickOutside</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether the actions close when clicked outside.</td>
                    </tr>
                    <tr>
                        <td>buttonClassName</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the button element.</td>
                    </tr>
                    <tr>
                        <td>buttonStyle</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the button element.</td>
                    </tr>
                    <tr>
                        <td>buttonTemplate</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Template of button element.</td>
                    </tr>
                    <tr>
                        <td>maskClassName</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the mask element.</td>
                    </tr>
                    <tr>
                        <td>maskStyle</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the mask element.</td>
                    </tr>
                    <tr>
                        <td>showIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Show icon of the button element.</td>
                    </tr>
                    <tr>
                        <td>hideIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Hide icon of the button element.</td>
                    </tr>
                    <tr>
                        <td>rotateAnimation</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Defined to rotate showIcon when hideIcon is not present.</td>
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
