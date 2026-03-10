import { Component } from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [PopoverModule, ButtonModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Content of the OverlayPanel is defined by <i>content</i> template.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-popover #op>
                    <ng-template #content>
                        <h4>Custom Content</h4>
                    </ng-template>
                </p-popover>
                <p-button (click)="op.toggle($event)" icon="pi pi-image" label="Show"></p-button>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class TemplateDoc {}
