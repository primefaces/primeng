import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'delay-doc',
    template: `
        <app-docsectiontext>
            <p>Adding delays to the show and hide events are defined with <i>showDelay</i> and <i>hideDelay</i> options respectively.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button pTooltip="Confirm to proceed" showDelay="1000" hideDelay="300" label="Save" />
        </div>
        <app-code [code]="code" selector="tooltip-delay-demo"></app-code>
    `
})
export class DelayDoc {
    code: Code = {
        basic: `<p-button
    pTooltip="Confirm to proceed" 
    showDelay="1000" 
    hideDelay="300" 
    label="Save" />`,

        html: `<div class="card flex justify-center">
    <p-button 
        pTooltip="Confirm to proceed" 
        showDelay="1000"
        hideDelay="300" 
        label="Save" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'tooltip-delay-demo',
    templateUrl: './tooltip-delay-demo.html',
    standalone: true,
    imports: [TooltipModule, ButtonModule]
})
export class TooltipDelayDemo {}`
    };
}
