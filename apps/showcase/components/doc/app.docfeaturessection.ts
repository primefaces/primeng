import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { AppDocSection } from './app.docsection';
import { AppDocSectionNav } from './app.docsection-nav';

@Component({
    selector: 'app-docfeaturessection',
    standalone: true,
    imports: [AppDocSection, AppDocSectionNav],
    template: ` <div class="doc-main">
            <div class="doc-intro">
                <h1>{{ header }}</h1>
                <p>{{ description }}</p>
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
}
