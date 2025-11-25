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
                <div class="flex items-start justify-between gap-4 mb-4">
                    <div class="flex-1">
                        <h1>{{ header }}</h1>
                        <p>{{ description }}</p>
                    </div>
                    @if (componentName) {
                        <app-doccopymarkdown [componentName]="componentName" class="flex-shrink-0 mt-2" />
                    }
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
}
