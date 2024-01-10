import { Component } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: `
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
                        <td>p-inputtext</td>
                        <td>Input element</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {}
