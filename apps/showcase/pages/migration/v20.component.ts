import { AppDocModule } from '@/components/doc/app.doc.module';
import { BreakingChangesDoc } from '@/doc/migration/v20/breakingchangesdoc';
import { DeprecatedComponentsDoc } from '@/doc/migration/v20/deprecatedcomponentsdoc';
import { MigrationOverviewDoc } from '@/doc/migration/v20/migrationoverviewdoc';
import { RenamedComponentsDoc } from '@/doc/migration/v20/renamedcomponentsdoc';
import { Component } from '@angular/core';

@Component({
    imports: [AppDocModule],
    template: `<app-doc docTitle="Migration - PrimeNG v20" header="Migration" description="Migration guide to PrimeNG v20" [docs]="docs"></app-doc>`
})
export class v20MigrationDemoComponent {
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
