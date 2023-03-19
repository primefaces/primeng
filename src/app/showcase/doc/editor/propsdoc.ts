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
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the container.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the container.</td>
                    </tr>
                    <tr>
                        <td>placeholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Placeholder text to show when editor is empty.</td>
                    </tr>
                    <tr>
                        <td>readonly</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to instantiate the editor to read-only mode.</td>
                    </tr>
                    <tr>
                        <td>formats</td>
                        <td>string[]</td>
                        <td>null</td>
                        <td>Whitelist of formats to display, see <a href="http://quilljs.com/docs/formats/">here</a> for available options.</td>
                    </tr>
                    <tr>
                        <td>modules</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Modules configuration of Editor, see <a href="https://quilljs.com/docs/modules/">here</a> for available options.</td>
                    </tr>
                    <tr>
                        <td>debug</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Shortcut for debug. Note debug is a static method and will affect other instances of Quill editors on the page. Only warning and error messages are enabled by default.</td>
                    </tr>
                    <tr>
                        <td>bounds</td>
                        <td>Element</td>
                        <td>document.body</td>
                        <td>DOM Element or a CSS selector for a DOM Element, within which the editor’s p elements (i.e. tooltips, etc.) should be confined. Currently, it only considers left and right boundaries..</td>
                    </tr>
                    <tr>
                        <td>scrollingContainer</td>
                        <td>Element</td>
                        <td>null</td>
                        <td>
                            DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars (i.e. overflow-y: auto), if is has been changed from the default ql-editor with custom CSS. Necessary to fix scroll jumping
                            bugs when Quill is set to auto grow its height, and another ancestor container is responsible from the scrolling..
                        </td>
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
