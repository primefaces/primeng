import { AppDocModule } from '@/components/doc/app.doc.module';
import { BackwardCompatibleDoc } from '@/doc/migration/v20/backwardcompatibledoc';
import { BreakingDoc } from '@/doc/migration/v20/breakingdoc';
import { DeprecationsDoc } from '@/doc/migration/v20/deprecationsdoc';
import { RemovalsDoc } from '@/doc/migration/v20/removalsdoc';
import { OverviewDoc } from '@/doc/migration/v20/overviewdoc';
import { Component } from '@angular/core';

@Component({
    imports: [AppDocModule],
    template: `<app-doc docTitle="Migration - PrimeNG v20" header="Migration" description="Migration guide to PrimeNG v20." [docs]="docs"></app-doc>`
})
export class v20MigrationDemoComponent {
    docs = [
        {
            id: 'overview',
            label: 'Overview',
            component: OverviewDoc
        },
        {
            id: 'breakingchanges',
            label: 'Breaking Changes',
            component: BreakingDoc
        },
        {
            id: 'backwardcompatible',
            label: 'Backward Compatible',
            component: BackwardCompatibleDoc
        },
        {
            id: 'deprecations',
            label: 'Deprecations',
            component: DeprecationsDoc
        },
        {
            id: 'removals',
            label: 'Removals',
            component: RemovalsDoc
        }
    ];
}
