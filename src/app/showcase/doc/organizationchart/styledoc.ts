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
                        <td>p-organizationchart</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-organizationchart-table</td>
                        <td>Table container of a node.</td>
                    </tr>
                    <tr>
                        <td>p-organizationchart-lines</td>
                        <td>Connector lines container.</td>
                    </tr>
                    <tr>
                        <td>p-organizationchart-nodes</td>
                        <td>Contained of node children.</td>
                    </tr>
                    <tr>
                        <td>p-organizationchart-line-right</td>
                        <td>Right side line of a node connector.</td>
                    </tr>
                    <tr>
                        <td>p-organizationchart-line-left</td>
                        <td>Left side line of a node connector.</td>
                    </tr>
                    <tr>
                        <td>p-organizationchart-line-top</td>
                        <td>Top side line of a node connector.</td>
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
