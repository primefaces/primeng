import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'event-doc',
    template: `
        <app-docsectiontext>
            <p>Tooltip gets displayed on <i>hover</i> event of its target by default, other option is the <i>focus</i> event to display and blur to hide.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-2">
            <input type="text" pInputText pTooltip="Enter your username" tooltipEvent="focus" placeholder="focus to display tooltip" />
        </div>
        <app-code [code]="code" selector="tooltip-event-demo"></app-code>
    `
})
export class EventDoc {
    code: Code = {
        basic: `<input 
    type="text" 
    pInputText
    pTooltip="Enter your username" 
    tooltipEvent="focus" 
    placeholder="focus to display tooltip" />`,

        html: `<div class="card flex justify-center">
    <input 
        type="text" 
        pInputText 
        pTooltip="Enter your username" 
        tooltipEvent="focus" 
        placeholder="focus to display tooltip">
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'tooltip-event-demo',
    templateUrl: './tooltip-event-demo.html',
    standalone: true,
    imports: [TooltipModule, InputTextModule]
})
export class TooltipEventDemo {}`
    };
}
