import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'default-doc',
    standalone: true,
    imports: [RippleModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Default Demo Content.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-col items-center gap-4">
                <span class="text-sm"
                    >Ripple option at the
                    <span class="mx-1 h-8 w-8 rounded-border inline-flex items-center justify-center bg-primary text-primary-contrast"><i class="pi pi-palette"></i></span>
                    configurator needs to be turned on for the demo.</span
                >
                <div pRipple class="ripple-box">Default</div>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `,
    styles: [
        `
            :host {
                .ripple-box {
                    display: flex;
                    user-select: none;
                    justify-content: center;
                    align-items: center;
                    padding: 2.625rem;
                    font-weight: bold;
                    font-size: 0.875rem;
                    background: var(--p-content-background);
                    border: 1px solid var(--p-content-border-color);
                    border-radius: var(--p-content-border-radius);
                }
            }
        `
    ]
})
export class DefaultDoc {}
