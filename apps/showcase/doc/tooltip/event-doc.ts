import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'event-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, InputTextModule, TooltipModule],
    template: `
        <app-docsectiontext>
            <p>Tooltip gets displayed on <i>hover</i> event of its target by default, other option is the <i>focus</i> event to display and blur to hide.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap justify-center gap-2">
                <input type="text" pInputText pTooltip="Enter your username" tooltipEvent="focus" placeholder="focus to display tooltip" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class EventDoc {}
