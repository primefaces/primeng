import { Component, Input } from '@angular/core';

@Component({
    selector: 'events-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>onTextChange</td>
                        <td>
                            event.delta: Representation of the change.<br />
                            event.source: Source of change. Will be either "user" or "api".<br />
                            event.htmlValue: Current value as html.<br />
                            event.textValue: Current value as text.<br />
                        </td>
                        <td>Callback to invoke when the text of the editor is changed by the user.</td>
                    </tr>
                    <tr>
                        <td>onSelectionChange</td>
                        <td>
                            event.range: Object with index and length keys indicating where the selection exists.<br />
                            event.oldRange: Object with index and length keys indicating where the previous selection was..<br />
                            event.source: Source of change. Will be either "user" or "api".
                        </td>
                        <td>Callback to invoke when selected text of editor changes.</td>
                    </tr>
                    <tr>
                        <td>onInit</td>
                        <td>
                            event.editor: Quill editor instance.<br />
                            event.oldRange: Object with index and length keys indicating where the previous selection was..<br />
                            event.source: Source of change. Will be either "user" or "api".
                        </td>
                        <td>Callback to invoke after editor is initialized.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class EventsDoc {
    @Input() id: string;

    @Input() title: string;
}
