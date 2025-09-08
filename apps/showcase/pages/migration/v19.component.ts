import { AppDocModule } from '@/components/doc/app.doc.module';
import { BreakingChangesDoc } from '@/doc/migration/v19/breakingchangesdoc';
import { DeprecatedComponentsDoc } from '@/doc/migration/v19/deprecatedcomponentsdoc';
import { MigrationOverviewDoc } from '@/doc/migration/v19/migrationoverviewdoc';
import { RenamedComponentsDoc } from '@/doc/migration/v19/renamedcomponentsdoc';
import { Component } from '@angular/core';

@Component({
    imports: [AppDocModule],
    template: `<app-doc docTitle="Migration - PrimeNG" header="Migration" description="Migration guide to PrimeNG v19" [docs]="docs"></app-doc>`
})
export class v19MigrationDemoComponent {
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
