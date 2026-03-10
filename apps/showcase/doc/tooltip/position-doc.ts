import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'position-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, InputTextModule, TooltipModule],
    template: `
        <app-docsectiontext>
            <p>Position of the tooltip is specified using <i>tooltipPosition</i> attribute. Valid values are <i>top</i>, <i>bottom</i>, <i>right</i> and <i>left</i>. Default position of the tooltip is <i>right</i>.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap justify-center gap-2">
                <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="right" placeholder="Right" />
                <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="top" placeholder="Top" />
                <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="bottom" placeholder="Bottom" />
                <input type="text" pInputText pTooltip="Enter your username" tooltipPosition="left" placeholder="Left" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class PositionDoc {}
