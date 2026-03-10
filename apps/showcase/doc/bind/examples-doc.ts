import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { BindModule } from 'primeng/bind';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'examples-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, BindModule, TooltipModule, CommonModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>pBind</i> is a directive that accepts an object of HTML attributes.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap justify-center gap-4">
                <div [pBind]="{ 'aria-label': 'basic-box', class: 'bg-primary text-primary-contrast flex items-center justify-center p-3 rounded-lg w-28 font-medium text-sm' }">Static</div>

                <div [pBind]="boxBinding()" pTooltip="Click to change color">Dynamic</div>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ExamplesDoc {
    isActive = signal<boolean>(false);

    boxBinding = computed(() => {
        return {
            class: ['flex items-center justify-center p-3 rounded-lg select-none w-24 border border-primary font-medium text-sm', this.isActive() ? 'bg-primary text-primary-contrast' : 'bg-transparent text-primary-600 dark:text-primary-400'],
            style: { cursor: 'pointer', transition: 'all 0.3s' },
            'data-state': this.isActive() ? 'active' : 'inactive',
            onclick: () => {
                this.isActive.set(!this.isActive());
            }
        };
    });
}
