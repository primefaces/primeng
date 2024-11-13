import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'position-doc',
    template: `
        <app-docsectiontext>
            <p>Position of the tooltip is specified using <i>tooltipPosition</i> attribute. Valid values are <i>top</i>, <i>bottom</i>, <i>right</i> and <i>left</i>. Default position of the tooltip is <i>right</i>.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-2">
            <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="right" placeholder="Right" />
            <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="top" placeholder="Top" />
            <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="bottom" placeholder="Bottom" />
            <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="left" placeholder="Left" />
        </div>
        <app-code [code]="code" selector="tooltip-position-demo"></app-code>
    `
})
export class PositionDoc {
    code: Code = {
        basic: `<input type="text" pInputText pTooltip="Enter your username" tooltipPosition="right" placeholder="Right" />
<input type="text" pInputText pTooltip="Enter your username" tooltipPosition="top" placeholder="Top" />
<input type="text" pInputText pTooltip="Enter your username" tooltipPosition="bottom" placeholder="Bottom" />
<input type="text" pInputText pTooltip="Enter your username" tooltipPosition="left" placeholder="Left" />`,

        html: `<div class="card flex flex-wrap justify-center gap-2">
    <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="right" placeholder="Right" />
    <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="top" placeholder="Top" />
    <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="bottom" placeholder="Bottom" />
    <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="left" placeholder="Left" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'tooltip-position-demo',
    templateUrl: './tooltip-position-demo.html',
    standalone: true,
    imports: [Tooltip, InputTextModule]
})
export class TooltipPositionDemo {}`
    };
}
