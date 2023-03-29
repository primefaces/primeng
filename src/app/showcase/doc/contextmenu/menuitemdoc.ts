import { Component, Input } from '@angular/core';

@Component({
    selector: 'menuitem-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>MenuItem provides the following properties. Note that not all of them may be utilized by the contextmenu component.</p>
        </app-docsectiontext>
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
                        <td>Identifier of the element.</td>
                    </tr>
                    <tr>
                        <td>label</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Text of the item.</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of the item.</td>
                    </tr>
                    <tr>
                        <td>iconStyle</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the item's icon.</td>
                    </tr>
                    <tr>
                        <td>command</td>
                        <td>function</td>
                        <td>null</td>
                        <td>Callback to execute when item is clicked.</td>
                    </tr>
                    <tr>
                        <td>url</td>
                        <td>string</td>
                        <td>null</td>
                        <td>External link to navigate when item is clicked.</td>
                    </tr>
                    <tr>
                        <td>routerLink</td>
                        <td>array</td>
                        <td>null</td>
                        <td>RouterLink definition for internal navigation.</td>
                    </tr>
                    <tr>
                        <td>routerLinkActiveOptions</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Configuration for active router link.</td>
                    </tr>
                    <tr>
                        <td>queryParams</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Query parameters for internal navigation via routerLink.</td>
                    </tr>
                    <tr>
                        <td>fragment</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Sets the hash fragment for the URL.</td>
                    </tr>
                    <tr>
                        <td>queryParamsHandling</td>
                        <td>QueryParamsHandling</td>
                        <td>null</td>
                        <td>
                            How to handle query parameters in the router link for the next navigation. One of:<br /><br />

                            merge : Merge new with current parameters.<br />
                            preserve : Preserve current parameters.k.
                        </td>
                    </tr>
                    <tr>
                        <td>preserveFragment</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When true, preserves the URL fragment for the next navigation.</td>
                    </tr>
                    <tr>
                        <td>skipLocationChange</td>
                        <td>boolean</td>
                        <td>null</td>
                        <td>When true, navigates without pushing a new state into history.</td>
                    </tr>
                    <tr>
                        <td>replaceUrl</td>
                        <td>boolean</td>
                        <td>null</td>
                        <td>When true, navigates while replacing the current state in history.</td>
                    </tr>
                    <tr>
                        <td>state</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Developer-defined state that can be passed to any navigation.</td>
                    </tr>
                    <tr>
                        <td>items</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of children menuitems.</td>
                    </tr>
                    <tr>
                        <td>expanded</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Visibility of submenu.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When set as true, disables the menuitem.</td>
                    </tr>
                    <tr>
                        <td>visible</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether the dom element of menuitem is created or not.</td>
                    </tr>
                    <tr>
                        <td>target</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Specifies where to open the linked document.</td>
                    </tr>
                    <tr>
                        <td>escape</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to escape the label or not. Set to false to display html content.</td>
                    </tr>
                    <tr>
                        <td>separator</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines the item as a separator.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the menuitem.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the menuitem.</td>
                    </tr>
                    <tr>
                        <td>badge</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Value of the badge.</td>
                    </tr>
                    <tr>
                        <td>badgeStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the badge.</td>
                    </tr>
                    <tr>
                        <td>title</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Tooltip text of the item.</td>
                    </tr>
                    <tr>
                        <td>automationId</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Value of HTML data-* attribute.</td>
                    </tr>
                    <tr>
                        <td>tabindex</td>
                        <td>string</td>
                        <td>0</td>
                        <td>Specifies tab order of the item.</td>
                    </tr>
                    <tr>
                        <td>tooltipOptions</td>
                        <td>TooltipOptions</td>
                        <td>-</td>
                        <td>Options of the item's tooltip.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class MenuItemDoc {
    @Input() id: string;

    @Input() title: string;
}
