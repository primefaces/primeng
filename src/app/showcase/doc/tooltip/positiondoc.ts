import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'position-doc',
    template: `
        <app-docsectiontext>
            <p>Position of the tooltip is specified using <i>tooltipPosition</i> attribute. Valid values are <i>top</i>, <i>bottom</i>, <i>end</i> and <i>start</i>. Default position of the tooltip is <i>end</i>.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-content-center gap-2">
            <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="end" placeholder="End" />
            <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="start" placeholder="Start" />
            <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="top" placeholder="Top" />
            <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="bottom" placeholder="Bottom" />
        </div>
        <app-code [code]="code" selector="tooltip-position-demo"></app-code>
    `
})
export class PositionDoc {
    code: Code = {
        basic: `<input
    type="text"
    pInputText
    pTooltip="Enter your username"
    tooltipPosition="end"
    placeholder="End" />
<input
    type="text"
    pInputText
    pTooltip="Enter your username"
    tooltipPosition="start"
    placeholder="Start" />
<input
    type="text"
    pInputText
    pTooltip="Enter your username"
    tooltipPosition="top"
    placeholder="Top" />
<input
    type="text"
    pInputText
    pTooltip="Enter your username"
    tooltipPosition="bottom"
    placeholder="Bottom" />`,

        html: `<div class="card flex flex-wrap justify-content-center gap-2">
    <input
        type="text"
        pInputText
        pTooltip="Enter your username"
        tooltipPosition="end"
        placeholder="End" />
    <input
        type="text"
        pInputText
        pTooltip="Enter your username"
        tooltipPosition="start"
        placeholder="Start">
    <input
        type="text"
        pInputText
        pTooltip="Enter your username"
        tooltipPosition="top"
        placeholder="Top">
    <input
        type="text"
        pInputText
        pTooltip="Enter your username"
        tooltipPosition="bottom"
        placeholder="Bottom">
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TooltipModule } from 'primengrtl/tooltip';
import { InputTextModule } from 'primengrtl/inputtext';

@Component({
    selector: 'tooltip-position-demo',
    templateUrl: './tooltip-position-demo.html',
    standalone: true,
    imports: [TooltipModule, InputTextModule]
})
export class TooltipPositionDemo {}`
    };
}
