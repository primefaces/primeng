import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'delay-doc',
    template: `
        <app-docsectiontext>
            <p>Adding delays to the show and hide events are defined with <i>showDelay</i> and <i>hideDelay</i> options respectively.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <button pButton pTooltip="Confirm to proceed" showDelay="1000" hideDelay="300" label="Save"></button>
        </div>
        <app-code [code]="code" selector="tooltip-delay-demo"></app-code>
    `
})
export class DelayDoc {
    code: Code = {
        basic: `<button pButton pTooltip="Confirm to proceed" showDelay="1000" hideDelay="300" label="Save"></button>`,

        html: `<div class="card flex justify-content-center">
    <button pButton pTooltip="Confirm to proceed" showDelay="1000" hideDelay="300" label="Save"></button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'tooltip-delay-demo',
    templateUrl: './tooltip-delay-demo.html'
})
export class TooltipDelayDemo {}`
    };
}
