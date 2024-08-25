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
                        <td>p-inputswitch</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-inputswitch-checked</td>
                        <td>Container element in active state.</td>
                    </tr>
                    <tr>
                        <td>p-inputswitch-slider</td>
                        <td>Slider element behind the handle.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {}
