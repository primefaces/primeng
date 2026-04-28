import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { AppDocSection } from './app.docsection';
import { AppDocSectionNav } from './app.docsection-nav';
import { AppDocCopyMarkdown } from './app.doccopymarkdown';

@Component({
    selector: 'app-docfeaturessection',
    standalone: true,
    imports: [AppDocSection, AppDocSectionNav, AppDocCopyMarkdown],
    template: ` <div class="doc-main">
            <div class="doc-intro">
                <div class="grid grid-cols-[1fr_auto] gap-2 items-start">
                    <h1 class="m-0">{{ header }}</h1>
                    @if (componentName || docType === 'page') {
                        <app-doccopymarkdown [componentName]="componentName" [docType]="docType" class="flex items-center gap-4 relative row-start-3 sm:row-start-1 sm:col-start-2" />
                    }
                    <p class="col-span-2">{{ description }}</p>
                </div>
            </div>
            <app-docsection [docs]="docs" />
        </div>
        <app-docsection-nav [docs]="docs" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.doc-tabpanel]': 'true'
    }
})
export class AppDocFeaturesSection {
    @Input() header!: string;

    @Input() description!: string;

    @Input() docs!: any[];

    @Input() componentName: string = '';

    @Input() docType: 'component' | 'page' = 'component';
}
