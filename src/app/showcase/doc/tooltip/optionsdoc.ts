import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';
import { TooltipOptions } from 'primeng/tooltip';

@Component({
    selector: 'options-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Tooltip is also configurable by using <i>tooltipOptions</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <input type="text" pInputText pTooltip="Enter your username" [tooltipOptions]="tooltipOptions" placeholder="hover to display tooltip" />
        </div>
        <app-code [code]="code" selector="tooltip-options-demo"></app-code>
    </section>`
})
export class OptionsDoc {
    @Input() id: string;

    @Input() title: string;

    tooltipOptions: TooltipOptions = {
        showDelay: 150,
        autoHide: false,
        tooltipEvent: 'hover',
        tooltipPosition: 'left'
    };

    code: Code = {
        basic: `
<input type="text" pInputText pTooltip="Enter your username" [tooltipOptions]="tooltipOptions" placeholder="hover to display tooltip">`,

        html: `
<div class="card flex justify-content-center">
    <input type="text" pInputText pTooltip="Enter your username" [tooltipOptions]="tooltipOptions" placeholder="hover to display tooltip">
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { TooltipOptions } from 'primeng/tooltip';

@Component({
    selector: 'tooltip-options-demo',
    templateUrl: './tooltip-options-demo.html'
})
export class TooltipOptionsDemo {
    tooltipOptions: TooltipOptions = {
        showDelay: 150,
        autoHide: false,
        tooltipEvent: 'hover',
        tooltipPosition: 'left'
    };
}`
    };
}
