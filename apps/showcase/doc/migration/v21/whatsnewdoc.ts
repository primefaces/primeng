import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'v21-migration-whatsnew-doc',
    standalone: true,
    imports: [AppDocSectionText, RouterModule],
    template: `
        <app-docsectiontext>
            <p>PrimeNG v21 represents a major advancement in PrimeTek's product vision. Key highlights of this release include:</p>
            <ul class="leading-normal px-10 list-disc">
                <li class="py-1"><a routerLink="/passthrough" class="text-primary font-medium hover:underline">PassThrough attributes</a> for enhanced customization.</li>
                <li class="py-1"><a routerLink="/theming/unstyled" class="text-primary font-medium hover:underline">Unstyled Mode</a> for complete styling flexibility.</li>
                <li class="py-1">Modern CSS-based <a routerLink="/guides/animations" class="text-primary font-medium hover:underline">animations</a>. The deprecated <i>provideAnimationsAsync</i> is safe to remove.</li>
                <li class="py-1">Initial zoneless support for improved performance.</li>
                <li class="py-1"><a routerLink="/llms" class="text-primary font-medium hover:underline">AI-enhanced documentation</a> for better developer experience.</li>
            </ul>
            <h3>Notes</h3>
            <ul class="leading-normal px-10 list-disc">
                <li class="py-1">The internal packages <i>@primeuix/styles</i> and <i>@primeuix/themes</i> should be version <i>2.0.1</i> or higher. 
                These packages are updated automatically with a fresh install. If you encounter any issues with visuals or animations, please verify that you are using the correct versions of these packages.</li>
            </ul>
        </app-docsectiontext>
    `
})
export class WhatsNewDoc {}
