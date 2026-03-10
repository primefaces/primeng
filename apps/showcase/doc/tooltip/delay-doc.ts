import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'delay-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, ButtonModule, TooltipModule],
    template: `
        <app-docsectiontext>
            <p>Adding delays to the show and hide events are defined with <i>showDelay</i> and <i>hideDelay</i> options respectively.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-button pTooltip="Confirm to proceed" showDelay="1000" hideDelay="300" label="Save" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class DelayDoc {}
