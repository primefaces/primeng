import { Component, Input } from '@angular/core';

@Component({
    selector: 'templates-doc',
    template: ` <div class="doc-tablewrapper">
        <table class="doc-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Parameters</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>header</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>footer</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>date</td>
                    <td>$implicit: Value of the component</td>
                </tr>
                <tr>
                    <td>decade</td>
                    <td>$implicit: An array containing the start and and year of a decade to display at header of the year picker.</td>
                </tr>
                <tr>
                    <td>previousicon</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>nexticon</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>triggericon</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>clearicon</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>incrementicon</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>decrementicon</td>
                    <td>-</td>
                </tr>
            </tbody>
        </table>
    </div>`
})
export class TemplatesDoc {
    @Input() id: string;

    @Input() title: string;
}
