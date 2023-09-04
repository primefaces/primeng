import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chartjs-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>To begin with, first you must install the charts.js package using npm and then include it in your project. An example with CLI would be;</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class ChartjsDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        typescript: `
npm install chart.js --save

"scripts": [
    "../node_modules/chart.js/dist/chart.js",
    //..others
],`
    };
}
