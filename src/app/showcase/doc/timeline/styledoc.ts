import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Following is the list of structural style classes, for theming classes visit <a href="#" [routerLink]="['/theming']">theming</a> page.</p>
        </app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Element</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>p-timeline</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-left</td>
                        <td>Container element when alignment is left.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-right</td>
                        <td>Container element when alignment is right.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-top</td>
                        <td>Container element when alignment is top.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-bottom</td>
                        <td>Container element when alignment is bottom.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-alternate</td>
                        <td>Container element when alignment is alternating.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-vertical</td>
                        <td>Container element of a vertical timeline.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-horizontal</td>
                        <td>Container element of a horizontal timeline.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-event</td>
                        <td>Event element.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-event-opposite</td>
                        <td>Opposite of an event content.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-event-content</td>
                        <td>Event content.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-event-separator</td>
                        <td>Separator element of an event.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-event-marker</td>
                        <td>Marker element of an event.</td>
                    </tr>
                    <tr>
                        <td>p-timeline-event-connector</td>
                        <td>Connector element of an event.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class StyleDoc {
    @Input() id: string;

    @Input() title: string;
}
