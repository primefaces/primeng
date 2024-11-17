import { BreakingChangesDoc } from '@/doc/guides/migration/breakingchangesdoc';
import { DeprecatedComponentsDoc } from '@/doc/guides/migration/deprecatedcomponentsdoc';
import { MigrationOverviewDoc } from '@/doc/guides/migration/migrationoverviewdoc';
import { RenamedComponentsDoc } from '@/doc/guides/migration/renamedcomponentsdoc';
import { Component } from '@angular/core';

@Component({
    template: ` <app-doc docTitle="Migration - PrimeNG" header="Migration" description="Migration guide to PrimeNG v18" [docs]="docs"></app-doc>`
})
export class MigrationDemoComponent {
    docs = [
        {
            id: 'overview',
            label: 'Overview',
            component: MigrationOverviewDoc
        },
        {
            id: 'changes',
            label: 'Changes',
            description: 'The list of backward compatible and breaking changes.',
            children: [
                {
                    id: 'compatible',
                    label: 'Compatible',
                    component: RenamedComponentsDoc
                },
                {
                    id: 'deprecated',
                    label: 'Deprecated Components',
                    component: DeprecatedComponentsDoc
                },
                {
                    id: 'breaking',
                    label: 'Breaking',
                    component: BreakingChangesDoc
                }
            ]
        }
    ];
}
