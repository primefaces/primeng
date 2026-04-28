import { AppDoc } from '@/components/doc/app.doc';
import { BreakingDoc } from '@/doc/migration/v21/breakingdoc';
import { DeprecationsDoc } from '@/doc/migration/v21/deprecationsdoc';
import { RemovalsDoc } from '@/doc/migration/v21/removalsdoc';
import { WhatsNewDoc } from '@/doc/migration/v21/whatsnewdoc';
import { Component } from '@angular/core';

@Component({
    imports: [AppDoc],
    standalone: true,
    template: `<app-doc docTitle="Migration - PrimeNG v21" header="Migration to v21" description="Migration guide to PrimeNG v21." [docs]="docs" docType="page"></app-doc>`
})
export class v21MigrationDemoComponent {
    docs = [
        {
            id: 'whatsnew',
            label: "What's New",
            component: WhatsNewDoc
        },
        {
            id: 'breakingchanges',
            label: 'Breaking Changes',
            component: BreakingDoc
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
