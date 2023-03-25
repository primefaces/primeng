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
                        <td>onNodeSelect</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.node: Selected node instance.
                        </td>
                        <td>Callback to invoke when a node is selected.</td>
                    </tr>
                    <tr>
                        <td>onNodeUnselect</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.node: Unselected node instance.
                        </td>
                        <td>Callback to invoke when a node is unselected.</td>
                    </tr>
                    <tr>
                        <td>onNodeExpand</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.node: Expanded node instance.
                        </td>
                        <td>Callback to invoke when a node is expanded.</td>
                    </tr>
                    <tr>
                        <td>onNodeCollapse</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.node: Collapsed node instance.
                        </td>
                        <td>Callback to invoke when a node is collapsed.</td>
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
