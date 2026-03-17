import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'auto-hide-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, InputTextModule, TooltipModule],
    template: `
        <app-docsectiontext>
            <p>
                Tooltip is hidden when mouse leaves the target element, in cases where tooltip needs to be interacted with, set
                <i>autoHide</i> to false to change the default behavior.
            </p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap justify-center gap-2">
                <input type="text" pInputText pTooltip="Enter your username" [autoHide]="false" placeholder="autoHide: false" />
                <input type="text" pInputText pTooltip="Enter your username" placeholder="autoHide: true" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class AutoHideDoc {}
