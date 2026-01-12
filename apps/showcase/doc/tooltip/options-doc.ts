import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'options-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, InputTextModule, TooltipModule],
    template: `
        <app-docsectiontext>
            <p>Tooltip is also configurable by using <i>tooltipOptions</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <input type="text" pInputText pTooltip="Enter your username" [tooltipOptions]="tooltipOptions" placeholder="hover to display tooltip" />
        </div>
        <app-code></app-code>
    `
})
export class OptionsDoc {
    tooltipOptions = {
        showDelay: 150,
        autoHide: false,
        tooltipEvent: 'hover',
        tooltipPosition: 'left'
    };
}
