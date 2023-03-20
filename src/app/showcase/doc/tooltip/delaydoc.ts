import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'delay-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Adding delays to the show and hide events are defined with <i>showDelay</i> and <i>hideDelay</i> options respectively.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <input type="text" pInputText pTooltip="Enter your username" showDelay="1000" hideDelay="1000" placeholder="hover to display tooltip" />
        </div>
        <app-code [code]="code" selector="tooltip-delay-demo"></app-code>
    </section>`
})
export class DelayDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<input type="text" pInputText pTooltip="Enter your username" showDelay="1000" hideDelay="1000" placeholder="hover to display tooltip">`,

        html: `
<div class="card flex justify-content-center">
    <input type="text" pInputText pTooltip="Enter your username" showDelay="1000" hideDelay="1000" placeholder="hover to display tooltip">
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
