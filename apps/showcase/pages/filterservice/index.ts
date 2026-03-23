import { ApiDoc } from '@/doc/filterservice/api-doc';
import { BuiltInConstraintsDoc } from '@/doc/filterservice/builtinconstraints-doc';
import { CustomConstraintsDoc } from '@/doc/filterservice/customconstraints-doc';
import { ImportDoc } from '@/doc/filterservice/import-doc';
import { TableIntegrationDoc } from '@/doc/filterservice/tableintegration-doc';
import { UsageDoc } from '@/doc/filterservice/usage-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="FilterService - PrimeNG" header="FilterService" description="FilterService is a helper utility to filter collections against constraints." [docs]="docs"></app-doc>`
})
export class FilterServiceDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'builtinconstraints',
            label: 'Built-in Constraints',
            component: BuiltInConstraintsDoc
        },
        {
            id: 'customconstraints',
            label: 'Custom Constraints',
            component: CustomConstraintsDoc
        },
        {
            id: 'table-integration',
            label: 'Table Integration',
            component: TableIntegrationDoc
        },
        {
            id: 'api',
            label: 'FilterService API',
            component: ApiDoc
        }
    ];
}
